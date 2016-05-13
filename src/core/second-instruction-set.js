export default [
  //RLC B
  //#0x00:
  function (parentObj) {
    parentObj.FCarry = (parentObj.registerB > 0x7F);
    parentObj.registerB = ((parentObj.registerB << 1) & 0xFF) | ((parentObj.FCarry) ? 1 : 0);
    parentObj.FHalfCarry = parentObj.FSubtract = false;
    parentObj.FZero = (parentObj.registerB === 0);
  }
  //RLC C
  //#0x01:
  ,
  function (parentObj) {
    parentObj.FCarry = (parentObj.registerC > 0x7F);
    parentObj.registerC = ((parentObj.registerC << 1) & 0xFF) | ((parentObj.FCarry) ? 1 : 0);
    parentObj.FHalfCarry = parentObj.FSubtract = false;
    parentObj.FZero = (parentObj.registerC === 0);
  }
  //RLC D
  //#0x02:
  ,
  function (parentObj) {
    parentObj.FCarry = (parentObj.registerD > 0x7F);
    parentObj.registerD = ((parentObj.registerD << 1) & 0xFF) | ((parentObj.FCarry) ? 1 : 0);
    parentObj.FHalfCarry = parentObj.FSubtract = false;
    parentObj.FZero = (parentObj.registerD === 0);
  }
  //RLC E
  //#0x03:
  ,
  function (parentObj) {
    parentObj.FCarry = (parentObj.registerE > 0x7F);
    parentObj.registerE = ((parentObj.registerE << 1) & 0xFF) | ((parentObj.FCarry) ? 1 : 0);
    parentObj.FHalfCarry = parentObj.FSubtract = false;
    parentObj.FZero = (parentObj.registerE === 0);
  }
  //RLC H
  //#0x04:
  ,
  function (parentObj) {
    parentObj.FCarry = (parentObj.registersHL > 0x7FFF);
    parentObj.registersHL = ((parentObj.registersHL << 1) & 0xFE00) | ((parentObj.FCarry) ? 0x100 : 0) | (parentObj.registersHL & 0xFF);
    parentObj.FHalfCarry = parentObj.FSubtract = false;
    parentObj.FZero = (parentObj.registersHL < 0x100);
  }
  //RLC L
  //#0x05:
  ,
  function (parentObj) {
    parentObj.FCarry = ((parentObj.registersHL & 0x80) === 0x80);
    parentObj.registersHL = (parentObj.registersHL & 0xFF00) | ((parentObj.registersHL << 1) & 0xFF) | ((parentObj.FCarry) ? 1 : 0);
    parentObj.FHalfCarry = parentObj.FSubtract = false;
    parentObj.FZero = ((parentObj.registersHL & 0xFF) === 0);
  }
  //RLC (HL)
  //#0x06:
  ,
  function (parentObj) {
    var temp_var = parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL);
    parentObj.FCarry = (temp_var > 0x7F);
    temp_var = ((temp_var << 1) & 0xFF) | ((parentObj.FCarry) ? 1 : 0);
    parentObj.memoryWriter[parentObj.registersHL](parentObj, parentObj.registersHL, temp_var);
    parentObj.FHalfCarry = parentObj.FSubtract = false;
    parentObj.FZero = (temp_var === 0);
  }
  //RLC A
  //#0x07:
  ,
  function (parentObj) {
    parentObj.FCarry = (parentObj.registerA > 0x7F);
    parentObj.registerA = ((parentObj.registerA << 1) & 0xFF) | ((parentObj.FCarry) ? 1 : 0);
    parentObj.FHalfCarry = parentObj.FSubtract = false;
    parentObj.FZero = (parentObj.registerA === 0);
  }
  //RRC B
  //#0x08:
  ,
  function (parentObj) {
    parentObj.FCarry = ((parentObj.registerB & 0x01) === 0x01);
    parentObj.registerB = ((parentObj.FCarry) ? 0x80 : 0) | (parentObj.registerB >> 1);
    parentObj.FHalfCarry = parentObj.FSubtract = false;
    parentObj.FZero = (parentObj.registerB === 0);
  }
  //RRC C
  //#0x09:
  ,
  function (parentObj) {
    parentObj.FCarry = ((parentObj.registerC & 0x01) === 0x01);
    parentObj.registerC = ((parentObj.FCarry) ? 0x80 : 0) | (parentObj.registerC >> 1);
    parentObj.FHalfCarry = parentObj.FSubtract = false;
    parentObj.FZero = (parentObj.registerC === 0);
  }
  //RRC D
  //#0x0A:
  ,
  function (parentObj) {
    parentObj.FCarry = ((parentObj.registerD & 0x01) === 0x01);
    parentObj.registerD = ((parentObj.FCarry) ? 0x80 : 0) | (parentObj.registerD >> 1);
    parentObj.FHalfCarry = parentObj.FSubtract = false;
    parentObj.FZero = (parentObj.registerD === 0);
  }
  //RRC E
  //#0x0B:
  ,
  function (parentObj) {
    parentObj.FCarry = ((parentObj.registerE & 0x01) === 0x01);
    parentObj.registerE = ((parentObj.FCarry) ? 0x80 : 0) | (parentObj.registerE >> 1);
    parentObj.FHalfCarry = parentObj.FSubtract = false;
    parentObj.FZero = (parentObj.registerE === 0);
  }
  //RRC H
  //#0x0C:
  ,
  function (parentObj) {
    parentObj.FCarry = ((parentObj.registersHL & 0x0100) === 0x0100);
    parentObj.registersHL = ((parentObj.FCarry) ? 0x8000 : 0) | ((parentObj.registersHL >> 1) & 0xFF00) | (parentObj.registersHL & 0xFF);
    parentObj.FHalfCarry = parentObj.FSubtract = false;
    parentObj.FZero = (parentObj.registersHL < 0x100);
  }
  //RRC L
  //#0x0D:
  ,
  function (parentObj) {
    parentObj.FCarry = ((parentObj.registersHL & 0x01) === 0x01);
    parentObj.registersHL = (parentObj.registersHL & 0xFF00) | ((parentObj.FCarry) ? 0x80 : 0) | ((parentObj.registersHL & 0xFF) >> 1);
    parentObj.FHalfCarry = parentObj.FSubtract = false;
    parentObj.FZero = ((parentObj.registersHL & 0xFF) === 0);
  }
  //RRC (HL)
  //#0x0E:
  ,
  function (parentObj) {
    var temp_var = parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL);
    parentObj.FCarry = ((temp_var & 0x01) === 0x01);
    temp_var = ((parentObj.FCarry) ? 0x80 : 0) | (temp_var >> 1);
    parentObj.memoryWriter[parentObj.registersHL](parentObj, parentObj.registersHL, temp_var);
    parentObj.FHalfCarry = parentObj.FSubtract = false;
    parentObj.FZero = (temp_var === 0);
  }
  //RRC A
  //#0x0F:
  ,
  function (parentObj) {
    parentObj.FCarry = ((parentObj.registerA & 0x01) === 0x01);
    parentObj.registerA = ((parentObj.FCarry) ? 0x80 : 0) | (parentObj.registerA >> 1);
    parentObj.FHalfCarry = parentObj.FSubtract = false;
    parentObj.FZero = (parentObj.registerA === 0);
  }
  //RL B
  //#0x10:
  ,
  function (parentObj) {
    var newFCarry = (parentObj.registerB > 0x7F);
    parentObj.registerB = ((parentObj.registerB << 1) & 0xFF) | ((parentObj.FCarry) ? 1 : 0);
    parentObj.FCarry = newFCarry;
    parentObj.FHalfCarry = parentObj.FSubtract = false;
    parentObj.FZero = (parentObj.registerB === 0);
  }
  //RL C
  //#0x11:
  ,
  function (parentObj) {
    var newFCarry = (parentObj.registerC > 0x7F);
    parentObj.registerC = ((parentObj.registerC << 1) & 0xFF) | ((parentObj.FCarry) ? 1 : 0);
    parentObj.FCarry = newFCarry;
    parentObj.FHalfCarry = parentObj.FSubtract = false;
    parentObj.FZero = (parentObj.registerC === 0);
  }
  //RL D
  //#0x12:
  ,
  function (parentObj) {
    var newFCarry = (parentObj.registerD > 0x7F);
    parentObj.registerD = ((parentObj.registerD << 1) & 0xFF) | ((parentObj.FCarry) ? 1 : 0);
    parentObj.FCarry = newFCarry;
    parentObj.FHalfCarry = parentObj.FSubtract = false;
    parentObj.FZero = (parentObj.registerD === 0);
  }
  //RL E
  //#0x13:
  ,
  function (parentObj) {
    var newFCarry = (parentObj.registerE > 0x7F);
    parentObj.registerE = ((parentObj.registerE << 1) & 0xFF) | ((parentObj.FCarry) ? 1 : 0);
    parentObj.FCarry = newFCarry;
    parentObj.FHalfCarry = parentObj.FSubtract = false;
    parentObj.FZero = (parentObj.registerE === 0);
  }
  //RL H
  //#0x14:
  ,
  function (parentObj) {
    var newFCarry = (parentObj.registersHL > 0x7FFF);
    parentObj.registersHL = ((parentObj.registersHL << 1) & 0xFE00) | ((parentObj.FCarry) ? 0x100 : 0) | (parentObj.registersHL & 0xFF);
    parentObj.FCarry = newFCarry;
    parentObj.FHalfCarry = parentObj.FSubtract = false;
    parentObj.FZero = (parentObj.registersHL < 0x100);
  }
  //RL L
  //#0x15:
  ,
  function (parentObj) {
    var newFCarry = ((parentObj.registersHL & 0x80) === 0x80);
    parentObj.registersHL = (parentObj.registersHL & 0xFF00) | ((parentObj.registersHL << 1) & 0xFF) | ((parentObj.FCarry) ? 1 : 0);
    parentObj.FCarry = newFCarry;
    parentObj.FHalfCarry = parentObj.FSubtract = false;
    parentObj.FZero = ((parentObj.registersHL & 0xFF) === 0);
  }
  //RL (HL)
  //#0x16:
  ,
  function (parentObj) {
    var temp_var = parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL);
    var newFCarry = (temp_var > 0x7F);
    temp_var = ((temp_var << 1) & 0xFF) | ((parentObj.FCarry) ? 1 : 0);
    parentObj.FCarry = newFCarry;
    parentObj.memoryWriter[parentObj.registersHL](parentObj, parentObj.registersHL, temp_var);
    parentObj.FHalfCarry = parentObj.FSubtract = false;
    parentObj.FZero = (temp_var === 0);
  }
  //RL A
  //#0x17:
  ,
  function (parentObj) {
    var newFCarry = (parentObj.registerA > 0x7F);
    parentObj.registerA = ((parentObj.registerA << 1) & 0xFF) | ((parentObj.FCarry) ? 1 : 0);
    parentObj.FCarry = newFCarry;
    parentObj.FHalfCarry = parentObj.FSubtract = false;
    parentObj.FZero = (parentObj.registerA === 0);
  }
  //RR B
  //#0x18:
  ,
  function (parentObj) {
    var newFCarry = ((parentObj.registerB & 0x01) === 0x01);
    parentObj.registerB = ((parentObj.FCarry) ? 0x80 : 0) | (parentObj.registerB >> 1);
    parentObj.FCarry = newFCarry;
    parentObj.FHalfCarry = parentObj.FSubtract = false;
    parentObj.FZero = (parentObj.registerB === 0);
  }
  //RR C
  //#0x19:
  ,
  function (parentObj) {
    var newFCarry = ((parentObj.registerC & 0x01) === 0x01);
    parentObj.registerC = ((parentObj.FCarry) ? 0x80 : 0) | (parentObj.registerC >> 1);
    parentObj.FCarry = newFCarry;
    parentObj.FHalfCarry = parentObj.FSubtract = false;
    parentObj.FZero = (parentObj.registerC === 0);
  }
  //RR D
  //#0x1A:
  ,
  function (parentObj) {
    var newFCarry = ((parentObj.registerD & 0x01) === 0x01);
    parentObj.registerD = ((parentObj.FCarry) ? 0x80 : 0) | (parentObj.registerD >> 1);
    parentObj.FCarry = newFCarry;
    parentObj.FHalfCarry = parentObj.FSubtract = false;
    parentObj.FZero = (parentObj.registerD === 0);
  }
  //RR E
  //#0x1B:
  ,
  function (parentObj) {
    var newFCarry = ((parentObj.registerE & 0x01) === 0x01);
    parentObj.registerE = ((parentObj.FCarry) ? 0x80 : 0) | (parentObj.registerE >> 1);
    parentObj.FCarry = newFCarry;
    parentObj.FHalfCarry = parentObj.FSubtract = false;
    parentObj.FZero = (parentObj.registerE === 0);
  }
  //RR H
  //#0x1C:
  ,
  function (parentObj) {
    var newFCarry = ((parentObj.registersHL & 0x0100) === 0x0100);
    parentObj.registersHL = ((parentObj.FCarry) ? 0x8000 : 0) | ((parentObj.registersHL >> 1) & 0xFF00) | (parentObj.registersHL & 0xFF);
    parentObj.FCarry = newFCarry;
    parentObj.FHalfCarry = parentObj.FSubtract = false;
    parentObj.FZero = (parentObj.registersHL < 0x100);
  }
  //RR L
  //#0x1D:
  ,
  function (parentObj) {
    var newFCarry = ((parentObj.registersHL & 0x01) === 0x01);
    parentObj.registersHL = (parentObj.registersHL & 0xFF00) | ((parentObj.FCarry) ? 0x80 : 0) | ((parentObj.registersHL & 0xFF) >> 1);
    parentObj.FCarry = newFCarry;
    parentObj.FHalfCarry = parentObj.FSubtract = false;
    parentObj.FZero = ((parentObj.registersHL & 0xFF) === 0);
  }
  //RR (HL)
  //#0x1E:
  ,
  function (parentObj) {
    var temp_var = parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL);
    var newFCarry = ((temp_var & 0x01) === 0x01);
    temp_var = ((parentObj.FCarry) ? 0x80 : 0) | (temp_var >> 1);
    parentObj.FCarry = newFCarry;
    parentObj.memoryWriter[parentObj.registersHL](parentObj, parentObj.registersHL, temp_var);
    parentObj.FHalfCarry = parentObj.FSubtract = false;
    parentObj.FZero = (temp_var === 0);
  }
  //RR A
  //#0x1F:
  ,
  function (parentObj) {
    var newFCarry = ((parentObj.registerA & 0x01) === 0x01);
    parentObj.registerA = ((parentObj.FCarry) ? 0x80 : 0) | (parentObj.registerA >> 1);
    parentObj.FCarry = newFCarry;
    parentObj.FHalfCarry = parentObj.FSubtract = false;
    parentObj.FZero = (parentObj.registerA === 0);
  }
  //SLA B
  //#0x20:
  ,
  function (parentObj) {
    parentObj.FCarry = (parentObj.registerB > 0x7F);
    parentObj.registerB = (parentObj.registerB << 1) & 0xFF;
    parentObj.FHalfCarry = parentObj.FSubtract = false;
    parentObj.FZero = (parentObj.registerB === 0);
  }
  //SLA C
  //#0x21:
  ,
  function (parentObj) {
    parentObj.FCarry = (parentObj.registerC > 0x7F);
    parentObj.registerC = (parentObj.registerC << 1) & 0xFF;
    parentObj.FHalfCarry = parentObj.FSubtract = false;
    parentObj.FZero = (parentObj.registerC === 0);
  }
  //SLA D
  //#0x22:
  ,
  function (parentObj) {
    parentObj.FCarry = (parentObj.registerD > 0x7F);
    parentObj.registerD = (parentObj.registerD << 1) & 0xFF;
    parentObj.FHalfCarry = parentObj.FSubtract = false;
    parentObj.FZero = (parentObj.registerD === 0);
  }
  //SLA E
  //#0x23:
  ,
  function (parentObj) {
    parentObj.FCarry = (parentObj.registerE > 0x7F);
    parentObj.registerE = (parentObj.registerE << 1) & 0xFF;
    parentObj.FHalfCarry = parentObj.FSubtract = false;
    parentObj.FZero = (parentObj.registerE === 0);
  }
  //SLA H
  //#0x24:
  ,
  function (parentObj) {
    parentObj.FCarry = (parentObj.registersHL > 0x7FFF);
    parentObj.registersHL = ((parentObj.registersHL << 1) & 0xFE00) | (parentObj.registersHL & 0xFF);
    parentObj.FHalfCarry = parentObj.FSubtract = false;
    parentObj.FZero = (parentObj.registersHL < 0x100);
  }
  //SLA L
  //#0x25:
  ,
  function (parentObj) {
    parentObj.FCarry = ((parentObj.registersHL & 0x0080) === 0x0080);
    parentObj.registersHL = (parentObj.registersHL & 0xFF00) | ((parentObj.registersHL << 1) & 0xFF);
    parentObj.FHalfCarry = parentObj.FSubtract = false;
    parentObj.FZero = ((parentObj.registersHL & 0xFF) === 0);
  }
  //SLA (HL)
  //#0x26:
  ,
  function (parentObj) {
    var temp_var = parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL);
    parentObj.FCarry = (temp_var > 0x7F);
    temp_var = (temp_var << 1) & 0xFF;
    parentObj.memoryWriter[parentObj.registersHL](parentObj, parentObj.registersHL, temp_var);
    parentObj.FHalfCarry = parentObj.FSubtract = false;
    parentObj.FZero = (temp_var === 0);
  }
  //SLA A
  //#0x27:
  ,
  function (parentObj) {
    parentObj.FCarry = (parentObj.registerA > 0x7F);
    parentObj.registerA = (parentObj.registerA << 1) & 0xFF;
    parentObj.FHalfCarry = parentObj.FSubtract = false;
    parentObj.FZero = (parentObj.registerA === 0);
  }
  //SRA B
  //#0x28:
  ,
  function (parentObj) {
    parentObj.FCarry = ((parentObj.registerB & 0x01) === 0x01);
    parentObj.registerB = (parentObj.registerB & 0x80) | (parentObj.registerB >> 1);
    parentObj.FHalfCarry = parentObj.FSubtract = false;
    parentObj.FZero = (parentObj.registerB === 0);
  }
  //SRA C
  //#0x29:
  ,
  function (parentObj) {
    parentObj.FCarry = ((parentObj.registerC & 0x01) === 0x01);
    parentObj.registerC = (parentObj.registerC & 0x80) | (parentObj.registerC >> 1);
    parentObj.FHalfCarry = parentObj.FSubtract = false;
    parentObj.FZero = (parentObj.registerC === 0);
  }
  //SRA D
  //#0x2A:
  ,
  function (parentObj) {
    parentObj.FCarry = ((parentObj.registerD & 0x01) === 0x01);
    parentObj.registerD = (parentObj.registerD & 0x80) | (parentObj.registerD >> 1);
    parentObj.FHalfCarry = parentObj.FSubtract = false;
    parentObj.FZero = (parentObj.registerD === 0);
  }
  //SRA E
  //#0x2B:
  ,
  function (parentObj) {
    parentObj.FCarry = ((parentObj.registerE & 0x01) === 0x01);
    parentObj.registerE = (parentObj.registerE & 0x80) | (parentObj.registerE >> 1);
    parentObj.FHalfCarry = parentObj.FSubtract = false;
    parentObj.FZero = (parentObj.registerE === 0);
  }
  //SRA H
  //#0x2C:
  ,
  function (parentObj) {
    parentObj.FCarry = ((parentObj.registersHL & 0x0100) === 0x0100);
    parentObj.registersHL = ((parentObj.registersHL >> 1) & 0xFF00) | (parentObj.registersHL & 0x80FF);
    parentObj.FHalfCarry = parentObj.FSubtract = false;
    parentObj.FZero = (parentObj.registersHL < 0x100);
  }
  //SRA L
  //#0x2D:
  ,
  function (parentObj) {
    parentObj.FCarry = ((parentObj.registersHL & 0x0001) === 0x0001);
    parentObj.registersHL = (parentObj.registersHL & 0xFF80) | ((parentObj.registersHL & 0xFF) >> 1);
    parentObj.FHalfCarry = parentObj.FSubtract = false;
    parentObj.FZero = ((parentObj.registersHL & 0xFF) === 0);
  }
  //SRA (HL)
  //#0x2E:
  ,
  function (parentObj) {
    var temp_var = parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL);
    parentObj.FCarry = ((temp_var & 0x01) === 0x01);
    temp_var = (temp_var & 0x80) | (temp_var >> 1);
    parentObj.memoryWriter[parentObj.registersHL](parentObj, parentObj.registersHL, temp_var);
    parentObj.FHalfCarry = parentObj.FSubtract = false;
    parentObj.FZero = (temp_var === 0);
  }
  //SRA A
  //#0x2F:
  ,
  function (parentObj) {
    parentObj.FCarry = ((parentObj.registerA & 0x01) === 0x01);
    parentObj.registerA = (parentObj.registerA & 0x80) | (parentObj.registerA >> 1);
    parentObj.FHalfCarry = parentObj.FSubtract = false;
    parentObj.FZero = (parentObj.registerA === 0);
  }
  //SWAP B
  //#0x30:
  ,
  function (parentObj) {
    parentObj.registerB = ((parentObj.registerB & 0xF) << 4) | (parentObj.registerB >> 4);
    parentObj.FZero = (parentObj.registerB === 0);
    parentObj.FCarry = parentObj.FHalfCarry = parentObj.FSubtract = false;
  }
  //SWAP C
  //#0x31:
  ,
  function (parentObj) {
    parentObj.registerC = ((parentObj.registerC & 0xF) << 4) | (parentObj.registerC >> 4);
    parentObj.FZero = (parentObj.registerC === 0);
    parentObj.FCarry = parentObj.FHalfCarry = parentObj.FSubtract = false;
  }
  //SWAP D
  //#0x32:
  ,
  function (parentObj) {
    parentObj.registerD = ((parentObj.registerD & 0xF) << 4) | (parentObj.registerD >> 4);
    parentObj.FZero = (parentObj.registerD === 0);
    parentObj.FCarry = parentObj.FHalfCarry = parentObj.FSubtract = false;
  }
  //SWAP E
  //#0x33:
  ,
  function (parentObj) {
    parentObj.registerE = ((parentObj.registerE & 0xF) << 4) | (parentObj.registerE >> 4);
    parentObj.FZero = (parentObj.registerE === 0);
    parentObj.FCarry = parentObj.FHalfCarry = parentObj.FSubtract = false;
  }
  //SWAP H
  //#0x34:
  ,
  function (parentObj) {
    parentObj.registersHL = ((parentObj.registersHL & 0xF00) << 4) | ((parentObj.registersHL & 0xF000) >> 4) | (parentObj.registersHL & 0xFF);
    parentObj.FZero = (parentObj.registersHL < 0x100);
    parentObj.FCarry = parentObj.FHalfCarry = parentObj.FSubtract = false;
  }
  //SWAP L
  //#0x35:
  ,
  function (parentObj) {
    parentObj.registersHL = (parentObj.registersHL & 0xFF00) | ((parentObj.registersHL & 0xF) << 4) | ((parentObj.registersHL & 0xF0) >> 4);
    parentObj.FZero = ((parentObj.registersHL & 0xFF) === 0);
    parentObj.FCarry = parentObj.FHalfCarry = parentObj.FSubtract = false;
  }
  //SWAP (HL)
  //#0x36:
  ,
  function (parentObj) {
    var temp_var = parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL);
    temp_var = ((temp_var & 0xF) << 4) | (temp_var >> 4);
    parentObj.memoryWriter[parentObj.registersHL](parentObj, parentObj.registersHL, temp_var);
    parentObj.FZero = (temp_var === 0);
    parentObj.FCarry = parentObj.FHalfCarry = parentObj.FSubtract = false;
  }
  //SWAP A
  //#0x37:
  ,
  function (parentObj) {
    parentObj.registerA = ((parentObj.registerA & 0xF) << 4) | (parentObj.registerA >> 4);
    parentObj.FZero = (parentObj.registerA === 0);
    parentObj.FCarry = parentObj.FHalfCarry = parentObj.FSubtract = false;
  }
  //SRL B
  //#0x38:
  ,
  function (parentObj) {
    parentObj.FCarry = ((parentObj.registerB & 0x01) === 0x01);
    parentObj.registerB >>= 1;
    parentObj.FHalfCarry = parentObj.FSubtract = false;
    parentObj.FZero = (parentObj.registerB === 0);
  }
  //SRL C
  //#0x39:
  ,
  function (parentObj) {
    parentObj.FCarry = ((parentObj.registerC & 0x01) === 0x01);
    parentObj.registerC >>= 1;
    parentObj.FHalfCarry = parentObj.FSubtract = false;
    parentObj.FZero = (parentObj.registerC === 0);
  }
  //SRL D
  //#0x3A:
  ,
  function (parentObj) {
    parentObj.FCarry = ((parentObj.registerD & 0x01) === 0x01);
    parentObj.registerD >>= 1;
    parentObj.FHalfCarry = parentObj.FSubtract = false;
    parentObj.FZero = (parentObj.registerD === 0);
  }
  //SRL E
  //#0x3B:
  ,
  function (parentObj) {
    parentObj.FCarry = ((parentObj.registerE & 0x01) === 0x01);
    parentObj.registerE >>= 1;
    parentObj.FHalfCarry = parentObj.FSubtract = false;
    parentObj.FZero = (parentObj.registerE === 0);
  }
  //SRL H
  //#0x3C:
  ,
  function (parentObj) {
    parentObj.FCarry = ((parentObj.registersHL & 0x0100) === 0x0100);
    parentObj.registersHL = ((parentObj.registersHL >> 1) & 0xFF00) | (parentObj.registersHL & 0xFF);
    parentObj.FHalfCarry = parentObj.FSubtract = false;
    parentObj.FZero = (parentObj.registersHL < 0x100);
  }
  //SRL L
  //#0x3D:
  ,
  function (parentObj) {
    parentObj.FCarry = ((parentObj.registersHL & 0x0001) === 0x0001);
    parentObj.registersHL = (parentObj.registersHL & 0xFF00) | ((parentObj.registersHL & 0xFF) >> 1);
    parentObj.FHalfCarry = parentObj.FSubtract = false;
    parentObj.FZero = ((parentObj.registersHL & 0xFF) === 0);
  }
  //SRL (HL)
  //#0x3E:
  ,
  function (parentObj) {
    var temp_var = parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL);
    parentObj.FCarry = ((temp_var & 0x01) === 0x01);
    parentObj.memoryWriter[parentObj.registersHL](parentObj, parentObj.registersHL, temp_var >> 1);
    parentObj.FHalfCarry = parentObj.FSubtract = false;
    parentObj.FZero = (temp_var < 2);
  }
  //SRL A
  //#0x3F:
  ,
  function (parentObj) {
    parentObj.FCarry = ((parentObj.registerA & 0x01) === 0x01);
    parentObj.registerA >>= 1;
    parentObj.FHalfCarry = parentObj.FSubtract = false;
    parentObj.FZero = (parentObj.registerA === 0);
  }
  //BIT 0, B
  //#0x40:
  ,
  function (parentObj) {
    parentObj.FHalfCarry = true;
    parentObj.FSubtract = false;
    parentObj.FZero = ((parentObj.registerB & 0x01) === 0);
  }
  //BIT 0, C
  //#0x41:
  ,
  function (parentObj) {
    parentObj.FHalfCarry = true;
    parentObj.FSubtract = false;
    parentObj.FZero = ((parentObj.registerC & 0x01) === 0);
  }
  //BIT 0, D
  //#0x42:
  ,
  function (parentObj) {
    parentObj.FHalfCarry = true;
    parentObj.FSubtract = false;
    parentObj.FZero = ((parentObj.registerD & 0x01) === 0);
  }
  //BIT 0, E
  //#0x43:
  ,
  function (parentObj) {
    parentObj.FHalfCarry = true;
    parentObj.FSubtract = false;
    parentObj.FZero = ((parentObj.registerE & 0x01) === 0);
  }
  //BIT 0, H
  //#0x44:
  ,
  function (parentObj) {
    parentObj.FHalfCarry = true;
    parentObj.FSubtract = false;
    parentObj.FZero = ((parentObj.registersHL & 0x0100) === 0);
  }
  //BIT 0, L
  //#0x45:
  ,
  function (parentObj) {
    parentObj.FHalfCarry = true;
    parentObj.FSubtract = false;
    parentObj.FZero = ((parentObj.registersHL & 0x0001) === 0);
  }
  //BIT 0, (HL)
  //#0x46:
  ,
  function (parentObj) {
    parentObj.FHalfCarry = true;
    parentObj.FSubtract = false;
    parentObj.FZero = ((parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL) & 0x01) === 0);
  }
  //BIT 0, A
  //#0x47:
  ,
  function (parentObj) {
    parentObj.FHalfCarry = true;
    parentObj.FSubtract = false;
    parentObj.FZero = ((parentObj.registerA & 0x01) === 0);
  }
  //BIT 1, B
  //#0x48:
  ,
  function (parentObj) {
    parentObj.FHalfCarry = true;
    parentObj.FSubtract = false;
    parentObj.FZero = ((parentObj.registerB & 0x02) === 0);
  }
  //BIT 1, C
  //#0x49:
  ,
  function (parentObj) {
    parentObj.FHalfCarry = true;
    parentObj.FSubtract = false;
    parentObj.FZero = ((parentObj.registerC & 0x02) === 0);
  }
  //BIT 1, D
  //#0x4A:
  ,
  function (parentObj) {
    parentObj.FHalfCarry = true;
    parentObj.FSubtract = false;
    parentObj.FZero = ((parentObj.registerD & 0x02) === 0);
  }
  //BIT 1, E
  //#0x4B:
  ,
  function (parentObj) {
    parentObj.FHalfCarry = true;
    parentObj.FSubtract = false;
    parentObj.FZero = ((parentObj.registerE & 0x02) === 0);
  }
  //BIT 1, H
  //#0x4C:
  ,
  function (parentObj) {
    parentObj.FHalfCarry = true;
    parentObj.FSubtract = false;
    parentObj.FZero = ((parentObj.registersHL & 0x0200) === 0);
  }
  //BIT 1, L
  //#0x4D:
  ,
  function (parentObj) {
    parentObj.FHalfCarry = true;
    parentObj.FSubtract = false;
    parentObj.FZero = ((parentObj.registersHL & 0x0002) === 0);
  }
  //BIT 1, (HL)
  //#0x4E:
  ,
  function (parentObj) {
    parentObj.FHalfCarry = true;
    parentObj.FSubtract = false;
    parentObj.FZero = ((parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL) & 0x02) === 0);
  }
  //BIT 1, A
  //#0x4F:
  ,
  function (parentObj) {
    parentObj.FHalfCarry = true;
    parentObj.FSubtract = false;
    parentObj.FZero = ((parentObj.registerA & 0x02) === 0);
  }
  //BIT 2, B
  //#0x50:
  ,
  function (parentObj) {
    parentObj.FHalfCarry = true;
    parentObj.FSubtract = false;
    parentObj.FZero = ((parentObj.registerB & 0x04) === 0);
  }
  //BIT 2, C
  //#0x51:
  ,
  function (parentObj) {
    parentObj.FHalfCarry = true;
    parentObj.FSubtract = false;
    parentObj.FZero = ((parentObj.registerC & 0x04) === 0);
  }
  //BIT 2, D
  //#0x52:
  ,
  function (parentObj) {
    parentObj.FHalfCarry = true;
    parentObj.FSubtract = false;
    parentObj.FZero = ((parentObj.registerD & 0x04) === 0);
  }
  //BIT 2, E
  //#0x53:
  ,
  function (parentObj) {
    parentObj.FHalfCarry = true;
    parentObj.FSubtract = false;
    parentObj.FZero = ((parentObj.registerE & 0x04) === 0);
  }
  //BIT 2, H
  //#0x54:
  ,
  function (parentObj) {
    parentObj.FHalfCarry = true;
    parentObj.FSubtract = false;
    parentObj.FZero = ((parentObj.registersHL & 0x0400) === 0);
  }
  //BIT 2, L
  //#0x55:
  ,
  function (parentObj) {
    parentObj.FHalfCarry = true;
    parentObj.FSubtract = false;
    parentObj.FZero = ((parentObj.registersHL & 0x0004) === 0);
  }
  //BIT 2, (HL)
  //#0x56:
  ,
  function (parentObj) {
    parentObj.FHalfCarry = true;
    parentObj.FSubtract = false;
    parentObj.FZero = ((parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL) & 0x04) === 0);
  }
  //BIT 2, A
  //#0x57:
  ,
  function (parentObj) {
    parentObj.FHalfCarry = true;
    parentObj.FSubtract = false;
    parentObj.FZero = ((parentObj.registerA & 0x04) === 0);
  }
  //BIT 3, B
  //#0x58:
  ,
  function (parentObj) {
    parentObj.FHalfCarry = true;
    parentObj.FSubtract = false;
    parentObj.FZero = ((parentObj.registerB & 0x08) === 0);
  }
  //BIT 3, C
  //#0x59:
  ,
  function (parentObj) {
    parentObj.FHalfCarry = true;
    parentObj.FSubtract = false;
    parentObj.FZero = ((parentObj.registerC & 0x08) === 0);
  }
  //BIT 3, D
  //#0x5A:
  ,
  function (parentObj) {
    parentObj.FHalfCarry = true;
    parentObj.FSubtract = false;
    parentObj.FZero = ((parentObj.registerD & 0x08) === 0);
  }
  //BIT 3, E
  //#0x5B:
  ,
  function (parentObj) {
    parentObj.FHalfCarry = true;
    parentObj.FSubtract = false;
    parentObj.FZero = ((parentObj.registerE & 0x08) === 0);
  }
  //BIT 3, H
  //#0x5C:
  ,
  function (parentObj) {
    parentObj.FHalfCarry = true;
    parentObj.FSubtract = false;
    parentObj.FZero = ((parentObj.registersHL & 0x0800) === 0);
  }
  //BIT 3, L
  //#0x5D:
  ,
  function (parentObj) {
    parentObj.FHalfCarry = true;
    parentObj.FSubtract = false;
    parentObj.FZero = ((parentObj.registersHL & 0x0008) === 0);
  }
  //BIT 3, (HL)
  //#0x5E:
  ,
  function (parentObj) {
    parentObj.FHalfCarry = true;
    parentObj.FSubtract = false;
    parentObj.FZero = ((parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL) & 0x08) === 0);
  }
  //BIT 3, A
  //#0x5F:
  ,
  function (parentObj) {
    parentObj.FHalfCarry = true;
    parentObj.FSubtract = false;
    parentObj.FZero = ((parentObj.registerA & 0x08) === 0);
  }
  //BIT 4, B
  //#0x60:
  ,
  function (parentObj) {
    parentObj.FHalfCarry = true;
    parentObj.FSubtract = false;
    parentObj.FZero = ((parentObj.registerB & 0x10) === 0);
  }
  //BIT 4, C
  //#0x61:
  ,
  function (parentObj) {
    parentObj.FHalfCarry = true;
    parentObj.FSubtract = false;
    parentObj.FZero = ((parentObj.registerC & 0x10) === 0);
  }
  //BIT 4, D
  //#0x62:
  ,
  function (parentObj) {
    parentObj.FHalfCarry = true;
    parentObj.FSubtract = false;
    parentObj.FZero = ((parentObj.registerD & 0x10) === 0);
  }
  //BIT 4, E
  //#0x63:
  ,
  function (parentObj) {
    parentObj.FHalfCarry = true;
    parentObj.FSubtract = false;
    parentObj.FZero = ((parentObj.registerE & 0x10) === 0);
  }
  //BIT 4, H
  //#0x64:
  ,
  function (parentObj) {
    parentObj.FHalfCarry = true;
    parentObj.FSubtract = false;
    parentObj.FZero = ((parentObj.registersHL & 0x1000) === 0);
  }
  //BIT 4, L
  //#0x65:
  ,
  function (parentObj) {
    parentObj.FHalfCarry = true;
    parentObj.FSubtract = false;
    parentObj.FZero = ((parentObj.registersHL & 0x0010) === 0);
  }
  //BIT 4, (HL)
  //#0x66:
  ,
  function (parentObj) {
    parentObj.FHalfCarry = true;
    parentObj.FSubtract = false;
    parentObj.FZero = ((parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL) & 0x10) === 0);
  }
  //BIT 4, A
  //#0x67:
  ,
  function (parentObj) {
    parentObj.FHalfCarry = true;
    parentObj.FSubtract = false;
    parentObj.FZero = ((parentObj.registerA & 0x10) === 0);
  }
  //BIT 5, B
  //#0x68:
  ,
  function (parentObj) {
    parentObj.FHalfCarry = true;
    parentObj.FSubtract = false;
    parentObj.FZero = ((parentObj.registerB & 0x20) === 0);
  }
  //BIT 5, C
  //#0x69:
  ,
  function (parentObj) {
    parentObj.FHalfCarry = true;
    parentObj.FSubtract = false;
    parentObj.FZero = ((parentObj.registerC & 0x20) === 0);
  }
  //BIT 5, D
  //#0x6A:
  ,
  function (parentObj) {
    parentObj.FHalfCarry = true;
    parentObj.FSubtract = false;
    parentObj.FZero = ((parentObj.registerD & 0x20) === 0);
  }
  //BIT 5, E
  //#0x6B:
  ,
  function (parentObj) {
    parentObj.FHalfCarry = true;
    parentObj.FSubtract = false;
    parentObj.FZero = ((parentObj.registerE & 0x20) === 0);
  }
  //BIT 5, H
  //#0x6C:
  ,
  function (parentObj) {
    parentObj.FHalfCarry = true;
    parentObj.FSubtract = false;
    parentObj.FZero = ((parentObj.registersHL & 0x2000) === 0);
  }
  //BIT 5, L
  //#0x6D:
  ,
  function (parentObj) {
    parentObj.FHalfCarry = true;
    parentObj.FSubtract = false;
    parentObj.FZero = ((parentObj.registersHL & 0x0020) === 0);
  }
  //BIT 5, (HL)
  //#0x6E:
  ,
  function (parentObj) {
    parentObj.FHalfCarry = true;
    parentObj.FSubtract = false;
    parentObj.FZero = ((parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL) & 0x20) === 0);
  }
  //BIT 5, A
  //#0x6F:
  ,
  function (parentObj) {
    parentObj.FHalfCarry = true;
    parentObj.FSubtract = false;
    parentObj.FZero = ((parentObj.registerA & 0x20) === 0);
  }
  //BIT 6, B
  //#0x70:
  ,
  function (parentObj) {
    parentObj.FHalfCarry = true;
    parentObj.FSubtract = false;
    parentObj.FZero = ((parentObj.registerB & 0x40) === 0);
  }
  //BIT 6, C
  //#0x71:
  ,
  function (parentObj) {
    parentObj.FHalfCarry = true;
    parentObj.FSubtract = false;
    parentObj.FZero = ((parentObj.registerC & 0x40) === 0);
  }
  //BIT 6, D
  //#0x72:
  ,
  function (parentObj) {
    parentObj.FHalfCarry = true;
    parentObj.FSubtract = false;
    parentObj.FZero = ((parentObj.registerD & 0x40) === 0);
  }
  //BIT 6, E
  //#0x73:
  ,
  function (parentObj) {
    parentObj.FHalfCarry = true;
    parentObj.FSubtract = false;
    parentObj.FZero = ((parentObj.registerE & 0x40) === 0);
  }
  //BIT 6, H
  //#0x74:
  ,
  function (parentObj) {
    parentObj.FHalfCarry = true;
    parentObj.FSubtract = false;
    parentObj.FZero = ((parentObj.registersHL & 0x4000) === 0);
  }
  //BIT 6, L
  //#0x75:
  ,
  function (parentObj) {
    parentObj.FHalfCarry = true;
    parentObj.FSubtract = false;
    parentObj.FZero = ((parentObj.registersHL & 0x0040) === 0);
  }
  //BIT 6, (HL)
  //#0x76:
  ,
  function (parentObj) {
    parentObj.FHalfCarry = true;
    parentObj.FSubtract = false;
    parentObj.FZero = ((parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL) & 0x40) === 0);
  }
  //BIT 6, A
  //#0x77:
  ,
  function (parentObj) {
    parentObj.FHalfCarry = true;
    parentObj.FSubtract = false;
    parentObj.FZero = ((parentObj.registerA & 0x40) === 0);
  }
  //BIT 7, B
  //#0x78:
  ,
  function (parentObj) {
    parentObj.FHalfCarry = true;
    parentObj.FSubtract = false;
    parentObj.FZero = ((parentObj.registerB & 0x80) === 0);
  }
  //BIT 7, C
  //#0x79:
  ,
  function (parentObj) {
    parentObj.FHalfCarry = true;
    parentObj.FSubtract = false;
    parentObj.FZero = ((parentObj.registerC & 0x80) === 0);
  }
  //BIT 7, D
  //#0x7A:
  ,
  function (parentObj) {
    parentObj.FHalfCarry = true;
    parentObj.FSubtract = false;
    parentObj.FZero = ((parentObj.registerD & 0x80) === 0);
  }
  //BIT 7, E
  //#0x7B:
  ,
  function (parentObj) {
    parentObj.FHalfCarry = true;
    parentObj.FSubtract = false;
    parentObj.FZero = ((parentObj.registerE & 0x80) === 0);
  }
  //BIT 7, H
  //#0x7C:
  ,
  function (parentObj) {
    parentObj.FHalfCarry = true;
    parentObj.FSubtract = false;
    parentObj.FZero = ((parentObj.registersHL & 0x8000) === 0);
  }
  //BIT 7, L
  //#0x7D:
  ,
  function (parentObj) {
    parentObj.FHalfCarry = true;
    parentObj.FSubtract = false;
    parentObj.FZero = ((parentObj.registersHL & 0x0080) === 0);
  }
  //BIT 7, (HL)
  //#0x7E:
  ,
  function (parentObj) {
    parentObj.FHalfCarry = true;
    parentObj.FSubtract = false;
    parentObj.FZero = ((parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL) & 0x80) === 0);
  }
  //BIT 7, A
  //#0x7F:
  ,
  function (parentObj) {
    parentObj.FHalfCarry = true;
    parentObj.FSubtract = false;
    parentObj.FZero = ((parentObj.registerA & 0x80) === 0);
  }
  //RES 0, B
  //#0x80:
  ,
  function (parentObj) {
    parentObj.registerB &= 0xFE;
  }
  //RES 0, C
  //#0x81:
  ,
  function (parentObj) {
    parentObj.registerC &= 0xFE;
  }
  //RES 0, D
  //#0x82:
  ,
  function (parentObj) {
    parentObj.registerD &= 0xFE;
  }
  //RES 0, E
  //#0x83:
  ,
  function (parentObj) {
    parentObj.registerE &= 0xFE;
  }
  //RES 0, H
  //#0x84:
  ,
  function (parentObj) {
    parentObj.registersHL &= 0xFEFF;
  }
  //RES 0, L
  //#0x85:
  ,
  function (parentObj) {
    parentObj.registersHL &= 0xFFFE;
  }
  //RES 0, (HL)
  //#0x86:
  ,
  function (parentObj) {
    parentObj.memoryWriter[parentObj.registersHL](parentObj, parentObj.registersHL, parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL) & 0xFE);
  }
  //RES 0, A
  //#0x87:
  ,
  function (parentObj) {
    parentObj.registerA &= 0xFE;
  }
  //RES 1, B
  //#0x88:
  ,
  function (parentObj) {
    parentObj.registerB &= 0xFD;
  }
  //RES 1, C
  //#0x89:
  ,
  function (parentObj) {
    parentObj.registerC &= 0xFD;
  }
  //RES 1, D
  //#0x8A:
  ,
  function (parentObj) {
    parentObj.registerD &= 0xFD;
  }
  //RES 1, E
  //#0x8B:
  ,
  function (parentObj) {
    parentObj.registerE &= 0xFD;
  }
  //RES 1, H
  //#0x8C:
  ,
  function (parentObj) {
    parentObj.registersHL &= 0xFDFF;
  }
  //RES 1, L
  //#0x8D:
  ,
  function (parentObj) {
    parentObj.registersHL &= 0xFFFD;
  }
  //RES 1, (HL)
  //#0x8E:
  ,
  function (parentObj) {
    parentObj.memoryWriter[parentObj.registersHL](parentObj, parentObj.registersHL, parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL) & 0xFD);
  }
  //RES 1, A
  //#0x8F:
  ,
  function (parentObj) {
    parentObj.registerA &= 0xFD;
  }
  //RES 2, B
  //#0x90:
  ,
  function (parentObj) {
    parentObj.registerB &= 0xFB;
  }
  //RES 2, C
  //#0x91:
  ,
  function (parentObj) {
    parentObj.registerC &= 0xFB;
  }
  //RES 2, D
  //#0x92:
  ,
  function (parentObj) {
    parentObj.registerD &= 0xFB;
  }
  //RES 2, E
  //#0x93:
  ,
  function (parentObj) {
    parentObj.registerE &= 0xFB;
  }
  //RES 2, H
  //#0x94:
  ,
  function (parentObj) {
    parentObj.registersHL &= 0xFBFF;
  }
  //RES 2, L
  //#0x95:
  ,
  function (parentObj) {
    parentObj.registersHL &= 0xFFFB;
  }
  //RES 2, (HL)
  //#0x96:
  ,
  function (parentObj) {
    parentObj.memoryWriter[parentObj.registersHL](parentObj, parentObj.registersHL, parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL) & 0xFB);
  }
  //RES 2, A
  //#0x97:
  ,
  function (parentObj) {
    parentObj.registerA &= 0xFB;
  }
  //RES 3, B
  //#0x98:
  ,
  function (parentObj) {
    parentObj.registerB &= 0xF7;
  }
  //RES 3, C
  //#0x99:
  ,
  function (parentObj) {
    parentObj.registerC &= 0xF7;
  }
  //RES 3, D
  //#0x9A:
  ,
  function (parentObj) {
    parentObj.registerD &= 0xF7;
  }
  //RES 3, E
  //#0x9B:
  ,
  function (parentObj) {
    parentObj.registerE &= 0xF7;
  }
  //RES 3, H
  //#0x9C:
  ,
  function (parentObj) {
    parentObj.registersHL &= 0xF7FF;
  }
  //RES 3, L
  //#0x9D:
  ,
  function (parentObj) {
    parentObj.registersHL &= 0xFFF7;
  }
  //RES 3, (HL)
  //#0x9E:
  ,
  function (parentObj) {
    parentObj.memoryWriter[parentObj.registersHL](parentObj, parentObj.registersHL, parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL) & 0xF7);
  }
  //RES 3, A
  //#0x9F:
  ,
  function (parentObj) {
    parentObj.registerA &= 0xF7;
  }
  //RES 3, B
  //#0xA0:
  ,
  function (parentObj) {
    parentObj.registerB &= 0xEF;
  }
  //RES 4, C
  //#0xA1:
  ,
  function (parentObj) {
    parentObj.registerC &= 0xEF;
  }
  //RES 4, D
  //#0xA2:
  ,
  function (parentObj) {
    parentObj.registerD &= 0xEF;
  }
  //RES 4, E
  //#0xA3:
  ,
  function (parentObj) {
    parentObj.registerE &= 0xEF;
  }
  //RES 4, H
  //#0xA4:
  ,
  function (parentObj) {
    parentObj.registersHL &= 0xEFFF;
  }
  //RES 4, L
  //#0xA5:
  ,
  function (parentObj) {
    parentObj.registersHL &= 0xFFEF;
  }
  //RES 4, (HL)
  //#0xA6:
  ,
  function (parentObj) {
    parentObj.memoryWriter[parentObj.registersHL](parentObj, parentObj.registersHL, parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL) & 0xEF);
  }
  //RES 4, A
  //#0xA7:
  ,
  function (parentObj) {
    parentObj.registerA &= 0xEF;
  }
  //RES 5, B
  //#0xA8:
  ,
  function (parentObj) {
    parentObj.registerB &= 0xDF;
  }
  //RES 5, C
  //#0xA9:
  ,
  function (parentObj) {
    parentObj.registerC &= 0xDF;
  }
  //RES 5, D
  //#0xAA:
  ,
  function (parentObj) {
    parentObj.registerD &= 0xDF;
  }
  //RES 5, E
  //#0xAB:
  ,
  function (parentObj) {
    parentObj.registerE &= 0xDF;
  }
  //RES 5, H
  //#0xAC:
  ,
  function (parentObj) {
    parentObj.registersHL &= 0xDFFF;
  }
  //RES 5, L
  //#0xAD:
  ,
  function (parentObj) {
    parentObj.registersHL &= 0xFFDF;
  }
  //RES 5, (HL)
  //#0xAE:
  ,
  function (parentObj) {
    parentObj.memoryWriter[parentObj.registersHL](parentObj, parentObj.registersHL, parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL) & 0xDF);
  }
  //RES 5, A
  //#0xAF:
  ,
  function (parentObj) {
    parentObj.registerA &= 0xDF;
  }
  //RES 6, B
  //#0xB0:
  ,
  function (parentObj) {
    parentObj.registerB &= 0xBF;
  }
  //RES 6, C
  //#0xB1:
  ,
  function (parentObj) {
    parentObj.registerC &= 0xBF;
  }
  //RES 6, D
  //#0xB2:
  ,
  function (parentObj) {
    parentObj.registerD &= 0xBF;
  }
  //RES 6, E
  //#0xB3:
  ,
  function (parentObj) {
    parentObj.registerE &= 0xBF;
  }
  //RES 6, H
  //#0xB4:
  ,
  function (parentObj) {
    parentObj.registersHL &= 0xBFFF;
  }
  //RES 6, L
  //#0xB5:
  ,
  function (parentObj) {
    parentObj.registersHL &= 0xFFBF;
  }
  //RES 6, (HL)
  //#0xB6:
  ,
  function (parentObj) {
    parentObj.memoryWriter[parentObj.registersHL](parentObj, parentObj.registersHL, parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL) & 0xBF);
  }
  //RES 6, A
  //#0xB7:
  ,
  function (parentObj) {
    parentObj.registerA &= 0xBF;
  }
  //RES 7, B
  //#0xB8:
  ,
  function (parentObj) {
    parentObj.registerB &= 0x7F;
  }
  //RES 7, C
  //#0xB9:
  ,
  function (parentObj) {
    parentObj.registerC &= 0x7F;
  }
  //RES 7, D
  //#0xBA:
  ,
  function (parentObj) {
    parentObj.registerD &= 0x7F;
  }
  //RES 7, E
  //#0xBB:
  ,
  function (parentObj) {
    parentObj.registerE &= 0x7F;
  }
  //RES 7, H
  //#0xBC:
  ,
  function (parentObj) {
    parentObj.registersHL &= 0x7FFF;
  }
  //RES 7, L
  //#0xBD:
  ,
  function (parentObj) {
    parentObj.registersHL &= 0xFF7F;
  }
  //RES 7, (HL)
  //#0xBE:
  ,
  function (parentObj) {
    parentObj.memoryWriter[parentObj.registersHL](parentObj, parentObj.registersHL, parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL) & 0x7F);
  }
  //RES 7, A
  //#0xBF:
  ,
  function (parentObj) {
    parentObj.registerA &= 0x7F;
  }
  //SET 0, B
  //#0xC0:
  ,
  function (parentObj) {
    parentObj.registerB |= 0x01;
  }
  //SET 0, C
  //#0xC1:
  ,
  function (parentObj) {
    parentObj.registerC |= 0x01;
  }
  //SET 0, D
  //#0xC2:
  ,
  function (parentObj) {
    parentObj.registerD |= 0x01;
  }
  //SET 0, E
  //#0xC3:
  ,
  function (parentObj) {
    parentObj.registerE |= 0x01;
  }
  //SET 0, H
  //#0xC4:
  ,
  function (parentObj) {
    parentObj.registersHL |= 0x0100;
  }
  //SET 0, L
  //#0xC5:
  ,
  function (parentObj) {
    parentObj.registersHL |= 0x01;
  }
  //SET 0, (HL)
  //#0xC6:
  ,
  function (parentObj) {
    parentObj.memoryWriter[parentObj.registersHL](parentObj, parentObj.registersHL, parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL) | 0x01);
  }
  //SET 0, A
  //#0xC7:
  ,
  function (parentObj) {
    parentObj.registerA |= 0x01;
  }
  //SET 1, B
  //#0xC8:
  ,
  function (parentObj) {
    parentObj.registerB |= 0x02;
  }
  //SET 1, C
  //#0xC9:
  ,
  function (parentObj) {
    parentObj.registerC |= 0x02;
  }
  //SET 1, D
  //#0xCA:
  ,
  function (parentObj) {
    parentObj.registerD |= 0x02;
  }
  //SET 1, E
  //#0xCB:
  ,
  function (parentObj) {
    parentObj.registerE |= 0x02;
  }
  //SET 1, H
  //#0xCC:
  ,
  function (parentObj) {
    parentObj.registersHL |= 0x0200;
  }
  //SET 1, L
  //#0xCD:
  ,
  function (parentObj) {
    parentObj.registersHL |= 0x02;
  }
  //SET 1, (HL)
  //#0xCE:
  ,
  function (parentObj) {
    parentObj.memoryWriter[parentObj.registersHL](parentObj, parentObj.registersHL, parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL) | 0x02);
  }
  //SET 1, A
  //#0xCF:
  ,
  function (parentObj) {
    parentObj.registerA |= 0x02;
  }
  //SET 2, B
  //#0xD0:
  ,
  function (parentObj) {
    parentObj.registerB |= 0x04;
  }
  //SET 2, C
  //#0xD1:
  ,
  function (parentObj) {
    parentObj.registerC |= 0x04;
  }
  //SET 2, D
  //#0xD2:
  ,
  function (parentObj) {
    parentObj.registerD |= 0x04;
  }
  //SET 2, E
  //#0xD3:
  ,
  function (parentObj) {
    parentObj.registerE |= 0x04;
  }
  //SET 2, H
  //#0xD4:
  ,
  function (parentObj) {
    parentObj.registersHL |= 0x0400;
  }
  //SET 2, L
  //#0xD5:
  ,
  function (parentObj) {
    parentObj.registersHL |= 0x04;
  }
  //SET 2, (HL)
  //#0xD6:
  ,
  function (parentObj) {
    parentObj.memoryWriter[parentObj.registersHL](parentObj, parentObj.registersHL, parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL) | 0x04);
  }
  //SET 2, A
  //#0xD7:
  ,
  function (parentObj) {
    parentObj.registerA |= 0x04;
  }
  //SET 3, B
  //#0xD8:
  ,
  function (parentObj) {
    parentObj.registerB |= 0x08;
  }
  //SET 3, C
  //#0xD9:
  ,
  function (parentObj) {
    parentObj.registerC |= 0x08;
  }
  //SET 3, D
  //#0xDA:
  ,
  function (parentObj) {
    parentObj.registerD |= 0x08;
  }
  //SET 3, E
  //#0xDB:
  ,
  function (parentObj) {
    parentObj.registerE |= 0x08;
  }
  //SET 3, H
  //#0xDC:
  ,
  function (parentObj) {
    parentObj.registersHL |= 0x0800;
  }
  //SET 3, L
  //#0xDD:
  ,
  function (parentObj) {
    parentObj.registersHL |= 0x08;
  }
  //SET 3, (HL)
  //#0xDE:
  ,
  function (parentObj) {
    parentObj.memoryWriter[parentObj.registersHL](parentObj, parentObj.registersHL, parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL) | 0x08);
  }
  //SET 3, A
  //#0xDF:
  ,
  function (parentObj) {
    parentObj.registerA |= 0x08;
  }
  //SET 4, B
  //#0xE0:
  ,
  function (parentObj) {
    parentObj.registerB |= 0x10;
  }
  //SET 4, C
  //#0xE1:
  ,
  function (parentObj) {
    parentObj.registerC |= 0x10;
  }
  //SET 4, D
  //#0xE2:
  ,
  function (parentObj) {
    parentObj.registerD |= 0x10;
  }
  //SET 4, E
  //#0xE3:
  ,
  function (parentObj) {
    parentObj.registerE |= 0x10;
  }
  //SET 4, H
  //#0xE4:
  ,
  function (parentObj) {
    parentObj.registersHL |= 0x1000;
  }
  //SET 4, L
  //#0xE5:
  ,
  function (parentObj) {
    parentObj.registersHL |= 0x10;
  }
  //SET 4, (HL)
  //#0xE6:
  ,
  function (parentObj) {
    parentObj.memoryWriter[parentObj.registersHL](parentObj, parentObj.registersHL, parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL) | 0x10);
  }
  //SET 4, A
  //#0xE7:
  ,
  function (parentObj) {
    parentObj.registerA |= 0x10;
  }
  //SET 5, B
  //#0xE8:
  ,
  function (parentObj) {
    parentObj.registerB |= 0x20;
  }
  //SET 5, C
  //#0xE9:
  ,
  function (parentObj) {
    parentObj.registerC |= 0x20;
  }
  //SET 5, D
  //#0xEA:
  ,
  function (parentObj) {
    parentObj.registerD |= 0x20;
  }
  //SET 5, E
  //#0xEB:
  ,
  function (parentObj) {
    parentObj.registerE |= 0x20;
  }
  //SET 5, H
  //#0xEC:
  ,
  function (parentObj) {
    parentObj.registersHL |= 0x2000;
  }
  //SET 5, L
  //#0xED:
  ,
  function (parentObj) {
    parentObj.registersHL |= 0x20;
  }
  //SET 5, (HL)
  //#0xEE:
  ,
  function (parentObj) {
    parentObj.memoryWriter[parentObj.registersHL](parentObj, parentObj.registersHL, parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL) | 0x20);
  }
  //SET 5, A
  //#0xEF:
  ,
  function (parentObj) {
    parentObj.registerA |= 0x20;
  }
  //SET 6, B
  //#0xF0:
  ,
  function (parentObj) {
    parentObj.registerB |= 0x40;
  }
  //SET 6, C
  //#0xF1:
  ,
  function (parentObj) {
    parentObj.registerC |= 0x40;
  }
  //SET 6, D
  //#0xF2:
  ,
  function (parentObj) {
    parentObj.registerD |= 0x40;
  }
  //SET 6, E
  //#0xF3:
  ,
  function (parentObj) {
    parentObj.registerE |= 0x40;
  }
  //SET 6, H
  //#0xF4:
  ,
  function (parentObj) {
    parentObj.registersHL |= 0x4000;
  }
  //SET 6, L
  //#0xF5:
  ,
  function (parentObj) {
    parentObj.registersHL |= 0x40;
  }
  //SET 6, (HL)
  //#0xF6:
  ,
  function (parentObj) {
    parentObj.memoryWriter[parentObj.registersHL](parentObj, parentObj.registersHL, parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL) | 0x40);
  }
  //SET 6, A
  //#0xF7:
  ,
  function (parentObj) {
    parentObj.registerA |= 0x40;
  }
  //SET 7, B
  //#0xF8:
  ,
  function (parentObj) {
    parentObj.registerB |= 0x80;
  }
  //SET 7, C
  //#0xF9:
  ,
  function (parentObj) {
    parentObj.registerC |= 0x80;
  }
  //SET 7, D
  //#0xFA:
  ,
  function (parentObj) {
    parentObj.registerD |= 0x80;
  }
  //SET 7, E
  //#0xFB:
  ,
  function (parentObj) {
    parentObj.registerE |= 0x80;
  }
  //SET 7, H
  //#0xFC:
  ,
  function (parentObj) {
    parentObj.registersHL |= 0x8000;
  }
  //SET 7, L
  //#0xFD:
  ,
  function (parentObj) {
    parentObj.registersHL |= 0x80;
  }
  //SET 7, (HL)
  //#0xFE:
  ,
  function (parentObj) {
    parentObj.memoryWriter[parentObj.registersHL](parentObj, parentObj.registersHL, parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL) | 0x80);
  }
  //SET 7, A
  //#0xFF:
  ,
  function (parentObj) {
    parentObj.registerA |= 0x80;
  }
];
