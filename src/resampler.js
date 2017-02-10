export default class Resampler {
  constructor(
    fromSampleRate,
    toSampleRate,
    channels,
    outputBufferSize,
    noReturn
  ) {
    this.fromSampleRate = fromSampleRate;
    this.toSampleRate = toSampleRate;
    this.channels = channels | 0;
    this.outputBufferSize = outputBufferSize;
    this.noReturn = !!noReturn;
    this.initialize();
  }

  initialize() {
    if (this.fromSampleRate > 0 && this.toSampleRate > 0 && this.channels > 0) {
      if (this.fromSampleRate === this.toSampleRate) {
        this.resampler = this.bypassResampler;
        this.ratioWeight = 1;
      } else {
        this.ratioWeight = this.fromSampleRate / this.toSampleRate;
        if (this.fromSampleRate < this.toSampleRate) {
          this.compileLinearInterpolationFunction();
          this.lastWeight = 1;
        } else {
          this.compileMultiTapFunction();
          this.tailExists = false;
          this.lastWeight = 0;
        }

        this.initializeBuffers();
      }
    } else {
      throw new Error("Invalid settings specified for the resampler.");
    }
  }

  compileLinearInterpolationFunction() {
    var toCompile = "var bufferLength = buffer.length;\
  	var outLength = this.outputBufferSize;\
  	if ((bufferLength % " +
      this.channels +
      ") === 0) {\
  		if (bufferLength > 0) {\
  			var weight = this.lastWeight;\
  			var firstWeight = 0;\
  			var secondWeight = 0;\
  			var sourceOffset = 0;\
  			var outputOffset = 0;\
  			var outputBuffer = this.outputBuffer;\
  			for (; weight < 1; weight += " +
      this.ratioWeight +
      ") {\
  				secondWeight = weight % 1;\
  				firstWeight = 1 - secondWeight;";
    for (let channel = 0; channel < this.channels; ++channel) {
      toCompile += "outputBuffer[outputOffset++] = (this.lastOutput[" +
        channel +
        "] * firstWeight) + (buffer[" +
        channel +
        "] * secondWeight);";
    }
    toCompile += "}\
  			weight -= 1;\
  			for (bufferLength -= " +
      this.channels +
      ", sourceOffset = Math.floor(weight) * " +
      this.channels +
      "; outputOffset < outLength && sourceOffset < bufferLength;) {\
  				secondWeight = weight % 1;\
  				firstWeight = 1 - secondWeight;";
    for (let channel = 0; channel < this.channels; ++channel) {
      toCompile += "outputBuffer[outputOffset++] = (buffer[sourceOffset" +
        (channel > 0 ? " + " + channel : "") +
        "] * firstWeight) + (buffer[sourceOffset + " +
        (this.channels + channel) +
        "] * secondWeight);";
    }
    toCompile += "weight += " +
      this.ratioWeight +
      ";\
  				sourceOffset = Math.floor(weight) * " +
      this.channels +
      ";\
  			}";
    for (let channel = 0; channel < this.channels; ++channel) {
      toCompile += "this.lastOutput[" + channel + "] = buffer[sourceOffset++];";
    }
    toCompile += 'this.lastWeight = weight % 1;\
  			return this.bufferSlice(outputOffset);\
  		}\
  		else {\
  			return (this.noReturn) ? 0 : [];\
  		}\
  	}\
  	else {\
  		throw(new Error("Buffer was of incorrect sample length."));\
  	}';
    this.resampler = Function("buffer", toCompile);
  }

  compileMultiTapFunction() {
    var toCompile = "var bufferLength = buffer.length;\
  	var outLength = this.outputBufferSize;\
  	if ((bufferLength % " +
      this.channels +
      ") === 0) {\
  		if (bufferLength > 0) {\
  			var weight = 0;";
    for (let channel = 0; channel < this.channels; ++channel) {
      toCompile += "var output" + channel + " = 0;";
    }
    toCompile += "var actualPosition = 0;\
  			var amountToNext = 0;\
  			var alreadyProcessedTail = !this.tailExists;\
  			this.tailExists = false;\
  			var outputBuffer = this.outputBuffer;\
  			var outputOffset = 0;\
  			var currentPosition = 0;\
  			do {\
  				if (alreadyProcessedTail) {\
  					weight = " +
      this.ratioWeight +
      ";";
    for (let channel = 0; channel < this.channels; ++channel) {
      toCompile += "output" + channel + " = 0;";
    }
    toCompile += "}\
  				else {\
  					weight = this.lastWeight;";
    for (let channel = 0; channel < this.channels; ++channel) {
      toCompile += "output" + channel + " = this.lastOutput[" + channel + "];";
    }
    toCompile += "alreadyProcessedTail = true;\
  				}\
  				while (weight > 0 && actualPosition < bufferLength) {\
  					amountToNext = 1 + actualPosition - currentPosition;\
  					if (weight >= amountToNext) {";
    for (let channel = 0; channel < this.channels; ++channel) {
      toCompile += "output" +
        channel +
        " += buffer[actualPosition++] * amountToNext;";
    }
    toCompile += "currentPosition = actualPosition;\
  						weight -= amountToNext;\
  					}\
  					else {";
    for (let channel = 0; channel < this.channels; ++channel) {
      toCompile += "output" +
        channel +
        " += buffer[actualPosition" +
        (channel > 0 ? " + " + channel : "") +
        "] * weight;";
    }
    toCompile += "currentPosition += weight;\
  						weight = 0;\
  						break;\
  					}\
  				}\
  				if (weight <= 0) {";
    for (let channel = 0; channel < this.channels; ++channel) {
      toCompile += "outputBuffer[outputOffset++] = output" +
        channel +
        " / " +
        this.ratioWeight +
        ";";
    }
    toCompile += "}\
  				else {\
  					this.lastWeight = weight;";
    for (let channel = 0; channel < this.channels; ++channel) {
      toCompile += "this.lastOutput[" + channel + "] = output" + channel + ";";
    }
    toCompile += 'this.tailExists = true;\
  					break;\
  				}\
  			} while (actualPosition < bufferLength && outputOffset < outLength);\
  			return this.bufferSlice(outputOffset);\
  		}\
  		else {\
  			return (this.noReturn) ? 0 : [];\
  		}\
  	}\
  	else {\
  		throw(new Error("Buffer was of incorrect sample length."));\
  	}';
    this.resampler = Function("buffer", toCompile);
  }

  bypassResampler(buffer) {
    if (this.noReturn) {
      this.outputBuffer = buffer;
      return buffer.length;
    } else {
      return buffer;
    }
  }
  bufferSlice(sliceAmount) {
    if (this.noReturn) {
      return sliceAmount;
    } else {
      try {
        return this.outputBuffer.subarray(0, sliceAmount);
      } catch (error) {
        try {
          this.outputBuffer.length = sliceAmount;
          return this.outputBuffer;
        } catch (error) {
          return this.outputBuffer.slice(0, sliceAmount);
        }
      }
    }
  }

  initializeBuffers() {
    try {
      this.outputBuffer = new Float32Array(this.outputBufferSize);
      this.lastOutput = new Float32Array(this.channels);
    } catch (error) {
      this.outputBuffer = [];
      this.lastOutput = [];
    }
  }
}
