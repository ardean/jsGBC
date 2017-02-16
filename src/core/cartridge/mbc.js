import EventEmitter from "events";

export default class MBC extends EventEmitter {
  constructor(cartridge) {
    super();
    this.cartridge = cartridge;
  }

  // TODO: for MBC2 & MBC3, compare with other MBCx
  setCurrentROMBank() {
    //Read the cartridge ROM data from RAM memory:
    //Only map bank 0 to bank 1 here (MBC2 is like MBC1, but can only do 16 banks, so only the bank 0 quirk appears for MBC2):
    this.cartridge.gameboy.currentROMBank = Math.max(
      this.cartridge.gameboy.ROMBank1Offset % this.cartridge.ROMBankEdge - 1,
      0
    ) << 14;
  }

  writeEnable(address, data) {
    // MBC RAM Bank Enable/Disable:
    this.cartridge.MBCRAMBanksEnabled = (data & 0x0f) === 0x0a; //If lower nibble is 0x0A, then enable, otherwise disable.
  }
}
