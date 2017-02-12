import dutyLookup from "./duty-lookup.js";

export default [
  true, // Whether we're in the GBC boot ROM.
  //CPU Registers and Flags:
  0x01, // Register A (Accumulator)
  true, // Register F  - Result was zero
  false, // Register F  - Subtraction was executed
  true, // Register F  - Half carry or half borrow
  true, // Register F  - Carry or borrow
  0x00, // Register B
  0x13, // Register C
  0x00, // Register D
  0xd8, // Register E
  0x014d, // Registers H and L combined
  0xfffe, // Stack Pointer
  0x0100, // Program Counter
  //Some CPU Emulation State Variables:
  false, // Has the CPU been suspended until the next interrupt?
  true, // Are interrupts enabled?
  false, // HDMA Transfer Flag - GBC only
  0, // The number of clock cycles emulated.
  0, // GBC double speed clocking shifter.
  [], // Main Core Memory
  [], // Extra VRAM bank for GBC.
  0, // Current VRAM bank for GBC.
  [], // GBC main RAM Banks
  false, // GameBoy Color detection.
  1, // Currently Switched GameBoy Color ram bank
  -0xd000, // GBC RAM offset from address start.
  0, // Offset of the ROM bank switching.
  0, // The parsed current ROM bank selection.
  0, // The scan line mode (for lines 1-144 it's 2-3-0, for 145-154 it's 1)
  false, // Should we trigger an interrupt if LY==LYC?
  false, // Should we trigger an interrupt if in mode 2?
  false, // Should we trigger an interrupt if in mode 1?
  false, // Should we trigger an interrupt if in mode 0?
  false, // Is the emulated LCD controller on?
  0, // The current bank of the character map the window uses.
  false, // Is the windows enabled?
  false, // Are sprites enabled?
  true, // Are we doing 8x8 or 8x16 sprites?
  0, // The current bank of the character map the background uses.
  0x80, // Fast mapping of the tile numbering/
  false, // Is TIMA enabled?
  56, // DIV Ticks Counter (Invisible lower 8-bit)
  60, // Counter for how many instructions have been executed on a scanline so far.
  0, // Counter for the TIMA timer.
  1024, // Timer Max Ticks
  0, // Serial IRQ Timer
  0, // Serial Transfer Shift Timer
  0, // Serial Transfer Shift Timer Refill
  0, // Are the interrupts on queue to be enabled?
  new Date().getTime(), // The last time we iterated the main loop.
  0, // To prevent the repeating of drawing a blank screen.
  [], // The internal frame-buffer.
  true, // Is the BG enabled?
  true, // Can we flag the BG for priority over sprites?
  0x2000, // channel1FrequencyTracker
  0x200, // channel1FrequencyCounter
  0, // channel1totalLength
  0, // channel1envelopeVolume
  false, // channel1envelopeType
  0, // channel1envelopeSweeps
  0, // channel1envelopeSweepsLast
  true, // channel1consecutive
  0, // channel1frequency
  false, // channel1SweepFault
  0, // channel1ShadowFrequency
  1, // channel1timeSweep
  0, // channel1lastTimeSweep
  false, // channel1Swept
  0, // channel1frequencySweepDivider
  false, // channel1decreaseSweep
  0x2000, // channel2FrequencyTracker
  0x200, // channel2FrequencyCounter
  0, // channel2totalLength
  0, // channel2envelopeVolume
  false, // channel2envelopeType
  0, // channel2envelopeSweeps
  0, // channel2envelopeSweepsLast
  true, // channel2consecutive
  0, // channel2frequency
  false, // channel3canPlay
  0, // channel3totalLength
  4, // channel3patternType
  0, // channel3frequency
  true, // channel3consecutive
  null, // Channel 3 adjusted sample buffer.
  8, // channel4FrequencyPeriod
  0, // channel4lastSampleLookup
  0, // channel4totalLength
  0, // channel4envelopeVolume
  0, // channel4currentVolume
  false, // channel4envelopeType
  0, // channel4envelopeSweeps
  0, // channel4envelopeSweepsLast
  true, // channel4consecutive
  0x7fff, // channel4BitRange
  false, // As its name implies
  // Vin Shit:
  8, // Computed post-mixing volume.
  8, // Computed post-mixing volume.
  // Channel paths enabled:
  false, // leftChannel1
  false, // leftChannel2
  false, // leftChannel3
  false, // leftChannel4
  false, // rightChannel1
  false, // rightChannel2
  false, // rightChannel3
  false, // rightChannel4
  // Channel output level caches:
  0, // channel1currentSampleLeft
  0, // channel1currentSampleRight
  0, // channel2currentSampleLeft
  0, // channel2currentSampleRight
  0, // channel3currentSampleLeft
  0, // channel3currentSampleRight
  0, // channel4currentSampleLeft
  0, // channel4currentSampleRight
  0, // channel1currentSampleLeftSecondary
  0, // channel1currentSampleRightSecondary
  0, // channel2currentSampleLeftSecondary
  0, // channel2currentSampleRightSecondary
  0, // channel3currentSampleLeftSecondary
  0, // channel3currentSampleRightSecondary
  0, // channel4currentSampleLeftSecondary
  0, // channel4currentSampleRightSecondary
  0, // channel1currentSampleLeftTrimary
  0, // channel1currentSampleRightTrimary
  0, // channel2currentSampleLeftTrimary
  0, // channel2currentSampleRightTrimary
  0, // mixerOutputCache
  0, // channel1DutyTracker
  dutyLookup[2], // channel1CachedDuty
  0, // channel2DutyTracker
  dutyLookup[2], // channel2CachedDuty
  false, // channel1Enabled
  false, // channel2Enabled
  false, // channel3Enabled
  false, // channel4Enabled
  0x2000, // sequencerClocks
  0, // sequencePosition
  0x800, // channel3Counter
  8, // channel4Counter
  0, // cachedChannel3Sample
  0, // cachedChannel4Sample
  0x800, // channel3FrequencyPeriod
  0, // channel3lastSampleLookup
  144, // Actual scan line...
  0, // Last rendered scan line...
  0, // queuedScanLines
  // RTC (Real Time Clock for MBC3):
  false, // RTCisLatched
  0, // RTC latched seconds.
  0, // RTC latched minutes.
  0, // RTC latched hours.
  0, // RTC latched lower 8-bits of the day counter.
  0, // RTC latched high-bit of the day counter.
  0, // RTC seconds counter.
  0, // RTC minutes counter.
  0, // RTC hours counter.
  0, // RTC days counter.
  false, // Did the RTC overflow and wrap the day counter?
  false, // Is the RTC allowed to clock up?
  false, // Updated upon ROM loading...
  false, // Did we trip the DMG Halt bug?
  0, // Tracker for STAT triggering.
  -0xf000, // GBC RAM (ECHO mirroring) offset from address start.
  0, // Current Y offset of the window.
  0, // Current X offset of the window.
  null, // gbcOBJRawPalette
  null, // gbcBGRawPalette
  null, // gbOBJPalette
  null, // gbBGPalette
  null, // gbcOBJPalette
  null, // gbcBGPalette
  null, // gbBGColorizedPalette
  null, // gbOBJColorizedPalette
  null, // cachedBGPaletteConversion
  null, // cachedOBJPaletteConversion
  // BG Tile Pointer Caches:
  null, // BGCHRBank1
  null, // BGCHRBank2
  0, // Post-Halt clocking.
  0, // IF Register
  0, // IE Register
  0, // HALT clocking overrun carry over.
  false, // colorizedGBPalettes
  0, // Register SCY (Y-Scroll)
  0, // Register SCX (X-Scroll)
  false, // CPU STOP status.
  1, // audioClocksUntilNextEvent
  1 // audioClocksUntilNextEventCounter
];
