import util from "./util";
import settings from "../settings";

export default class Cartridge {
  constructor(rom, gameboy) {
    this.rom = rom;
    this.gameboy = gameboy;

    this.MBCRam = []; //Switchable RAM (Used by games for more RAM) for the main memory range 0xA000 - 0xC000.
    this.MBC1Mode = false; //MBC1 Type (4/32, 16/8)
    this.MBCRAMBanksEnabled = false; //MBC RAM Access Control.
    this.currMBCRAMBank = 0; //MBC Currently Indexed RAM Bank
    this.currMBCRAMBankPosition = -0xA000; //MBC Position Adder;

    this.cMBC1 = false; //Does the cartridge use MBC1?
    this.cMBC2 = false; //Does the cartridge use MBC2?
    this.cMBC3 = false; //Does the cartridge use MBC3?
    this.cMBC5 = false; //Does the cartridge use MBC5?
    this.cMBC7 = false; //Does the cartridge use MBC7?
    this.cSRAM = false; //Does the cartridge use save RAM?
    this.cMMMO1 = false; //...
    this.cBATT = false;
    this.cRUMBLE = false; //Does the cartridge use the RUMBLE addressing (modified MBC5)?
    this.cCamera = false; //Is the cartridge actually a GameBoy Camera?
    this.cTAMA5 = false; //Does the cartridge use TAMA5? (Tamagotchi Cartridge)
    this.cHuC3 = false; //Does the cartridge use HuC3 (Hudson Soft / modified MBC3)?
    this.cHuC1 = false; //Does the cartridge use HuC1 (Hudson Soft / modified MBC1)?
    this.cTIMER = false; //Does the cartridge have an RTC?

    this.ROMBanks = [ // 1 Bank = 16 KBytes = 256 Kbits
      2, 4, 8, 16, 32, 64, 128, 256, 512
    ];
    this.ROMBanks[0x52] = 72;
    this.ROMBanks[0x53] = 80;
    this.ROMBanks[0x54] = 96;

    this.RAMBanks = [0, 1, 2, 4, 16]; //Used to map the RAM banks to maximum size the MBC used can do.
    this.numRAMBanks = 0; // How many RAM banks were actually allocated?

    this.loadRom();
  }

  loadRom() {
    // TODO: move to gameboy core
    //Load the first two ROM banks (0x0000 - 0x7FFF) into regular gameboy memory:
    this.gameboy.usedBootROM = settings.bootBootRomFirst && (
      (!settings.forceGBBootRom && this.gameboy.GBCBOOTROM.length === 0x800) ||
      (settings.forceGBBootRom && this.gameboy.GBBOOTROM.length === 0x100)
    );

    const maxLength = this.rom.length;
    if (maxLength < 0x4000) throw new Error("ROM size too small.");

    this.ROM = util.getTypedArray(maxLength, 0, "uint8");

    var romIndex = 0;
    if (this.gameboy.usedBootROM) {
      // if (!settings.forceGBBootRom) {
      //   //Patch in the GBC boot ROM into the memory map:
      //   for (; romIndex < 0x100; ++romIndex) {
      //     this.memory[romIndex] = this.GBCBOOTROM[romIndex]; //Load in the GameBoy Color BOOT ROM.
      //     this.ROM[romIndex] = (this.rom.charCodeAt(romIndex) & 0xFF); //Decode the ROM binary for the switch out.
      //   }
      //
      //   for (; romIndex < 0x200; ++romIndex) {
      //     this.memory[romIndex] = this.ROM[romIndex] = (this.rom.charCodeAt(romIndex) & 0xFF); //Load in the game ROM.
      //   }
      //
      //   for (; romIndex < 0x900; ++romIndex) {
      //     this.memory[romIndex] = this.GBCBOOTROM[romIndex - 0x100]; //Load in the GameBoy Color BOOT ROM.
      //     this.ROM[romIndex] = (this.rom.charCodeAt(romIndex) & 0xFF); //Decode the ROM binary for the switch out.
      //   }
      //
      //   this.usedGBCBootROM = true;
      // } else {
      //   //Patch in the GB boot ROM into the memory map:
      //   for (; romIndex < 0x100; ++romIndex) {
      //     this.memory[romIndex] = this.GBBOOTROM[romIndex]; //Load in the GameBoy BOOT ROM.
      //     this.ROM[romIndex] = (this.rom.charCodeAt(romIndex) & 0xFF); //Decode the ROM binary for the switch out.
      //   }
      // }
      //
      // for (; romIndex < 0x4000; ++romIndex) {
      //   this.memory[romIndex] = this.ROM[romIndex] = (this.rom.charCodeAt(romIndex) & 0xFF); //Load in the game ROM.
      // }
    } else {
      //Don't load in the boot ROM:
      for (; romIndex < 0x4000; ++romIndex) {
        this.gameboy.memory[romIndex] = this.ROM[romIndex] = (this.rom.charCodeAt(romIndex) & 0xFF); //Load in the game ROM.
      }
    }

    //Finish the decoding of the ROM binary:
    for (; romIndex < maxLength; ++romIndex) {
      this.ROM[romIndex] = (this.rom.charCodeAt(romIndex) & 0xFF);
    }

    this.ROMBankEdge = Math.floor(this.ROM.length / 0x4000);
  }

