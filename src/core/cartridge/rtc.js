export default class RTC {
  constructor(mbc3) {
    this.mbc3 = mbc3;
  }

  // TODO: rename RTC vars

  writeSeconds(data) {
    if (data < 60) {
      this.RTCSeconds = data;
    } else {
      console.log(
        "(Bank #" +
          this.mbc3.cartridge.currentMBCRAMBank +
          ") RTC write out of range: " +
          data
      );
    }
  }

  writeMinutes(data) {
    if (data < 60) {
      this.RTCMinutes = data;
    } else {
      console.log(
        "(Bank #" +
          this.mbc3.cartridge.currentMBCRAMBank +
          ") RTC write out of range: " +
          data
      );
    }
  }

  writeDaysLow(data) {
    this.RTCDays = data & 0xff | this.RTCDays & 0x100;
  }

  writeDaysHigh(data) {
    this.mbc3.cartridge.RTCDayOverFlow = data > 0x7f;
    this.mbc3.cartridge.RTCHalt = (data & 0x40) === 0x40;
    this.mbc3.cartridge.RTCDays = (data & 0x1) << 8 | this.mbc3.cartridge.RTCDays & 0xff;
  }

  writeHours(data) {
    if (data < 24) {
      this.RTCHours = data;
    } else {
      console.log(
        "(Bank #" +
          this.mbc3.cartridge.currentMBCRAMBank +
          ") RTC write out of range: " +
          data
      );
    }
  }

  readSeconds() {
    return this.latchedSeconds;
  }

  readMinutes() {
    return this.latchedMinutes;
  }

  readHours() {
    return this.latchedHours;
  }

  readDaysLow() {
    return this.latchedLDays;
  }

  readDaysHigh() {
    return (this.RTCDayOverFlow ? 0x80 : 0) +
      (this.RTCHALT ? 0x40 : 0) +
      this.latchedHDays;
  }

  writeLatch(address, data) {
    if (data === 0) {
      this.RTCisLatched = false;
    } else if (!this.RTCisLatched) {
      // Copy over the current RTC time for reading.
      this.RTCisLatched = true;
      this.latchedSeconds = this.RTCSeconds | 0;
      this.latchedMinutes = this.RTCMinutes;
      this.latchedHours = this.RTCHours;
      this.latchedLDays = this.RTCDays & 0xff;
      this.latchedHDays = this.RTCDays >> 8;
    }
  }

  saveState() {
    // return the MBC RAM for backup...
    return [
      this.lastTime,
      this.RTCisLatched,
      this.latchedSeconds,
      this.latchedMinutes,
      this.latchedHours,
      this.latchedLDays,
      this.latchedHDays,
      this.RTCSeconds,
      this.RTCMinutes,
      this.RTCHours,
      this.RTCDays,
      this.RTCDayOverFlow,
      this.RTCHALT
    ];
  }

  loadState(data) {
    let index = 0;
    this.lastTime = data[index++];
    this.RTCisLatched = data[index++];
    this.latchedSeconds = data[index++];
    this.latchedMinutes = data[index++];
    this.latchedHours = data[index++];
    this.latchedLDays = data[index++];
    this.latchedHDays = data[index++];
    this.RTCSeconds = data[index++];
    this.RTCMinutes = data[index++];
    this.RTCHours = data[index++];
    this.RTCDays = data[index++];
    this.RTCDayOverFlow = data[index++];
    this.RTCHALT = data[index];
  }

  updateClock() {
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - this.lastTime;
    this.lastTime = currentTime;

    if (!this.RTCHALT) {
      //Update the MBC3 RTC:
      this.RTCSeconds += elapsedTime / 1000;
      while (this.RTCSeconds >= 60) {
        // System can stutter, so the seconds difference can get large, thus the "while".
        this.RTCSeconds -= 60;
        ++this.RTCMinutes;
        if (this.RTCMinutes >= 60) {
          this.RTCMinutes -= 60;
          ++this.RTCHours;
          if (this.RTCHours >= 24) {
            this.RTCHours -= 24;
            ++this.RTCDays;
            if (this.RTCDays >= 512) {
              this.RTCDays -= 512;
              this.RTCDayOverFlow = true;
            }
          }
        }
      }
    }
  }
}
