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
    this.offscreenRGBCount = this.offscreenWidth * this.offscreenHeight * 4;

    this.resizePathClear = true;

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

    this.canvasBuffer = this.offscreenContext.createImageData(this.offscreenWidth, this.offscreenHeight);

    let index = this.offscreenRGBCount;
    while (index > 0) {
      index -= 4;
      this.canvasBuffer.data[index] = 0xF8;
      this.canvasBuffer.data[index + 1] = 0xF8;
      this.canvasBuffer.data[index + 2] = 0xF8;
      this.canvasBuffer.data[index + 3] = 0xFF;
    }

    this.graphicsBlit();
    if (!this.swizzledFrame) this.swizzledFrame = util.getTypedArray(69120, 0xFF, "uint8");

    //Test the draw system and browser vblank latching:
    this.drewFrame = true; //Copy the latest graphics to buffer.
    this.requestDraw();
  }

  recomputeDimension() {
    //Cache some dimension info:
    this.onscreenWidth = this.width;
    this.onscreenHeight = this.height;
    this.offscreenWidth = 160;
    this.offscreenHeight = 144;
    this.offscreenRGBCount = this.offscreenWidth * this.offscreenHeight * 4;
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
    if (this.offscreenRGBCount > 0) {
      //We actually updated the graphics internally, so copy out:
      if (this.offscreenRGBCount === 92160) {
        this.processDraw(this.swizzledFrame);
      } else {
        // this.resizeFrameBuffer();
      }
    }
  }

  resizeFrameBuffer() {
    //Resize in javascript with resize.js:
    if (this.resizePathClear) {
      this.resizePathClear = false;
      this.resizer.resize(this.swizzledFrame);
    }
  }

  processDraw(frameBuffer) {
    var canvasRGBALength = this.offscreenRGBCount;
    var canvasData = this.canvasBuffer.data;
    var bufferIndex = 0;
    for (var canvasIndex = 0; canvasIndex < canvasRGBALength; ++canvasIndex) {
      canvasData[canvasIndex++] = frameBuffer[bufferIndex++];
      canvasData[canvasIndex++] = frameBuffer[bufferIndex++];
      canvasData[canvasIndex++] = frameBuffer[bufferIndex++];
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
    var frameBuffer = this.gameboy.frameBuffer;
    var swizzledFrame = this.swizzledFrame;
    var bufferIndex = 0;
    for (var canvasIndex = 0; canvasIndex < 69120;) {
      swizzledFrame[canvasIndex++] = (frameBuffer[bufferIndex] >> 16) & 0xFF; //Red
      swizzledFrame[canvasIndex++] = (frameBuffer[bufferIndex] >> 8) & 0xFF; //Green
      swizzledFrame[canvasIndex++] = frameBuffer[bufferIndex++] & 0xFF; //Blue
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
    var bufferIndex = 0;
    var frameBuffer = this.swizzledFrame;
    if (this.cartridgeSlot.cartridge.cGBC || this.colorizedGBPalettes) {
      while (bufferIndex < 69120) {
        frameBuffer[bufferIndex++] = 248;
      }
    } else {
      while (bufferIndex < 69120) {
        frameBuffer[bufferIndex++] = 239;
        frameBuffer[bufferIndex++] = 255;
        frameBuffer[bufferIndex++] = 222;
      }
    }
  }
}
