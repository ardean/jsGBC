import EventEmitter from "events";
import settings from "../../settings.js";

export default class MBC extends EventEmitter {
  constructor(cartridge) {
    super();
    this.cartridge = cartridge;
    this.MBCRAMBanksEnabled = false; // MBC RAM Access Control.
    this.currentRAMBankPosition = -0xa000; // MBC Position Adder;
    this.currentMBCRAMBank = 0; // MBC Currently Indexed RAM Bank
    this.ROMBankEdge = Math.floor(cartridge.rom.length / 0x4000);
  }

  readRAM(address) {
    // Switchable RAM
    if (this.MBCRAMBanksEnabled || settings.alwaysAllowRWtoBanks) {
      return this.cartridge.MBCRam[address + this.currentRAMBankPosition];
    }
    //console.log("Reading from disabled RAM.");
    return 0xff;
  }

  // TODO: for MBC2 & MBC3, compare with other MBCx
  setCurrentROMBank() {
    //Read the cartridge ROM data from RAM memory:
    //Only map bank 0 to bank 1 here (MBC2 is like MBC1, but can only do 16 banks, so only the bank 0 quirk appears for MBC2):
    this.currentROMBank = Math.max(
      this.ROMBank1Offset % this.ROMBankEdge - 1,
      0
    ) << 14;
  }

  writeEnable(address, data) {
    // MBC RAM Bank Enable/Disable:
    this.MBCRAMBanksEnabled = (data & 0x0f) === 0x0a; // If lower nibble is 0x0A, then enable, otherwise disable.
  }
}