  interpret() {
    this.name = this.getName();
    this.gameCode = this.getGameCode();
    this.colorCompatibilityByte = this.ROM[0x143];
    this.type = this.ROM[0x147];
    this.setTypeName();

    console.log("Game Title: " + this.name + "[" + this.gameCode + "][" + this.colorCompatibilityByte + "]");
    console.log("Game Code: " + this.gameCode);
    console.log("Cartridge Type: " + this.type);
    console.log("Cartridge Type Name: " + this.typeName);

    this.romSize = this.ROM[0x148];
    this.ramSize = this.ROM[0x149];

    // ROM and RAM banks
    this.numROMBanks = this.ROMBanks[this.romSize];

    console.log(this.numROMBanks + " ROM banks.");

    switch (this.RAMBanks[this.ramSize]) {
    case 0:
      console.log("No RAM banking requested for allocation or MBC is of type 2.");
      break;
    case 2:
      console.log("1 RAM bank requested for allocation.");
      break;
    case 3:
      console.log("4 RAM banks requested for allocation.");
      break;
    case 4:
      console.log("16 RAM banks requested for allocation.");
      break;
    default:
      console.log("RAM bank amount requested is unknown, will use maximum allowed by specified MBC type.");
    }

    //Check the GB/GBC mode byte:
    if (!this.gameboy.usedBootROM) {
      switch (this.colorCompatibilityByte) {
      case 0x00: // GB only
        this.cGBC = false;
        break;
      case 0x32: //Exception to the GBC identifying code:
        if (!settings.gbHasPriority &&
          this.romName + this.romGameCode + this.colorCompatibilityByte === "Game and Watch 50"
        ) {
          this.cGBC = true;
          console.log("Created a boot exception for Game and Watch Gallery 2 (GBC ID byte is wrong on the cartridge).", 1);
        } else {
          this.cGBC = false;
        }
        break;
      case 0x80: //Both GB + GBC modes
        this.cGBC = !settings.gbHasPriority;
        break;
      case 0xC0: //Only GBC mode
        this.cGBC = true;
        break;
      default:
        this.cGBC = false;
        console.warn("Unknown GameBoy game type code #" + this.colorCompatibilityByte + ", defaulting to GB mode (Old games don't have a type code).");
      }
    } else {
      console.log("used boot rom");
      this.cGBC = this.gameboy.usedGBCBootROM; //Allow the GBC boot ROM to run in GBC mode...
    }

    const oldLicenseCode = this.ROM[0x14B];
    const newLicenseCode = (this.ROM[0x144] & 0xFF00) | (this.ROM[0x145] & 0xFF);
    if (oldLicenseCode !== 0x33) {
      this.isNewLicenseCode = false;
      this.licenseCode = oldLicenseCode;
    } else {
      this.isNewLicenseCode = true;
      this.licenseCode = newLicenseCode;
    }
  }

  getName() {
    let name = "";
    for (let index = 0x134; index <= 0x13E; index++) {
      if (this.rom.charCodeAt(index) > 0) {
        name += this.rom[index];
      }
    }
    return name;
  }

  getGameCode() {
    let gameCode = "";
    for (let index = 0x13F; index <= 0x142; index++) {
      if (this.rom.charCodeAt(index) > 0) {
        gameCode += this.rom[index];
      }
    }
    return gameCode;
  }

