import Resampler from "./resampler";

function XAudioServer(channels, sampleRate, minBufferSize, maxBufferSize, underRunCallback, volume, failureCallback) {
  XAudioJSChannelsAllocated = Math.max(channels, 1);
  this.XAudioJSSampleRate = Math.abs(sampleRate);
  XAudioJSMinBufferSize = (minBufferSize >= (XAudioJSSamplesPerCallback * XAudioJSChannelsAllocated) && minBufferSize < maxBufferSize) ? (minBufferSize & (-XAudioJSChannelsAllocated)) : (XAudioJSSamplesPerCallback * XAudioJSChannelsAllocated);
  XAudioJSMaxBufferSize = (Math.floor(maxBufferSize) > XAudioJSMinBufferSize + XAudioJSChannelsAllocated) ? (maxBufferSize & (-XAudioJSChannelsAllocated)) : (XAudioJSMinBufferSize * XAudioJSChannelsAllocated);
  this.underRunCallback = (typeof underRunCallback === "function") ? underRunCallback : function () {};
  XAudioJSVolume = (volume >= 0 && volume <= 1) ? volume : 1;
  this.failureCallback = (typeof failureCallback === "function") ? failureCallback : function () {
    throw (new Error("XAudioJS has encountered a fatal error."));
  };
  this.initializeAudio();
}
XAudioServer.prototype.callbackBasedWriteAudioNoCallback = function (buffer) {
    //Callback-centered audio APIs:
    var length = buffer.length;
    for (var bufferCounter = 0; bufferCounter < length && XAudioJSAudioBufferSize < XAudioJSMaxBufferSize;) {
      XAudioJSAudioContextSampleBuffer[XAudioJSAudioBufferSize++] = buffer[bufferCounter++];
    }
  }
  /*Pass your samples into here!
  Pack your samples as a one-dimenional array
  With the channel samples packed uniformly.
  examples:
      mono - [left, left, left, left]
      stereo - [left, right, left, right, left, right, left, right]
  */
XAudioServer.prototype.writeAudio = function (buffer) {
    this.callbackBasedWriteAudioNoCallback(buffer);
    this.callbackBasedExecuteCallback();
  }
  /*Pass your samples into here if you don't want automatic callback calling:
  Pack your samples as a one-dimenional array
  With the channel samples packed uniformly.
  examples:
      mono - [left, left, left, left]
      stereo - [left, right, left, right, left, right, left, right]
  Useful in preventing infinite recursion issues with calling writeAudio inside your callback.
  */
XAudioServer.prototype.writeAudioNoCallback = function (buffer) {
    this.callbackBasedWriteAudioNoCallback(buffer);
  }
  //Developer can use this to see how many samples to write (example: minimum buffer allotment minus remaining samples left returned from this function to make sure maximum buffering is done...)
  //If null is returned, then that means metric could not be done.
XAudioServer.prototype.remainingBuffer = function () {
  return (Math.floor((XAudioJSResampledSamplesLeft() * XAudioJSResampleControl.ratioWeight) / XAudioJSChannelsAllocated) * XAudioJSChannelsAllocated) + XAudioJSAudioBufferSize;
}
XAudioServer.prototype.callbackBasedExecuteCallback = function () {
    // WebKit Audio:
    var samplesRequested = XAudioJSMinBufferSize - this.remainingBuffer();
    if (samplesRequested > 0) {
      this.callbackBasedWriteAudioNoCallback(this.underRunCallback(samplesRequested));
    }
  }
  //If you just want your callback called for any possible refill (Execution of callback is still conditional):
XAudioServer.prototype.executeCallback = function () {
  this.callbackBasedExecuteCallback();
}

XAudioServer.prototype.initializeAudio = function () {
  if (!XAudioJSWebAudioLaunchedContext) {
    try {
      XAudioJSWebAudioContextHandle = new AudioContext(); //Create a system audio context.
    } catch (error) {
      XAudioJSWebAudioContextHandle = new webkitAudioContext(); //Create a system audio context.
    }
    XAudioJSWebAudioLaunchedContext = true;
  }
  if (XAudioJSWebAudioAudioNode) {
    XAudioJSWebAudioAudioNode.disconnect();
    XAudioJSWebAudioAudioNode.onaudioprocess = null;
    XAudioJSWebAudioAudioNode = null;
  }
  try {
    XAudioJSWebAudioAudioNode = XAudioJSWebAudioContextHandle.createScriptProcessor(XAudioJSSamplesPerCallback, 0, XAudioJSChannelsAllocated); //Create the js event node.
  } catch (error) {
    XAudioJSWebAudioAudioNode = XAudioJSWebAudioContextHandle.createJavaScriptNode(XAudioJSSamplesPerCallback, 0, XAudioJSChannelsAllocated); //Create the js event node.
  }

  XAudioJSWebAudioAudioNode.onaudioprocess = XAudioJSWebAudioEvent; //Connect the audio processing event to a handling function so we can manipulate output
  XAudioJSWebAudioAudioNode.connect(XAudioJSWebAudioContextHandle.destination); //Send and chain the output of the audio manipulation to the system audio output.
  this.resetCallbackAPIAudioBuffer(XAudioJSWebAudioContextHandle.sampleRate);
}
XAudioServer.prototype.changeVolume = function (newVolume) {
    if (newVolume >= 0 && newVolume <= 1) {
      XAudioJSVolume = newVolume;
    }
  }
  //Set up the resampling:
