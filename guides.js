// Focused pages for broad projects beyond Octabam; claims checked against upstream on 2026-09-26.
export const extraGuides = {
  digikit: [
    {
      id: "overview", title: "digikit", kicker: "Project map", summary: "Digitakt II and Digitone II screen emulation, SHARC analysis, and experimental machine-building are separate workflows.",
      sections: [
        { title: "Choose the right part", table: { headers: ["Part", "What it answers", "Go to"], rows: [
          ["ColdFire emulator", "Does this OS boot and draw the expected UI?", "Screen emulator"],
          ["SHARC toolkit", "What code and data drive the audio processor?", "SHARC research"],
          ["Machine builder", "Can a new machine be registered on the control side?", "Machine experiment"]
        ] } },
        { title: "Supported images", paragraphs: ["The current documented images are Digitakt II OS 1.16 and Digitone II OS 1.11. Older 1.15C and 1.10E builds remain supported for the author's research. Supply your own .syx; the repository does not contain Elektron firmware. Extracted sections, snapshots, and databases live under out/ and are kept separate by firmware hash."] },
        { title: "What emulation proves", paragraphs: ["The ColdFire emulator boots the OS and displays a screen at roughly 20–25 frames per second. Test scripts can drive keys and encoders. There is no live audio, no emulated SHARC DSP, no populated +Drive, and no direct human keyboard or encoder input. The experimental machine builder has not produced a hardware-tested install."] }
      ],
      sources: [{ label: "Project README", url: "https://github.com/m-dwyer/digikit/blob/main/README.md" }, { label: "Tool index", url: "https://github.com/m-dwyer/digikit/blob/main/docs/TOOLS.md" }]
    },
    {
      id: "screen", title: "Screen emulator", kicker: "ColdFire", summary: "Install the patched CPU engine and boot a Digitakt II or Digitone II screen from your own firmware.",
      sections: [
        { title: "Install and boot", steps: [
          { title: "Prepare the checkout", body: "Use Python 3.12 and uv. The patched Unicorn install is required after uv sync.", code: "git clone https://github.com/m-dwyer/digikit\ncd digikit\nuv sync\ntools/install-patched-unicorn.sh" },
          { title: "Run your exact OS image", body: "Place a self-obtained .syx in the repo root or replace the file name with its absolute path. The first run extracts sections and builds snapshots, which can take minutes.", code: "uv run python -m emu.run Digitakt_II_OS1.16.syx\nuv run python -m emu.run Digitone_II_OS1.11.syx" },
          { title: "Check setup without starting", code: "uv run python -m emu.run Digitakt_II_OS1.16.syx --check" }
        ] },
        { title: "Controls and limits", paragraphs: ["--scale N changes screen size. --exact counts instructions precisely at a speed cost. --weakptr is a workaround if boot stalls at weak_ptr::lock. The window shows firmware output; live playing and audio are outside this emulator."] }
      ],
      sources: [{ label: "Run instructions", url: "https://github.com/m-dwyer/digikit/blob/main/README.md" }, { label: "Patched Unicorn", url: "https://github.com/m-dwyer/digikit/blob/main/docs/UNICORN.md" }]
    },
    {
      id: "sharc", title: "SHARC research", kicker: "DSP analysis", summary: "Extract the audio-program blob, index its code, and inspect or trace it without pretending the DSP is emulated.",
      sections: [
        { title: "Build a versioned database", steps: [
          { title: "Extract your OS", code: "uv run python -m emu.extract Digitakt_II_OS1.16.syx -o out/sections/dt2-1.16" },
          { title: "Index and query the SHARC blob", code: "uv run python tools/sharcdb.py build out/sections/dt2-1.16/section_7_BLOB.bin\nuv run python tools/sharc.py dt2-1.16 \"SELECT kind, count(*) FROM roots GROUP BY kind\"" }
        ] },
        { title: "Trace carefully", paragraphs: ["The tracer executes documented SHARC instructions from the extracted bytes and stops at unknown behavior. It is a targeted analysis tool rather than an audio engine. Keep dt2-1.16 and dn2-1.11 section directories separate; the tools record source hashes to prevent mixing versions."], code: "uv run python tools/sharc_trace.py out/sections/dt2-1.16/section_7_BLOB.bin --blob --start 0x1c06ba --concrete-memory --assume-32bit-normal-words --set R4=0x3f800000 --set R8=0x40000000 --approx-recips --summary" }
      ],
      sources: [{ label: "README SHARC workflow", url: "https://github.com/m-dwyer/digikit/blob/main/README.md" }, { label: "Engine findings", url: "https://github.com/m-dwyer/digikit/blob/main/docs/findings/06-sharc-engine-and-startup.md" }]
    },
    {
      id: "machine", title: "Machine experiment", kicker: "Patch research", summary: "Understand what the experimental builder changes and the evidence still missing before any hardware use.",
      sections: [
        { title: "The current builder", paragraphs: ["machinebuild.py edits the ColdFire OS section to register a new machine and its fields. It does not add or prove a matching SHARC DSP implementation. The documented XSLICE example is a research artifact; its bootstrap and updater paths are deliberately left unchanged."], code: "uv run python tools/machinebuild.py --syx Digitakt_II_OS1.16.syx --profile dt2-1.16 --machine XSLICE:XSL:6:7 --fields 0xf8,0xf9,0xfa,0xfb,0xfc,0xfd,0,0xfe,0x0a --sections-dir out/sections/dt2-1.16 --out out/Digitakt_II_OS1.16.xslice.syx" },
        { title: "Status boundary", paragraphs: ["The project documents no installation of this patched image on Digitakt II hardware. DSP selection for the chosen machine type remains unverified. Use the screen emulator and source findings to investigate the control-side result, and read the current upstream status before attempting any hardware experiment."] }
      ],
      sources: [{ label: "Machine-building status", url: "https://github.com/m-dwyer/digikit/blob/main/README.md" }, { label: "Machine findings", url: "https://github.com/m-dwyer/digikit/blob/main/docs/findings/02-machines-and-parameters.md" }]
    }
  ],
  mcl: [
    {
      id: "overview", title: "MegaCommand Live", kicker: "Project map", summary: "A controller firmware and performance environment for Machinedrum-centered setups, with its own sequencer and project grid.",
      sections: [
        { title: "Where it runs", paragraphs: ["MCL firmware runs on supported controllers such as MegaCommand DIY, MegaCMD, and TBD-16. The Machinedrum is its original focus; a Monomachine or Analog Four can be configured as a secondary MIDI device. MCL does not install on the Analog Four. The Machinedrum X operating system is a separate prerequisite for a current MD setup. MegaCommand firmware files in MCL releases are not Machinedrum OS images."] },
        { title: "Find your workflow", table: { headers: ["Task", "Open"], rows: [["Get the right firmware and upgrade a controller", "Install & versions"], ["Connect the MD, secondary devices, and clock", "MIDI setup"], ["Understand projects, grids, slots, and performance pages", "Grid & performance"]] } },
        { title: "Current availability", paragraphs: ["MCL 5.02 release notes call for Machinedrum X.13, Monomachine X.01A, and USB microcontroller firmware 1.04 (MegaCMD hardware only; the manual says it is not for MegaCommand DIY). The manual and changelog name the Monomachine OS as X.01, without the A. The inspected MCL 5.02 assets provide controller firmware and USB MCU update files; they do not include a Machinedrum OS image. MCL's README, manual, and release notes do not say where to obtain X.13. Em’s separate Machinedrum and Monomachine firmware repositories both announce a move from complete SysEx files to a patcher, but neither is the MDX/MNMX OS that MCL requires."] }
      ],
      sources: [{ label: "MCL README", url: "https://github.com/jmamma/MCL" }, { label: "MCL 5.02 release", url: "https://github.com/jmamma/MCL/releases/tag/5.02" }, { label: "MCL manual", url: "https://jmamma.github.io/MCL/" }]
    },
    {
      id: "install", title: "Install & versions", kicker: "Controller setup", summary: "Match the controller and OS versions, back up project data, then use MCL's documented upload route.",
      sections: [
        { title: "Version checklist", table: { headers: ["Component", "For MCL 5.02"], rows: [["MCL controller firmware", "5.02 release"], ["Machinedrum OS", "X.13, obtained separately"], ["Monomachine OS, if used", "X.01A per the release notes (the manual says X.01)"], ["MegaCMD USB MCU (not MegaCommand DIY)", "1.04; instructions in the release ZIP"]] }, paragraphs: ["MiniCommand is legacy hardware and is not supported by current MCL releases."] },
        { title: "Back up before upgrading", paragraphs: ["MCL 5.00 introduced a project format conversion. A project opened by 5.00 or later will not open in older MCL versions. Copy your SD card projects before proceeding."] },
        { title: "Upload to MegaCommand or MegaCMD", steps: [
          { title: "Prepare the repository and PlatformIO", code: "pip install platformio\ngit clone https://github.com/jmamma/MCL.git\ncd MCL" },
          { title: "Enter controller upgrade mode", body: "Hold Page while powering on the MegaCommand or MegaCMD, then choose OS UPGRADE." },
          { title: "Select the exact hardware target", body: "The *_latest environments fetch the current MCL release image. The source-build environments are megacommand and megacmd without _latest.", code: "platformio run -t nobuild -t upload -e megacommand_latest\n# MegaCMD instead:\nplatformio run -t nobuild -t upload -e megacmd_latest" }
        ] }
      ],
      sources: [{ label: "Install commands", url: "https://github.com/jmamma/MCL/blob/master/README.md" }, { label: "5.02 requirements", url: "https://github.com/jmamma/MCL/releases/tag/5.02" }, { label: "Project format change", url: "https://github.com/jmamma/MCL/blob/master/Changelog" }]
    },
    {
      id: "midi", title: "MIDI setup", kicker: "Connections", summary: "Wire the primary Machinedrum and configure a second Elektron or generic MIDI device.",
      sections: [
        { title: "Primary Machinedrum", table: { headers: ["Cable", "Purpose"], rows: [["MD MIDI OUT → MCL MIDI IN 1", "Keys, transport, SysEx, state"], ["MCL MIDI OUT 1 → MD MIDI IN", "Sequences and control"]] }, paragraphs: ["Choose CONFIG > MIDI > DEVICES > GRID X > DEVICE MD and PORT MIDI 1. The current manual says to upgrade MD to X.13. On an MD MKI, keep Turbo MIDI at 4x or lower."] },
        { title: "Second device", paragraphs: ["For a Monomachine or Analog Four, connect its MIDI OUT to MCL MIDI IN 2 and MCL MIDI OUT 2 to its MIDI IN. In CONFIG > MIDI > DEVICES assign Grid Y to ELEKT and MIDI 2. For a generic synth, choose GENER instead. The manual also documents USB and TBD internal-port variations."], table: { headers: ["Grid", "Common role"], rows: [["X", "16 Machinedrum tracks"], ["Y", "Secondary-device MIDI and auxiliary data"]] } },
        { title: "Clock and transport", paragraphs: ["Open CONFIG > MIDI > SYNC for the active clock and transport setup. Read the current manual's platform details before using USB MIDI or TBD's internal clock."] }
      ],
      sources: [{ label: "MIDI setup manual", url: "https://github.com/jmamma/MCL/blob/master/docs/manual/sections/midi-setup.md" }, { label: "Key concepts", url: "https://github.com/jmamma/MCL/blob/master/docs/manual/sections/key-concepts.md" }]
    },
    {
      id: "grid", title: "Grid & performance", kicker: "First project", summary: "Understand MCL's grids and slots before loading tracks or using performance controls.",
      sections: [
        { title: "The project model", paragraphs: ["Projects are stored on the controller's Micro SD card. Each project has grids X and Y, each 16 slots wide and 128 rows tall. A slot stores a track or other state. Rows of Grid X form banks A–H in groups of 16; a row acts as a pattern. The device assigned to a grid determines the track and editor types."] },
        { title: "MD integration", paragraphs: ["Machinedrum X Enhanced Mode is activated when a compatible MD is connected to MCL; both Classic and Extended LEDs light. The MCL changelog says holding Classic/Extended for 1.5 seconds while stopped switches modes. Performance states can hold mutes and controller locks. The exact page controls vary by platform, so use the manual's GUI and grid pages alongside this map."] },
        { title: "Continue in the manual", paragraphs: ["After wiring and creating a backed-up project, use the manual's Grid, Load, Save, StepEdit, and Performance sections for the button-by-button workflow. This wiki's map describes the concepts but does not replace those control tables."] }
      ],
      sources: [{ label: "Key concepts", url: "https://github.com/jmamma/MCL/blob/master/docs/manual/sections/key-concepts.md" }, { label: "MCL manual", url: "https://jmamma.github.io/MCL/" }, { label: "Changelog", url: "https://github.com/jmamma/MCL/blob/master/Changelog" }]
    }
  ]
};
