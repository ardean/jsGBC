import EventEmitter from "events";
import $ from "jquery";

export default class Fullscreen extends EventEmitter {
  constructor(element) {
    super();

    this.$element = $(element);
    this.element = this.$element.get(0);
    this.isOn = this.getFullscreenState();

    $(document).on("fullscreenchange mozfullscreenchange webkitfullscreenchange msfullscreenchange", this.fullscreenChange.bind(this));
  }

  getFullscreenState() {
    return this.getFullscreenElement() === this.element;
  }

  fullscreenChange() {
    this.isOn = this.getFullscreenState();
    this.emit("change", this.isOn);
  }

  requestFullscreen() {
    const element = this.element;

    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  }

  exitFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }

  getFullscreenElement() {
    return document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullscreenElement ||
      document.msFullscreenElement ||
      null;
  }
}
