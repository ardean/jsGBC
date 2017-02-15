import EventEmitter from "events";
import settings from "../../settings.js";
import RTC from "./rtc.js";

// TODO: remove gameboy

export default class MBC3 extends EventEmitter {
  constructor(cartridge) {
    super();

    this.rtc = new RTC(this, cartridge);
    this.cartridge = cartridge;
  }

  writeROMBank(address, data) {
    // MBC3 ROM bank switching:
    this.cartridge.gameboy.ROMBank1Offset = data & 0x7f;
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
          this.rtc && this.rtc.writeSeconds(data);
          break;
        case 0x09:
          this.rtc && this.rtc.writeMinutes(data);
          break;
        case 0x0a:
          this.rtc && this.rtc.writeHours(data);
          break;
        case 0x0b:
          this.rtc && this.rtc.writeDaysLow(data);
          break;
        case 0x0c:
          this.rtc && this.rtc.writeDaysHigh(data);
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
    // Switchable RAM
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
          return this.rtc && this.rtc.readSeconds();
          break;
        case 0x09:
          return this.rtc && this.rtc.readMinutes();
          break;
        case 0x0a:
          return this.rtc && this.rtc.readHours();
          break;
        case 0x0b:
          return this.rtc && this.rtc.readDaysLow();
          break;
        case 0x0c:
          return this.rtc && this.rtc.readDaysHigh();
      }
    }
    //console.log("Reading from invalid or disabled RAM.");
    return 0xff;
  }
}
