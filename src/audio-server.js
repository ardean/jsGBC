import Resampler from "./resampler";

export default class AudioServer {
  constructor(channels, sampleRate, minBufferSize, maxBufferSize, underRunCallback, volume) {
    ChannelsAllocated = Math.max(channels, 1);
    this.SampleRate = Math.abs(sampleRate);
    MinBufferSize = (minBufferSize >= (SamplesPerCallback * ChannelsAllocated) && minBufferSize < maxBufferSize) ? (minBufferSize & (-ChannelsAllocated)) : (SamplesPerCallback * ChannelsAllocated);
    MaxBufferSize = (Math.floor(maxBufferSize) > MinBufferSize + ChannelsAllocated) ? (maxBufferSize & (-ChannelsAllocated)) : (MinBufferSize * ChannelsAllocated);
    this.underRunCallback = (typeof underRunCallback === "function") ? underRunCallback : function () {};
    Volume = (volume >= 0 && volume <= 1) ? volume : 1;
    this.initializeAudio();
  }

  callbackBasedWriteAudioNoCallback(buffer) {
    var length = buffer.length;
    for (var bufferCounter = 0; bufferCounter < length && AudioBufferSize < MaxBufferSize;) {
      AudioContextSampleBuffer[AudioBufferSize++] = buffer[bufferCounter++];
    }
  }

  writeAudio(buffer) {
    this.callbackBasedWriteAudioNoCallback(buffer);
    this.callbackBasedExecuteCallback();
  }

  writeAudioNoCallback(buffer) {
    this.callbackBasedWriteAudioNoCallback(buffer);
  }

  remainingBuffer() {
    return (Math.floor((ResampledSamplesLeft() * ResampleControl.ratioWeight) / ChannelsAllocated) * ChannelsAllocated) + AudioBufferSize;
  }

  callbackBasedExecuteCallback() {
    var samplesRequested = MinBufferSize - this.remainingBuffer();
    if (samplesRequested > 0) {
      this.callbackBasedWriteAudioNoCallback(this.underRunCallback(samplesRequested));
    }
  }

  executeCallback() {
    this.callbackBasedExecuteCallback();
  }

  initializeAudio() {
    if (!WebAudioContextHandle) {
      try {
        WebAudioContextHandle = new AudioContext();
      } catch (error) {
        WebAudioContextHandle = new webkitAudioContext();
      }
    }

    if (!WebAudioAudioNode) {
      try {
        WebAudioAudioNode = WebAudioContextHandle.createScriptProcessor(SamplesPerCallback, 0, ChannelsAllocated);
      } catch (error) {
        WebAudioAudioNode = WebAudioContextHandle.createJavaScriptNode(SamplesPerCallback, 0, ChannelsAllocated);
      }

      WebAudioAudioNode.onaudioprocess = WebAudioEvent;
      WebAudioAudioNode.connect(WebAudioContextHandle.destination);
      this.resetCallbackAPIAudioBuffer(WebAudioContextHandle.sampleRate);
    }
  }

  changeVolume(newVolume) {
    if (newVolume >= 0 && newVolume <= 1) {
      Volume = newVolume;
    }
  }

  resetCallbackAPIAudioBuffer(APISampleRate) {
    AudioBufferSize = ResampleBufferEnd = ResampleBufferStart = 0;
    this.initializeResampler(APISampleRate);
    ResampledBuffer = this.getFloat32(ResampleBufferSize);
  }

  initializeResampler(sampleRate) {
    AudioContextSampleBuffer = this.getFloat32(MaxBufferSize);
    ResampleBufferSize = Math.max(MaxBufferSize * Math.ceil(sampleRate / this.SampleRate) + ChannelsAllocated, SamplesPerCallback * ChannelsAllocated);
    ResampleControl = new Resampler(this.SampleRate, sampleRate, ChannelsAllocated, ResampleBufferSize, true);
  }

  getFloat32(size) {
    try {
      return new Float32Array(size);
    } catch (error) {
      return [];
    }
  }
}

//Some Required Globals:
var WebAudioContextHandle = null;
var WebAudioAudioNode = null;
var AudioContextSampleBuffer = [];
var ResampledBuffer = [];
var MinBufferSize = 15000;
var MaxBufferSize = 25000;
var ChannelsAllocated = 1;
var Volume = 1;
var ResampleControl = null;
var AudioBufferSize = 0;
var ResampleBufferStart = 0;
var ResampleBufferEnd = 0;
var ResampleBufferSize = 0;
var SamplesPerCallback = 2048; //Has to be between 2048 and 4096 (If over, then samples are ignored, if under then silence is added).

function WebAudioEvent(event) {
  for (var bufferCount = 0, buffers = []; bufferCount < ChannelsAllocated; ++bufferCount) {
    buffers[bufferCount] = event.outputBuffer.getChannelData(bufferCount);
  }

  ResampleRefill();

  for (var index = 0; index < SamplesPerCallback && ResampleBufferStart !== ResampleBufferEnd; ++index) {
    for (bufferCount = 0; bufferCount < ChannelsAllocated; ++bufferCount) {
      buffers[bufferCount][index] = ResampledBuffer[ResampleBufferStart++] * Volume;
    }
    if (ResampleBufferStart === ResampleBufferSize) {
      ResampleBufferStart = 0;
    }
  }

  while (index < SamplesPerCallback) {
    for (bufferCount = 0; bufferCount < ChannelsAllocated; ++bufferCount) {
      buffers[bufferCount][index] = 0;
    }
    ++index;
  }
}

function ResampleRefill() {
  if (AudioBufferSize > 0) {
    var resampleLength = ResampleControl.resampler(GetBufferSamples());
    var resampledResult = ResampleControl.outputBuffer;
    for (var index2 = 0; index2 < resampleLength;) {
      ResampledBuffer[ResampleBufferEnd++] = resampledResult[index2++];
      if (ResampleBufferEnd === ResampleBufferSize) {
        ResampleBufferEnd = 0;
      }
      if (ResampleBufferStart === ResampleBufferEnd) {
        ResampleBufferStart += ChannelsAllocated;
        if (ResampleBufferStart === ResampleBufferSize) {
          ResampleBufferStart = 0;
        }
      }
    }
    AudioBufferSize = 0;
  }
}

function ResampledSamplesLeft() {
  return ((ResampleBufferStart <= ResampleBufferEnd) ? 0 : ResampleBufferSize) + ResampleBufferEnd - ResampleBufferStart;
}

function GetBufferSamples() {
  return AudioContextSampleBuffer.subarray(0, AudioBufferSize);
}
