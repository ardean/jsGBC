import EventEmitter from "events";

export default class MBC1 extends EventEmitter {
  constructor(cartridge) {
    super();

    this.cartridge = cartridge;
  }

  writeRAMBank(address, data) {
    // MBC1 RAM bank switching
    if (this.cartridge.MBC1Mode) {
      // 4/32 Mode
      this.cartridge.currentMBCRAMBank = data & 0x03;
      this.cartridge.currentMBCRAMBankPosition = (this.cartridge.currentMBCRAMBank <<
        13) -
        0xa000;
    } else {
      // 16/8 Mode
      this.cartridge.gameboy.ROMBank1Offset = (data & 0x03) << 5 |
        this.cartridge.gameboy.ROMBank1Offset & 0x1f;
      this.cartridge.gameboy.setCurrentMBC1ROMBank();
    }
  }

  setCurrentROMBank() {
    // Read the cartridge ROM data from RAM memory:
    switch (this.cartridge.gameboy.ROMBank1Offset) {
      case 0x00:
      case 0x20:
      case 0x40:
      case 0x60:
        //Bank calls for 0x00, 0x20, 0x40, and 0x60 are really for 0x01, 0x21, 0x41, and 0x61.
        this.cartridge.gameboy.currentROMBank = this.cartridge.gameboy.ROMBank1Offset %
          this.cartridge.ROMBankEdge <<
          14;
        break;
      default:
        this.cartridge.gameboy.currentROMBank = this.cartridge.gameboy.ROMBank1Offset %
          this.cartridge.ROMBankEdge -
          1 <<
          14;
    }
  }
}
