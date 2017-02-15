import util from "./util.js";
import initialState from "./initial-state.js";

export default class StateManager {
  constructor(gameboy) {
    this.gameboy = gameboy;
  }

  init() {
    this.load(initialState);
  }

  save() {
    const gameboy = this.gameboy;
    return [
      gameboy.inBootstrap,
      gameboy.registerA,
      gameboy.FZero,
      gameboy.FSubtract,
      gameboy.FHalfCarry,
      gameboy.FCarry,
      gameboy.registerB,
      gameboy.registerC,
      gameboy.registerD,
      gameboy.registerE,
      gameboy.registersHL,
      gameboy.stackPointer,
      gameboy.programCounter,
      gameboy.halt,
      gameboy.IME,
      gameboy.hdmaRunning,
      gameboy.CPUTicks,
      gameboy.doubleSpeedShifter,
      util.fromTypedArray(gameboy.memory),
      util.fromTypedArray(gameboy.VRAM),
      gameboy.currVRAMBank,
      util.fromTypedArray(gameboy.GBCMemory),
      gameboy.useGBCMode,
      gameboy.gbcRamBank,
      gameboy.gbcRamBankPosition,
      gameboy.ROMBank1Offset,
      gameboy.currentROMBank,
      gameboy.modeSTAT,
      gameboy.LYCMatchTriggerSTAT,
      gameboy.mode2TriggerSTAT,
      gameboy.mode1TriggerSTAT,
      gameboy.mode0TriggerSTAT,
      gameboy.LCDisOn,
      gameboy.gfxWindowCHRBankPosition,
      gameboy.gfxWindowDisplay,
      gameboy.gfxSpriteShow,
      gameboy.gfxSpriteNormalHeight,
      gameboy.gfxBackgroundCHRBankPosition,
      gameboy.gfxBackgroundBankOffset,
      gameboy.TIMAEnabled,
      gameboy.DIVTicks,
      gameboy.LCDTicks,
      gameboy.timerTicks,
      gameboy.TACClocker,
      gameboy.serialTimer,
      gameboy.serialShiftTimer,
      gameboy.serialShiftTimerAllocated,
      gameboy.IRQEnableDelay,
      gameboy.cartridgeSlot.cartridge.hasRTC &&
        gameboy.cartridgeSlot.cartridge.mbc3.rtc.lastTime,
      gameboy.drewBlank,
      util.fromTypedArray(gameboy.frameBuffer),
      gameboy.bgEnabled,
      gameboy.BGPriorityEnabled,
      gameboy.channel1FrequencyTracker,
      gameboy.channel1FrequencyCounter,
      gameboy.channel1totalLength,
      gameboy.channel1envelopeVolume,
      gameboy.channel1envelopeType,
      gameboy.channel1envelopeSweeps,
      gameboy.channel1envelopeSweepsLast,
      gameboy.channel1consecutive,
      gameboy.channel1frequency,
      gameboy.channel1SweepFault,
      gameboy.channel1ShadowFrequency,
      gameboy.channel1timeSweep,
      gameboy.channel1lastTimeSweep,
      gameboy.channel1Swept,
      gameboy.channel1frequencySweepDivider,
      gameboy.channel1decreaseSweep,
      gameboy.channel2FrequencyTracker,
      gameboy.channel2FrequencyCounter,
      gameboy.channel2totalLength,
      gameboy.channel2envelopeVolume,
      gameboy.channel2envelopeType,
      gameboy.channel2envelopeSweeps,
      gameboy.channel2envelopeSweepsLast,
      gameboy.channel2consecutive,
      gameboy.channel2frequency,
      gameboy.channel3canPlay,
      gameboy.channel3totalLength,
      gameboy.channel3patternType,
      gameboy.channel3frequency,
      gameboy.channel3consecutive,
      util.fromTypedArray(gameboy.channel3PCM),
      gameboy.channel4FrequencyPeriod,
      gameboy.channel4lastSampleLookup,
      gameboy.channel4totalLength,
      gameboy.channel4envelopeVolume,
      gameboy.channel4currentVolume,
      gameboy.channel4envelopeType,
      gameboy.channel4envelopeSweeps,
      gameboy.channel4envelopeSweepsLast,
      gameboy.channel4consecutive,
      gameboy.channel4BitRange,
      gameboy.soundMasterEnabled,
      gameboy.VinLeftChannelMasterVolume,
      gameboy.VinRightChannelMasterVolume,
      gameboy.leftChannel1,
      gameboy.leftChannel2,
      gameboy.leftChannel3,
      gameboy.leftChannel4,
      gameboy.rightChannel1,
      gameboy.rightChannel2,
      gameboy.rightChannel3,
      gameboy.rightChannel4,
      gameboy.channel1currentSampleLeft,
      gameboy.channel1currentSampleRight,
      gameboy.channel2currentSampleLeft,
      gameboy.channel2currentSampleRight,
      gameboy.channel3currentSampleLeft,
      gameboy.channel3currentSampleRight,
      gameboy.channel4currentSampleLeft,
      gameboy.channel4currentSampleRight,
      gameboy.channel1currentSampleLeftSecondary,
      gameboy.channel1currentSampleRightSecondary,
      gameboy.channel2currentSampleLeftSecondary,
      gameboy.channel2currentSampleRightSecondary,
      gameboy.channel3currentSampleLeftSecondary,
      gameboy.channel3currentSampleRightSecondary,
      gameboy.channel4currentSampleLeftSecondary,
      gameboy.channel4currentSampleRightSecondary,
      gameboy.channel1currentSampleLeftTrimary,
      gameboy.channel1currentSampleRightTrimary,
      gameboy.channel2currentSampleLeftTrimary,
      gameboy.channel2currentSampleRightTrimary,
      gameboy.mixerOutputCache,
      gameboy.channel1DutyTracker,
      gameboy.channel1CachedDuty,
      gameboy.channel2DutyTracker,
      gameboy.channel2CachedDuty,
      gameboy.channel1Enabled,
      gameboy.channel2Enabled,
      gameboy.channel3Enabled,
      gameboy.channel4Enabled,
      gameboy.sequencerClocks,
      gameboy.sequencePosition,
      gameboy.channel3Counter,
      gameboy.channel4Counter,
      gameboy.cachedChannel3Sample,
      gameboy.cachedChannel4Sample,
      gameboy.channel3FrequencyPeriod,
      gameboy.channel3lastSampleLookup,
      gameboy.actualScanLine,
      gameboy.lastUnrenderedLine,
      gameboy.queuedScanLines,
      gameboy.cartridgeSlot.cartridge.hasRTC &&
        gameboy.cartridgeSlot.cartridge.mbc3.rtc.RTCisLatched,
      gameboy.cartridgeSlot.cartridge.hasRTC &&
        gameboy.cartridgeSlot.cartridge.mbc3.rtc.latchedSeconds,
      gameboy.cartridgeSlot.cartridge.hasRTC &&
        gameboy.cartridgeSlot.cartridge.mbc3.rtc.latchedMinutes,
      gameboy.cartridgeSlot.cartridge.hasRTC &&
        gameboy.cartridgeSlot.cartridge.mbc3.rtc.latchedHours,
      gameboy.cartridgeSlot.cartridge.hasRTC &&
        gameboy.cartridgeSlot.cartridge.mbc3.rtc.latchedLDays,
      gameboy.cartridgeSlot.cartridge.hasRTC &&
        gameboy.cartridgeSlot.cartridge.mbc3.rtc.latchedHDays,
      gameboy.cartridgeSlot.cartridge.hasRTC &&
        gameboy.cartridgeSlot.cartridge.mbc3.rtc.RTCSeconds,
      gameboy.cartridgeSlot.cartridge.hasRTC &&
        gameboy.cartridgeSlot.cartridge.mbc3.rtc.RTCMinutes,
      gameboy.cartridgeSlot.cartridge.hasRTC &&
        gameboy.cartridgeSlot.cartridge.mbc3.rtc.RTCHours,
      gameboy.cartridgeSlot.cartridge.hasRTC &&
        gameboy.cartridgeSlot.cartridge.mbc3.rtc.RTCDays,
      gameboy.cartridgeSlot.cartridge.hasRTC &&
        gameboy.cartridgeSlot.cartridge.mbc3.rtc.RTCDayOverFlow,
      gameboy.cartridgeSlot.cartridge.hasRTC &&
        gameboy.cartridgeSlot.cartridge.mbc3.rtc.RTCHALT,
      gameboy.usedBootROM,
      gameboy.skipPCIncrement,
      gameboy.STATTracker,
      gameboy.gbcRamBankPositionECHO,
      gameboy.windowY,
      gameboy.windowX,
      util.fromTypedArray(gameboy.gbcOBJRawPalette),
      util.fromTypedArray(gameboy.gbcBGRawPalette),
      util.fromTypedArray(gameboy.gbOBJPalette),
      util.fromTypedArray(gameboy.gbBGPalette),
      util.fromTypedArray(gameboy.gbcOBJPalette),
      util.fromTypedArray(gameboy.gbcBGPalette),
      util.fromTypedArray(gameboy.gbBGColorizedPalette),
      util.fromTypedArray(gameboy.gbOBJColorizedPalette),
      util.fromTypedArray(gameboy.cachedBGPaletteConversion),
      util.fromTypedArray(gameboy.cachedOBJPaletteConversion),
      util.fromTypedArray(gameboy.BGCHRBank1),
      util.fromTypedArray(gameboy.BGCHRBank2),
      gameboy.haltPostClocks,
      gameboy.interruptsRequested,
      gameboy.interruptsEnabled,
      gameboy.remainingClocks,
      gameboy.colorizedGBPalettes,
      gameboy.backgroundY,
      gameboy.backgroundX,
      gameboy.CPUStopped,
      gameboy.audioClocksUntilNextEvent,
      gameboy.audioClocksUntilNextEventCounter
    ];
  }

