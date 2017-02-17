import MBC from "./mbc.js";

export default class MBC5 extends MBC {
  setCurrentROMBank() {
    // Read the cartridge ROM data from RAM memory:
    this.currentROMBank = this.ROMBank1Offset %
      this.ROMBankEdge -
      1 <<
      14;
  }

  writeROMBankLow(address, data) {
    // MBC5 ROM bank switching:
    this.ROMBank1Offset = this.ROMBank1Offset &
      0x100 |
      data;
    this.setCurrentROMBank();
  }

  writeROMBankHigh(address, data) {
    // MBC5 ROM bank switching (by least significant bit):
    this.ROMBank1Offset = (data & 0x01) << 8 |
      this.ROMBank1Offset & 0xff;
    this.setCurrentROMBank();
  }

  writeRAMBank(address, data) {
    // MBC5 RAM bank switching
    this.currentMBCRAMBank = data & 0xf;
    this.currentRAMBankPosition = (this.currentMBCRAMBank <<
      13) -
      0xa000;
  }
}
