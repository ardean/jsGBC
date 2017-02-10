export default [
  //RLC B
  //#0x00:
  function() {
    this.FCarry = this.registerB > 0x7f;
    this.registerB = this.registerB << 1 & 0xff | (this.FCarry ? 1 : 0);
    this.FHalfCarry = this.FSubtract = false;
    this.FZero = this.registerB === 0;
  },
  //RLC C
  //#0x01:
  function() {
    this.FCarry = this.registerC > 0x7f;
    this.registerC = this.registerC << 1 & 0xff | (this.FCarry ? 1 : 0);
    this.FHalfCarry = this.FSubtract = false;
    this.FZero = this.registerC === 0;
  },
  //RLC D
  //#0x02:
  function() {
    this.FCarry = this.registerD > 0x7f;
    this.registerD = this.registerD << 1 & 0xff | (this.FCarry ? 1 : 0);
    this.FHalfCarry = this.FSubtract = false;
    this.FZero = this.registerD === 0;
  },
  //RLC E
  //#0x03:
  function() {
    this.FCarry = this.registerE > 0x7f;
    this.registerE = this.registerE << 1 & 0xff | (this.FCarry ? 1 : 0);
    this.FHalfCarry = this.FSubtract = false;
    this.FZero = this.registerE === 0;
  },
  //RLC H
  //#0x04:
  function() {
    this.FCarry = this.registersHL > 0x7fff;
    this.registersHL = this.registersHL << 1 & 0xfe00 |
      (this.FCarry ? 0x100 : 0) |
      this.registersHL & 0xff;
    this.FHalfCarry = this.FSubtract = false;
    this.FZero = this.registersHL < 0x100;
  },
  //RLC L
  //#0x05:
  function() {
    this.FCarry = (this.registersHL & 0x80) === 0x80;
    this.registersHL = this.registersHL & 0xff00 |
      this.registersHL << 1 & 0xff |
      (this.FCarry ? 1 : 0);
    this.FHalfCarry = this.FSubtract = false;
    this.FZero = (this.registersHL & 0xff) === 0;
  },
  //RLC (HL)
  //#0x06:
  function() {
    var temp_var = this.memoryReader[this.registersHL](this.registersHL);
    this.FCarry = temp_var > 0x7f;
    temp_var = temp_var << 1 & 0xff | (this.FCarry ? 1 : 0);
    this.memoryWriter[this.registersHL](this.registersHL, temp_var);
    this.FHalfCarry = this.FSubtract = false;
    this.FZero = temp_var === 0;
  },
  //RLC A
  //#0x07:
  function() {
    this.FCarry = this.registerA > 0x7f;
    this.registerA = this.registerA << 1 & 0xff | (this.FCarry ? 1 : 0);
    this.FHalfCarry = this.FSubtract = false;
    this.FZero = this.registerA === 0;
  },
  //RRC B
  //#0x08:
  function() {
    this.FCarry = (this.registerB & 0x01) === 0x01;
    this.registerB = (this.FCarry ? 0x80 : 0) | this.registerB >> 1;
    this.FHalfCarry = this.FSubtract = false;
    this.FZero = this.registerB === 0;
  },
  //RRC C
  //#0x09:
  function() {
    this.FCarry = (this.registerC & 0x01) === 0x01;
    this.registerC = (this.FCarry ? 0x80 : 0) | this.registerC >> 1;
    this.FHalfCarry = this.FSubtract = false;
    this.FZero = this.registerC === 0;
  },
  //RRC D
  //#0x0A:
  function() {
    this.FCarry = (this.registerD & 0x01) === 0x01;
    this.registerD = (this.FCarry ? 0x80 : 0) | this.registerD >> 1;
    this.FHalfCarry = this.FSubtract = false;
    this.FZero = this.registerD === 0;
  },
  //RRC E
  //#0x0B:
  function() {
    this.FCarry = (this.registerE & 0x01) === 0x01;
    this.registerE = (this.FCarry ? 0x80 : 0) | this.registerE >> 1;
    this.FHalfCarry = this.FSubtract = false;
    this.FZero = this.registerE === 0;
  },
  //RRC H
  //#0x0C:
  function() {
    this.FCarry = (this.registersHL & 0x0100) === 0x0100;
    this.registersHL = (this.FCarry ? 0x8000 : 0) |
      this.registersHL >> 1 & 0xff00 |
      this.registersHL & 0xff;
    this.FHalfCarry = this.FSubtract = false;
    this.FZero = this.registersHL < 0x100;
  },
  //RRC L
  //#0x0D:
  function() {
    this.FCarry = (this.registersHL & 0x01) === 0x01;
    this.registersHL = this.registersHL & 0xff00 |
      (this.FCarry ? 0x80 : 0) |
      (this.registersHL & 0xff) >> 1;
    this.FHalfCarry = this.FSubtract = false;
    this.FZero = (this.registersHL & 0xff) === 0;
  },
  //RRC (HL)
  //#0x0E:
  function() {
    var temp_var = this.memoryReader[this.registersHL](this.registersHL);
    this.FCarry = (temp_var & 0x01) === 0x01;
    temp_var = (this.FCarry ? 0x80 : 0) | temp_var >> 1;
    this.memoryWriter[this.registersHL](this.registersHL, temp_var);
    this.FHalfCarry = this.FSubtract = false;
    this.FZero = temp_var === 0;
  },
  //RRC A
  //#0x0F:
  function() {
    this.FCarry = (this.registerA & 0x01) === 0x01;
    this.registerA = (this.FCarry ? 0x80 : 0) | this.registerA >> 1;
    this.FHalfCarry = this.FSubtract = false;
    this.FZero = this.registerA === 0;
  },
  //RL B
  //#0x10:
  function() {
    var newFCarry = this.registerB > 0x7f;
    this.registerB = this.registerB << 1 & 0xff | (this.FCarry ? 1 : 0);
    this.FCarry = newFCarry;
    this.FHalfCarry = this.FSubtract = false;
    this.FZero = this.registerB === 0;
  },
  //RL C
  //#0x11:
  function() {
    var newFCarry = this.registerC > 0x7f;
    this.registerC = this.registerC << 1 & 0xff | (this.FCarry ? 1 : 0);
    this.FCarry = newFCarry;
    this.FHalfCarry = this.FSubtract = false;
    this.FZero = this.registerC === 0;
  },
  //RL D
  //#0x12:
  function() {
    var newFCarry = this.registerD > 0x7f;
    this.registerD = this.registerD << 1 & 0xff | (this.FCarry ? 1 : 0);
    this.FCarry = newFCarry;
    this.FHalfCarry = this.FSubtract = false;
    this.FZero = this.registerD === 0;
  },
  //RL E
  //#0x13:
  function() {
    var newFCarry = this.registerE > 0x7f;
    this.registerE = this.registerE << 1 & 0xff | (this.FCarry ? 1 : 0);
    this.FCarry = newFCarry;
    this.FHalfCarry = this.FSubtract = false;
    this.FZero = this.registerE === 0;
  },
  //RL H
  //#0x14:
  function() {
    var newFCarry = this.registersHL > 0x7fff;
    this.registersHL = this.registersHL << 1 & 0xfe00 |
      (this.FCarry ? 0x100 : 0) |
      this.registersHL & 0xff;
    this.FCarry = newFCarry;
    this.FHalfCarry = this.FSubtract = false;
    this.FZero = this.registersHL < 0x100;
  },
  //RL L
  //#0x15:
  function() {
    var newFCarry = (this.registersHL & 0x80) === 0x80;
    this.registersHL = this.registersHL & 0xff00 |
      this.registersHL << 1 & 0xff |
      (this.FCarry ? 1 : 0);
    this.FCarry = newFCarry;
    this.FHalfCarry = this.FSubtract = false;
    this.FZero = (this.registersHL & 0xff) === 0;
  },
  //RL (HL)
  //#0x16:
  function() {
    var temp_var = this.memoryReader[this.registersHL](this.registersHL);
    var newFCarry = temp_var > 0x7f;
    temp_var = temp_var << 1 & 0xff | (this.FCarry ? 1 : 0);
    this.FCarry = newFCarry;
    this.memoryWriter[this.registersHL](this.registersHL, temp_var);
    this.FHalfCarry = this.FSubtract = false;
    this.FZero = temp_var === 0;
  },
  //RL A
  //#0x17:
  function() {
    var newFCarry = this.registerA > 0x7f;
    this.registerA = this.registerA << 1 & 0xff | (this.FCarry ? 1 : 0);
    this.FCarry = newFCarry;
    this.FHalfCarry = this.FSubtract = false;
    this.FZero = this.registerA === 0;
  },
  //RR B
  //#0x18:
  function() {
    var newFCarry = (this.registerB & 0x01) === 0x01;
    this.registerB = (this.FCarry ? 0x80 : 0) | this.registerB >> 1;
    this.FCarry = newFCarry;
    this.FHalfCarry = this.FSubtract = false;
    this.FZero = this.registerB === 0;
  },
  //RR C
  //#0x19:
  function() {
    var newFCarry = (this.registerC & 0x01) === 0x01;
    this.registerC = (this.FCarry ? 0x80 : 0) | this.registerC >> 1;
    this.FCarry = newFCarry;
    this.FHalfCarry = this.FSubtract = false;
    this.FZero = this.registerC === 0;
  },
  //RR D
  //#0x1A:
  function() {
    var newFCarry = (this.registerD & 0x01) === 0x01;
    this.registerD = (this.FCarry ? 0x80 : 0) | this.registerD >> 1;
    this.FCarry = newFCarry;
    this.FHalfCarry = this.FSubtract = false;
    this.FZero = this.registerD === 0;
  },
  //RR E
  //#0x1B:
  function() {
    var newFCarry = (this.registerE & 0x01) === 0x01;
    this.registerE = (this.FCarry ? 0x80 : 0) | this.registerE >> 1;
    this.FCarry = newFCarry;
    this.FHalfCarry = this.FSubtract = false;
    this.FZero = this.registerE === 0;
  },
  //RR H
  //#0x1C:
  function() {
    var newFCarry = (this.registersHL & 0x0100) === 0x0100;
    this.registersHL = (this.FCarry ? 0x8000 : 0) |
      this.registersHL >> 1 & 0xff00 |
      this.registersHL & 0xff;
    this.FCarry = newFCarry;
    this.FHalfCarry = this.FSubtract = false;
    this.FZero = this.registersHL < 0x100;
  },
  //RR L
  //#0x1D:
  function() {
    var newFCarry = (this.registersHL & 0x01) === 0x01;
    this.registersHL = this.registersHL & 0xff00 |
      (this.FCarry ? 0x80 : 0) |
      (this.registersHL & 0xff) >> 1;
    this.FCarry = newFCarry;
    this.FHalfCarry = this.FSubtract = false;
    this.FZero = (this.registersHL & 0xff) === 0;
  },
  //RR (HL)
  //#0x1E:
  function() {
    var temp_var = this.memoryReader[this.registersHL](this.registersHL);
    var newFCarry = (temp_var & 0x01) === 0x01;
    temp_var = (this.FCarry ? 0x80 : 0) | temp_var >> 1;
    this.FCarry = newFCarry;
    this.memoryWriter[this.registersHL](this.registersHL, temp_var);
    this.FHalfCarry = this.FSubtract = false;
    this.FZero = temp_var === 0;
  },
  //RR A
  //#0x1F:
  function() {
    var newFCarry = (this.registerA & 0x01) === 0x01;
    this.registerA = (this.FCarry ? 0x80 : 0) | this.registerA >> 1;
    this.FCarry = newFCarry;
    this.FHalfCarry = this.FSubtract = false;
    this.FZero = this.registerA === 0;
  },
  //SLA B
  //#0x20:
  function() {
    this.FCarry = this.registerB > 0x7f;
    this.registerB = this.registerB << 1 & 0xff;
    this.FHalfCarry = this.FSubtract = false;
    this.FZero = this.registerB === 0;
  },
  //SLA C
  //#0x21:
  function() {
    this.FCarry = this.registerC > 0x7f;
    this.registerC = this.registerC << 1 & 0xff;
    this.FHalfCarry = this.FSubtract = false;
    this.FZero = this.registerC === 0;
  },
  //SLA D
  //#0x22:
  function() {
    this.FCarry = this.registerD > 0x7f;
    this.registerD = this.registerD << 1 & 0xff;
    this.FHalfCarry = this.FSubtract = false;
    this.FZero = this.registerD === 0;
  },
  //SLA E
  //#0x23:
  function() {
    this.FCarry = this.registerE > 0x7f;
    this.registerE = this.registerE << 1 & 0xff;
    this.FHalfCarry = this.FSubtract = false;
    this.FZero = this.registerE === 0;
  },
  //SLA H
  //#0x24:
  function() {
    this.FCarry = this.registersHL > 0x7fff;
    this.registersHL = this.registersHL << 1 & 0xfe00 | this.registersHL & 0xff;
    this.FHalfCarry = this.FSubtract = false;
    this.FZero = this.registersHL < 0x100;
  },
  //SLA L
  //#0x25:
  function() {
    this.FCarry = (this.registersHL & 0x0080) === 0x0080;
    this.registersHL = this.registersHL & 0xff00 | this.registersHL << 1 & 0xff;
    this.FHalfCarry = this.FSubtract = false;
    this.FZero = (this.registersHL & 0xff) === 0;
  },
  //SLA (HL)
  //#0x26:
  function() {
    var temp_var = this.memoryReader[this.registersHL](this.registersHL);
    this.FCarry = temp_var > 0x7f;
    temp_var = temp_var << 1 & 0xff;
    this.memoryWriter[this.registersHL](this.registersHL, temp_var);
    this.FHalfCarry = this.FSubtract = false;
    this.FZero = temp_var === 0;
  },
  //SLA A
  //#0x27:
  function() {
    this.FCarry = this.registerA > 0x7f;
    this.registerA = this.registerA << 1 & 0xff;
    this.FHalfCarry = this.FSubtract = false;
    this.FZero = this.registerA === 0;
  },
  //SRA B
  //#0x28:
  function() {
    this.FCarry = (this.registerB & 0x01) === 0x01;
    this.registerB = this.registerB & 0x80 | this.registerB >> 1;
    this.FHalfCarry = this.FSubtract = false;
    this.FZero = this.registerB === 0;
  },
  //SRA C
  //#0x29:
  function() {
    this.FCarry = (this.registerC & 0x01) === 0x01;
    this.registerC = this.registerC & 0x80 | this.registerC >> 1;
    this.FHalfCarry = this.FSubtract = false;
    this.FZero = this.registerC === 0;
  },
  //SRA D
  //#0x2A:
  function() {
    this.FCarry = (this.registerD & 0x01) === 0x01;
    this.registerD = this.registerD & 0x80 | this.registerD >> 1;
    this.FHalfCarry = this.FSubtract = false;
    this.FZero = this.registerD === 0;
  },
  //SRA E
  //#0x2B:
  function() {
    this.FCarry = (this.registerE & 0x01) === 0x01;
    this.registerE = this.registerE & 0x80 | this.registerE >> 1;
    this.FHalfCarry = this.FSubtract = false;
    this.FZero = this.registerE === 0;
  },
  //SRA H
  //#0x2C:
  function() {
    this.FCarry = (this.registersHL & 0x0100) === 0x0100;
    this.registersHL = this.registersHL >> 1 & 0xff00 |
      this.registersHL & 0x80ff;
    this.FHalfCarry = this.FSubtract = false;
    this.FZero = this.registersHL < 0x100;
  },
  //SRA L
  //#0x2D:
  function() {
    this.FCarry = (this.registersHL & 0x0001) === 0x0001;
    this.registersHL = this.registersHL & 0xff80 |
      (this.registersHL & 0xff) >> 1;
    this.FHalfCarry = this.FSubtract = false;
    this.FZero = (this.registersHL & 0xff) === 0;
  },
  //SRA (HL)
  //#0x2E:
  function() {
    var temp_var = this.memoryReader[this.registersHL](this.registersHL);
    this.FCarry = (temp_var & 0x01) === 0x01;
    temp_var = temp_var & 0x80 | temp_var >> 1;
    this.memoryWriter[this.registersHL](this.registersHL, temp_var);
    this.FHalfCarry = this.FSubtract = false;
    this.FZero = temp_var === 0;
  },
  //SRA A
  //#0x2F:
  function() {
    this.FCarry = (this.registerA & 0x01) === 0x01;
    this.registerA = this.registerA & 0x80 | this.registerA >> 1;
    this.FHalfCarry = this.FSubtract = false;
    this.FZero = this.registerA === 0;
  },
  //SWAP B
  //#0x30:
  function() {
    this.registerB = (this.registerB & 0xf) << 4 | this.registerB >> 4;
    this.FZero = this.registerB === 0;
    this.FCarry = this.FHalfCarry = this.FSubtract = false;
  },
  //SWAP C
  //#0x31:
  function() {
    this.registerC = (this.registerC & 0xf) << 4 | this.registerC >> 4;
    this.FZero = this.registerC === 0;
    this.FCarry = this.FHalfCarry = this.FSubtract = false;
  },
  //SWAP D
  //#0x32:
  function() {
    this.registerD = (this.registerD & 0xf) << 4 | this.registerD >> 4;
    this.FZero = this.registerD === 0;
    this.FCarry = this.FHalfCarry = this.FSubtract = false;
  },
  //SWAP E
  //#0x33:
  function() {
    this.registerE = (this.registerE & 0xf) << 4 | this.registerE >> 4;
    this.FZero = this.registerE === 0;
    this.FCarry = this.FHalfCarry = this.FSubtract = false;
  },
  //SWAP H
  //#0x34:
  function() {
    this.registersHL = (this.registersHL & 0xf00) << 4 |
      (this.registersHL & 0xf000) >> 4 |
      this.registersHL & 0xff;
    this.FZero = this.registersHL < 0x100;
    this.FCarry = this.FHalfCarry = this.FSubtract = false;
  },
  //SWAP L
  //#0x35:
  function() {
    this.registersHL = this.registersHL & 0xff00 |
      (this.registersHL & 0xf) << 4 |
      (this.registersHL & 0xf0) >> 4;
    this.FZero = (this.registersHL & 0xff) === 0;
    this.FCarry = this.FHalfCarry = this.FSubtract = false;
  },
  //SWAP (HL)
  //#0x36:
  function() {
    var temp_var = this.memoryReader[this.registersHL](this.registersHL);
    temp_var = (temp_var & 0xf) << 4 | temp_var >> 4;
    this.memoryWriter[this.registersHL](this.registersHL, temp_var);
    this.FZero = temp_var === 0;
    this.FCarry = this.FHalfCarry = this.FSubtract = false;
  },
  //SWAP A
  //#0x37:
  function() {
    this.registerA = (this.registerA & 0xf) << 4 | this.registerA >> 4;
    this.FZero = this.registerA === 0;
    this.FCarry = this.FHalfCarry = this.FSubtract = false;
  },
  //SRL B
  //#0x38:
  function() {
    this.FCarry = (this.registerB & 0x01) === 0x01;
    this.registerB >>= 1;
    this.FHalfCarry = this.FSubtract = false;
    this.FZero = this.registerB === 0;
  },
  //SRL C
  //#0x39:
  function() {
    this.FCarry = (this.registerC & 0x01) === 0x01;
    this.registerC >>= 1;
    this.FHalfCarry = this.FSubtract = false;
    this.FZero = this.registerC === 0;
  },
  //SRL D
  //#0x3A:
  function() {
    this.FCarry = (this.registerD & 0x01) === 0x01;
    this.registerD >>= 1;
    this.FHalfCarry = this.FSubtract = false;
    this.FZero = this.registerD === 0;
  },
  //SRL E
  //#0x3B:
  function() {
    this.FCarry = (this.registerE & 0x01) === 0x01;
    this.registerE >>= 1;
    this.FHalfCarry = this.FSubtract = false;
    this.FZero = this.registerE === 0;
  },
  //SRL H
  //#0x3C:
  function() {
    this.FCarry = (this.registersHL & 0x0100) === 0x0100;
    this.registersHL = this.registersHL >> 1 & 0xff00 | this.registersHL & 0xff;
    this.FHalfCarry = this.FSubtract = false;
    this.FZero = this.registersHL < 0x100;
  },
  //SRL L
  //#0x3D:
  function() {
    this.FCarry = (this.registersHL & 0x0001) === 0x0001;
    this.registersHL = this.registersHL & 0xff00 |
      (this.registersHL & 0xff) >> 1;
    this.FHalfCarry = this.FSubtract = false;
    this.FZero = (this.registersHL & 0xff) === 0;
  },
  //SRL (HL)
  //#0x3E:
  function() {
    var temp_var = this.memoryReader[this.registersHL](this.registersHL);
    this.FCarry = (temp_var & 0x01) === 0x01;
    this.memoryWriter[this.registersHL](this.registersHL, temp_var >> 1);
    this.FHalfCarry = this.FSubtract = false;
    this.FZero = temp_var < 2;
  },
  //SRL A
  //#0x3F:
  function() {
    this.FCarry = (this.registerA & 0x01) === 0x01;
    this.registerA >>= 1;
    this.FHalfCarry = this.FSubtract = false;
    this.FZero = this.registerA === 0;
  },
  //BIT 0, B
  //#0x40:
  function() {
    this.FHalfCarry = true;
    this.FSubtract = false;
    this.FZero = (this.registerB & 0x01) === 0;
  },
  //BIT 0, C
  //#0x41:
  function() {
    this.FHalfCarry = true;
    this.FSubtract = false;
    this.FZero = (this.registerC & 0x01) === 0;
  },
  //BIT 0, D
  //#0x42:
  function() {
    this.FHalfCarry = true;
    this.FSubtract = false;
    this.FZero = (this.registerD & 0x01) === 0;
  },
  //BIT 0, E
  //#0x43:
  function() {
    this.FHalfCarry = true;
    this.FSubtract = false;
    this.FZero = (this.registerE & 0x01) === 0;
  },
  //BIT 0, H
  //#0x44:
  function() {
    this.FHalfCarry = true;
    this.FSubtract = false;
    this.FZero = (this.registersHL & 0x0100) === 0;
  },
  //BIT 0, L
  //#0x45:
  function() {
    this.FHalfCarry = true;
    this.FSubtract = false;
    this.FZero = (this.registersHL & 0x0001) === 0;
  },
  //BIT 0, (HL)
  //#0x46:
  function() {
    this.FHalfCarry = true;
    this.FSubtract = false;
    this.FZero = (this.memoryReader[this.registersHL](this.registersHL) &
      0x01) ===
      0;
  },
  //BIT 0, A
  //#0x47:
  function() {
    this.FHalfCarry = true;
    this.FSubtract = false;
    this.FZero = (this.registerA & 0x01) === 0;
  },
  //BIT 1, B
  //#0x48:
  function() {
    this.FHalfCarry = true;
    this.FSubtract = false;
    this.FZero = (this.registerB & 0x02) === 0;
  },
  //BIT 1, C
  //#0x49:
  function() {
    this.FHalfCarry = true;
    this.FSubtract = false;
    this.FZero = (this.registerC & 0x02) === 0;
  },
  //BIT 1, D
  //#0x4A:
  function() {
    this.FHalfCarry = true;
    this.FSubtract = false;
    this.FZero = (this.registerD & 0x02) === 0;
  },
  //BIT 1, E
  //#0x4B:
  function() {
    this.FHalfCarry = true;
    this.FSubtract = false;
    this.FZero = (this.registerE & 0x02) === 0;
  },
  //BIT 1, H
  //#0x4C:
  function() {
    this.FHalfCarry = true;
    this.FSubtract = false;
    this.FZero = (this.registersHL & 0x0200) === 0;
  },
  //BIT 1, L
  //#0x4D:
  function() {
    this.FHalfCarry = true;
    this.FSubtract = false;
    this.FZero = (this.registersHL & 0x0002) === 0;
  },
  //BIT 1, (HL)
  //#0x4E:
  function() {
    this.FHalfCarry = true;
    this.FSubtract = false;
    this.FZero = (this.memoryReader[this.registersHL](this.registersHL) &
      0x02) ===
      0;
  },
  //BIT 1, A
  //#0x4F:
  function() {
    this.FHalfCarry = true;
    this.FSubtract = false;
    this.FZero = (this.registerA & 0x02) === 0;
  },
  //BIT 2, B
  //#0x50:
  function() {
    this.FHalfCarry = true;
    this.FSubtract = false;
    this.FZero = (this.registerB & 0x04) === 0;
  },
  //BIT 2, C
  //#0x51:
  function() {
    this.FHalfCarry = true;
    this.FSubtract = false;
    this.FZero = (this.registerC & 0x04) === 0;
  },
  //BIT 2, D
  //#0x52:
  function() {
    this.FHalfCarry = true;
    this.FSubtract = false;
    this.FZero = (this.registerD & 0x04) === 0;
  },
  //BIT 2, E
  //#0x53:
  function() {
    this.FHalfCarry = true;
    this.FSubtract = false;
    this.FZero = (this.registerE & 0x04) === 0;
  },
  //BIT 2, H
  //#0x54:
  function() {
    this.FHalfCarry = true;
    this.FSubtract = false;
    this.FZero = (this.registersHL & 0x0400) === 0;
  },
  //BIT 2, L
  //#0x55:
  function() {
    this.FHalfCarry = true;
    this.FSubtract = false;
    this.FZero = (this.registersHL & 0x0004) === 0;
  },
  //BIT 2, (HL)
  //#0x56:
  function() {
    this.FHalfCarry = true;
    this.FSubtract = false;
    this.FZero = (this.memoryReader[this.registersHL](this.registersHL) &
      0x04) ===
      0;
  },
  //BIT 2, A
  //#0x57:
  function() {
    this.FHalfCarry = true;
    this.FSubtract = false;
    this.FZero = (this.registerA & 0x04) === 0;
  },
  //BIT 3, B
  //#0x58:
  function() {
    this.FHalfCarry = true;
    this.FSubtract = false;
    this.FZero = (this.registerB & 0x08) === 0;
  },
  //BIT 3, C
  //#0x59:
  function() {
    this.FHalfCarry = true;
    this.FSubtract = false;
    this.FZero = (this.registerC & 0x08) === 0;
  },
  //BIT 3, D
  //#0x5A:
  function() {
    this.FHalfCarry = true;
    this.FSubtract = false;
    this.FZero = (this.registerD & 0x08) === 0;
  },
  //BIT 3, E
  //#0x5B:
  function() {
    this.FHalfCarry = true;
    this.FSubtract = false;
    this.FZero = (this.registerE & 0x08) === 0;
  },
  //BIT 3, H
  //#0x5C:
  function() {
    this.FHalfCarry = true;
    this.FSubtract = false;
    this.FZero = (this.registersHL & 0x0800) === 0;
  },
  //BIT 3, L
  //#0x5D:
  function() {
    this.FHalfCarry = true;
    this.FSubtract = false;
    this.FZero = (this.registersHL & 0x0008) === 0;
  },
  //BIT 3, (HL)
  //#0x5E:
  function() {
    this.FHalfCarry = true;
    this.FSubtract = false;
    this.FZero = (this.memoryReader[this.registersHL](this.registersHL) &
      0x08) ===
      0;
  },
  //BIT 3, A
  //#0x5F:
  function() {
    this.FHalfCarry = true;
    this.FSubtract = false;
    this.FZero = (this.registerA & 0x08) === 0;
  },
  //BIT 4, B
  //#0x60:
  function() {
    this.FHalfCarry = true;
    this.FSubtract = false;
    this.FZero = (this.registerB & 0x10) === 0;
  },
  //BIT 4, C
  //#0x61:
  function() {
    this.FHalfCarry = true;
    this.FSubtract = false;
    this.FZero = (this.registerC & 0x10) === 0;
  },
  //BIT 4, D
  //#0x62:
  function() {
    this.FHalfCarry = true;
    this.FSubtract = false;
    this.FZero = (this.registerD & 0x10) === 0;
  },
  //BIT 4, E
  //#0x63:
  function() {
    this.FHalfCarry = true;
    this.FSubtract = false;
    this.FZero = (this.registerE & 0x10) === 0;
  },
  //BIT 4, H
  //#0x64:
  function() {
    this.FHalfCarry = true;
    this.FSubtract = false;
    this.FZero = (this.registersHL & 0x1000) === 0;
  },
  //BIT 4, L
  //#0x65:
  function() {
    this.FHalfCarry = true;
    this.FSubtract = false;
    this.FZero = (this.registersHL & 0x0010) === 0;
  },
  //BIT 4, (HL)
  //#0x66:
  function() {
    this.FHalfCarry = true;
    this.FSubtract = false;
    this.FZero = (this.memoryReader[this.registersHL](this.registersHL) &
      0x10) ===
      0;
  },
  //BIT 4, A
  //#0x67:
  function() {
    this.FHalfCarry = true;
    this.FSubtract = false;
    this.FZero = (this.registerA & 0x10) === 0;
  },
  //BIT 5, B
  //#0x68:
  function() {
    this.FHalfCarry = true;
    this.FSubtract = false;
    this.FZero = (this.registerB & 0x20) === 0;
  },
  //BIT 5, C
  //#0x69:
  function() {
    this.FHalfCarry = true;
    this.FSubtract = false;
    this.FZero = (this.registerC & 0x20) === 0;
  },
  //BIT 5, D
  //#0x6A:
  function() {
    this.FHalfCarry = true;
    this.FSubtract = false;
    this.FZero = (this.registerD & 0x20) === 0;
  },
  //BIT 5, E
  //#0x6B:
  function() {
    this.FHalfCarry = true;
    this.FSubtract = false;
    this.FZero = (this.registerE & 0x20) === 0;
  },
  //BIT 5, H
  //#0x6C:
  function() {
    this.FHalfCarry = true;
    this.FSubtract = false;
    this.FZero = (this.registersHL & 0x2000) === 0;
  },
  //BIT 5, L
  //#0x6D:
  function() {
    this.FHalfCarry = true;
    this.FSubtract = false;
    this.FZero = (this.registersHL & 0x0020) === 0;
  },
  //BIT 5, (HL)
  //#0x6E:
  function() {
    this.FHalfCarry = true;
    this.FSubtract = false;
    this.FZero = (this.memoryReader[this.registersHL](this.registersHL) &
      0x20) ===
      0;
  },
  //BIT 5, A
  //#0x6F:
  function() {
    this.FHalfCarry = true;
    this.FSubtract = false;
    this.FZero = (this.registerA & 0x20) === 0;
  },
  //BIT 6, B
  //#0x70:
  function() {
    this.FHalfCarry = true;
    this.FSubtract = false;
    this.FZero = (this.registerB & 0x40) === 0;
  },
  //BIT 6, C
  //#0x71:
  function() {
    this.FHalfCarry = true;
    this.FSubtract = false;
    this.FZero = (this.registerC & 0x40) === 0;
  },
  //BIT 6, D
  //#0x72:
  function() {
    this.FHalfCarry = true;
    this.FSubtract = false;
    this.FZero = (this.registerD & 0x40) === 0;
  },
  //BIT 6, E
  //#0x73:
  function() {
    this.FHalfCarry = true;
    this.FSubtract = false;
    this.FZero = (this.registerE & 0x40) === 0;
  },
  //BIT 6, H
  //#0x74:
  function() {
    this.FHalfCarry = true;
    this.FSubtract = false;
    this.FZero = (this.registersHL & 0x4000) === 0;
  },
  //BIT 6, L
  //#0x75:
  function() {
    this.FHalfCarry = true;
    this.FSubtract = false;
    this.FZero = (this.registersHL & 0x0040) === 0;
  },
  //BIT 6, (HL)
  //#0x76:
  function() {
    this.FHalfCarry = true;
    this.FSubtract = false;
    this.FZero = (this.memoryReader[this.registersHL](this.registersHL) &
      0x40) ===
      0;
  },
  //BIT 6, A
  //#0x77:
  function() {
    this.FHalfCarry = true;
    this.FSubtract = false;
    this.FZero = (this.registerA & 0x40) === 0;
  },
  //BIT 7, B
  //#0x78:
  function() {
    this.FHalfCarry = true;
    this.FSubtract = false;
    this.FZero = (this.registerB & 0x80) === 0;
  },
  //BIT 7, C
  //#0x79:
  function() {
    this.FHalfCarry = true;
    this.FSubtract = false;
    this.FZero = (this.registerC & 0x80) === 0;
  },
  //BIT 7, D
  //#0x7A:
  function() {
    this.FHalfCarry = true;
    this.FSubtract = false;
    this.FZero = (this.registerD & 0x80) === 0;
  },
  //BIT 7, E
  //#0x7B:
  function() {
    this.FHalfCarry = true;
    this.FSubtract = false;
    this.FZero = (this.registerE & 0x80) === 0;
  },
  //BIT 7, H
  //#0x7C:
  function() {
    this.FHalfCarry = true;
    this.FSubtract = false;
    this.FZero = (this.registersHL & 0x8000) === 0;
  },
  //BIT 7, L
  //#0x7D:
  function() {
    this.FHalfCarry = true;
    this.FSubtract = false;
    this.FZero = (this.registersHL & 0x0080) === 0;
  },
  //BIT 7, (HL)
  //#0x7E:
  function() {
    this.FHalfCarry = true;
    this.FSubtract = false;
    this.FZero = (this.memoryReader[this.registersHL](this.registersHL) &
      0x80) ===
      0;
  },
  //BIT 7, A
  //#0x7F:
  function() {
    this.FHalfCarry = true;
    this.FSubtract = false;
    this.FZero = (this.registerA & 0x80) === 0;
  },
  //RES 0, B
  //#0x80:
  function() {
    this.registerB &= 0xfe;
  },
  //RES 0, C
  //#0x81:
  function() {
    this.registerC &= 0xfe;
  },
  //RES 0, D
  //#0x82:
  function() {
    this.registerD &= 0xfe;
  },
  //RES 0, E
  //#0x83:
  function() {
    this.registerE &= 0xfe;
  },
  //RES 0, H
  //#0x84:
  function() {
    this.registersHL &= 0xfeff;
  },
  //RES 0, L
  //#0x85:
  function() {
    this.registersHL &= 0xfffe;
  },
  //RES 0, (HL)
  //#0x86:
  function() {
    this.memoryWriter[this.registersHL](
      this.registersHL,
      this.memoryReader[this.registersHL](this.registersHL) & 0xfe
    );
  },
  //RES 0, A
  //#0x87:
  function() {
    this.registerA &= 0xfe;
  },
  //RES 1, B
  //#0x88:
  function() {
    this.registerB &= 0xfd;
  },
  //RES 1, C
  //#0x89:
  function() {
    this.registerC &= 0xfd;
  },
  //RES 1, D
  //#0x8A:
  function() {
    this.registerD &= 0xfd;
  },
  //RES 1, E
  //#0x8B:
  function() {
    this.registerE &= 0xfd;
  },
  //RES 1, H
  //#0x8C:
  function() {
    this.registersHL &= 0xfdff;
  },
  //RES 1, L
  //#0x8D:
  function() {
    this.registersHL &= 0xfffd;
  },
  //RES 1, (HL)
  //#0x8E:
  function() {
    this.memoryWriter[this.registersHL](
      this.registersHL,
      this.memoryReader[this.registersHL](this.registersHL) & 0xfd
    );
  },
  //RES 1, A
  //#0x8F:
  function() {
    this.registerA &= 0xfd;
  },
  //RES 2, B
  //#0x90:
  function() {
    this.registerB &= 0xfb;
  },
  //RES 2, C
  //#0x91:
  function() {
    this.registerC &= 0xfb;
  },
  //RES 2, D
  //#0x92:
  function() {
    this.registerD &= 0xfb;
  },
  //RES 2, E
  //#0x93:
  function() {
    this.registerE &= 0xfb;
  },
  //RES 2, H
  //#0x94:
  function() {
    this.registersHL &= 0xfbff;
  },
  //RES 2, L
  //#0x95:
  function() {
    this.registersHL &= 0xfffb;
  },
  //RES 2, (HL)
  //#0x96:
  function() {
    this.memoryWriter[this.registersHL](
      this.registersHL,
      this.memoryReader[this.registersHL](this.registersHL) & 0xfb
    );
  },
  //RES 2, A
  //#0x97:
  function() {
    this.registerA &= 0xfb;
  },
  //RES 3, B
  //#0x98:
  function() {
    this.registerB &= 0xf7;
  },
  //RES 3, C
  //#0x99:
  function() {
    this.registerC &= 0xf7;
  },
  //RES 3, D
  //#0x9A:
  function() {
    this.registerD &= 0xf7;
  },
  //RES 3, E
  //#0x9B:
  function() {
    this.registerE &= 0xf7;
  },
  //RES 3, H
  //#0x9C:
  function() {
    this.registersHL &= 0xf7ff;
  },
  //RES 3, L
  //#0x9D:
  function() {
    this.registersHL &= 0xfff7;
  },
  //RES 3, (HL)
  //#0x9E:
  function() {
    this.memoryWriter[this.registersHL](
      this.registersHL,
      this.memoryReader[this.registersHL](this.registersHL) & 0xf7
    );
  },
  //RES 3, A
  //#0x9F:
  function() {
    this.registerA &= 0xf7;
  },
  //RES 3, B
  //#0xA0:
  function() {
    this.registerB &= 0xef;
  },
  //RES 4, C
  //#0xA1:
  function() {
    this.registerC &= 0xef;
  },
  //RES 4, D
  //#0xA2:
  function() {
    this.registerD &= 0xef;
  },
  //RES 4, E
  //#0xA3:
  function() {
    this.registerE &= 0xef;
  },
  //RES 4, H
  //#0xA4:
  function() {
    this.registersHL &= 0xefff;
  },
  //RES 4, L
  //#0xA5:
  function() {
    this.registersHL &= 0xffef;
  },
  //RES 4, (HL)
  //#0xA6:
  function() {
    this.memoryWriter[this.registersHL](
      this.registersHL,
      this.memoryReader[this.registersHL](this.registersHL) & 0xef
    );
  },
  //RES 4, A
  //#0xA7:
  function() {
    this.registerA &= 0xef;
  },
  //RES 5, B
  //#0xA8:
  function() {
    this.registerB &= 0xdf;
  },
  //RES 5, C
  //#0xA9:
  function() {
    this.registerC &= 0xdf;
  },
  //RES 5, D
  //#0xAA:
  function() {
    this.registerD &= 0xdf;
  },
  //RES 5, E
  //#0xAB:
  function() {
    this.registerE &= 0xdf;
  },
  //RES 5, H
  //#0xAC:
  function() {
    this.registersHL &= 0xdfff;
  },
  //RES 5, L
  //#0xAD:
  function() {
    this.registersHL &= 0xffdf;
  },
  //RES 5, (HL)
  //#0xAE:
  function() {
    this.memoryWriter[this.registersHL](
      this.registersHL,
      this.memoryReader[this.registersHL](this.registersHL) & 0xdf
    );
  },
  //RES 5, A
  //#0xAF:
  function() {
    this.registerA &= 0xdf;
  },
  //RES 6, B
  //#0xB0:
  function() {
    this.registerB &= 0xbf;
  },
  //RES 6, C
  //#0xB1:
  function() {
    this.registerC &= 0xbf;
  },
  //RES 6, D
  //#0xB2:
  function() {
    this.registerD &= 0xbf;
  },
  //RES 6, E
  //#0xB3:
  function() {
    this.registerE &= 0xbf;
  },
  //RES 6, H
  //#0xB4:
  function() {
    this.registersHL &= 0xbfff;
  },
  //RES 6, L
  //#0xB5:
  function() {
    this.registersHL &= 0xffbf;
  },
  //RES 6, (HL)
  //#0xB6:
  function() {
    this.memoryWriter[this.registersHL](
      this.registersHL,
      this.memoryReader[this.registersHL](this.registersHL) & 0xbf
    );
  },
  //RES 6, A
  //#0xB7:
  function() {
    this.registerA &= 0xbf;
  },
  //RES 7, B
  //#0xB8:
  function() {
    this.registerB &= 0x7f;
  },
  //RES 7, C
  //#0xB9:
  function() {
    this.registerC &= 0x7f;
  },
  //RES 7, D
  //#0xBA:
  function() {
    this.registerD &= 0x7f;
  },
  //RES 7, E
  //#0xBB:
  function() {
    this.registerE &= 0x7f;
  },
  //RES 7, H
  //#0xBC:
  function() {
    this.registersHL &= 0x7fff;
  },
  //RES 7, L
  //#0xBD:
  function() {
    this.registersHL &= 0xff7f;
  },
  //RES 7, (HL)
  //#0xBE:
  function() {
    this.memoryWriter[this.registersHL](
      this.registersHL,
      this.memoryReader[this.registersHL](this.registersHL) & 0x7f
    );
  },
  //RES 7, A
  //#0xBF:
  function() {
    this.registerA &= 0x7f;
  },
  //SET 0, B
  //#0xC0:
  function() {
    this.registerB |= 0x01;
  },
  //SET 0, C
  //#0xC1:
  function() {
    this.registerC |= 0x01;
  },
  //SET 0, D
  //#0xC2:
  function() {
    this.registerD |= 0x01;
  },
  //SET 0, E
  //#0xC3:
  function() {
    this.registerE |= 0x01;
  },
  //SET 0, H
  //#0xC4:
  function() {
    this.registersHL |= 0x0100;
  },
  //SET 0, L
  //#0xC5:
  function() {
    this.registersHL |= 0x01;
  },
  //SET 0, (HL)
  //#0xC6:
  function() {
    this.memoryWriter[this.registersHL](
      this.registersHL,
      this.memoryReader[this.registersHL](this.registersHL) | 0x01
    );
  },
  //SET 0, A
  //#0xC7:
  function() {
    this.registerA |= 0x01;
  },
  //SET 1, B
  //#0xC8:
  function() {
    this.registerB |= 0x02;
  },
  //SET 1, C
  //#0xC9:
  function() {
    this.registerC |= 0x02;
  },
  //SET 1, D
  //#0xCA:
  function() {
    this.registerD |= 0x02;
  },
  //SET 1, E
  //#0xCB:
  function() {
    this.registerE |= 0x02;
  },
  //SET 1, H
  //#0xCC:
  function() {
    this.registersHL |= 0x0200;
  },
  //SET 1, L
  //#0xCD:
  function() {
    this.registersHL |= 0x02;
  },
  //SET 1, (HL)
  //#0xCE:
  function() {
    this.memoryWriter[this.registersHL](
      this.registersHL,
      this.memoryReader[this.registersHL](this.registersHL) | 0x02
    );
  },
  //SET 1, A
  //#0xCF:
  function() {
    this.registerA |= 0x02;
  },
  //SET 2, B
  //#0xD0:
  function() {
    this.registerB |= 0x04;
  },
  //SET 2, C
  //#0xD1:
  function() {
    this.registerC |= 0x04;
  },
  //SET 2, D
  //#0xD2:
  function() {
    this.registerD |= 0x04;
  },
  //SET 2, E
  //#0xD3:
  function() {
    this.registerE |= 0x04;
  },
  //SET 2, H
  //#0xD4:
  function() {
    this.registersHL |= 0x0400;
  },
  //SET 2, L
  //#0xD5:
  function() {
    this.registersHL |= 0x04;
  },
  //SET 2, (HL)
  //#0xD6:
  function() {
    this.memoryWriter[this.registersHL](
      this.registersHL,
      this.memoryReader[this.registersHL](this.registersHL) | 0x04
    );
  },
  //SET 2, A
  //#0xD7:
  function() {
    this.registerA |= 0x04;
  },
  //SET 3, B
  //#0xD8:
  function() {
    this.registerB |= 0x08;
  },
  //SET 3, C
  //#0xD9:
  function() {
    this.registerC |= 0x08;
  },
  //SET 3, D
  //#0xDA:
  function() {
    this.registerD |= 0x08;
  },
  //SET 3, E
  //#0xDB:
  function() {
    this.registerE |= 0x08;
  },
  //SET 3, H
  //#0xDC:
  function() {
    this.registersHL |= 0x0800;
  },
  //SET 3, L
  //#0xDD:
  function() {
    this.registersHL |= 0x08;
  },
  //SET 3, (HL)
  //#0xDE:
  function() {
    this.memoryWriter[this.registersHL](
      this.registersHL,
      this.memoryReader[this.registersHL](this.registersHL) | 0x08
    );
  },
  //SET 3, A
  //#0xDF:
  function() {
    this.registerA |= 0x08;
  },
  //SET 4, B
  //#0xE0:
  function() {
    this.registerB |= 0x10;
  },
  //SET 4, C
  //#0xE1:
  function() {
    this.registerC |= 0x10;
  },
  //SET 4, D
  //#0xE2:
  function() {
    this.registerD |= 0x10;
  },
  //SET 4, E
  //#0xE3:
  function() {
    this.registerE |= 0x10;
  },
  //SET 4, H
  //#0xE4:
  function() {
    this.registersHL |= 0x1000;
  },
  //SET 4, L
  //#0xE5:
  function() {
    this.registersHL |= 0x10;
  },
  //SET 4, (HL)
  //#0xE6:
  function() {
    this.memoryWriter[this.registersHL](
      this.registersHL,
      this.memoryReader[this.registersHL](this.registersHL) | 0x10
    );
  },
  //SET 4, A
  //#0xE7:
  function() {
    this.registerA |= 0x10;
  },
  //SET 5, B
  //#0xE8:
  function() {
    this.registerB |= 0x20;
  },
  //SET 5, C
  //#0xE9:
  function() {
    this.registerC |= 0x20;
  },
  //SET 5, D
  //#0xEA:
  function() {
    this.registerD |= 0x20;
  },
  //SET 5, E
  //#0xEB:
  function() {
    this.registerE |= 0x20;
  },
  //SET 5, H
  //#0xEC:
  function() {
    this.registersHL |= 0x2000;
  },
  //SET 5, L
  //#0xED:
  function() {
    this.registersHL |= 0x20;
  },
  //SET 5, (HL)
  //#0xEE:
  function() {
    this.memoryWriter[this.registersHL](
      this.registersHL,
      this.memoryReader[this.registersHL](this.registersHL) | 0x20
    );
  },
  //SET 5, A
  //#0xEF:
  function() {
    this.registerA |= 0x20;
  },
  //SET 6, B
  //#0xF0:
  function() {
    this.registerB |= 0x40;
  },
  //SET 6, C
  //#0xF1:
  function() {
    this.registerC |= 0x40;
  },
  //SET 6, D
  //#0xF2:
  function() {
    this.registerD |= 0x40;
  },
  //SET 6, E
  //#0xF3:
  function() {
    this.registerE |= 0x40;
  },
  //SET 6, H
  //#0xF4:
  function() {
    this.registersHL |= 0x4000;
  },
  //SET 6, L
  //#0xF5:
  function() {
    this.registersHL |= 0x40;
  },
  //SET 6, (HL)
  //#0xF6:
  function() {
    this.memoryWriter[this.registersHL](
      this.registersHL,
      this.memoryReader[this.registersHL](this.registersHL) | 0x40
    );
  },
  //SET 6, A
  //#0xF7:
  function() {
    this.registerA |= 0x40;
  },
  //SET 7, B
  //#0xF8:
  function() {
    this.registerB |= 0x80;
  },
  //SET 7, C
  //#0xF9:
  function() {
    this.registerC |= 0x80;
  },
  //SET 7, D
  //#0xFA:
  function() {
    this.registerD |= 0x80;
  },
  //SET 7, E
  //#0xFB:
  function() {
    this.registerE |= 0x80;
  },
  //SET 7, H
  //#0xFC:
  function() {
    this.registersHL |= 0x8000;
  },
  //SET 7, L
  //#0xFD:
  function() {
    this.registersHL |= 0x80;
  },
  //SET 7, (HL)
  //#0xFE:
  function() {
    this.memoryWriter[this.registersHL](
      this.registersHL,
      this.memoryReader[this.registersHL](this.registersHL) | 0x80
    );
  },
  //SET 7, A
  //#0xFF:
  function() {
    this.registerA |= 0x80;
  }
];
