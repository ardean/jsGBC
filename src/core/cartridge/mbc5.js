import MBC from "./mbc.js";

export default class MBC5 extends MBC {
  setCurrentROMBank() {
    // Read the cartridge ROM data from RAM memory:
    this.cartridge.gameboy.currentROMBank = this.cartridge.gameboy.ROMBank1Offset %
      this.cartridge.ROMBankEdge -
      1 <<
      14;
  }

  writeROMBankLow(address, data) {
    // MBC5 ROM bank switching:
    this.cartridge.gameboy.ROMBank1Offset = this.cartridge.gameboy.ROMBank1Offset &
      0x100 |
      data;
    this.setCurrentROMBank();
  }

  writeROMBankHigh(address, data) {
    // MBC5 ROM bank switching (by least significant bit):
    this.cartridge.gameboy.ROMBank1Offset = (data & 0x01) << 8 |
      this.cartridge.gameboy.ROMBank1Offset & 0xff;
    this.setCurrentROMBank();
  }

  writeRAMBank(address, data) {
    // MBC5 RAM bank switching
    this.cartridge.currentMBCRAMBank = data & 0xf;
    this.cartridge.currentMBCRAMBankPosition = (this.cartridge.currentMBCRAMBank <<
      13) -
      0xa000;
  }
}
