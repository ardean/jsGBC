import MBC from "./mbc.js";

export default class MBC2 extends MBC {
  writeROMBank(address, data) {
    // MBC2 ROM bank switching:
    this.ROMBank1Offset = data & 0x0f;
    this.setCurrentROMBank();
  }
}
