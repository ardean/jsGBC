import util from "./util";

export default class LCD {
  constructor(canvas, options, gameboy) {
    options = options || {};

    this.canvas = canvas;
    this.gameboy = gameboy;

    this.width = options.width || 160;
    this.height = options.height || 144;

    this.drawContext = null; // LCD Context
    this.swizzledFrame = null; //The secondary gfx buffer that holds the converted RGBA values.
    this.canvasBuffer = null; //imageData handle
    this.onscreenWidth = this.width;
    this.onscreenHeight = this.height;
    this.offscreenWidth = 160;
    this.offscreenHeight = 144;
    this.offscreenRGBCount = this.offscreenWidth * this.offscreenHeight * 3;
    this.offscreenRGBACount = this.offscreenWidth * this.offscreenHeight * 4;

    this.resizePathClear = true;

    this.canvas.height = this.height;
    this.canvas.width = this.width;
    this.onscreenContext = this.canvas.getContext("2d");

    this.offscreenCanvas = document.createElement("canvas");
    this.offscreenContext = this.offscreenCanvas.getContext("2d");
  }

  init() {
    this.recomputeDimension();

    this.offscreenCanvas.width = this.offscreenWidth;
    this.offscreenCanvas.height = this.offscreenHeight;

    this.offscreenContext.msImageSmoothingEnabled = false;
    this.offscreenContext.mozImageSmoothingEnabled = false;
    this.offscreenContext.webkitImageSmoothingEnabled = false;
    this.offscreenContext.imageSmoothingEnabled = false;

    this.onscreenContext.msImageSmoothingEnabled = false;
    this.onscreenContext.mozImageSmoothingEnabled = false;
    this.onscreenContext.webkitImageSmoothingEnabled = false;
    this.onscreenContext.imageSmoothingEnabled = false;

    this.canvasBuffer = this.offscreenContext.createImageData(
      this.offscreenWidth,
      this.offscreenHeight
    );

    let index = this.offscreenRGBACount;
    while (index > 0) {
      index -= 4;
      this.canvasBuffer.data[index] = 0xf8;
      this.canvasBuffer.data[index + 1] = 0xf8;
      this.canvasBuffer.data[index + 2] = 0xf8;
      this.canvasBuffer.data[index + 3] = 0xff; // opacity
    }

    this.graphicsBlit();
    if (!this.swizzledFrame)
      this.swizzledFrame = util.getTypedArray(
        this.offscreenRGBCount,
        0xff,
        "uint8"
      );

    //Test the draw system and browser vblank latching:
    this.drewFrame = true; //Copy the latest graphics to buffer.
    this.requestDraw();
  }

  recomputeDimension() {
    // Cache some dimension info:
    this.onscreenWidth = this.width;
    this.onscreenHeight = this.height;
    this.offscreenWidth = 160;
    this.offscreenHeight = 144;
    this.offscreenRGBACount = this.offscreenWidth * this.offscreenHeight * 4;
  }

  graphicsBlit() {
    if (
      this.offscreenWidth === this.onscreenWidth &&
        this.offscreenHeight === this.onscreenHeight
    ) {
      this.onscreenContext.putImageData(this.canvasBuffer, 0, 0);
    } else {
      this.offscreenContext.putImageData(this.canvasBuffer, 0, 0);
      this.onscreenContext.drawImage(
        this.offscreenCanvas,
        0,
        0,
        this.onscreenWidth,
        this.onscreenHeight
      );
    }
  }

  requestDraw() {
    if (this.drewFrame) {
      this.dispatchDraw();
    }
  }

  dispatchDraw() {
    if (this.offscreenRGBACount > 0) {
      //We actually updated the graphics internally, so copy out:
      if (this.offscreenRGBACount === 92160) {
        this.processDraw(this.swizzledFrame);
      } else {
        // this.resizeFrameBuffer();
      }
    }
  }

  resizeFrameBuffer() {
    // Resize in javascript with resize.js:
    if (this.resizePathClear) {
      this.resizePathClear = false;
      this.resizer.resize(this.swizzledFrame);
    }
  }

  processDraw(frameBuffer) {
    const canvasData = this.canvasBuffer.data;
    let bufferIndex = 0;
    let canvasIndex = 0;

    while (canvasIndex < this.offscreenRGBACount) {
      canvasData[canvasIndex++] = frameBuffer[bufferIndex++];
      canvasData[canvasIndex++] = frameBuffer[bufferIndex++];
      canvasData[canvasIndex++] = frameBuffer[bufferIndex++];
      ++canvasIndex;
    }

    this.graphicsBlit();
    this.drewFrame = false;
  }

  prepareFrame() {
    //Copy the internal frame buffer to the output buffer:
    this.swizzleFrameBuffer();
    this.drewFrame = true;
  }

  swizzleFrameBuffer() {
    //Convert our dirty 24-bit (24-bit, with internal render flags above it) framebuffer to an 8-bit buffer with separate indices for the RGB channels:
    const frameBuffer = this.gameboy.frameBuffer;
    const swizzledFrame = this.swizzledFrame;
    let bufferIndex = 0;
    let canvasIndex = 0;
    while (canvasIndex < this.offscreenRGBCount) {
      swizzledFrame[canvasIndex++] = frameBuffer[bufferIndex] >> 16 & 0xff; // red
      swizzledFrame[canvasIndex++] = frameBuffer[bufferIndex] >> 8 & 0xff; // green
      swizzledFrame[canvasIndex++] = frameBuffer[bufferIndex] & 0xff; // blue
      ++bufferIndex;
    }
  }

  DisplayShowOff() {
    if (this.drewBlank === 0) {
      //Output a blank screen to the output framebuffer:
      this.clearFrameBuffer();
      this.drewFrame = true;
    }
    this.drewBlank = 2;
  }

  clearFrameBuffer() {
    const frameBuffer = this.swizzledFrame;
    let bufferIndex = 0;
    if (this.cartridgeSlot.cartridge.useGBCMode || this.colorizedGBPalettes) {
      while (bufferIndex < this.offscreenRGBCount) {
        frameBuffer[bufferIndex++] = 248;
      }
    } else {
      while (bufferIndex < this.offscreenRGBCount) {
        frameBuffer[bufferIndex++] = 239;
        frameBuffer[bufferIndex++] = 255;
        frameBuffer[bufferIndex++] = 222;
      }
    }
  }
}
