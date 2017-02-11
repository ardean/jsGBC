import bitInstructions from "./bit-instructions";

export default [
  //NOP
  //#0x00:
  function() {
    //Do Nothing...
  },
  //LD BC, nn
  //#0x01:
  function() {
    this.registerC = this.memoryReader[this.programCounter].apply(this, [
      this.programCounter
    ]);
    this.registerB = this.memoryRead(this.programCounter + 1 & 0xffff);
    this.programCounter = this.programCounter + 2 & 0xffff;
  },
  //LD (BC), A
  //#0x02:
  function() {
    this.memoryWrite(this.registerB << 8 | this.registerC, this.registerA);
  },
  //INC BC
  //#0x03:
  function() {
    var temp_var = (this.registerB << 8 | this.registerC) + 1;
    this.registerB = temp_var >> 8 & 0xff;
    this.registerC = temp_var & 0xff;
  },
  //INC B
  //#0x04:
  function() {
    this.registerB = this.registerB + 1 & 0xff;
    this.FZero = this.registerB === 0;
    this.FHalfCarry = (this.registerB & 0xf) === 0;
    this.FSubtract = false;
  },
  //DEC B
  //#0x05:
  function() {
    this.registerB = this.registerB - 1 & 0xff;
    this.FZero = this.registerB === 0;
    this.FHalfCarry = (this.registerB & 0xf) === 0xf;
    this.FSubtract = true;
  },
  //LD B, n
  //#0x06:
  function() {
    this.registerB = this.memoryReader[this.programCounter].apply(this, [
      this.programCounter
    ]);
    this.programCounter = this.programCounter + 1 & 0xffff;
  },
  //RLCA
  //#0x07:
  function() {
    this.FCarry = this.registerA > 0x7f;
    this.registerA = this.registerA << 1 & 0xff | this.registerA >> 7;
    this.FZero = this.FSubtract = this.FHalfCarry = false;
  },
  //LD (nn), SP
  //#0x08:
  function() {
    var temp_var = this.memoryRead(this.programCounter + 1 & 0xffff) << 8 |
      this.memoryReader[this.programCounter].apply(this, [this.programCounter]);
    this.programCounter = this.programCounter + 2 & 0xffff;
    this.memoryWrite(temp_var, this.stackPointer & 0xff);
    this.memoryWrite(temp_var + 1 & 0xffff, this.stackPointer >> 8);
  },
  //ADD HL, BC
  //#0x09:
  function() {
    var dirtySum = this.registersHL + (this.registerB << 8 | this.registerC);
    this.FHalfCarry = (this.registersHL & 0xfff) > (dirtySum & 0xfff);
    this.FCarry = dirtySum > 0xffff;
    this.registersHL = dirtySum & 0xffff;
    this.FSubtract = false;
  },
  //LD A, (BC)
  //#0x0A:
  function() {
    this.registerA = this.memoryRead(this.registerB << 8 | this.registerC);
  },
  //DEC BC
  //#0x0B:
  function() {
    var temp_var = (this.registerB << 8 | this.registerC) - 1 & 0xffff;
    this.registerB = temp_var >> 8;
    this.registerC = temp_var & 0xff;
  },
  //INC C
  //#0x0C:
  function() {
    this.registerC = this.registerC + 1 & 0xff;
    this.FZero = this.registerC === 0;
    this.FHalfCarry = (this.registerC & 0xf) === 0;
    this.FSubtract = false;
  },
  //DEC C
  //#0x0D:
  function() {
    this.registerC = this.registerC - 1 & 0xff;
    this.FZero = this.registerC === 0;
    this.FHalfCarry = (this.registerC & 0xf) === 0xf;
    this.FSubtract = true;
  },
  //LD C, n
  //#0x0E:
  function() {
    this.registerC = this.memoryReader[this.programCounter].apply(this, [
      this.programCounter
    ]);
    this.programCounter = this.programCounter + 1 & 0xffff;
  },
  //RRCA
  //#0x0F:
  function() {
    this.registerA = this.registerA >> 1 | (this.registerA & 1) << 7;
    this.FCarry = this.registerA > 0x7f;
    this.FZero = this.FSubtract = this.FHalfCarry = false;
  },
  //STOP
  //#0x10:
  function() {
    if (this.cartridgeSlot.cartridge.useGBCMode) {
      if ((this.memory[0xff4d] & 0x01) === 0x01) {
        //Speed change requested.
        if (this.memory[0xff4d] > 0x7f) {
          //Go back to single speed mode.
          console.log("Going into single clock speed mode.");
          this.doubleSpeedShifter = 0;
          this.memory[0xff4d] &= 0x7f; //Clear the double speed mode flag.
        } else {
          //Go to double speed mode.
          console.log("Going into double clock speed mode.");
          this.doubleSpeedShifter = 1;
          this.memory[0xff4d] |= 0x80; //Set the double speed mode flag.
        }
        this.memory[0xff4d] &= 0xfe; //Reset the request bit.
      } else {
        this.handleSTOP();
      }
    } else {
      this.handleSTOP();
    }
  },
  //LD DE, nn
  //#0x11:
  function() {
    this.registerE = this.memoryReader[this.programCounter].apply(this, [
      this.programCounter
    ]);
    this.registerD = this.memoryRead(this.programCounter + 1 & 0xffff);
    this.programCounter = this.programCounter + 2 & 0xffff;
  },
  //LD (DE), A
  //#0x12:
  function() {
    this.memoryWrite(this.registerD << 8 | this.registerE, this.registerA);
  },
  //INC DE
  //#0x13:
  function() {
    var temp_var = (this.registerD << 8 | this.registerE) + 1;
    this.registerD = temp_var >> 8 & 0xff;
    this.registerE = temp_var & 0xff;
  },
  //INC D
  //#0x14:
  function() {
    this.registerD = this.registerD + 1 & 0xff;
    this.FZero = this.registerD === 0;
    this.FHalfCarry = (this.registerD & 0xf) === 0;
    this.FSubtract = false;
  },
  //DEC D
  //#0x15:
  function() {
    this.registerD = this.registerD - 1 & 0xff;
    this.FZero = this.registerD === 0;
    this.FHalfCarry = (this.registerD & 0xf) === 0xf;
    this.FSubtract = true;
  },
  //LD D, n
  //#0x16:
  function() {
    this.registerD = this.memoryReader[this.programCounter].apply(this, [
      this.programCounter
    ]);
    this.programCounter = this.programCounter + 1 & 0xffff;
  },
  //RLA
  //#0x17:
  function() {
    var carry_flag = this.FCarry ? 1 : 0;
    this.FCarry = this.registerA > 0x7f;
    this.registerA = this.registerA << 1 & 0xff | carry_flag;
    this.FZero = this.FSubtract = this.FHalfCarry = false;
  },
  //JR n
  //#0x18:
  function() {
    this.programCounter = this.programCounter +
      (this.memoryReader[this.programCounter].apply(this, [
        this.programCounter
      ]) <<
        24 >>
        24) +
      1 &
      0xffff;
  },
  //ADD HL, DE
  //#0x19:
  function() {
    var dirtySum = this.registersHL + (this.registerD << 8 | this.registerE);
    this.FHalfCarry = (this.registersHL & 0xfff) > (dirtySum & 0xfff);
    this.FCarry = dirtySum > 0xffff;
    this.registersHL = dirtySum & 0xffff;
    this.FSubtract = false;
  },
  //LD A, (DE)
  //#0x1A:
  function() {
    this.registerA = this.memoryRead(this.registerD << 8 | this.registerE);
  },
  //DEC DE
  //#0x1B:
  function() {
    var temp_var = (this.registerD << 8 | this.registerE) - 1 & 0xffff;
    this.registerD = temp_var >> 8;
    this.registerE = temp_var & 0xff;
  },
  //INC E
  //#0x1C:
  function() {
    this.registerE = this.registerE + 1 & 0xff;
    this.FZero = this.registerE === 0;
    this.FHalfCarry = (this.registerE & 0xf) === 0;
    this.FSubtract = false;
  },
  //DEC E
  //#0x1D:
  function() {
    this.registerE = this.registerE - 1 & 0xff;
    this.FZero = this.registerE === 0;
    this.FHalfCarry = (this.registerE & 0xf) === 0xf;
    this.FSubtract = true;
  },
  //LD E, n
  //#0x1E:
  function() {
    this.registerE = this.memoryReader[this.programCounter].apply(this, [
      this.programCounter
    ]);
    this.programCounter = this.programCounter + 1 & 0xffff;
  },
  //RRA
  //#0x1F:
  function() {
    var carry_flag = this.FCarry ? 0x80 : 0;
    this.FCarry = (this.registerA & 1) === 1;
    this.registerA = this.registerA >> 1 | carry_flag;
    this.FZero = this.FSubtract = this.FHalfCarry = false;
  },
  //JR NZ, n
  //#0x20:
  function() {
    if (!this.FZero) {
      this.programCounter = this.programCounter +
        (this.memoryReader[this.programCounter].apply(this, [
          this.programCounter
        ]) <<
          24 >>
          24) +
        1 &
        0xffff;
      this.CPUTicks += 4;
    } else {
      this.programCounter = this.programCounter + 1 & 0xffff;
    }
  },
  //LD HL, nn
  //#0x21:
  function() {
    this.registersHL = this.memoryRead(this.programCounter + 1 & 0xffff) << 8 |
      this.memoryReader[this.programCounter].apply(this, [this.programCounter]);
    this.programCounter = this.programCounter + 2 & 0xffff;
  },
  //LDI (HL), A
  //#0x22:
  function() {
    this.memoryWriter[this.registersHL].apply(this, [
      this.registersHL,
      this.registerA
    ]);
    this.registersHL = this.registersHL + 1 & 0xffff;
  },
  //INC HL
  //#0x23:
  function() {
    this.registersHL = this.registersHL + 1 & 0xffff;
  },
  //INC H
  //#0x24:
  function() {
    var H = (this.registersHL >> 8) + 1 & 0xff;
    this.FZero = H === 0;
    this.FHalfCarry = (H & 0xf) === 0;
    this.FSubtract = false;
    this.registersHL = H << 8 | this.registersHL & 0xff;
  },
  //DEC H
  //#0x25:
  function() {
    var H = (this.registersHL >> 8) - 1 & 0xff;
    this.FZero = H === 0;
    this.FHalfCarry = (H & 0xf) === 0xf;
    this.FSubtract = true;
    this.registersHL = H << 8 | this.registersHL & 0xff;
  },
  //LD H, n
  //#0x26:
  function() {
    this.registersHL = this.memoryReader[this.programCounter].apply(this, [
      this.programCounter
    ]) <<
      8 |
      this.registersHL & 0xff;
    this.programCounter = this.programCounter + 1 & 0xffff;
  },
  //DAA
  //#0x27:
  function() {
    if (!this.FSubtract) {
      if (this.FCarry || this.registerA > 0x99) {
        this.registerA = this.registerA + 0x60 & 0xff;
        this.FCarry = true;
      }
      if (this.FHalfCarry || (this.registerA & 0xf) > 0x9) {
        this.registerA = this.registerA + 0x06 & 0xff;
        this.FHalfCarry = false;
      }
    } else if (this.FCarry && this.FHalfCarry) {
      this.registerA = this.registerA + 0x9a & 0xff;
      this.FHalfCarry = false;
    } else if (this.FCarry) {
      this.registerA = this.registerA + 0xa0 & 0xff;
    } else if (this.FHalfCarry) {
      this.registerA = this.registerA + 0xfa & 0xff;
      this.FHalfCarry = false;
    }
    this.FZero = this.registerA === 0;
  },
  //JR Z, n
  //#0x28:
  function() {
    if (this.FZero) {
      this.programCounter = this.programCounter +
        (this.memoryReader[this.programCounter].apply(this, [
          this.programCounter
        ]) <<
          24 >>
          24) +
        1 &
        0xffff;
      this.CPUTicks += 4;
    } else {
      this.programCounter = this.programCounter + 1 & 0xffff;
    }
  },
  //ADD HL, HL
  //#0x29:
  function() {
    this.FHalfCarry = (this.registersHL & 0xfff) > 0x7ff;
    this.FCarry = this.registersHL > 0x7fff;
    this.registersHL = this.registersHL << 1 & 0xffff;
    this.FSubtract = false;
  },
  //LDI A, (HL)
  //#0x2A:
  function() {
    this.registerA = this.memoryReader[this.registersHL].apply(this, [
      this.registersHL
    ]);
    this.registersHL = this.registersHL + 1 & 0xffff;
  },
  //DEC HL
  //#0x2B:
  function() {
    this.registersHL = this.registersHL - 1 & 0xffff;
  },
  //INC L
  //#0x2C:
  function() {
    var L = this.registersHL + 1 & 0xff;
    this.FZero = L === 0;
    this.FHalfCarry = (L & 0xf) === 0;
    this.FSubtract = false;
    this.registersHL = this.registersHL & 0xff00 | L;
  },
  //DEC L
  //#0x2D:
  function() {
    var L = this.registersHL - 1 & 0xff;
    this.FZero = L === 0;
    this.FHalfCarry = (L & 0xf) === 0xf;
    this.FSubtract = true;
    this.registersHL = this.registersHL & 0xff00 | L;
  },
  //LD L, n
  //#0x2E:
  function() {
    this.registersHL = this.registersHL & 0xff00 |
      this.memoryReader[this.programCounter].apply(this, [this.programCounter]);
    this.programCounter = this.programCounter + 1 & 0xffff;
  },
  //CPL
  //#0x2F:
  function() {
    this.registerA ^= 0xff;
    this.FSubtract = this.FHalfCarry = true;
  },
  //JR NC, n
  //#0x30:
  function() {
    if (!this.FCarry) {
      this.programCounter = this.programCounter +
        (this.memoryReader[this.programCounter].apply(this, [
          this.programCounter
        ]) <<
          24 >>
          24) +
        1 &
        0xffff;
      this.CPUTicks += 4;
    } else {
      this.programCounter = this.programCounter + 1 & 0xffff;
    }
  },
  //LD SP, nn
  //#0x31:
  function() {
    this.stackPointer = this.memoryRead(this.programCounter + 1 & 0xffff) << 8 |
      this.memoryReader[this.programCounter].apply(this, [this.programCounter]);
    this.programCounter = this.programCounter + 2 & 0xffff;
  },
  //LDD (HL), A
  //#0x32:
  function() {
    this.memoryWriter[this.registersHL].apply(this, [
      this.registersHL,
      this.registerA
    ]);
    this.registersHL = this.registersHL - 1 & 0xffff;
  },
  //INC SP
  //#0x33:
  function() {
    this.stackPointer = this.stackPointer + 1 & 0xffff;
  },
  //INC (HL)
  //#0x34:
  function() {
    var temp_var = this.memoryReader[this.registersHL].apply(this, [
      this.registersHL
    ]) +
      1 &
      0xff;
    this.FZero = temp_var === 0;
    this.FHalfCarry = (temp_var & 0xf) === 0;
    this.FSubtract = false;
    this.memoryWriter[this.registersHL].apply(this, [
      this.registersHL,
      temp_var
    ]);
  },
  //DEC (HL)
  //#0x35:
  function() {
    var temp_var = this.memoryReader[this.registersHL].apply(this, [
      this.registersHL
    ]) -
      1 &
      0xff;
    this.FZero = temp_var === 0;
    this.FHalfCarry = (temp_var & 0xf) === 0xf;
    this.FSubtract = true;
    this.memoryWriter[this.registersHL].apply(this, [
      this.registersHL,
      temp_var
    ]);
  },
  //LD (HL), n
  //#0x36:
  function() {
    this.memoryWriter[this.registersHL].apply(this, [
      this.registersHL,
      this.memoryReader[this.programCounter].apply(this, [this.programCounter])
    ]);
    this.programCounter = this.programCounter + 1 & 0xffff;
  },
  //SCF
  //#0x37:
  function() {
    this.FCarry = true;
    this.FSubtract = this.FHalfCarry = false;
  },
  //JR C, n
  //#0x38:
  function() {
    if (this.FCarry) {
      this.programCounter = this.programCounter +
        (this.memoryReader[this.programCounter].apply(this, [
          this.programCounter
        ]) <<
          24 >>
          24) +
        1 &
        0xffff;
      this.CPUTicks += 4;
    } else {
      this.programCounter = this.programCounter + 1 & 0xffff;
    }
  },
  //ADD HL, SP
  //#0x39:
  function() {
    var dirtySum = this.registersHL + this.stackPointer;
    this.FHalfCarry = (this.registersHL & 0xfff) > (dirtySum & 0xfff);
    this.FCarry = dirtySum > 0xffff;
    this.registersHL = dirtySum & 0xffff;
    this.FSubtract = false;
  },
  //LDD A, (HL)
  //#0x3A:
  function() {
    this.registerA = this.memoryReader[this.registersHL].apply(this, [
      this.registersHL
    ]);
    this.registersHL = this.registersHL - 1 & 0xffff;
  },
  //DEC SP
  //#0x3B:
  function() {
    this.stackPointer = this.stackPointer - 1 & 0xffff;
  },
  //INC A
  //#0x3C:
  function() {
    this.registerA = this.registerA + 1 & 0xff;
    this.FZero = this.registerA === 0;
    this.FHalfCarry = (this.registerA & 0xf) === 0;
    this.FSubtract = false;
  },
  //DEC A
  //#0x3D:
  function() {
    this.registerA = this.registerA - 1 & 0xff;
    this.FZero = this.registerA === 0;
    this.FHalfCarry = (this.registerA & 0xf) === 0xf;
    this.FSubtract = true;
  },
  //LD A, n
  //#0x3E:
  function() {
    this.registerA = this.memoryReader[this.programCounter].apply(this, [
      this.programCounter
    ]);
    this.programCounter = this.programCounter + 1 & 0xffff;
  },
  //CCF
  //#0x3F:
  function() {
    this.FCarry = !this.FCarry;
    this.FSubtract = this.FHalfCarry = false;
  },
  //LD B, B
  //#0x40:
  function() {
    //Do nothing...
  },
  //LD B, C
  //#0x41:
  function() {
    this.registerB = this.registerC;
  },
  //LD B, D
  //#0x42:
  function() {
    this.registerB = this.registerD;
  },
  //LD B, E
  //#0x43:
  function() {
    this.registerB = this.registerE;
  },
  //LD B, H
  //#0x44:
  function() {
    this.registerB = this.registersHL >> 8;
  },
  //LD B, L
  //#0x45:
  function() {
    this.registerB = this.registersHL & 0xff;
  },
  //LD B, (HL)
  //#0x46:
  function() {
    this.registerB = this.memoryReader[this.registersHL].apply(this, [
      this.registersHL
    ]);
  },
  //LD B, A
  //#0x47:
  function() {
    this.registerB = this.registerA;
  },
  //LD C, B
  //#0x48:
  function() {
    this.registerC = this.registerB;
  },
  //LD C, C
  //#0x49:
  function() {
    //Do nothing...
  },
  //LD C, D
  //#0x4A:
  function() {
    this.registerC = this.registerD;
  },
  //LD C, E
  //#0x4B:
  function() {
    this.registerC = this.registerE;
  },
  //LD C, H
  //#0x4C:
  function() {
    this.registerC = this.registersHL >> 8;
  },
  //LD C, L
  //#0x4D:
  function() {
    this.registerC = this.registersHL & 0xff;
  },
  //LD C, (HL)
  //#0x4E:
  function() {
    this.registerC = this.memoryReader[this.registersHL].apply(this, [
      this.registersHL
    ]);
  },
  //LD C, A
  //#0x4F:
  function() {
    this.registerC = this.registerA;
  },
  //LD D, B
  //#0x50:
  function() {
    this.registerD = this.registerB;
  },
  //LD D, C
  //#0x51:
  function() {
    this.registerD = this.registerC;
  },
  //LD D, D
  //#0x52:
  function() {
    //Do nothing...
  },
  //LD D, E
  //#0x53:
  function() {
    this.registerD = this.registerE;
  },
  //LD D, H
  //#0x54:
  function() {
    this.registerD = this.registersHL >> 8;
  },
  //LD D, L
  //#0x55:
  function() {
    this.registerD = this.registersHL & 0xff;
  },
  //LD D, (HL)
  //#0x56:
  function() {
    this.registerD = this.memoryReader[this.registersHL].apply(this, [
      this.registersHL
    ]);
  },
  //LD D, A
  //#0x57:
  function() {
    this.registerD = this.registerA;
  },
  //LD E, B
  //#0x58:
  function() {
    this.registerE = this.registerB;
  },
  //LD E, C
  //#0x59:
  function() {
    this.registerE = this.registerC;
  },
  //LD E, D
  //#0x5A:
  function() {
    this.registerE = this.registerD;
  },
  //LD E, E
  //#0x5B:
  function() {
    //Do nothing...
  },
  //LD E, H
  //#0x5C:
  function() {
    this.registerE = this.registersHL >> 8;
  },
  //LD E, L
  //#0x5D:
  function() {
    this.registerE = this.registersHL & 0xff;
  },
  //LD E, (HL)
  //#0x5E:
  function() {
    this.registerE = this.memoryReader[this.registersHL].apply(this, [
      this.registersHL
    ]);
  },
  //LD E, A
  //#0x5F:
  function() {
    this.registerE = this.registerA;
  },
  //LD H, B
  //#0x60:
  function() {
    this.registersHL = this.registerB << 8 | this.registersHL & 0xff;
  },
  //LD H, C
  //#0x61:
  function() {
    this.registersHL = this.registerC << 8 | this.registersHL & 0xff;
  },
  //LD H, D
  //#0x62:
  function() {
    this.registersHL = this.registerD << 8 | this.registersHL & 0xff;
  },
  //LD H, E
  //#0x63:
  function() {
    this.registersHL = this.registerE << 8 | this.registersHL & 0xff;
  },
  //LD H, H
  //#0x64:
  function() {
    //Do nothing...
  },
  //LD H, L
  //#0x65:
  function() {
    this.registersHL = (this.registersHL & 0xff) * 0x101;
  },
  //LD H, (HL)
  //#0x66:
  function() {
    this.registersHL = this.memoryReader[this.registersHL].apply(this, [
      this.registersHL
    ]) <<
      8 |
      this.registersHL & 0xff;
  },
  //LD H, A
  //#0x67:
  function() {
    this.registersHL = this.registerA << 8 | this.registersHL & 0xff;
  },
  //LD L, B
  //#0x68:
  function() {
    this.registersHL = this.registersHL & 0xff00 | this.registerB;
  },
  //LD L, C
  //#0x69:
  function() {
    this.registersHL = this.registersHL & 0xff00 | this.registerC;
  },
  //LD L, D
  //#0x6A:
  function() {
    this.registersHL = this.registersHL & 0xff00 | this.registerD;
  },
  //LD L, E
  //#0x6B:
  function() {
    this.registersHL = this.registersHL & 0xff00 | this.registerE;
  },
  //LD L, H
  //#0x6C:
  function() {
    this.registersHL = this.registersHL & 0xff00 | this.registersHL >> 8;
  },
  //LD L, L
  //#0x6D:
  function() {
    //Do nothing...
  },
  //LD L, (HL)
  //#0x6E:
  function() {
    this.registersHL = this.registersHL & 0xff00 |
      this.memoryReader[this.registersHL].apply(this, [this.registersHL]);
  },
  //LD L, A
  //#0x6F:
  function() {
    this.registersHL = this.registersHL & 0xff00 | this.registerA;
  },
  //LD (HL), B
  //#0x70:
  function() {
    this.memoryWriter[this.registersHL].apply(this, [
      this.registersHL,
      this.registerB
    ]);
  },
  //LD (HL), C
  //#0x71:
  function() {
    this.memoryWriter[this.registersHL].apply(this, [
      this.registersHL,
      this.registerC
    ]);
  },
  //LD (HL), D
  //#0x72:
  function() {
    this.memoryWriter[this.registersHL].apply(this, [
      this.registersHL,
      this.registerD
    ]);
  },
  //LD (HL), E
  //#0x73:
  function() {
    this.memoryWriter[this.registersHL].apply(this, [
      this.registersHL,
      this.registerE
    ]);
  },
  //LD (HL), H
  //#0x74:
  function() {
    this.memoryWriter[this.registersHL].apply(this, [
      this.registersHL,
      this.registersHL >> 8
    ]);
  },
  //LD (HL), L
  //#0x75:
  function() {
    this.memoryWriter[this.registersHL].apply(this, [
      this.registersHL,
      this.registersHL & 0xff
    ]);
  },
  //HALT
  //#0x76:
  function() {
    //See if there's already an IRQ match:
    if ((this.interruptsEnabled & this.interruptsRequested & 0x1f) > 0) {
      if (!this.cartridgeSlot.cartridge.useGBCMode && !this.usedBootROM) {
        //HALT bug in the DMG CPU model (Program Counter fails to increment for one instruction after HALT):
        this.skipPCIncrement = true;
      } else {
        //CGB gets around the HALT PC bug by doubling the hidden NOP.
        this.CPUTicks += 4;
      }
    } else {
      //CPU is stalled until the next IRQ match:
      this.calculateHALTPeriod();
    }
  },
  //LD (HL), A
  //#0x77:
  function() {
    this.memoryWriter[this.registersHL].apply(this, [
      this.registersHL,
      this.registerA
    ]);
  },
  //LD A, B
  //#0x78:
  function() {
    this.registerA = this.registerB;
  },
  //LD A, C
  //#0x79:
  function() {
    this.registerA = this.registerC;
  },
  //LD A, D
  //#0x7A:
  function() {
    this.registerA = this.registerD;
  },
  //LD A, E
  //#0x7B:
  function() {
    this.registerA = this.registerE;
  },
  //LD A, H
  //#0x7C:
  function() {
    this.registerA = this.registersHL >> 8;
  },
  //LD A, L
  //#0x7D:
  function() {
    this.registerA = this.registersHL & 0xff;
  },
  //LD, A, (HL)
  //#0x7E:
  function() {
    this.registerA = this.memoryReader[this.registersHL].apply(this, [
      this.registersHL
    ]);
  },
  //LD A, A
  //#0x7F:
  function() {
    //Do Nothing...
  },
  //ADD A, B
  //#0x80:
  function() {
    var dirtySum = this.registerA + this.registerB;
    this.FHalfCarry = (dirtySum & 0xf) < (this.registerA & 0xf);
    this.FCarry = dirtySum > 0xff;
    this.registerA = dirtySum & 0xff;
    this.FZero = this.registerA === 0;
    this.FSubtract = false;
  },
  //ADD A, C
  //#0x81:
  function() {
    var dirtySum = this.registerA + this.registerC;
    this.FHalfCarry = (dirtySum & 0xf) < (this.registerA & 0xf);
    this.FCarry = dirtySum > 0xff;
    this.registerA = dirtySum & 0xff;
    this.FZero = this.registerA === 0;
    this.FSubtract = false;
  },
  //ADD A, D
  //#0x82:
  function() {
    var dirtySum = this.registerA + this.registerD;
    this.FHalfCarry = (dirtySum & 0xf) < (this.registerA & 0xf);
    this.FCarry = dirtySum > 0xff;
    this.registerA = dirtySum & 0xff;
    this.FZero = this.registerA === 0;
    this.FSubtract = false;
  },
  //ADD A, E
  //#0x83:
  function() {
    var dirtySum = this.registerA + this.registerE;
    this.FHalfCarry = (dirtySum & 0xf) < (this.registerA & 0xf);
    this.FCarry = dirtySum > 0xff;
    this.registerA = dirtySum & 0xff;
    this.FZero = this.registerA === 0;
    this.FSubtract = false;
  },
  //ADD A, H
  //#0x84:
  function() {
    var dirtySum = this.registerA + (this.registersHL >> 8);
    this.FHalfCarry = (dirtySum & 0xf) < (this.registerA & 0xf);
    this.FCarry = dirtySum > 0xff;
    this.registerA = dirtySum & 0xff;
    this.FZero = this.registerA === 0;
    this.FSubtract = false;
  },
  //ADD A, L
  //#0x85:
  function() {
    var dirtySum = this.registerA + (this.registersHL & 0xff);
    this.FHalfCarry = (dirtySum & 0xf) < (this.registerA & 0xf);
    this.FCarry = dirtySum > 0xff;
    this.registerA = dirtySum & 0xff;
    this.FZero = this.registerA === 0;
    this.FSubtract = false;
  },
  //ADD A, (HL)
  //#0x86:
  function() {
    var dirtySum = this.registerA +
      this.memoryReader[this.registersHL].apply(this, [this.registersHL]);
    this.FHalfCarry = (dirtySum & 0xf) < (this.registerA & 0xf);
    this.FCarry = dirtySum > 0xff;
    this.registerA = dirtySum & 0xff;
    this.FZero = this.registerA === 0;
    this.FSubtract = false;
  },
  //ADD A, A
  //#0x87:
  function() {
    this.FHalfCarry = (this.registerA & 0x8) === 0x8;
    this.FCarry = this.registerA > 0x7f;
    this.registerA = this.registerA << 1 & 0xff;
    this.FZero = this.registerA === 0;
    this.FSubtract = false;
  },
  //ADC A, B
  //#0x88:
  function() {
    var dirtySum = this.registerA + this.registerB + (this.FCarry ? 1 : 0);
    this.FHalfCarry = (this.registerA & 0xf) +
      (this.registerB & 0xf) +
      (this.FCarry ? 1 : 0) >
      0xf;
    this.FCarry = dirtySum > 0xff;
    this.registerA = dirtySum & 0xff;
    this.FZero = this.registerA === 0;
    this.FSubtract = false;
  },
  //ADC A, C
  //#0x89:
  function() {
    var dirtySum = this.registerA + this.registerC + (this.FCarry ? 1 : 0);
    this.FHalfCarry = (this.registerA & 0xf) +
      (this.registerC & 0xf) +
      (this.FCarry ? 1 : 0) >
      0xf;
    this.FCarry = dirtySum > 0xff;
    this.registerA = dirtySum & 0xff;
    this.FZero = this.registerA === 0;
    this.FSubtract = false;
  },
  //ADC A, D
  //#0x8A:
  function() {
    var dirtySum = this.registerA + this.registerD + (this.FCarry ? 1 : 0);
    this.FHalfCarry = (this.registerA & 0xf) +
      (this.registerD & 0xf) +
      (this.FCarry ? 1 : 0) >
      0xf;
    this.FCarry = dirtySum > 0xff;
    this.registerA = dirtySum & 0xff;
    this.FZero = this.registerA === 0;
    this.FSubtract = false;
  },
  //ADC A, E
  //#0x8B:
  function() {
    var dirtySum = this.registerA + this.registerE + (this.FCarry ? 1 : 0);
    this.FHalfCarry = (this.registerA & 0xf) +
      (this.registerE & 0xf) +
      (this.FCarry ? 1 : 0) >
      0xf;
    this.FCarry = dirtySum > 0xff;
    this.registerA = dirtySum & 0xff;
    this.FZero = this.registerA === 0;
    this.FSubtract = false;
  },
  //ADC A, H
  //#0x8C:
  function() {
    var tempValue = this.registersHL >> 8;
    var dirtySum = this.registerA + tempValue + (this.FCarry ? 1 : 0);
    this.FHalfCarry = (this.registerA & 0xf) +
      (tempValue & 0xf) +
      (this.FCarry ? 1 : 0) >
      0xf;
    this.FCarry = dirtySum > 0xff;
    this.registerA = dirtySum & 0xff;
    this.FZero = this.registerA === 0;
    this.FSubtract = false;
  },
  //ADC A, L
  //#0x8D:
  function() {
    var tempValue = this.registersHL & 0xff;
    var dirtySum = this.registerA + tempValue + (this.FCarry ? 1 : 0);
    this.FHalfCarry = (this.registerA & 0xf) +
      (tempValue & 0xf) +
      (this.FCarry ? 1 : 0) >
      0xf;
    this.FCarry = dirtySum > 0xff;
    this.registerA = dirtySum & 0xff;
    this.FZero = this.registerA === 0;
    this.FSubtract = false;
  },
  //ADC A, (HL)
  //#0x8E:
  function() {
    var tempValue = this.memoryReader[this.registersHL].apply(this, [
      this.registersHL
    ]);
    var dirtySum = this.registerA + tempValue + (this.FCarry ? 1 : 0);
    this.FHalfCarry = (this.registerA & 0xf) +
      (tempValue & 0xf) +
      (this.FCarry ? 1 : 0) >
      0xf;
    this.FCarry = dirtySum > 0xff;
    this.registerA = dirtySum & 0xff;
    this.FZero = this.registerA === 0;
    this.FSubtract = false;
  },
  //ADC A, A
  //#0x8F:
  function() {
    //shift left register A one bit for some ops here as an optimization:
    var dirtySum = this.registerA << 1 | (this.FCarry ? 1 : 0);
    this.FHalfCarry = (this.registerA << 1 & 0x1e | (this.FCarry ? 1 : 0)) >
      0xf;
    this.FCarry = dirtySum > 0xff;
    this.registerA = dirtySum & 0xff;
    this.FZero = this.registerA === 0;
    this.FSubtract = false;
  },
  //SUB A, B
  //#0x90:
  function() {
    var dirtySum = this.registerA - this.registerB;
    this.FHalfCarry = (this.registerA & 0xf) < (dirtySum & 0xf);
    this.FCarry = dirtySum < 0;
    this.registerA = dirtySum & 0xff;
    this.FZero = dirtySum === 0;
    this.FSubtract = true;
  },
  //SUB A, C
  //#0x91:
  function() {
    var dirtySum = this.registerA - this.registerC;
    this.FHalfCarry = (this.registerA & 0xf) < (dirtySum & 0xf);
    this.FCarry = dirtySum < 0;
    this.registerA = dirtySum & 0xff;
    this.FZero = dirtySum === 0;
    this.FSubtract = true;
  },
  //SUB A, D
  //#0x92:
  function() {
    var dirtySum = this.registerA - this.registerD;
    this.FHalfCarry = (this.registerA & 0xf) < (dirtySum & 0xf);
    this.FCarry = dirtySum < 0;
    this.registerA = dirtySum & 0xff;
    this.FZero = dirtySum === 0;
    this.FSubtract = true;
  },
  //SUB A, E
  //#0x93:
  function() {
    var dirtySum = this.registerA - this.registerE;
    this.FHalfCarry = (this.registerA & 0xf) < (dirtySum & 0xf);
    this.FCarry = dirtySum < 0;
    this.registerA = dirtySum & 0xff;
    this.FZero = dirtySum === 0;
    this.FSubtract = true;
  },
  //SUB A, H
  //#0x94:
  function() {
    var dirtySum = this.registerA - (this.registersHL >> 8);
    this.FHalfCarry = (this.registerA & 0xf) < (dirtySum & 0xf);
    this.FCarry = dirtySum < 0;
    this.registerA = dirtySum & 0xff;
    this.FZero = dirtySum === 0;
    this.FSubtract = true;
  },
  //SUB A, L
  //#0x95:
  function() {
    var dirtySum = this.registerA - (this.registersHL & 0xff);
    this.FHalfCarry = (this.registerA & 0xf) < (dirtySum & 0xf);
    this.FCarry = dirtySum < 0;
    this.registerA = dirtySum & 0xff;
    this.FZero = dirtySum === 0;
    this.FSubtract = true;
  },
  //SUB A, (HL)
  //#0x96:
  function() {
    var dirtySum = this.registerA -
      this.memoryReader[this.registersHL].apply(this, [this.registersHL]);
    this.FHalfCarry = (this.registerA & 0xf) < (dirtySum & 0xf);
    this.FCarry = dirtySum < 0;
    this.registerA = dirtySum & 0xff;
    this.FZero = dirtySum === 0;
    this.FSubtract = true;
  },
  //SUB A, A
  //#0x97:
  function() {
    //number - same number === 0
    this.registerA = 0;
    this.FHalfCarry = this.FCarry = false;
    this.FZero = this.FSubtract = true;
  },
  //SBC A, B
  //#0x98:
  function() {
    var dirtySum = this.registerA - this.registerB - (this.FCarry ? 1 : 0);
    this.FHalfCarry = (this.registerA & 0xf) -
      (this.registerB & 0xf) -
      (this.FCarry ? 1 : 0) <
      0;
    this.FCarry = dirtySum < 0;
    this.registerA = dirtySum & 0xff;
    this.FZero = this.registerA === 0;
    this.FSubtract = true;
  },
  //SBC A, C
  //#0x99:
  function() {
    var dirtySum = this.registerA - this.registerC - (this.FCarry ? 1 : 0);
    this.FHalfCarry = (this.registerA & 0xf) -
      (this.registerC & 0xf) -
      (this.FCarry ? 1 : 0) <
      0;
    this.FCarry = dirtySum < 0;
    this.registerA = dirtySum & 0xff;
    this.FZero = this.registerA === 0;
    this.FSubtract = true;
  },
  //SBC A, D
  //#0x9A:
  function() {
    var dirtySum = this.registerA - this.registerD - (this.FCarry ? 1 : 0);
    this.FHalfCarry = (this.registerA & 0xf) -
      (this.registerD & 0xf) -
      (this.FCarry ? 1 : 0) <
      0;
    this.FCarry = dirtySum < 0;
    this.registerA = dirtySum & 0xff;
    this.FZero = this.registerA === 0;
    this.FSubtract = true;
  },
  //SBC A, E
  //#0x9B:
  function() {
    var dirtySum = this.registerA - this.registerE - (this.FCarry ? 1 : 0);
    this.FHalfCarry = (this.registerA & 0xf) -
      (this.registerE & 0xf) -
      (this.FCarry ? 1 : 0) <
      0;
    this.FCarry = dirtySum < 0;
    this.registerA = dirtySum & 0xff;
    this.FZero = this.registerA === 0;
    this.FSubtract = true;
  },
  //SBC A, H
  //#0x9C:
  function() {
    var temp_var = this.registersHL >> 8;
    var dirtySum = this.registerA - temp_var - (this.FCarry ? 1 : 0);
    this.FHalfCarry = (this.registerA & 0xf) -
      (temp_var & 0xf) -
      (this.FCarry ? 1 : 0) <
      0;
    this.FCarry = dirtySum < 0;
    this.registerA = dirtySum & 0xff;
    this.FZero = this.registerA === 0;
    this.FSubtract = true;
  },
  //SBC A, L
  //#0x9D:
  function() {
    var dirtySum = this.registerA -
      (this.registersHL & 0xff) -
      (this.FCarry ? 1 : 0);
    this.FHalfCarry = (this.registerA & 0xf) -
      (this.registersHL & 0xf) -
      (this.FCarry ? 1 : 0) <
      0;
    this.FCarry = dirtySum < 0;
    this.registerA = dirtySum & 0xff;
    this.FZero = this.registerA === 0;
    this.FSubtract = true;
  },
  //SBC A, (HL)
  //#0x9E:
  function() {
    var temp_var = this.memoryReader[this.registersHL].apply(this, [
      this.registersHL
    ]);
    var dirtySum = this.registerA - temp_var - (this.FCarry ? 1 : 0);
    this.FHalfCarry = (this.registerA & 0xf) -
      (temp_var & 0xf) -
      (this.FCarry ? 1 : 0) <
      0;
    this.FCarry = dirtySum < 0;
    this.registerA = dirtySum & 0xff;
    this.FZero = this.registerA === 0;
    this.FSubtract = true;
  },
  //SBC A, A
  //#0x9F:
  function() {
    //Optimized SBC A:
    if (this.FCarry) {
      this.FZero = false;
      this.FSubtract = this.FHalfCarry = this.FCarry = true;
      this.registerA = 0xff;
    } else {
      this.FHalfCarry = this.FCarry = false;
      this.FSubtract = this.FZero = true;
      this.registerA = 0;
    }
  },
  //AND B
  //#0xA0:
  function() {
    this.registerA &= this.registerB;
    this.FZero = this.registerA === 0;
    this.FHalfCarry = true;
    this.FSubtract = this.FCarry = false;
  },
  //AND C
  //#0xA1:
  function() {
    this.registerA &= this.registerC;
    this.FZero = this.registerA === 0;
    this.FHalfCarry = true;
    this.FSubtract = this.FCarry = false;
  },
  //AND D
  //#0xA2:
  function() {
    this.registerA &= this.registerD;
    this.FZero = this.registerA === 0;
    this.FHalfCarry = true;
    this.FSubtract = this.FCarry = false;
  },
  //AND E
  //#0xA3:
  function() {
    this.registerA &= this.registerE;
    this.FZero = this.registerA === 0;
    this.FHalfCarry = true;
    this.FSubtract = this.FCarry = false;
  },
  //AND H
  //#0xA4:
  function() {
    this.registerA &= this.registersHL >> 8;
    this.FZero = this.registerA === 0;
    this.FHalfCarry = true;
    this.FSubtract = this.FCarry = false;
  },
  //AND L
  //#0xA5:
  function() {
    this.registerA &= this.registersHL;
    this.FZero = this.registerA === 0;
    this.FHalfCarry = true;
    this.FSubtract = this.FCarry = false;
  },
  //AND (HL)
  //#0xA6:
  function() {
    this.registerA &= this.memoryReader[this.registersHL].apply(this, [
      this.registersHL
    ]);
    this.FZero = this.registerA === 0;
    this.FHalfCarry = true;
    this.FSubtract = this.FCarry = false;
  },
  //AND A
  //#0xA7:
  function() {
    //number & same number = same number
    this.FZero = this.registerA === 0;
    this.FHalfCarry = true;
    this.FSubtract = this.FCarry = false;
  },
  //XOR B
  //#0xA8:
  function() {
    this.registerA ^= this.registerB;
    this.FZero = this.registerA === 0;
    this.FSubtract = this.FHalfCarry = this.FCarry = false;
  },
  //XOR C
  //#0xA9:
  function() {
    this.registerA ^= this.registerC;
    this.FZero = this.registerA === 0;
    this.FSubtract = this.FHalfCarry = this.FCarry = false;
  },
  //XOR D
  //#0xAA:
  function() {
    this.registerA ^= this.registerD;
    this.FZero = this.registerA === 0;
    this.FSubtract = this.FHalfCarry = this.FCarry = false;
  },
  //XOR E
  //#0xAB:
  function() {
    this.registerA ^= this.registerE;
    this.FZero = this.registerA === 0;
    this.FSubtract = this.FHalfCarry = this.FCarry = false;
  },
  //XOR H
  //#0xAC:
  function() {
    this.registerA ^= this.registersHL >> 8;
    this.FZero = this.registerA === 0;
    this.FSubtract = this.FHalfCarry = this.FCarry = false;
  },
  //XOR L
  //#0xAD:
  function() {
    this.registerA ^= this.registersHL & 0xff;
    this.FZero = this.registerA === 0;
    this.FSubtract = this.FHalfCarry = this.FCarry = false;
  },
  //XOR (HL)
  //#0xAE:
  function() {
    this.registerA ^= this.memoryReader[this.registersHL].apply(this, [
      this.registersHL
    ]);
    this.FZero = this.registerA === 0;
    this.FSubtract = this.FHalfCarry = this.FCarry = false;
  },
  //XOR A
  //#0xAF:
  function() {
    //number ^ same number === 0
    this.registerA = 0;
    this.FZero = true;
    this.FSubtract = this.FHalfCarry = this.FCarry = false;
  },
  //OR B
  //#0xB0:
  function() {
    this.registerA |= this.registerB;
    this.FZero = this.registerA === 0;
    this.FSubtract = this.FCarry = this.FHalfCarry = false;
  },
  //OR C
  //#0xB1:
  function() {
    this.registerA |= this.registerC;
    this.FZero = this.registerA === 0;
    this.FSubtract = this.FCarry = this.FHalfCarry = false;
  },
  //OR D
  //#0xB2:
  function() {
    this.registerA |= this.registerD;
    this.FZero = this.registerA === 0;
    this.FSubtract = this.FCarry = this.FHalfCarry = false;
  },
  //OR E
  //#0xB3:
  function() {
    this.registerA |= this.registerE;
    this.FZero = this.registerA === 0;
    this.FSubtract = this.FCarry = this.FHalfCarry = false;
  },
  //OR H
  //#0xB4:
  function() {
    this.registerA |= this.registersHL >> 8;
    this.FZero = this.registerA === 0;
    this.FSubtract = this.FCarry = this.FHalfCarry = false;
  },
  //OR L
  //#0xB5:
  function() {
    this.registerA |= this.registersHL & 0xff;
    this.FZero = this.registerA === 0;
    this.FSubtract = this.FCarry = this.FHalfCarry = false;
  },
  //OR (HL)
  //#0xB6:
  function() {
    this.registerA |= this.memoryReader[this.registersHL].apply(this, [
      this.registersHL
    ]);
    this.FZero = this.registerA === 0;
    this.FSubtract = this.FCarry = this.FHalfCarry = false;
  },
  //OR A
  //#0xB7:
  function() {
    //number | same number === same number
    this.FZero = this.registerA === 0;
    this.FSubtract = this.FCarry = this.FHalfCarry = false;
  },
  //CP B
  //#0xB8:
  function() {
    var dirtySum = this.registerA - this.registerB;
    this.FHalfCarry = (dirtySum & 0xf) > (this.registerA & 0xf);
    this.FCarry = dirtySum < 0;
    this.FZero = dirtySum === 0;
    this.FSubtract = true;
  },
  //CP C
  //#0xB9:
  function() {
    var dirtySum = this.registerA - this.registerC;
    this.FHalfCarry = (dirtySum & 0xf) > (this.registerA & 0xf);
    this.FCarry = dirtySum < 0;
    this.FZero = dirtySum === 0;
    this.FSubtract = true;
  },
  //CP D
  //#0xBA:
  function() {
    var dirtySum = this.registerA - this.registerD;
    this.FHalfCarry = (dirtySum & 0xf) > (this.registerA & 0xf);
    this.FCarry = dirtySum < 0;
    this.FZero = dirtySum === 0;
    this.FSubtract = true;
  },
  //CP E
  //#0xBB:
  function() {
    var dirtySum = this.registerA - this.registerE;
    this.FHalfCarry = (dirtySum & 0xf) > (this.registerA & 0xf);
    this.FCarry = dirtySum < 0;
    this.FZero = dirtySum === 0;
    this.FSubtract = true;
  },
  //CP H
  //#0xBC:
  function() {
    var dirtySum = this.registerA - (this.registersHL >> 8);
    this.FHalfCarry = (dirtySum & 0xf) > (this.registerA & 0xf);
    this.FCarry = dirtySum < 0;
    this.FZero = dirtySum === 0;
    this.FSubtract = true;
  },
  //CP L
  //#0xBD:
  function() {
    var dirtySum = this.registerA - (this.registersHL & 0xff);
    this.FHalfCarry = (dirtySum & 0xf) > (this.registerA & 0xf);
    this.FCarry = dirtySum < 0;
    this.FZero = dirtySum === 0;
    this.FSubtract = true;
  },
  //CP (HL)
  //#0xBE:
  function() {
    var dirtySum = this.registerA -
      this.memoryReader[this.registersHL].apply(this, [this.registersHL]);
    this.FHalfCarry = (dirtySum & 0xf) > (this.registerA & 0xf);
    this.FCarry = dirtySum < 0;
    this.FZero = dirtySum === 0;
    this.FSubtract = true;
  },
  //CP A
  //#0xBF:
  function() {
    this.FHalfCarry = this.FCarry = false;
    this.FZero = this.FSubtract = true;
  },
  //RET !FZ
  //#0xC0:
  function() {
    if (!this.FZero) {
      this.programCounter = this.memoryRead(this.stackPointer + 1 & 0xffff) <<
        8 |
        this.memoryReader[this.stackPointer].apply(this, [this.stackPointer]);
      this.stackPointer = this.stackPointer + 2 & 0xffff;
      this.CPUTicks += 12;
    }
  },
  //POP BC
  //#0xC1:
  function() {
    this.registerC = this.memoryReader[this.stackPointer].apply(this, [
      this.stackPointer
    ]);
    this.registerB = this.memoryRead(this.stackPointer + 1 & 0xffff);
    this.stackPointer = this.stackPointer + 2 & 0xffff;
  },
  //JP !FZ, nn
  //#0xC2:
  function() {
    if (!this.FZero) {
      this.programCounter = this.memoryRead(this.programCounter + 1 & 0xffff) <<
        8 |
        this.memoryReader[this.programCounter].apply(this, [
          this.programCounter
        ]);
      this.CPUTicks += 4;
    } else {
      this.programCounter = this.programCounter + 2 & 0xffff;
    }
  },
  //JP nn
  //#0xC3:
  function() {
    this.programCounter = this.memoryRead(this.programCounter + 1 & 0xffff) <<
      8 |
      this.memoryReader[this.programCounter].apply(this, [this.programCounter]);
  },
  //CALL !FZ, nn
  //#0xC4:
  function() {
    if (!this.FZero) {
      var temp_pc = this.memoryRead(this.programCounter + 1 & 0xffff) << 8 |
        this.memoryReader[this.programCounter].apply(this, [
          this.programCounter
        ]);
      this.programCounter = this.programCounter + 2 & 0xffff;
      this.stackPointer = this.stackPointer - 1 & 0xffff;
      this.memoryWriter[this.stackPointer].apply(this, [
        this.stackPointer,
        this.programCounter >> 8
      ]);
      this.stackPointer = this.stackPointer - 1 & 0xffff;
      this.memoryWriter[this.stackPointer].apply(this, [
        this.stackPointer,
        this.programCounter & 0xff
      ]);
      this.programCounter = temp_pc;
      this.CPUTicks += 12;
    } else {
      this.programCounter = this.programCounter + 2 & 0xffff;
    }
  },
  //PUSH BC
  //#0xC5:
  function() {
    this.stackPointer = this.stackPointer - 1 & 0xffff;
    this.memoryWriter[this.stackPointer].apply(this, [
      this.stackPointer,
      this.registerB
    ]);
    this.stackPointer = this.stackPointer - 1 & 0xffff;
    this.memoryWriter[this.stackPointer].apply(this, [
      this.stackPointer,
      this.registerC
    ]);
  },
  //ADD, n
  //#0xC6:
  function() {
    var dirtySum = this.registerA +
      this.memoryReader[this.programCounter].apply(this, [this.programCounter]);
    this.programCounter = this.programCounter + 1 & 0xffff;
    this.FHalfCarry = (dirtySum & 0xf) < (this.registerA & 0xf);
    this.FCarry = dirtySum > 0xff;
    this.registerA = dirtySum & 0xff;
    this.FZero = this.registerA === 0;
    this.FSubtract = false;
  },
  //RST 0
  //#0xC7:
  function() {
    this.stackPointer = this.stackPointer - 1 & 0xffff;
    this.memoryWriter[this.stackPointer].apply(this, [
      this.stackPointer,
      this.programCounter >> 8
    ]);
    this.stackPointer = this.stackPointer - 1 & 0xffff;
    this.memoryWriter[this.stackPointer].apply(this, [
      this.stackPointer,
      this.programCounter & 0xff
    ]);
    this.programCounter = 0;
  },
  //RET FZ
  //#0xC8:
  function() {
    if (this.FZero) {
      this.programCounter = this.memoryRead(this.stackPointer + 1 & 0xffff) <<
        8 |
        this.memoryReader[this.stackPointer].apply(this, [this.stackPointer]);
      this.stackPointer = this.stackPointer + 2 & 0xffff;
      this.CPUTicks += 12;
    }
  },
  //RET
  //#0xC9:
  function() {
    this.programCounter = this.memoryRead(this.stackPointer + 1 & 0xffff) << 8 |
      this.memoryReader[this.stackPointer].apply(this, [this.stackPointer]);
    this.stackPointer = this.stackPointer + 2 & 0xffff;
  },
  //JP FZ, nn
  //#0xCA:
  function() {
    if (this.FZero) {
      this.programCounter = this.memoryRead(this.programCounter + 1 & 0xffff) <<
        8 |
        this.memoryReader[this.programCounter].apply(this, [
          this.programCounter
        ]);
      this.CPUTicks += 4;
    } else {
      this.programCounter = this.programCounter + 2 & 0xffff;
    }
  },
  //Secondary OP Code Set:
  //#0xCB:
  function() {
    const operationCode = this.memoryReader[this.programCounter].apply(this, [
      this.programCounter
    ]);
    //Increment the program counter to the next instruction:
    this.programCounter = this.programCounter + 1 & 0xffff;
    //Get how many CPU cycles the current 0xCBXX op code counts for:
    this.CPUTicks += this.SecondaryTickTable[operationCode];
    //Execute secondary OP codes for the 0xCB OP code call.
    bitInstructions[operationCode].apply(this);
  },
  //CALL FZ, nn
  //#0xCC:
  function() {
    if (this.FZero) {
      var temp_pc = this.memoryRead(this.programCounter + 1 & 0xffff) << 8 |
        this.memoryReader[this.programCounter].apply(this, [
          this.programCounter
        ]);
      this.programCounter = this.programCounter + 2 & 0xffff;
      this.stackPointer = this.stackPointer - 1 & 0xffff;
      this.memoryWriter[this.stackPointer].apply(this, [
        this.stackPointer,
        this.programCounter >> 8
      ]);
      this.stackPointer = this.stackPointer - 1 & 0xffff;
      this.memoryWriter[this.stackPointer].apply(this, [
        this.stackPointer,
        this.programCounter & 0xff
      ]);
      this.programCounter = temp_pc;
      this.CPUTicks += 12;
    } else {
      this.programCounter = this.programCounter + 2 & 0xffff;
    }
  },
  //CALL nn
  //#0xCD:
  function() {
    var temp_pc = this.memoryRead(this.programCounter + 1 & 0xffff) << 8 |
      this.memoryReader[this.programCounter].apply(this, [this.programCounter]);
    this.programCounter = this.programCounter + 2 & 0xffff;
    this.stackPointer = this.stackPointer - 1 & 0xffff;
    this.memoryWriter[this.stackPointer].apply(this, [
      this.stackPointer,
      this.programCounter >> 8
    ]);
    this.stackPointer = this.stackPointer - 1 & 0xffff;
    this.memoryWriter[this.stackPointer].apply(this, [
      this.stackPointer,
      this.programCounter & 0xff
    ]);
    this.programCounter = temp_pc;
  },
  //ADC A, n
  //#0xCE:
  function() {
    var tempValue = this.memoryReader[this.programCounter].apply(this, [
      this.programCounter
    ]);
    this.programCounter = this.programCounter + 1 & 0xffff;
    var dirtySum = this.registerA + tempValue + (this.FCarry ? 1 : 0);
    this.FHalfCarry = (this.registerA & 0xf) +
      (tempValue & 0xf) +
      (this.FCarry ? 1 : 0) >
      0xf;
    this.FCarry = dirtySum > 0xff;
    this.registerA = dirtySum & 0xff;
    this.FZero = this.registerA === 0;
    this.FSubtract = false;
  },
  //RST 0x8
  //#0xCF:
  function() {
    this.stackPointer = this.stackPointer - 1 & 0xffff;
    this.memoryWriter[this.stackPointer].apply(this, [
      this.stackPointer,
      this.programCounter >> 8
    ]);
    this.stackPointer = this.stackPointer - 1 & 0xffff;
    this.memoryWriter[this.stackPointer].apply(this, [
      this.stackPointer,
      this.programCounter & 0xff
    ]);
    this.programCounter = 0x8;
  },
  //RET !FC
  //#0xD0:
  function() {
    if (!this.FCarry) {
      this.programCounter = this.memoryRead(this.stackPointer + 1 & 0xffff) <<
        8 |
        this.memoryReader[this.stackPointer].apply(this, [this.stackPointer]);
      this.stackPointer = this.stackPointer + 2 & 0xffff;
      this.CPUTicks += 12;
    }
  },
  //POP DE
  //#0xD1:
  function() {
    this.registerE = this.memoryReader[this.stackPointer].apply(this, [
      this.stackPointer
    ]);
    this.registerD = this.memoryRead(this.stackPointer + 1 & 0xffff);
    this.stackPointer = this.stackPointer + 2 & 0xffff;
  },
  //JP !FC, nn
  //#0xD2:
  function() {
    if (!this.FCarry) {
      this.programCounter = this.memoryRead(this.programCounter + 1 & 0xffff) <<
        8 |
        this.memoryReader[this.programCounter].apply(this, [
          this.programCounter
        ]);
      this.CPUTicks += 4;
    } else {
      this.programCounter = this.programCounter + 2 & 0xffff;
    }
  },
  //0xD3 - Illegal
  //#0xD3:
  function() {
    console.log("Illegal op code 0xD3 called, pausing emulation.", 2);
    pause();
  },
  //CALL !FC, nn
  //#0xD4:
  function() {
    if (!this.FCarry) {
      var temp_pc = this.memoryRead(this.programCounter + 1 & 0xffff) << 8 |
        this.memoryReader[this.programCounter].apply(this, [
          this.programCounter
        ]);
      this.programCounter = this.programCounter + 2 & 0xffff;
      this.stackPointer = this.stackPointer - 1 & 0xffff;
      this.memoryWriter[this.stackPointer].apply(this, [
        this.stackPointer,
        this.programCounter >> 8
      ]);
      this.stackPointer = this.stackPointer - 1 & 0xffff;
      this.memoryWriter[this.stackPointer].apply(this, [
        this.stackPointer,
        this.programCounter & 0xff
      ]);
      this.programCounter = temp_pc;
      this.CPUTicks += 12;
    } else {
      this.programCounter = this.programCounter + 2 & 0xffff;
    }
  },
  //PUSH DE
  //#0xD5:
  function() {
    this.stackPointer = this.stackPointer - 1 & 0xffff;
    this.memoryWriter[this.stackPointer].apply(this, [
      this.stackPointer,
      this.registerD
    ]);
    this.stackPointer = this.stackPointer - 1 & 0xffff;
    this.memoryWriter[this.stackPointer].apply(this, [
      this.stackPointer,
      this.registerE
    ]);
  },
  //SUB A, n
  //#0xD6:
  function() {
    var dirtySum = this.registerA -
      this.memoryReader[this.programCounter].apply(this, [this.programCounter]);
    this.programCounter = this.programCounter + 1 & 0xffff;
    this.FHalfCarry = (this.registerA & 0xf) < (dirtySum & 0xf);
    this.FCarry = dirtySum < 0;
    this.registerA = dirtySum & 0xff;
    this.FZero = dirtySum === 0;
    this.FSubtract = true;
  },
  //RST 0x10
  //#0xD7:
  function() {
    this.stackPointer = this.stackPointer - 1 & 0xffff;
    this.memoryWriter[this.stackPointer].apply(this, [
      this.stackPointer,
      this.programCounter >> 8
    ]);
    this.stackPointer = this.stackPointer - 1 & 0xffff;
    this.memoryWriter[this.stackPointer].apply(this, [
      this.stackPointer,
      this.programCounter & 0xff
    ]);
    this.programCounter = 0x10;
  },
  //RET FC
  //#0xD8:
  function() {
    if (this.FCarry) {
      this.programCounter = this.memoryRead(this.stackPointer + 1 & 0xffff) <<
        8 |
        this.memoryReader[this.stackPointer].apply(this, [this.stackPointer]);
      this.stackPointer = this.stackPointer + 2 & 0xffff;
      this.CPUTicks += 12;
    }
  },
  //RETI
  //#0xD9:
  function() {
    this.programCounter = this.memoryRead(this.stackPointer + 1 & 0xffff) << 8 |
      this.memoryReader[this.stackPointer].apply(this, [this.stackPointer]);
    this.stackPointer = this.stackPointer + 2 & 0xffff;
    //Immediate for HALT:
    this.IRQEnableDelay = this.IRQEnableDelay === 2 ||
      this.memoryReader[this.programCounter].apply(this, [
        this.programCounter
      ]) ===
        0x76
      ? 1
      : 2;
  },
  //JP FC, nn
  //#0xDA:
  function() {
    if (this.FCarry) {
      this.programCounter = this.memoryRead(this.programCounter + 1 & 0xffff) <<
        8 |
        this.memoryReader[this.programCounter].apply(this, [
          this.programCounter
        ]);
      this.CPUTicks += 4;
    } else {
      this.programCounter = this.programCounter + 2 & 0xffff;
    }
  },
  //0xDB - Illegal
  //#0xDB:
  function() {
    console.log("Illegal op code 0xDB called, pausing emulation.", 2);
    pause();
  },
  //CALL FC, nn
  //#0xDC:
  function() {
    if (this.FCarry) {
      var temp_pc = this.memoryRead(this.programCounter + 1 & 0xffff) << 8 |
        this.memoryReader[this.programCounter].apply(this, [
          this.programCounter
        ]);
      this.programCounter = this.programCounter + 2 & 0xffff;
      this.stackPointer = this.stackPointer - 1 & 0xffff;
      this.memoryWriter[this.stackPointer].apply(this, [
        this.stackPointer,
        this.programCounter >> 8
      ]);
      this.stackPointer = this.stackPointer - 1 & 0xffff;
      this.memoryWriter[this.stackPointer].apply(this, [
        this.stackPointer,
        this.programCounter & 0xff
      ]);
      this.programCounter = temp_pc;
      this.CPUTicks += 12;
    } else {
      this.programCounter = this.programCounter + 2 & 0xffff;
    }
  },
  //0xDD - Illegal
  //#0xDD:
  function() {
    console.log("Illegal op code 0xDD called, pausing emulation.", 2);
    pause();
  },
  //SBC A, n
  //#0xDE:
  function() {
    var temp_var = this.memoryReader[this.programCounter].apply(this, [
      this.programCounter
    ]);
    this.programCounter = this.programCounter + 1 & 0xffff;
    var dirtySum = this.registerA - temp_var - (this.FCarry ? 1 : 0);
    this.FHalfCarry = (this.registerA & 0xf) -
      (temp_var & 0xf) -
      (this.FCarry ? 1 : 0) <
      0;
    this.FCarry = dirtySum < 0;
    this.registerA = dirtySum & 0xff;
    this.FZero = this.registerA === 0;
    this.FSubtract = true;
  },
  //RST 0x18
  //#0xDF:
  function() {
    this.stackPointer = this.stackPointer - 1 & 0xffff;
    this.memoryWriter[this.stackPointer].apply(this, [
      this.stackPointer,
      this.programCounter >> 8
    ]);
    this.stackPointer = this.stackPointer - 1 & 0xffff;
    this.memoryWriter[this.stackPointer].apply(this, [
      this.stackPointer,
      this.programCounter & 0xff
    ]);
    this.programCounter = 0x18;
  },
  //LDH (n), A
  //#0xE0:
  function() {
    this.memoryHighWrite(
      this.memoryReader[this.programCounter].apply(this, [this.programCounter]),
      this.registerA
    );
    this.programCounter = this.programCounter + 1 & 0xffff;
  },
  //POP HL
  //#0xE1:
  function() {
    this.registersHL = this.memoryRead(this.stackPointer + 1 & 0xffff) << 8 |
      this.memoryReader[this.stackPointer].apply(this, [this.stackPointer]);
    this.stackPointer = this.stackPointer + 2 & 0xffff;
  },
  //LD (0xFF00 + C), A
  //#0xE2:
  function() {
    this.memoryHighWriter[this.registerC].apply(this, [
      this.registerC,
      this.registerA
    ]);
  },
  //0xE3 - Illegal
  //#0xE3:
  function() {
    console.log("Illegal op code 0xE3 called, pausing emulation.", 2);
    pause();
  },
  //0xE4 - Illegal
  //#0xE4:
  function() {
    console.log("Illegal op code 0xE4 called, pausing emulation.", 2);
    pause();
  },
  //PUSH HL
  //#0xE5:
  function() {
    this.stackPointer = this.stackPointer - 1 & 0xffff;
    this.memoryWriter[this.stackPointer].apply(this, [
      this.stackPointer,
      this.registersHL >> 8
    ]);
    this.stackPointer = this.stackPointer - 1 & 0xffff;
    this.memoryWriter[this.stackPointer].apply(this, [
      this.stackPointer,
      this.registersHL & 0xff
    ]);
  },
  //AND n
  //#0xE6:
  function() {
    this.registerA &= this.memoryReader[this.programCounter].apply(this, [
      this.programCounter
    ]);
    this.programCounter = this.programCounter + 1 & 0xffff;
    this.FZero = this.registerA === 0;
    this.FHalfCarry = true;
    this.FSubtract = this.FCarry = false;
  },
  //RST 0x20
  //#0xE7:
  function() {
    this.stackPointer = this.stackPointer - 1 & 0xffff;
    this.memoryWriter[this.stackPointer].apply(this, [
      this.stackPointer,
      this.programCounter >> 8
    ]);
    this.stackPointer = this.stackPointer - 1 & 0xffff;
    this.memoryWriter[this.stackPointer].apply(this, [
      this.stackPointer,
      this.programCounter & 0xff
    ]);
    this.programCounter = 0x20;
  },
  //ADD SP, n
  //#0xE8:
  function() {
    var temp_value2 = this.memoryReader[this.programCounter].apply(this, [
      this.programCounter
    ]) <<
      24 >>
      24;
    this.programCounter = this.programCounter + 1 & 0xffff;
    var temp_value = this.stackPointer + temp_value2 & 0xffff;
    temp_value2 = this.stackPointer ^ temp_value2 ^ temp_value;
    this.stackPointer = temp_value;
    this.FCarry = (temp_value2 & 0x100) === 0x100;
    this.FHalfCarry = (temp_value2 & 0x10) === 0x10;
    this.FZero = this.FSubtract = false;
  },
  //JP, (HL)
  //#0xE9:
  function() {
    this.programCounter = this.registersHL;
  },
  //LD n, A
  //#0xEA:
  function() {
    this.memoryWrite(
      this.memoryRead(this.programCounter + 1 & 0xffff) << 8 |
        this.memoryReader[this.programCounter].apply(this, [
          this.programCounter
        ]),
      this.registerA
    );
    this.programCounter = this.programCounter + 2 & 0xffff;
  },
  //0xEB - Illegal
  //#0xEB:
  function() {
    console.log("Illegal op code 0xEB called, pausing emulation.", 2);
    pause();
  },
  //0xEC - Illegal
  //#0xEC:
  function() {
    console.log("Illegal op code 0xEC called, pausing emulation.", 2);
    pause();
  },
  //0xED - Illegal
  //#0xED:
  function() {
    console.log("Illegal op code 0xED called, pausing emulation.", 2);
    pause();
  },
  //XOR n
  //#0xEE:
  function() {
    this.registerA ^= this.memoryReader[this.programCounter].apply(this, [
      this.programCounter
    ]);
    this.programCounter = this.programCounter + 1 & 0xffff;
    this.FZero = this.registerA === 0;
    this.FSubtract = this.FHalfCarry = this.FCarry = false;
  },
  //RST 0x28
  //#0xEF:
  function() {
    this.stackPointer = this.stackPointer - 1 & 0xffff;
    this.memoryWriter[this.stackPointer].apply(this, [
      this.stackPointer,
      this.programCounter >> 8
    ]);
    this.stackPointer = this.stackPointer - 1 & 0xffff;
    this.memoryWriter[this.stackPointer].apply(this, [
      this.stackPointer,
      this.programCounter & 0xff
    ]);
    this.programCounter = 0x28;
  },
  //LDH A, (n)
  //#0xF0:
  function() {
    this.registerA = this.memoryHighRead(
      this.memoryReader[this.programCounter].apply(this, [this.programCounter])
    );
    this.programCounter = this.programCounter + 1 & 0xffff;
  },
  //POP AF
  //#0xF1:
  function() {
    var temp_var = this.memoryReader[this.stackPointer].apply(this, [
      this.stackPointer
    ]);
    this.FZero = temp_var > 0x7f;
    this.FSubtract = (temp_var & 0x40) === 0x40;
    this.FHalfCarry = (temp_var & 0x20) === 0x20;
    this.FCarry = (temp_var & 0x10) === 0x10;
    this.registerA = this.memoryRead(this.stackPointer + 1 & 0xffff);
    this.stackPointer = this.stackPointer + 2 & 0xffff;
  },
  //LD A, (0xFF00 + C)
  //#0xF2:
  function() {
    this.registerA = this.memoryHighReader[this.registerC].apply(this, [
      this.registerC
    ]);
  },
  //DI
  //#0xF3:
  function() {
    this.IME = false;
    this.IRQEnableDelay = 0;
  },
  //0xF4 - Illegal
  //#0xF4:
  function() {
    console.log("Illegal op code 0xF4 called, pausing emulation.", 2);
    pause();
  },
  //PUSH AF
  //#0xF5:
  function() {
    this.stackPointer = this.stackPointer - 1 & 0xffff;
    this.memoryWriter[this.stackPointer].apply(this, [
      this.stackPointer,
      this.registerA
    ]);
    this.stackPointer = this.stackPointer - 1 & 0xffff;
    this.memoryWriter[this.stackPointer].apply(this, [
      this.stackPointer,
      (this.FZero ? 0x80 : 0) |
        (this.FSubtract ? 0x40 : 0) |
        (this.FHalfCarry ? 0x20 : 0) |
        (this.FCarry ? 0x10 : 0)
    ]);
  },
  //OR n
  //#0xF6:
  function() {
    this.registerA |= this.memoryReader[this.programCounter].apply(this, [
      this.programCounter
    ]);
    this.FZero = this.registerA === 0;
    this.programCounter = this.programCounter + 1 & 0xffff;
    this.FSubtract = this.FCarry = this.FHalfCarry = false;
  },
  //RST 0x30
  //#0xF7:
  function() {
    this.stackPointer = this.stackPointer - 1 & 0xffff;
    this.memoryWriter[this.stackPointer].apply(this, [
      this.stackPointer,
      this.programCounter >> 8
    ]);
    this.stackPointer = this.stackPointer - 1 & 0xffff;
    this.memoryWriter[this.stackPointer].apply(this, [
      this.stackPointer,
      this.programCounter & 0xff
    ]);
    this.programCounter = 0x30;
  },
  //LDHL SP, n
  //#0xF8:
  function() {
    var temp_var = this.memoryReader[this.programCounter].apply(this, [
      this.programCounter
    ]) <<
      24 >>
      24;
    this.programCounter = this.programCounter + 1 & 0xffff;
    this.registersHL = this.stackPointer + temp_var & 0xffff;
    temp_var = this.stackPointer ^ temp_var ^ this.registersHL;
    this.FCarry = (temp_var & 0x100) === 0x100;
    this.FHalfCarry = (temp_var & 0x10) === 0x10;
    this.FZero = this.FSubtract = false;
  },
  //LD SP, HL
  //#0xF9:
  function() {
    this.stackPointer = this.registersHL;
  },
  //LD A, (nn)
  //#0xFA:
  function() {
    this.registerA = this.memoryRead(
      this.memoryRead(this.programCounter + 1 & 0xffff) << 8 |
        this.memoryReader[this.programCounter].apply(this, [
          this.programCounter
        ])
    );
    this.programCounter = this.programCounter + 2 & 0xffff;
  },
  //EI
  //#0xFB:
  function() {
    //Immediate for HALT:
    this.IRQEnableDelay = this.IRQEnableDelay === 2 ||
      this.memoryReader[this.programCounter].apply(this, [
        this.programCounter
      ]) ===
        0x76
      ? 1
      : 2;
  },
  //0xFC - Illegal
  //#0xFC:
  function() {
    console.log("Illegal op code 0xFC called, pausing emulation.", 2);
    pause();
  },
  //0xFD - Illegal
  //#0xFD:
  function() {
    console.log("Illegal op code 0xFD called, pausing emulation.", 2);
    pause();
  },
  //CP n
  //#0xFE:
  function() {
    var dirtySum = this.registerA -
      this.memoryReader[this.programCounter].apply(this, [this.programCounter]);
    this.programCounter = this.programCounter + 1 & 0xffff;
    this.FHalfCarry = (dirtySum & 0xf) > (this.registerA & 0xf);
    this.FCarry = dirtySum < 0;
    this.FZero = dirtySum === 0;
    this.FSubtract = true;
  },
  //RST 0x38
  //#0xFF:
  function() {
    this.stackPointer = this.stackPointer - 1 & 0xffff;
    this.memoryWriter[this.stackPointer].apply(this, [
      this.stackPointer,
      this.programCounter >> 8
    ]);
    this.stackPointer = this.stackPointer - 1 & 0xffff;
    this.memoryWriter[this.stackPointer].apply(this, [
      this.stackPointer,
      this.programCounter & 0xff
    ]);
    this.programCounter = 0x38;
  }
];
