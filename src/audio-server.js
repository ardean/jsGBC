import Resampler from "./resampler";

export default class AudioServer {
  constructor(channels, sampleRate, minBufferSize, maxBufferSize, volume) {
    this.samplesPerCallback = 2048; // Has to be between 2048 and 4096 (If over, then samples are ignored, if under then silence is added).
    this.channelsAllocated = Math.max(channels, 1);
    this.sampleRate = Math.abs(sampleRate);
    this.bufferSize = this.samplesPerCallback * this.channelsAllocated;
    this.minBufferSize = minBufferSize >= this.bufferSize && minBufferSize < maxBufferSize ? (minBufferSize & (-this.channelsAllocated)) : this.bufferSize;
    this.maxBufferSize = (Math.floor(maxBufferSize) > this.minBufferSize + this.channelsAllocated) ? (maxBufferSize & (-this.channelsAllocated)) : (this.minBufferSize * this.channelsAllocated);
    this.setVolume(volume);
    this.initializeAudio();
  }

  writeAudio(buffer) {
    for (let bufferCounter = 0; bufferCounter < buffer.length && this.audioBufferSize < this.maxBufferSize;) {
      this.audioContextSampleBuffer[this.audioBufferSize++] = buffer[bufferCounter++];
    }
  }

  remainingBuffer() {
    return (
      Math.floor(
        (
          this.resampledSamplesLeft() * this.resampleControl.ratioWeight
        ) / this.channelsAllocated
      ) * this.channelsAllocated
    ) + this.audioBufferSize;
  }

  initializeAudio() {
    this.audioContext = this.audioContext ||  new AudioContext();

    if (!this.audioNode) {
      this.audioNode = this.audioContext.createScriptProcessor(this.samplesPerCallback, 0, this.channelsAllocated);

      this.audioNode.addEventListener("audioprocess", this.processAudio.bind(this));
      this.audioNode.connect(this.audioContext.destination);
      this.resetCallbackAPIAudioBuffer(this.audioContext.sampleRate);
    }
  }

  processAudio(e) {
    const buffers = [];
    let bufferCount = 0;

    for (; bufferCount < this.channelsAllocated; ++bufferCount) {
      buffers[bufferCount] = e.outputBuffer.getChannelData(bufferCount);
    }

    this.refillResampledBuffer();

    let index = 0;
    for (; index < this.samplesPerCallback && this.resampleBufferStart !== this.resampleBufferEnd; ++index) {
      for (bufferCount = 0; bufferCount < this.channelsAllocated; ++bufferCount) {
        buffers[bufferCount][index] = this.resampledBuffer[this.resampleBufferStart++] * this.volume;
      }
      if (this.resampleBufferStart === this.resampleBufferSize) {
        this.resampleBufferStart = 0;
      }
    }

    while (index < this.samplesPerCallback) {
      for (bufferCount = 0; bufferCount < this.channelsAllocated; ++bufferCount) {
        buffers[bufferCount][index] = 0;
      }
      ++index;
    }
  }

  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
  }

  resetCallbackAPIAudioBuffer(sampleRate) {
    this.audioBufferSize = this.resampleBufferEnd = this.resampleBufferStart = 0;
    this.initializeResampler(sampleRate);
    this.resampledBuffer = new Float32Array(this.resampleBufferSize);
  }

  refillResampledBuffer() {
    if (this.audioBufferSize > 0) {
      const resampleLength = this.resampleControl.resampler(this.getBufferSamples());
      const resampledResult = this.resampleControl.outputBuffer;

      for (let i = 0; i < resampleLength;) {
        this.resampledBuffer[this.resampleBufferEnd++] = resampledResult[i++];

        if (this.resampleBufferEnd === this.resampleBufferSize) {
          this.resampleBufferEnd = 0;
        }

        if (this.resampleBufferStart === this.resampleBufferEnd) {
          this.resampleBufferStart += this.channelsAllocated;

          if (this.resampleBufferStart === this.resampleBufferSize) {
            this.resampleBufferStart = 0;
          }
        }
      }
      this.audioBufferSize = 0;
    }
  }

  initializeResampler(sampleRate) {
    this.audioContextSampleBuffer = new Float32Array(this.maxBufferSize);
    this.resampleBufferSize = Math.max(
      this.maxBufferSize * Math.ceil(sampleRate / this.sampleRate) + this.channelsAllocated,
      this.bufferSize
    );

    this.resampleControl = new Resampler(
      this.sampleRate,
      sampleRate,
      this.channelsAllocated,
      this.resampleBufferSize,
      true
    );
  }

  resampledSamplesLeft() {
    return (
      this.resampleBufferStart <= this.resampleBufferEnd ? 0 : this.resampleBufferSize
    ) + this.resampleBufferEnd - this.resampleBufferStart;
  }

  getBufferSamples() {
    return this.audioContextSampleBuffer.subarray(0, this.audioBufferSize);
  }
}
