export default class Joypad {
  initialValue = 0xf; // for memory
  value = 0xff; // Joypad State (two four-bit states actually)

  constructor(gameboy) {
    this.gameboy = gameboy;
  }

  down(key) {
    this.value &= 0xff ^ 1 << key;
    if (
      this.gameboy.cartridgeSlot.cartridge &&
      !this.gameboy.cartridgeSlot.cartridge.useGBCMode &&
      (!this.gameboy.usedBootROM || !this.gameboy.usedGBCBootROM)
    ) {
      this.gameboy.interruptsRequested |= 0x10; // A real GBC doesn't set this!
      this.gameboy.remainingClocks = 0;
      this.gameboy.checkIRQMatching();
    }

    this.writeToMemory();
  }

  up(key) {
    this.value |= 1 << key;
    this.writeToMemory();
  }

  writeToMemory() {
    this.gameboy.memory[0xff00] = (this.gameboy.memory[0xff00] & 0x30) +
      (((this.gameboy.memory[0xff00] & 0x20) === 0 ? this.value >> 4 : 0xf) &
        ((this.gameboy.memory[0xff00] & 0x10) === 0 ? this.value & 0xf : 0xf));
    this.gameboy.CPUStopped = false;
  }
}
