import MBC from "./mbc.js";

export default class MBC1 extends MBC {
  writeType(address, data) {
    // MBC1 mode setting:
    this.cartridge.MBC1Mode = (data & 0x1) === 0x1;
    if (this.cartridge.MBC1Mode) {
      this.ROMBank1Offset &= 0x1f;
      this.setCurrentROMBank();
    } else {
      this.currentMBCRAMBank = 0;
      this.currentRAMBankPosition = -0xa000;
    }
  }

  writeROMBank(address, data) {
    // MBC1 ROM bank switching:
    this.ROMBank1Offset = this.ROMBank1Offset &
      0x60 |
      data & 0x1f;
    this.setCurrentROMBank();
  }

  writeRAMBank(address, data) {
    // MBC1 RAM bank switching
    if (this.cartridge.MBC1Mode) {
      // 4/32 Mode
      this.currentMBCRAMBank = data & 0x03;
      this.currentRAMBankPosition = (this.currentMBCRAMBank <<
        13) -
        0xa000;
    } else {
      // 16/8 Mode
      this.ROMBank1Offset = (data & 0x03) << 5 |
        this.ROMBank1Offset & 0x1f;
      this.setCurrentROMBank();
    }
  }

  setCurrentROMBank() {
    // Read the cartridge ROM data from RAM memory:
    switch (this.ROMBank1Offset) {
      case 0x00:
      case 0x20:
      case 0x40:
      case 0x60:
        // Bank calls for 0x00, 0x20, 0x40, and 0x60 are really for 0x01, 0x21, 0x41, and 0x61.
        this.currentROMBank = this.ROMBank1Offset %
          this.ROMBankEdge <<
          14;
        break;
      default:
        this.currentROMBank = this.ROMBank1Offset %
          this.ROMBankEdge -
          1 <<
          14;
    }
  }
}