  load(state) {
    let index = 0;
    state = state.concat();

    const gameboy = this.gameboy;
    gameboy.inBootstrap = state[index++];
    gameboy.registerA = state[index++];
    gameboy.FZero = state[index++];
    gameboy.FSubtract = state[index++];
    gameboy.FHalfCarry = state[index++];
    gameboy.FCarry = state[index++];
    gameboy.registerB = state[index++];
    gameboy.registerC = state[index++];
    gameboy.registerD = state[index++];
    gameboy.registerE = state[index++];
    gameboy.registersHL = state[index++];
    gameboy.stackPointer = state[index++];
    gameboy.programCounter = state[index++];
    gameboy.halt = state[index++];
    gameboy.IME = state[index++];
    gameboy.hdmaRunning = state[index++];
    gameboy.CPUTicks = state[index++];
    gameboy.doubleSpeedShifter = state[index++];
    gameboy.memory = util.toTypedArray(state[index++], "uint8");
    gameboy.VRAM = util.toTypedArray(state[index++], "uint8");
    gameboy.currVRAMBank = state[index++];
    gameboy.GBCMemory = util.toTypedArray(state[index++], "uint8");
    gameboy.useGBCMode = state[index++];
    gameboy.gbcRamBank = state[index++];
    gameboy.gbcRamBankPosition = state[index++];
    gameboy.ROMBank1Offset = state[index++];
    gameboy.currentROMBank = state[index++];
    gameboy.modeSTAT = state[index++];
    gameboy.LYCMatchTriggerSTAT = state[index++];
    gameboy.mode2TriggerSTAT = state[index++];
    gameboy.mode1TriggerSTAT = state[index++];
    gameboy.mode0TriggerSTAT = state[index++];
    gameboy.LCDisOn = state[index++];
    gameboy.gfxWindowCHRBankPosition = state[index++];
    gameboy.gfxWindowDisplay = state[index++];
    gameboy.gfxSpriteShow = state[index++];
    gameboy.gfxSpriteNormalHeight = state[index++];
    gameboy.gfxBackgroundCHRBankPosition = state[index++];
    gameboy.gfxBackgroundBankOffset = state[index++];
    gameboy.TIMAEnabled = state[index++];
    gameboy.DIVTicks = state[index++];
    gameboy.LCDTicks = state[index++];
    gameboy.timerTicks = state[index++];
    gameboy.TACClocker = state[index++];
    gameboy.serialTimer = state[index++];
    gameboy.serialShiftTimer = state[index++];
    gameboy.serialShiftTimerAllocated = state[index++];
    gameboy.IRQEnableDelay = state[index++];
    if (gameboy.cartridgeSlot.cartridge && gameboy.cartridgeSlot.cartridge.hasRTC) {
      gameboy.cartridgeSlot.cartridge.mbc3.rtc.lastTime = state[index++];
    } else {
      index++;
    }
    gameboy.drewBlank = state[index++];
    gameboy.frameBuffer = util.toTypedArray(state[index++], "int32");
    gameboy.bgEnabled = state[index++];
    gameboy.BGPriorityEnabled = state[index++];
    gameboy.channel1FrequencyTracker = state[index++];
    gameboy.channel1FrequencyCounter = state[index++];
    gameboy.channel1totalLength = state[index++];
    gameboy.channel1envelopeVolume = state[index++];
    gameboy.channel1envelopeType = state[index++];
    gameboy.channel1envelopeSweeps = state[index++];
    gameboy.channel1envelopeSweepsLast = state[index++];
    gameboy.channel1consecutive = state[index++];
    gameboy.channel1frequency = state[index++];
    gameboy.channel1SweepFault = state[index++];
    gameboy.channel1ShadowFrequency = state[index++];
    gameboy.channel1timeSweep = state[index++];
    gameboy.channel1lastTimeSweep = state[index++];
    gameboy.channel1Swept = state[index++];
    gameboy.channel1frequencySweepDivider = state[index++];
    gameboy.channel1decreaseSweep = state[index++];
    gameboy.channel2FrequencyTracker = state[index++];
    gameboy.channel2FrequencyCounter = state[index++];
    gameboy.channel2totalLength = state[index++];
    gameboy.channel2envelopeVolume = state[index++];
    gameboy.channel2envelopeType = state[index++];
    gameboy.channel2envelopeSweeps = state[index++];
    gameboy.channel2envelopeSweepsLast = state[index++];
    gameboy.channel2consecutive = state[index++];
    gameboy.channel2frequency = state[index++];
    gameboy.channel3canPlay = state[index++];
    gameboy.channel3totalLength = state[index++];
    gameboy.channel3patternType = state[index++];
    gameboy.channel3frequency = state[index++];
    gameboy.channel3consecutive = state[index++];
    gameboy.channel3PCM = util.toTypedArray(state[index++], "int8");
    gameboy.channel4FrequencyPeriod = state[index++];
    gameboy.channel4lastSampleLookup = state[index++];
    gameboy.channel4totalLength = state[index++];
    gameboy.channel4envelopeVolume = state[index++];
    gameboy.channel4currentVolume = state[index++];
    gameboy.channel4envelopeType = state[index++];
    gameboy.channel4envelopeSweeps = state[index++];
    gameboy.channel4envelopeSweepsLast = state[index++];
    gameboy.channel4consecutive = state[index++];
    gameboy.channel4BitRange = state[index++];
    gameboy.soundMasterEnabled = state[index++];
    gameboy.VinLeftChannelMasterVolume = state[index++];
    gameboy.VinRightChannelMasterVolume = state[index++];
    gameboy.leftChannel1 = state[index++];
    gameboy.leftChannel2 = state[index++];
    gameboy.leftChannel3 = state[index++];
    gameboy.leftChannel4 = state[index++];
    gameboy.rightChannel1 = state[index++];
    gameboy.rightChannel2 = state[index++];
    gameboy.rightChannel3 = state[index++];
    gameboy.rightChannel4 = state[index++];
    gameboy.channel1currentSampleLeft = state[index++];
    gameboy.channel1currentSampleRight = state[index++];
    gameboy.channel2currentSampleLeft = state[index++];
    gameboy.channel2currentSampleRight = state[index++];
    gameboy.channel3currentSampleLeft = state[index++];
    gameboy.channel3currentSampleRight = state[index++];
    gameboy.channel4currentSampleLeft = state[index++];
    gameboy.channel4currentSampleRight = state[index++];
    gameboy.channel1currentSampleLeftSecondary = state[index++];
    gameboy.channel1currentSampleRightSecondary = state[index++];
    gameboy.channel2currentSampleLeftSecondary = state[index++];
    gameboy.channel2currentSampleRightSecondary = state[index++];
    gameboy.channel3currentSampleLeftSecondary = state[index++];
    gameboy.channel3currentSampleRightSecondary = state[index++];
    gameboy.channel4currentSampleLeftSecondary = state[index++];
    gameboy.channel4currentSampleRightSecondary = state[index++];
    gameboy.channel1currentSampleLeftTrimary = state[index++];
    gameboy.channel1currentSampleRightTrimary = state[index++];
    gameboy.channel2currentSampleLeftTrimary = state[index++];
    gameboy.channel2currentSampleRightTrimary = state[index++];
    gameboy.mixerOutputCache = state[index++];
    gameboy.channel1DutyTracker = state[index++];
    gameboy.channel1CachedDuty = state[index++];
    gameboy.channel2DutyTracker = state[index++];
    gameboy.channel2CachedDuty = state[index++];
    gameboy.channel1Enabled = state[index++];
    gameboy.channel2Enabled = state[index++];
    gameboy.channel3Enabled = state[index++];
    gameboy.channel4Enabled = state[index++];
    gameboy.sequencerClocks = state[index++];
    gameboy.sequencePosition = state[index++];
    gameboy.channel3Counter = state[index++];
    gameboy.channel4Counter = state[index++];
    gameboy.cachedChannel3Sample = state[index++];
    gameboy.cachedChannel4Sample = state[index++];
    gameboy.channel3FrequencyPeriod = state[index++];
    gameboy.channel3lastSampleLookup = state[index++];
    gameboy.actualScanLine = state[index++];
    gameboy.lastUnrenderedLine = state[index++];
    gameboy.queuedScanLines = state[index++];
    if (gameboy.cartridgeSlot.cartridge && gameboy.cartridgeSlot.cartridge.hasRTC) {
      gameboy.cartridgeSlot.cartridge.mbc3.rtc.RTCisLatched = state[index++];
      gameboy.cartridgeSlot.cartridge.mbc3.rtc.latchedSeconds = state[index++];
      gameboy.cartridgeSlot.cartridge.mbc3.rtc.latchedMinutes = state[index++];
      gameboy.cartridgeSlot.cartridge.mbc3.rtc.latchedHours = state[index++];
      gameboy.cartridgeSlot.cartridge.mbc3.rtc.latchedLDays = state[index++];
      gameboy.cartridgeSlot.cartridge.mbc3.rtc.latchedHDays = state[index++];
      gameboy.cartridgeSlot.cartridge.mbc3.rtc.RTCSeconds = state[index++];
      gameboy.cartridgeSlot.cartridge.mbc3.rtc.RTCMinutes = state[index++];
      gameboy.cartridgeSlot.cartridge.mbc3.rtc.RTCHours = state[index++];
      gameboy.cartridgeSlot.cartridge.mbc3.rtc.RTCDays = state[index++];
      gameboy.cartridgeSlot.cartridge.mbc3.rtc.RTCDayOverFlow = state[index++];
      gameboy.cartridgeSlot.cartridge.mbc3.rtc.RTCHALT = state[index++];
    } else {
      index += 12;
    }
    gameboy.usedBootROM = state[index++];
    gameboy.skipPCIncrement = state[index++];
    gameboy.STATTracker = state[index++];
    gameboy.gbcRamBankPositionECHO = state[index++];
    gameboy.windowY = state[index++];
    gameboy.windowX = state[index++];
    gameboy.gbcOBJRawPalette = util.toTypedArray(state[index++], "uint8");
    gameboy.gbcBGRawPalette = util.toTypedArray(state[index++], "uint8");
    gameboy.gbOBJPalette = util.toTypedArray(state[index++], "int32");
    gameboy.gbBGPalette = util.toTypedArray(state[index++], "int32");
    gameboy.gbcOBJPalette = util.toTypedArray(state[index++], "int32");
    gameboy.gbcBGPalette = util.toTypedArray(state[index++], "int32");
    gameboy.gbBGColorizedPalette = util.toTypedArray(state[index++], "int32");
    gameboy.gbOBJColorizedPalette = util.toTypedArray(state[index++], "int32");
    gameboy.cachedBGPaletteConversion = util.toTypedArray(
      state[index++],
      "int32"
    );
    gameboy.cachedOBJPaletteConversion = util.toTypedArray(
      state[index++],
      "int32"
    );
    gameboy.BGCHRBank1 = util.toTypedArray(state[index++], "uint8");
    gameboy.BGCHRBank2 = util.toTypedArray(state[index++], "uint8");
    gameboy.haltPostClocks = state[index++];
    gameboy.interruptsRequested = state[index++];
    gameboy.interruptsEnabled = state[index++];
    gameboy.checkIRQMatching();
    gameboy.remainingClocks = state[index++];
    gameboy.colorizedGBPalettes = state[index++];
    gameboy.backgroundY = state[index++];
    gameboy.backgroundX = state[index++];
    gameboy.CPUStopped = state[index++];
    gameboy.audioClocksUntilNextEvent = state[index++];
    gameboy.audioClocksUntilNextEventCounter = state[index];
  }
}