  setTypeName() {
    switch (this.type) {
    case 0x00:
      //ROM w/o bank switching
      if (!settings.enableMBC1Override) {
        this.typeName = "ROM";
      }
    case 0x01:
      this.cMBC1 = true;
      this.typeName = "MBC1";
      break;
    case 0x02:
      this.cMBC1 = true;
      this.cSRAM = true;
      this.typeName = "MBC1 + SRAM";
      break;
    case 0x03:
      this.cMBC1 = true;
      this.cSRAM = true;
      this.cBATT = true;
      this.typeName = "MBC1 + SRAM + BATT";
      break;
    case 0x05:
      this.cMBC2 = true;
      this.typeName = "MBC2";
      break;
    case 0x06:
      this.cMBC2 = true;
      this.cBATT = true;
      this.typeName = "MBC2 + BATT";
      break;
    case 0x08:
      this.cSRAM = true;
      this.typeName = "ROM + SRAM";
      break;
    case 0x09:
      this.cSRAM = true;
      this.cBATT = true;
      this.typeName = "ROM + SRAM + BATT";
      break;
    case 0x0B:
      this.cMMMO1 = true;
      this.typeName = "MMMO1";
      break;
    case 0x0C:
      this.cMMMO1 = true;
      this.cSRAM = true;
      this.typeName = "MMMO1 + SRAM";
      break;
    case 0x0D:
      this.cMMMO1 = true;
      this.cSRAM = true;
      this.cBATT = true;
      this.typeName = "MMMO1 + SRAM + BATT";
      break;
    case 0x0F:
      this.cMBC3 = true;
      this.cTIMER = true;
      this.cBATT = true;
      this.typeName = "MBC3 + TIMER + BATT";
      break;
    case 0x10:
      this.cMBC3 = true;
      this.cTIMER = true;
      this.cBATT = true;
      this.cSRAM = true;
      this.typeName = "MBC3 + TIMER + BATT + SRAM";
      break;
    case 0x11:
      this.cMBC3 = true;
      this.typeName = "MBC3";
      break;
    case 0x12:
      this.cMBC3 = true;
      this.cSRAM = true;
      this.typeName = "MBC3 + SRAM";
      break;
    case 0x13:
      this.cMBC3 = true;
      this.cSRAM = true;
      this.cBATT = true;
      this.typeName = "MBC3 + SRAM + BATT";
      break;
    case 0x19:
      this.cMBC5 = true;
      this.typeName = "MBC5";
      break;
    case 0x1A:
      this.cMBC5 = true;
      this.cSRAM = true;
      this.typeName = "MBC5 + SRAM";
      break;
    case 0x1B:
      this.cMBC5 = true;
      this.cSRAM = true;
      this.cBATT = true;
      this.typeName = "MBC5 + SRAM + BATT";
      break;
    case 0x1C:
      this.cRUMBLE = true;
      this.typeName = "RUMBLE";
      break;
    case 0x1D:
      this.cRUMBLE = true;
      this.cSRAM = true;
      this.typeName = "RUMBLE + SRAM";
      break;
    case 0x1E:
      this.cRUMBLE = true;
      this.cSRAM = true;
      this.cBATT = true;
      this.typeName = "RUMBLE + SRAM + BATT";
      break;
    case 0x1F:
      this.cCamera = true;
      this.typeName = "GameBoy Camera";
      break;
    case 0x22:
      this.cMBC7 = true;
      this.cSRAM = true;
      this.cBATT = true;
      this.typeName = "MBC7 + SRAM + BATT";
      break;
    case 0xFD:
      this.cTAMA5 = true;
      this.typeName = "TAMA5";
      break;
    case 0xFE:
      this.cHuC3 = true;
      this.typeName = "HuC3";
      break;
    case 0xFF:
      this.cHuC1 = true;
      this.typeName = "HuC1";
      break;
    default:
      this.typeName = "Unknown";
      console.log("Cartridge type is unknown.");
      // TODO error
      break;
    }
  }

  setupRAM() {
    //Setup the auxilliary/switchable RAM:
    if (this.cMBC2) {
      this.numRAMBanks = 1 / 16;
    } else if (this.cMBC1 || this.cRUMBLE || this.cMBC3 || this.cHuC3) {
      this.numRAMBanks = 4;
    } else if (this.cMBC5) {
      this.numRAMBanks = 16;
    } else if (this.cSRAM) {
      this.numRAMBanks = 1;
    }

    this.allocatedRamBytes = this.numRAMBanks * 0x2000;

    console.log("Actual bytes of MBC RAM allocated: " + this.allocatedRamBytes);

    if (this.numRAMBanks > 0) {
      const mbcRam = typeof this.gameboy.openMBC === "function" ? this.gameboy.openMBC(this.name) : [];
      if (mbcRam.length > 0) {
        this.MBCRam = util.toTypedArray(mbcRam, "uint8");
      } else {
        this.MBCRam = util.getTypedArray(this.allocatedRamBytes, 0, "uint8");
      }
    }

    this.gameboy.returnFromRTCState();
  }
}
