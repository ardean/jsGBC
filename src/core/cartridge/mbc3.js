import EventEmitter from "events";
import settings from "../../settings.js";

// TODO: remove gameboy

export default class MBC3 extends EventEmitter {
  constructor(cartridge) {
    super();

    this.cartridge = cartridge;
  }

  writeRTCLatch(address, data) {
    if (data === 0) {
      this.cartridge.RTCisLatched = false;
    } else if (!this.cartridge.RTCisLatched) {
      // Copy over the current RTC time for reading.
      this.cartridge.RTCisLatched = true;
      this.cartridge.latchedSeconds = this.cartridge.RTCSeconds | 0;
      this.cartridge.latchedMinutes = this.cartridge.RTCMinutes;
      this.cartridge.latchedHours = this.cartridge.RTCHours;
      this.cartridge.latchedLDays = this.cartridge.RTCDays & 0xff;
      this.cartridge.latchedHDays = this.cartridge.RTCDays >> 8;
    }
  }

  writeROMBank(address, data) {
    // MBC3 ROM bank switching:
    this.cartridge.gameboy.ROMBank1offs = data & 0x7f;
    this.cartridge.gameboy.setCurrentMBC2AND3ROMBank();
  }

  writeRAMBank(address, data) {
    this.cartridge.currentMBCRAMBank = data;
    if (data < 4) {
      // MBC3 RAM bank switching
      this.cartridge.currentMBCRAMBankPosition = (this.cartridge.currentMBCRAMBank <<
        13) -
        0xa000;
    }
  }

  write(address, data) {
    if (this.cartridge.MBCRAMBanksEnabled || settings.alwaysAllowRWtoBanks) {
      switch (this.cartridge.currentMBCRAMBank) {
        case 0x00:
        case 0x01:
        case 0x02:
        case 0x03:
          this.emit("write");
          this.cartridge.MBCRam[
            address + this.cartridge.currentMBCRAMBankPosition
          ] = data;
          break;
        case 0x08:
          if (data < 60) {
            this.cartridge.RTCSeconds = data;
          } else {
            console.log(
              "(Bank #" +
                this.cartridge.currentMBCRAMBank +
                ") RTC write out of range: " +
                data
            );
          }
          break;
        case 0x09:
          if (data < 60) {
            this.cartridge.RTCMinutes = data;
          } else {
            console.log(
              "(Bank #" +
                this.cartridge.currentMBCRAMBank +
                ") RTC write out of range: " +
                data
            );
          }
          break;
        case 0x0a:
          if (data < 24) {
            this.cartridge.RTCHours = data;
          } else {
            console.log(
              "(Bank #" +
                this.cartridge.currentMBCRAMBank +
                ") RTC write out of range: " +
                data
            );
          }
          break;
        case 0x0b:
          this.cartridge.RTCDays = data & 0xff | this.cartridge.RTCDays & 0x100;
          break;
        case 0x0c:
          this.cartridge.RTCDayOverFlow = data > 0x7f;
          this.cartridge.RTCHalt = (data & 0x40) === 0x40;
          this.cartridge.RTCDays = (data & 0x1) << 8 |
            this.cartridge.RTCDays & 0xff;
          break;
        default:
          console.log(
            "Invalid MBC3 bank address selected: " +
              this.cartridge.currentMBCRAMBank
          );
      }
    }
  }

  read(address) {
    //Switchable RAM
    if (this.cartridge.MBCRAMBanksEnabled || settings.alwaysAllowRWtoBanks) {
      switch (this.cartridge.currentMBCRAMBank) {
        case 0x00:
        case 0x01:
        case 0x02:
        case 0x03:
          return this.cartridge.MBCRam[
            address + this.cartridge.currentMBCRAMBankPosition
          ];
          break;
        case 0x08:
          return this.cartridge.latchedSeconds;
          break;
        case 0x09:
          return this.cartridge.latchedMinutes;
          break;
        case 0x0a:
          return this.cartridge.latchedHours;
          break;
        case 0x0b:
          return this.cartridge.latchedLDays;
          break;
        case 0x0c:
          return (this.cartridge.RTCDayOverFlow ? 0x80 : 0) +
            (this.cartridge.RTCHALT ? 0x40 : 0) +
            this.cartridge.latchedHDays;
      }
    }
    //console.log("Reading from invalid or disabled RAM.");
    return 0xff;
  }
}
