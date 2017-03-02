import $ from "jquery";
import EventEmitter from "events";

export default class Fullscreen extends EventEmitter {
  constructor() {
    super();

    this.isActive = false;

    $(document).on("keydown", ({ keyCode }) => {
      if (this.isActive && keyCode === 27) this.cancel();
    });
  }

  toggle() {
    if (this.isActive) {
      this.cancel();
    } else {
      this.request();
    }
  }

  request() {
    this.isActive = true;
    this.emit("change", this.isActive);
  }

  cancel() {
    this.isActive = false;
    this.emit("change", this.isActive);
  }
}