XAudioServer.prototype.resetCallbackAPIAudioBuffer = function (APISampleRate) {
  XAudioJSAudioBufferSize = XAudioJSResampleBufferEnd = XAudioJSResampleBufferStart = 0;
  this.initializeResampler(APISampleRate);
  XAudioJSResampledBuffer = this.getFloat32(XAudioJSResampleBufferSize);
}
XAudioServer.prototype.initializeResampler = function (sampleRate) {
  XAudioJSAudioContextSampleBuffer = this.getFloat32(XAudioJSMaxBufferSize);
  XAudioJSResampleBufferSize = Math.max(XAudioJSMaxBufferSize * Math.ceil(sampleRate / this.XAudioJSSampleRate) + XAudioJSChannelsAllocated, XAudioJSSamplesPerCallback * XAudioJSChannelsAllocated);
  XAudioJSResampleControl = new Resampler(this.XAudioJSSampleRate, sampleRate, XAudioJSChannelsAllocated, XAudioJSResampleBufferSize, true);
}
XAudioServer.prototype.getFloat32 = function (size) {
  try {
    return new Float32Array(size);
  } catch (error) {
    return [];
  }
}

//Some Required Globals:
var XAudioJSWebAudioContextHandle = null;
var XAudioJSWebAudioAudioNode = null;
var XAudioJSWebAudioLaunchedContext = false;
var XAudioJSAudioContextSampleBuffer = [];
var XAudioJSResampledBuffer = [];
var XAudioJSMinBufferSize = 15000;
var XAudioJSMaxBufferSize = 25000;
var XAudioJSChannelsAllocated = 1;
var XAudioJSVolume = 1;
var XAudioJSResampleControl = null;
var XAudioJSAudioBufferSize = 0;
var XAudioJSResampleBufferStart = 0;
var XAudioJSResampleBufferEnd = 0;
var XAudioJSResampleBufferSize = 0;
var XAudioJSSamplesPerCallback = 2048; //Has to be between 2048 and 4096 (If over, then samples are ignored, if under then silence is added).

function XAudioJSWebAudioEvent(event) { //Web Audio API callback...
  //Find all output channels:
  for (var bufferCount = 0, buffers = []; bufferCount < XAudioJSChannelsAllocated; ++bufferCount) {
    buffers[bufferCount] = event.outputBuffer.getChannelData(bufferCount);
  }
  //Make sure we have resampled samples ready:
  XAudioJSResampleRefill();
  //Copy samples from XAudioJS to the Web Audio API:
  for (var index = 0; index < XAudioJSSamplesPerCallback && XAudioJSResampleBufferStart !== XAudioJSResampleBufferEnd; ++index) {
    for (bufferCount = 0; bufferCount < XAudioJSChannelsAllocated; ++bufferCount) {
      buffers[bufferCount][index] = XAudioJSResampledBuffer[XAudioJSResampleBufferStart++] * XAudioJSVolume;
    }
    if (XAudioJSResampleBufferStart === XAudioJSResampleBufferSize) {
      XAudioJSResampleBufferStart = 0;
    }
  }
  //Pad with silence if we're underrunning:
  while (index < XAudioJSSamplesPerCallback) {
    for (bufferCount = 0; bufferCount < XAudioJSChannelsAllocated; ++bufferCount) {
      buffers[bufferCount][index] = 0;
    }
    ++index;
  }
}

function XAudioJSResampleRefill() {
  if (XAudioJSAudioBufferSize > 0) {
    //Resample a chunk of audio:
    var resampleLength = XAudioJSResampleControl.resampler(XAudioJSGetBufferSamples());
    var resampledResult = XAudioJSResampleControl.outputBuffer;
    for (var index2 = 0; index2 < resampleLength;) {
      XAudioJSResampledBuffer[XAudioJSResampleBufferEnd++] = resampledResult[index2++];
      if (XAudioJSResampleBufferEnd === XAudioJSResampleBufferSize) {
        XAudioJSResampleBufferEnd = 0;
      }
      if (XAudioJSResampleBufferStart === XAudioJSResampleBufferEnd) {
        XAudioJSResampleBufferStart += XAudioJSChannelsAllocated;
        if (XAudioJSResampleBufferStart === XAudioJSResampleBufferSize) {
          XAudioJSResampleBufferStart = 0;
        }
      }
    }
    XAudioJSAudioBufferSize = 0;
  }
}

function XAudioJSResampledSamplesLeft() {
  return ((XAudioJSResampleBufferStart <= XAudioJSResampleBufferEnd) ? 0 : XAudioJSResampleBufferSize) + XAudioJSResampleBufferEnd - XAudioJSResampleBufferStart;
}

function XAudioJSGetBufferSamples() {
  return XAudioJSAudioContextSampleBuffer.subarray(0, XAudioJSAudioBufferSize);
}

export default XAudioServer;
