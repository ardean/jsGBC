export default class ROM {
  constructor(data) {
    this.data = data;
    this.dataType = typeof data;
  }

  getByte(index) {
    if (this.dataType === "string") {
      return this.data.charCodeAt(index);
    } else {
      return this.data[index];
    }
  }

  getChar(index) {
    if (this.dataType === "string") {
      return this.data[index] || "";
    } else {
      return String.fromCharCode(this.data[index]);
    }
  }

  getString(from, to) {
    let text = "";
    for (let index = from; index <= to; index++) {
      if (this.getByte(index) > 0) {
        text += this.getChar(index);
      }
    }

    return text;
  }

  get length() {
    return this.data.length;
  }
}
