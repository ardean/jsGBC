export default class CartridgeSlot {
  constructor(gameboy) {
    this.gameboy = gameboy;
  }

  insertCartridge(cartridge) {
    this.cartridge = cartridge;
  }

  readCartridge() {
    this.cartridge.interpret();
  }
}
