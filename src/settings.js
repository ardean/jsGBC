export default [ //Some settings.
  true, //Turn on sound.
  true, //Boot with boot ROM first?
  false, //Give priority to GameBoy mode
  1, //Volume level set.
  true, //Colorize GB mode?
  false, //Disallow typed arrays?
  8, //Interval for the emulator loop.
  10, //Audio buffer minimum span amount over x interpreter iterations.
  20, //Audio buffer maximum span amount over x interpreter iterations.
  false, //Override to allow for MBC1 instead of ROM only (compatibility for broken 3rd-party cartridges).
  false, //Override MBC RAM disabling and always allow reading and writing to the banks.
  false, //Use the GameBoy boot ROM instead of the GameBoy Color boot ROM.
  false, //Scale the canvas in JS, or let the browser scale the canvas?
  true, //Use image smoothing based scaling?
  [true, true, true, true] //User controlled channel enables.
];
