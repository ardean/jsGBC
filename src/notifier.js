import $ from "jquery";

class Notifier {
  constructor() {
    this.$element = $("<div />").css({
      display: "none",
      position: "absolute",
      top: "5px",
      right: "5px",
      fontSize: "25px",
      color: "red"
    });

    this.hide = this.hide.bind(this);
  }

  notify(message) {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(this.hide, 500);

    this.$element.text(message);
    this.$element.show();
  }

  hide() {
    this.timeout = null;
    this.$element.hide();
  }

  appendTo(element) {
    this.$element.appendTo(element);
  }
}

export default new Notifier();
