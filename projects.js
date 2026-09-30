// Curated from the upstream project documentation on 2026-09-26; claims re-audited against upstream on 2026-09-29.
// Keep claims about hardware testing and compatibility scoped to what authors report.
export const devices = [
  { id: "octatrack", name: "Octatrack", shorthand: "OT", detail: "MKI / MKII · OS 1.40C" },
  { id: "digitakt", name: "Digitakt", shorthand: "DT", detail: "MKI / II · check each project's OS version" },
  { id: "digitone", name: "Digitone", shorthand: "DN", detail: "DN1 / Keys / II · check each project's OS version" },
  { id: "machinedrum", name: "Machinedrum", shorthand: "MD", detail: "Emulation, mods, and companion tools" },
  { id: "monomachine", name: "Monomachine", shorthand: "MM", detail: "Emulation, mods, and companion tools" },
  { id: "analog-four", name: "Analog Four", shorthand: "A4", detail: "MCL secondary MIDI; Overbridge 2 on MKII" },
  { id: "analog-rytm", name: "Analog Rytm", shorthand: "AR", detail: "MKI firmware mods; Overbridge 2 on MKII" },
  { id: "analog-heat", name: "Analog Heat", shorthand: "AH", detail: "Overbridge 2, MKII, and +FX" },
  { id: "syntakt", name: "Syntakt", shorthand: "ST", detail: "Overbridge 2" },
  { id: "model-cycles", name: "Model:Cycles", shorthand: "MC", detail: "Firmware additions and tweaks · check OS versions" },
  { id: "model-samples", name: "Model:Samples", shorthand: "MS", detail: "Firmware tweaks · check OS versions" }
];

export const projects = [
  {
    id: "octabam", name: "octabam", author: "sambanks", devices: ["octatrack"], kind: "Firmware", kinds: ["Firmware", "Emulator"], stage: "Build from source",
    summary: "A modular Octatrack firmware remixer, with new DSP effects, community ports, an emulator, and a virtual panel.",
    why: "Start here when you want to combine Octatrack mods, audition new effects, or test a custom OS before flashing.",
    features: ["Compose modules into named remixes", "BusVerb, BusDelay, send bus, and insert effects", "Ports for MIDI scenes, Octakit, USB audio/MIDI, and other work", "ColdFire/DSP emulation and a browser panel", "Stress project generator and test harness"],
    requirements: "Your own Octatrack OS 1.40C; macOS with the Xcode Command Line Tools and Homebrew for the documented build path; Python 3.10+, cmake, and uv; git submodules. Its Linux/WSL2 notes (BUILDING.md §1a) flag a missing m68k-elf-gcc route and treat make setup, make image, and make check as unverified there.",
    steps: [
      { title: "Clone with community modules", code: "git clone --recurse-submodules https://github.com/sambanks/octabam\ncd octabam" },
      { title: "Prepare tools and your own OS", code: "make setup\nmake os && make recon" },
      { title: "Inspect and test a remix", body: "Build the emulators before make check, or some gates skip. The panel also needs a project folder: set OT_PROJECT to a project directory or put its path in ~/.octabam_project.", code: "make modules\nmake emu-setup && make emu-cf\nmake check REMIX=ok-ms OT_PROJECT=/path/to/project\nmake panel REMIX=ok-ms OT_PROJECT=/path/to/project" },
      { title: "Build an image if the checks pass", code: "make image REMIX=ok-ms BUILD=1" }
    ],
    caveat: "Module compatibility is checked by the remixer. The emulator does not cover every hardware behavior; read each remix's hardware status before flashing.",
    source: "https://github.com/sambanks/octabam", docs: "https://github.com/sambanks/octabam/blob/main/docs/remixes/BUILDING.md",
    links: [{ label: "Remix status", url: "https://github.com/sambanks/octabam/blob/main/docs/remixes/README.md" }, { label: "Stress project", url: "https://github.com/sambanks/octabam/blob/main/tools/harness/STRESS_PROJECT.md" }],
    related: ["octakit", "midisc", "octatrick", "passos", "octa-panel", "octemu"]
  },
  {
    id: "octamax", name: "OCTAMAX", author: "mxldyn", devices: ["octatrack"], kind: "Firmware", stage: "Build from source",
    summary: "Octatrack reverse engineering workspace with optional behavior patches and 256 STATIC sample slots.",
    why: "Use it to study the OS layout or build its guarded 1.40C patch from your own firmware file.",
    features: ["256 STATIC slots", "Slice playhead view", "Lazy Part transitions", "More MIDI arp scales and persistent PERSONALIZE toggles"],
    requirements: "An Octatrack MKII: upstream targets MKII OS 1.40C, and its FLASHING.md says the build will not work on the MKI. Your own official OS 1.40C; Python 3.8+; its setup script builds a local firmware tool.",
    steps: [
      { title: "Clone and prepare stock OS and tools", code: "git clone https://github.com/mxldyn/octamax\ncd octamax\n./fetch-os.sh\n./setup.sh" },
      { title: "Apply the published patch", code: "python3 sysex/apply_patch.py -i downloads/extracted/OCTATRACK_OS1.40C.syx -p sysex/patches/octamax-2.0-beta.json -o OCTAMAX_2.syx --bin OCTAMAX_2.bin" }
    ],
    caveat: "The 2.0 build is labeled beta and its README reports testing on one MKII. A project using high STATIC slots will open on stock OS with those slots empty.",
    source: "https://github.com/mxldyn/octamax", docs: "https://github.com/mxldyn/octamax/blob/main/README.md",
    links: [{ label: "Flashing and recovery", url: "https://github.com/mxldyn/octamax/blob/main/FLASHING.md" }], related: ["kyoti", "firmware-tool"]
  },
  {
    id: "octakit", name: "Octakit", author: "emuyia", devices: ["octatrack"], kind: "Firmware", stage: "Browser patcher / source",
    summary: "Replaces 64 bank-bound Parts with 256 Kits per project on the Octatrack.",
    why: "For musicians who want a Machinedrum/Monomachine-style Kit workflow across banks.",
    features: ["256 named Kits", "Part-to-Kit migration for old projects", "Kit load/save, copy/paste, and undo", "MKI and MKII controls documented separately"],
    requirements: "Your own official Octatrack OS 1.40C; back up projects before testing.",
    steps: [
      { title: "Use the development browser patcher", body: "Open the author's patcher, supply your own stock 1.40C file, and download the file built in your browser." },
      { title: "Read the Kit controls", body: "The README lists distinct MKI and MKII shortcuts and the project migration behavior." }
    ],
    caveat: "The patcher calls these bleeding-edge development builds. It warns of crashes and data loss; reverting to stock can lose Kit data. Octakit uses a small part of the FLEX pool.",
    source: "https://github.com/emuyia/ems-octakit", docs: "https://github.com/emuyia/ems-octakit/blob/main/README.md",
    links: [{ label: "Browser patcher", url: "https://www.junes.website/goodies/octakit" }], related: ["octabam", "midisc"]
  },
  {
    id: "octalab", name: "octalab", author: "nordseele", devices: ["octatrack"], kind: "Research", stage: "Testing, no code release",
    summary: "An Octatrack MKI 1.40C firmware workshop documenting tested creative helpers, active test builds, and unreleased interface ideas.",
    why: "Follow the feature-level test status and workflow experiments without mistaking the repository for a downloadable firmware project.",
    features: ["MKI-tested groove pool and Euclidean grid page", "CAPTURE sampling-notepad workflow", "Randomization and pattern-cleanup shortcuts", "VIEWS, TAPE, and MODIFIER work marked separately by test status"],
    requirements: "No public firmware, build, or source code is provided. The author says the work is built and tested on an Octatrack MKI running OS 1.40C.",
    steps: [{ title: "Read the feature status", body: "The README labels each feature as working on the unit, in test builds, or only designed. Start with State of the project before relying on a described workflow." }],
    caveat: "The upstream repository is an active workshop, not a product release. It states that new builds reach the unit often but provides no firmware image, build instructions, flashing procedure, or release promise; MKII compatibility remains untested.",
    source: "https://github.com/nordseele/octalab", docs: "https://github.com/nordseele/octalab/blob/main/README.md", links: [], related: ["octabam"]
  },
  {
    id: "octa-bt-pt", name: "octa-bt-pt", author: "bryantysinger", devices: ["octatrack"], kind: "Tool", stage: "Build from source",
    summary: "A web UI for choosing Octatrack effect defaults and generating a guarded OS 1.40C patch.",
    why: "Use it when you want to change starting values or the default FX assignment without hand editing firmware bytes.",
    features: ["Effect parameter defaults", "FX1/FX2 default assignments", "LO-FI AMF multiplication fix", "Version-stamped .bin and .syx output"],
    requirements: "macOS-oriented setup, Python/Streamlit, and your own stock Octatrack OS 1.40C.",
    steps: [
      { title: "Clone and open the parameter picker", code: "git clone https://github.com/bryantysinger/octa-bt-pt\ncd octa-bt-pt\nmake setup\nmake os\nmake recon\nmake streamlit" },
      { title: "Build your choices", body: "Download patch_spec.json from the UI, then run:", code: "make generate SPEC=~/Downloads/patch_spec.json\nmake patch-image" }
    ],
    caveat: "Only OS 1.40C is accepted. The setup scripts are currently macOS shaped; other systems need adaptation or WSL.",
    source: "https://github.com/bryantysinger/octa-bt-pt", docs: "https://github.com/bryantysinger/octa-bt-pt/blob/main/README.md", links: [], related: ["firmware-tool", "octabam"]
  },
  {
    id: "midisc", name: "midisc", author: "bkkbrls-del", devices: ["octatrack"], kind: "Firmware", stage: "Build from source",
    summary: "Adds MIDI track scene locks and crossfader morphing to Octatrack OS 1.40C.",
    why: "Choose it for scene-driven MIDI parameter changes and a reference implementation of MIDI scene storage.",
    features: ["MIDI scene A/B locks", "Crossfader interpolation", "Step parameter lock interaction", "Part save/reload persistence"],
    requirements: "Your own official Octatrack OS 1.40C; Python 3 for the source path.",
    steps: [
      { title: "Get the stock OS into the exact path", body: "The helper downloads and extracts Elektron's OS 1.40C to downloads/extracted/OCTATRACK_OS1.40C.syx. On Windows, run scripts/fetch-os.ps1 in PowerShell instead.", code: "git clone https://github.com/bkkbrls-del/midisc\ncd midisc\nbash scripts/fetch-os.sh" },
      { title: "Or use a stock file you already downloaded", body: "This is an alternative to the fetch helper above. Copy your official 1.40C .syx to the path the build script reads.", code: "mkdir -p downloads/extracted\ncp /path/to/OCTATRACK_OS1.40C.syx downloads/extracted/OCTATRACK_OS1.40C.syx" },
      { title: "Build version 8.2 from source", body: "The build script extracts MAIN OS from that .syx if needed. It writes 1.40MIDISC8.2.bin to ~/Desktop and OCTATRACK_1.40MIDISC8.2.syx to out/.", code: "mkdir -p ~/Desktop\npython tools/build_midisc40.py" },
      { title: "Load the generated image", body: "For the CF-card route, copy ~/Desktop/1.40MIDISC8.2.bin to the card root, then select PROJECT → OS UPGRADE on the Octatrack. Read this project's flashing and recovery notes before doing so." }
    ],
    caveat: "The README's hosted browser patcher currently returns 404; its separate source repository targets older 8.1. The current source build is 8.2. Its Octakit composition seams are documented, but arbitrary hand-combined images still need verification.",
    source: "https://github.com/bkkbrls-del/midisc", docs: "https://github.com/bkkbrls-del/midisc/blob/main/README.md",
    links: [{ label: "Flashing and recovery", url: "https://github.com/bkkbrls-del/midisc/blob/main/docs/FLASHING.md" }, { label: "Older browser patcher source", url: "https://github.com/bkkbrls-del/midisc-patcher" }, { label: "Technical map", url: "https://github.com/bkkbrls-del/midisc/blob/main/docs/TECH.md" }], related: ["octabam", "octakit"]
  },
  {
    id: "octatrick", name: "Octatrick", author: "timhastie", devices: ["octatrack"], kind: "Firmware", stage: "Build from source",
    summary: "Four octabam modules: FM synth machine, scale quantizer with glide, direct pattern jump, and a tuner.",
    why: "Use the dedicated remixes when these musical features are the main goal.",
    features: ["Two-operator FM synth on FLEX tracks", "24-scale quantizer and legato glide", "Direct pattern jump", "Tuner window (emulator-verified only)", "Optional USB MIDI and 20-channel USB audio remix"],
    requirements: "Your own Octatrack OS 1.40C, octabam toolchain, and initialized git submodules.",
    steps: [
      { title: "Clone with the actual module sources", code: "git clone --recurse-submodules https://github.com/timhastie/octatrick\ncd octatrick" },
      { title: "Build a remix", code: "make setup\nmake os && make recon\nmake image REMIX=octatrick-usb BUILD=1 VERSION=OCTATRICK1" }
    ],
    caveat: "The author reports octatrick-usb, built as OCTATRICK9 (modules v9.1), running on an MKI on 26 Sep 2026. A --recurse-submodules clone now pins newer modules (v2.9), whose image differs from OCTATRICK9 and is emulator-verified but not yet flashed (checked 2026-09-29). The synth conflicts with tempo-bus in the documented placement; let the build ledger enforce combinations.",
    source: "https://github.com/timhastie/octatrick", docs: "https://github.com/timhastie/octatrick/blob/main/README.md", links: [], related: ["octabam", "octa-panel"]
  },
  {
    id: "passos", name: "PassOS", author: "theremoteviewer", devices: ["octatrack"], kind: "Firmware", stage: "Build from source",
    summary: "An octabam remix for the Octatrack MKI that adds Digitone II scales to the NOTE page and an optional STOP/PLAY confirmation.",
    why: "Use it when you want scale-locked notes on stock OS 1.40C and the unchanged set of 14 stock FX2 effects.",
    features: ["SCL and ROT on MIDI NOTE SETUP: 36 Digitone II scales across 12 roots", "NOTE page and emitted notes snap to the scale", "RiDylan mode: STOP and PLAY ask before stopping when this unit is clock master", "No DSP changes"],
    requirements: "Your own Octatrack OS 1.40C, the octabam toolchain, a CompactFlash card, and a working 5-pin DIN MIDI interface for recovery.",
    steps: [
      { title: "Clone the PassOS branch", code: "git clone --recurse-submodules https://github.com/theremoteviewer/octa-passos\ncd octa-passos" },
      { title: "Build the-passenger remix", body: "Run make recon after make os: the build step stops without out/raw/section_3_MAIN_OS.bin. The build writes out/OCTATRACK_PassOS1.0.bin for the card and a matching .syx for MIDI.", code: "make setup\nmake os\nmake recon\nmake image REMIX=the-passenger BUILD=1" },
      { title: "Flash with a recovery path ready", body: "Follow docs/remixer/FLASHING.md. USB MIDI to the Octatrack cannot install OS updates, so check the DIN MIDI recovery route before flashing." }
    ],
    caveat: "The README targets the MK1 and says PassOS 1.0 is running on hardware, without naming the test unit's model; its notes record 1.0 booting and the scale display on a unit. The note-scale and STOP-guard module notes still say they have not been measured running, on hardware or in an emulator. No MKII test is reported. Changing SCL or ROT moves the NOTE page's four note values onto the new scale; stored trig notes stay as written and are snapped when they play. Built images contain Elektron's OS and must not be shared.",
    source: "https://github.com/theremoteviewer/octa-passos", docs: "https://github.com/theremoteviewer/octa-passos/blob/passos-1.0/README.md", links: [{ label: "Flashing guide", url: "https://github.com/theremoteviewer/octa-passos/blob/passos-1.0/docs/remixer/FLASHING.md" }, { label: "Scale research notes", url: "https://github.com/theremoteviewer/octa-passos/blob/passos-1.0/modules/scales/NOTES.md" }], related: ["octabam", "octatrick", "octamax"]
  },
  {
    id: "octa-panel", name: "octa-panel", author: "timhastie", devices: ["octatrack"], kind: "Emulator", kinds: ["Emulator", "Firmware"], stage: "Build from source",
    summary: "An octabam fork focused on a real-time Octatrack emulator with sound and a browser or macOS virtual front panel.",
    why: "Explore firmware behavior with a visible panel, keys, LEDs, encoders, crossfader, and audio outputs.",
    features: ["Browser/macOS front panel", "ColdFire plus both DSP cores", "Real-time audio", "Companion emulator for Octatrick modules"],
    requirements: "macOS with Homebrew (the setup script installs through brew; audio goes through CoreAudio), your own Octatrack OS 1.40C, and the fork's panel setup instructions.",
    steps: [
      { title: "Clone the panel branch with its modules", code: "git clone --branch panel-ui --recurse-submodules https://github.com/timhastie/octa-panel\ncd octa-panel" },
      { title: "Prepare tools and stock OS 1.40C", code: "make setup\nmake os\nmake recon\nmake emu-setup\nmake emu-cf" },
      { title: "Open the virtual panel", body: "The panel server uses the stock OS image by default and opens at http://localhost:8563/. To test a built remix, pass its actual output image with --image as described in the panel guide.", code: "make modules\nmake check REMIX=ported\n.venv/bin/python3 tools/panel/panel_server.py" }
    ],
    caveat: "The panel-ui branch is an older octabam base. Current Octatrick firmware modules live in timhastie/octatrick.",
    source: "https://github.com/timhastie/octa-panel", docs: "https://github.com/timhastie/octa-panel/blob/panel-ui/tools/panel/README.md", links: [], related: ["octatrick", "octabam", "octemu"]
  },
  {
    id: "kyoti", name: "OT Kyoti FW", author: "Zac-Kyoti", devices: ["octatrack"], kind: "Firmware", stage: "Build from source",
    summary: "An independent Octatrack firmware project, influenced by OCTAMAX, with opt-in behavior changes, quality-of-life additions, and bug fixes.",
    why: "Study or build targeted changes such as mute modes, side-chain compression, live-record controls, and fixes.",
    features: ["Selectable MUTE MODE behaviors", "Side-chain compressor and reload-from-project", "MIDI Plays-Free, pattern LED, and Part carryover fixes", "Guarded per-feature build scripts"],
    requirements: "Your own Octatrack OS 1.40C; source build tools described in BUILD_KYOTI.md.",
    steps: [
      { title: "Clone and prepare the source tree", code: "git clone https://github.com/Zac-Kyoti/octatrack-kyoti-fw\ncd octatrack-kyoti-fw\n./fetch-os.sh && ./analyze.sh && ./setup.sh" },
      { title: "Choose a documented build", body: "The single-feature MUTE MODE image is reported hardware-confirmed; bugbuild composites are built separately and have not been flashed as a combination.", code: "python3 tools/build_mutemode_dt.py\n# For the unflashed composites instead: python3 tools/build_bugbuilds.py" }
    ],
    caveat: "The README tracks hardware status per feature. Its all-in-one image is staged and deliberately not buildable. DIRECT JUMP V7 is marked final (2026-09-27), but its MIDI-track and fast re-cue Program Change behavior are not yet tested on hardware.",
    source: "https://github.com/Zac-Kyoti/octatrack-kyoti-fw", docs: "https://github.com/Zac-Kyoti/octatrack-kyoti-fw/blob/main/BUILD_KYOTI.md", links: [], related: ["octamax", "firmware-tool"]
  },
  {
    id: "octemu", name: "octemu", author: "markandrus", devices: ["octatrack"], kind: "Emulator", kinds: ["Emulator", "Firmware"], stage: "Build from source",
    summary: "A macOS Octatrack emulator and firmware development environment built on QEMU, DSP56300, and SDL2.",
    why: "Run a virtual Octatrack, test firmware changes, or use the standalone octdsp DSP runner.",
    features: ["Windowed Octatrack emulator", "DSP-only octdsp runner", "RECEIVE machine and USB MIDI/audio experiments", "Fixture and USB test harnesses"],
    requirements: "macOS, build dependencies reported by make doctor, your own official OS, and roughly 1.2 GB for vendored setup.",
    steps: [
      { title: "Clone and build the emulator", code: "git clone https://github.com/markandrus/octemu\ncd octemu\nmake doctor\nmake setup\nmake os\nmake qemu\nmake" },
      { title: "Run it", code: "./octemu" },
      { title: "Try the DSP alone", code: "./octdsp --in-a sin:440 --out-main out/x.wav --timeout 2" },
      { title: "Build the separate firmware experiments", body: "The USB audio experiment needs both the flashed firmware image and out/USBAUDIO.BIN copied to the CF-card root. Holding NO at boot skips that payload.", code: "make fw-receive\nmake fw-usb-midi\nmake fw-usb-audio" }
    ],
    caveat: "The README reports playback warble and other USB audio limitations. Its license notes that locally built combined binaries cannot be redistributed.",
    source: "https://github.com/markandrus/octemu", docs: "https://github.com/markandrus/octemu/blob/main/README.md",
    links: [{ label: "Test harness", url: "https://github.com/markandrus/octemu/blob/main/tests/README.md" }], related: ["octabam", "octa-panel", "firmware-tool"]
  },
  {
    id: "firmware-tool", name: "elektron-firmware-tool", author: "mischa85", devices: ["octatrack", "digitakt", "digitone", "machinedrum", "monomachine"], kind: "Tool", stage: "Command-line tool",
    summary: "Inspects, decompresses, modifies, and repacks Elektron OS SysEx files across several container formats.",
    why: "The general-purpose starting point for examining an OS image or extracting sections for reverse engineering.",
    features: ["Inspect transport, container, sections, and checksums", "Extract raw sections", "Replace sections and rebuild checksums", "Byte-exact repack self-check"],
    requirements: "C compiler and make; a lawfully obtained OS .syx file.",
    steps: [
      { title: "Clone, build, and inspect", code: "git clone https://github.com/mischa85/elektron-firmware-tool\ncd elektron-firmware-tool\nmake\n./elektron-firmware-tool -i /path/to/OS.syx -v" },
      { title: "Extract a section or verify a round trip", body: "Use the section number reported by the verbose inspection in place of N.", code: "./elektron-firmware-tool -i /path/to/OS.syx -d N -o outdir\n./elektron-firmware-tool -i /path/to/OS.syx -r -o repacked.syx && cmp /path/to/OS.syx repacked.syx" }
    ],
    caveat: "Format support does not mean every possible device/version has been validated. Rebuilt firmware is a separate flashing decision.",
    source: "https://github.com/mischa85/elektron-firmware-tool", docs: "https://github.com/mischa85/elektron-firmware-tool/blob/main/README.md", links: [], related: ["octamax", "octabam", "dnfw"]
  },
  {
    id: "elekloader", name: "elekloader", author: "irpina", devices: ["digitakt", "digitone", "octatrack"], kind: "Tool", stage: "Windows/macOS release + source",
    summary: "A mod and whole-build loader for Digitakt MKI, Digitone MKI/Keys, and Octatrack stock OS files.",
    why: "Use it to combine compatible .elemod packages, check conflicts, and create a verified OS file for the supported device profile.",
    features: ["Tk GUI and Python CLI", "Checks stock hash and mod conflicts", "Device-specific core hook bus for linkable mods", "Re-verifies generated OS"],
    requirements: "Your own exact supported OS: Digitakt MKI 1.53 or Octatrack 1.40C with the 0.3.0 Windows/macOS release; Digitone MKI/Keys 1.43 needs the source path (unreleased 0.4.0 on main, Python 3.9+).",
    steps: [
      { title: "Run the GUI", body: "The 0.3.0 release has elekloader-0.3.0-windows.exe and a signed elekloader-0.3.0-macos.dmg, both with the Digitakt core built in. For Digitone or the source path, create an environment and install the checkout:", code: "git clone https://github.com/irpina/elekloader\ncd elekloader\npython -m venv .venv\n. .venv/bin/activate\npip install -e .\nelekloader" },
      { title: "Select mods and check the build", body: "Choose the stock OS, install .elemod files, tick your mods, and click BUILD FIRMWARE. For a digislicer example, put the stock .syx and both .elemod files in this directory and verify before building:", code: "python -m elekloader.patch --stock Digitakt_OS1.53.syx --mod core-2.0a.elemod --mod digislicer-1.2.elemod --check\npython -m elekloader.patch --stock Digitakt_OS1.53.syx --mod core-2.0a.elemod --mod digislicer-1.2.elemod --out Digitakt_OS1.53-slicer.syx --version SL12" },
      { title: "Send the new OS through Transfer", body: "Connect the MKI by USB, select and connect it in Elektron Transfer, drag the generated .syx to Drop files here, then press YES on the unit. If it fails to boot, power on while holding FUNC, press TRIG 4 for OS UPGRADE, and send the stock .syx with Transfer's legacy OS mode." }
    ],
    caveat: "Format-2 linkable mods currently cover Digitakt and Digitone MKI; Octatrack support is for whole format-1 builds. The 0.3.0 apps have no Digitone support; Digitone builds need elekloader from source, with core-dn1 built via elekloader.sdk.build mods/core-dn1.",
    source: "https://github.com/irpina/elekloader", docs: "https://github.com/irpina/elekloader/blob/main/README.md",
    links: [{ label: "Releases", url: "https://github.com/irpina/elekloader/releases/latest" }, { label: "Supported devices", url: "https://github.com/irpina/elekloader/blob/main/docs/DEVICES.md" }], related: ["digislicer", "digihealth", "digi1-mods", "plock2sound", "digisplash"]
  },
  {
    id: "digislicer", name: "digislicer", author: "irpina", devices: ["digitakt"], kind: "Firmware", stage: "Release available",
    summary: "An on-device slice editor for Digitakt MKI's SLICE machine, packaged as an elekloader mod.",
    why: "Create, audition, move, and persist up to 64 slices per sample without saving a separate sliced copy first.",
    features: ["Waveform slice editor", "Transient auto-slicing and grid creation", "Slice data stored per sample", "Keyboard and trig slice playback"],
    requirements: "Digitakt MKI stock OS 1.53, elekloader (the 0.3.0 Windows/macOS app, or source plus core-2.0a.elemod), and the digislicer .elemod release.",
    steps: [
      { title: "Build via elekloader", body: "Download digislicer-1.2.elemod and core-2.0a.elemod from this project's release page (the Windows elekloader build has core built in; a source install needs core-2.0a.elemod). In elekloader choose your Digitakt_OS1.53.syx, install the .elemod files, tick digislicer, confirm No conflicts / Ready to build, then click BUILD FIRMWARE. Send the generated .syx to the Digitakt MKI with Elektron Transfer." },
      { title: "Open the editor on the device", body: "In 1.2, on a SLICE track's SRC page, hold YES for about a second. Unreleased 2.0 on the main branch replaces this with a separate DIGISLICER machine opened from its SRC page, so check the release you downloaded." }
    ],
    caveat: "Not hardware-tested as a mod (checked 2026-09-29). The author tried the editor on a Digitakt MKI only in the earlier custom builds (1.8J) it was split from; 1.1, 1.2 and the unreleased 2.0 were checked in the author's digikit-derived emulator (the public Digitakt MKI build is digiemu; m-dwyer/digikit itself covers only the II series) and are each marked \"Not yet tried on a unit.\" The mod targets OS 1.53 specifically; use elekloader's compatibility check.",
    source: "https://github.com/irpina/digislicer", docs: "https://github.com/irpina/digislicer/blob/main/README.md",
    links: [{ label: "Mod release", url: "https://github.com/irpina/digislicer/releases/latest" }], related: ["elekloader", "digihealth"]
  },
  {
    id: "digisplash", name: "DigiSplash", author: "DigiAlchemydsp", devices: ["digitakt", "digitone"], kind: "Firmware", stage: "Release available",
    summary: "Boot-splash mods for Digitakt MKI and Digitone MKI / Keys, packaged as elekloader mods, with a generator that turns a PNG or GIF into a splash.",
    why: "Change the startup animation, or boot the rare alternate stock animation that the stock selector never reaches, without touching anything else the unit does.",
    features: ["rare-splash: the alternate stock boot animation", "Animated DIGITUSSY and DIGITRASH splashes", "Nine generated splashes in the 1.0 release", "make-bootanim: build your own splash mod from a PNG or GIF"],
    requirements: "Digitakt MKI on stock OS 1.53 or Digitone MKI / Digitone Keys on stock OS 1.43, elekloader, and the matching core mod. The upstream examples use Digitakt core 2.1, which is on elekloader's main branch (the 0.3.0 release ships core 2.0a); the mods require core without naming a minimum version. Digitone needs core-dn1 2.0a, which elekloader provides only as source. Building from source or using make-bootanim needs Python 3 (Pillow for the generator) and an m68k toolchain for every mod except rare-splash.",
    steps: [
      { title: "Get the release for your device", body: "Download DigiSplash-1.0-digitakt-mk1.zip or DigiSplash-1.0-digitone-mk1.zip from the v1.0 release. Each holds the .elemod files and their sources." },
      { title: "Build the matching core", body: "The upstream commands use core 2.1, which is on elekloader's main branch; the elekloader 0.3.0 app ships core 2.0a, and DigiSplash does not say whether 2.0a works. From an elekloader source checkout, build core for your device (mods/core-dn1 with the Digitone OS 1.43 file for a Digitone).", code: "python -m elekloader.sdk.build mods/core --stock Digitakt_OS1.53.syx" },
      { title: "Patch with elekloader", body: "Combine your stock OS, the matching core, and one splash. Every splash except rare-splash is a draw mod hooking the same call sites, so install only one of them. rare-splash can be combined with a draw mod, but the draw mod then hides it. You can also drop the .elemod into the elekloader window (Install from file) with the matching core.", code: "python -m elekloader.patch --stock Digitakt_OS1.53.syx \\\n    --mod mods/core/out/core-2.1.elemod \\\n    --mod /path/to/unzipped/elemods/mount.elemod \\\n    --out mount.syx --version 2.0x" },
      { title: "Send and recover", body: "Send the .syx with Elektron Transfer like a stock OS. Only the main OS section changes. To recover a Digitakt, hold FUNC while powering on, choose OS UPGRADE, and send the stock Digitakt_OS1.53.syx; on a Digitone, hold FUNC while powering on and press TRIG 4 (OS UPGRADE). Keep the stock file." }
    ],
    caveat: "Emulator-tested only (checked 2026-09-29). The project's handoff notes say \"Nothing is flashed on the physical units from this session's builds.\" digitussy and digitrash cold-boot to a live UI in digiemu on the Digitakt, and digitussy plus a generated splash do on the Digitone; aba-bootanim has not been cold-booted on the Digitakt, and the Digitone rare-splash animation has not been captured. The docs make no statement about testing the 13 prebuilt .elemod files. The source examples use the author's local folder name (../digitakt-splash-mods/) rather than DigiSplash.",
    source: "https://github.com/DigiAlchemydsp/DigiSplash", docs: "https://github.com/DigiAlchemydsp/DigiSplash/blob/main/docs/INSTALLING.md",
    links: [{ label: "v1.0 release", url: "https://github.com/DigiAlchemydsp/DigiSplash/releases/tag/v1.0" }, { label: "Prebuilt mods", url: "https://github.com/DigiAlchemydsp/DigiSplash/blob/main/releases/README.md" }, { label: "Splash generator", url: "https://github.com/DigiAlchemydsp/DigiSplash/blob/main/tools/make-bootanim/README.md" }],
    related: ["elekloader", "digiemu"]
  },
  {
    id: "digihealth", name: "digihealth", author: "irpina", devices: ["digitakt"], kind: "Firmware", stage: "Release available",
    summary: "Digitakt MKI performance and diagnostics mod with FAST AUDIO and SYSTEM INFO.",
    why: "Inspect load and memory use, and enable an audio-render optimization the author measured in the builds this mod came from.",
    features: ["FAST AUDIO setting", "CPU/DSP/RAM and sample-memory display", "Read-only USB diagnostics commands", "Designed to combine with digislicer via elekloader"],
    requirements: "Digitakt MKI stock OS 1.53, elekloader (the 0.3.0 Windows/macOS app, or source plus core-2.0a.elemod), and the digihealth .elemod release.",
    steps: [
      { title: "Build via elekloader", body: "Download digihealth-1.0.elemod and core-2.0a.elemod from this project's release page. In elekloader choose your Digitakt_OS1.53.syx, install both .elemod files, tick digihealth, confirm No conflicts / Ready to build, then click BUILD FIRMWARE. Send the generated .syx to the Digitakt MKI with Elektron Transfer." },
      { title: "Read diagnostics", body: "Clone digihealth for its USB helper. The helper is Windows-only (winmm); close Elektron Transfer first so it can open the MIDI port.", code: "git clone https://github.com/irpina/digihealth\ncd digihealth\npython tools/digiusb.py cfw\npython tools/digiusb.py stats 10" }
    ],
    caveat: "The README's 537→480 µs render and 80.5→72.0% DSP-load figures were measured on a Digitakt MKI running the earlier custom builds this mod was split from; the 1.0 mod itself was checked in the author's emulator, not on a unit. Unreleased 1.1 on main adds SYSTEM INFO for Digitone MKI/Keys 1.43, emulator-checked only (checked 2026-09-29).",
    source: "https://github.com/irpina/digihealth", docs: "https://github.com/irpina/digihealth/blob/main/README.md",
    links: [{ label: "Mod release", url: "https://github.com/irpina/digihealth/releases/latest" }], related: ["elekloader", "digislicer", "digi1-mods"]
  },
  {
    id: "digi1-mods", name: "digi1_mods", author: "gdeo607", devices: ["digitakt"], kind: "Firmware", stage: "Build from source",
    summary: "Digitakt MKI OS 1.53 patch set with POLY tracks, waveform/spectrum/X-Y utilities, an LFO modulation matrix, and a master EQ.",
    why: "Build a standalone POLY-and-utility firmware image, or use the project's linkable mods with elekloader.",
    features: ["Standalone: POLY tracks sharing one rotating voice pool", "Standalone: three-dot waveform, spectrum, X-Y, tuner, and track activity views", "elekloader mods: Digi Poly (up to four-note chords with voice borrowing), an eight-slot LFO modulation matrix, and a four-band master EQ"],
    requirements: "Your own exact Digitakt MKI OS 1.53 .syx, Python 3, and a locally built elektron-firmware-tool. Back up projects, sounds, and samples first; keep a physical MIDI interface available for recovery.",
    steps: [
      { title: "Clone the patch set and its container tool", code: "git clone https://github.com/mischa85/elektron-firmware-tool\ngit clone https://github.com/gdeo607/digi1_mods\ncd elektron-firmware-tool && make\ncd ../digi1_mods" },
      { title: "Build the confirmed all-views image", body: "This build puts waveform, spectrum, and X-Y views on the three-dots key and includes POLY. The builder verifies the exact OS 1.53 input and patched output.", code: "python3 tools/build.py --official /path/to/Digitakt_OS1.53.syx --tool ../elektron-firmware-tool/elektron-firmware-tool --page all" },
      { title: "Flash one build and check it", body: "With a backup made, send the generated out/digi1_mods_v3r-all_1.5d.syx through Elektron Transfer and confirm with YES on the unit. FUNC + SRC should list POLY after SLICE; the three-dots key cycles the utility views." }
    ],
    caveat: "The standalone all-views build (v3r-all / 1.5d) is reported hardware-confirmed. The current elekloader combination (core, digihealth, Digi Poly, Matrix, and EQ) is emulator-checked but not yet hardware-tested. Standalone builds repurpose Song mode; the elekloader utilities retain it.",
    source: "https://github.com/gdeo607/digi1_mods", docs: "https://github.com/gdeo607/digi1_mods/blob/main/README.md",
    links: [{ label: "Install and revert", url: "https://github.com/gdeo607/digi1_mods/blob/main/docs/INSTALL.md" }, { label: "Feature controls", url: "https://github.com/gdeo607/digi1_mods/blob/main/docs/USAGE.md" }, { label: "Risk notes", url: "https://github.com/gdeo607/digi1_mods/blob/main/RISKS.md" }, { label: "Changelog", url: "https://github.com/gdeo607/digi1_mods/blob/main/CHANGELOG.md" }], related: ["elekloader", "digihealth", "firmware-tool", "digiemu"]
  },
  {
    id: "plock2sound", name: "P-lock to sound", author: "AvroraPolnareff", devices: ["digitone"], kind: "Firmware", stage: "Build from source",
    summary: "A Digitone MKI/Keys 1.43 elekloader mod that turns one step's parameter locks into a sound you can save.",
    why: "Turn a p-locked step into a reusable sound without manually recreating its locked values.",
    features: ["Bakes a held step's 79 parameter locks into the track sound", "Keeps the source pattern and track sound unchanged", "Preserves name, tags, and arpeggiator data", "Leaves ordinary trig copy and sound-locked steps stock"],
    requirements: "Your own Digitone or Digitone Keys OS 1.43 .syx, Python 3.9+, the Digitone m68k toolchain, and elekloader from source. The repository currently has no published release asset.",
    steps: [
      { title: "Clone and install the loader", code: "git clone https://github.com/irpina/elekloader\ngit clone https://github.com/AvroraPolnareff/plock2sound\ncd elekloader\npip install -e .\ncd ../plock2sound" },
      { title: "Build the mod and Digitone core", body: "Both commands use the same locally held OS 1.43 file. The outputs are placed together in plock2sound/out/.", code: "python -m elekloader.sdk.build . --stock /path/to/Digitone_and_Digitone_Keys_OS1.43.syx --out out\ncd ../elekloader\npython -m elekloader.sdk.build mods/core-dn1 --stock /path/to/Digitone_and_Digitone_Keys_OS1.43.syx --out ../plock2sound/out" },
      { title: "Build the patched OS", code: "cd ../plock2sound\npython -m elekloader.patch --stock /path/to/Digitone_and_Digitone_Keys_OS1.43.syx --mod out/core-2.0a.elemod --mod out/plock2sound-1.0.elemod --out out/Digitone_OS1.43-plock2sound.syx --version P2S1" },
      { title: "Make and save a sound", body: "Flash the generated .syx using the normal Elektron Transfer OS-update route. Hold one step's TRIG and its synth-track key, tap RECORD, then pick a free Sound Manager slot and press FUNC + STOP." }
    ],
    caveat: "The README reports a 265-case emulator hook matrix and a full device test matrix for the inline equivalent. The mod does not act on MIDI tracks, sound-locked steps, multiple held steps, or invalid track-key combinations.",
    source: "https://github.com/AvroraPolnareff/plock2sound", docs: "https://github.com/AvroraPolnareff/plock2sound/blob/main/README.md",
    links: [{ label: "Source and test notes", url: "https://github.com/AvroraPolnareff/plock2sound/blob/main/README.md" }, { label: "elekloader setup", url: "https://github.com/irpina/elekloader/blob/main/README.md" }], related: ["elekloader", "digiemu"]
  },
  {
    id: "dnfw", name: "dn2_firmware_explore", author: "angellinares", devices: ["digitone"], kind: "Tool", kinds: ["Tool", "Firmware"], stage: "CLI / browser patcher",
    summary: "Digitone I/II firmware inspection tools plus browser and CLI mods for Digitone II OS 1.11.",
    why: "Inspect Digitone images, apply documented DN2 mods, or study the firmware's ColdFire and SHARC structures.",
    features: ["Fourth LFO and expanded LFO/arp options", "Inspect, extract, diff, rebuild, and disassemble", "Browser patcher for supported DN2 mods", "Mod compatibility matrix and emulator checks"],
    requirements: "Python 3.11+ for CLI; your own Digitone OS image. The listed mods target Digitone II 1.11.",
    steps: [
      { title: "Install and inspect", body: "Clone the repo, then use your own DNII 1.11 distribution ZIP at the indicated path (or replace it with the file's full path).", code: "git clone https://github.com/angellinares/dn2_firmware_explore\ncd dn2_firmware_explore\npip install -e .\ndnfw inspect /path/to/Digitone_II_OS1.11_dist.zip" },
      { title: "List or apply a mod", body: "Supply your own extracted .syx where the command names it. Check the matrix before combining mods.", code: "dnfw mods list\ndnfw mods matrix /path/to/Digitone_II_OS1.11.syx\ndnfw mods apply /path/to/Digitone_II_OS1.11.syx --mod lfo4 -o modded.syx" },
      { title: "Browser route", body: "Open the project site and supply your own stock image. The README says processing stays in your browser." }
    ],
    caveat: "The README lists most mods as confirmed on hardware; arpplocks has changed since and is emulator-checked only. Since 2026-09-27, --mod lfo4 emits the lfo4-fast rebuild, which is not yet recorded on the instrument. The README says no combined image has been flashed, but the LFO4 build notes record a combined fxmod+lfo4+songguard+arpmodes image on a unit (a save-while-playing stutter traced to lfo4). Use the compatibility matrix before combining mods.",
    source: "https://github.com/angellinares/dn2_firmware_explore", docs: "https://github.com/angellinares/dn2_firmware_explore/blob/main/README.md",
    links: [{ label: "Browser patcher", url: "https://angellinares.github.io/dn2_firmware_explore/" }, { label: "Compatibility matrix", url: "https://github.com/angellinares/dn2_firmware_explore/blob/main/docs/mods-compatibility.md" }], related: ["firmware-tool"]
  },
  {
    id: "monomodule", name: "Monomodule", author: "shnolk", devices: ["monomachine"], kind: "Emulator", stage: "Release available",
    summary: "Monomachine DSP emulation as DAW instruments and effects, plus a SysEx library app.",
    why: "Use it for a single Monomachine track, all six tracks, the FX machines, or browsing your own SysEx dumps in a DAW workflow.",
    features: ["One and Six instruments", "FX plugin for Monomachine effects", "AU/VST3 and standalone builds", "Library for presets, kits, patterns, and audio previews"],
    requirements: "Your own Monomachine OS 1.32B .syx file; release builds for macOS 12+, Windows 10+ x64, and Linux x64/arm64.",
    steps: [
      { title: "Install the matching release", body: "On macOS run the installer for AU/VST3 and the Library app. On Windows run the x64 installer. On Linux (x64 or arm64) copy the .vst3 folders into ~/.vst3/." },
      { title: "Select your OS file", body: "Open a plugin or the Library app, choose Select OS File…, and select your own compatible Monomachine OS 1.32B .syx." },
      { title: "Choose a format", body: "Use One for a track, Six for six tracks with separate outputs, or FX for audio processing." }
    ],
    caveat: "The author documents substitute Digibank waveforms and incomplete delay tempo behavior. MIDI transfer to hardware is not implemented; use .syx files for dumps.",
    source: "https://github.com/shnolk/monomodule", docs: "https://github.com/shnolk/monomodule/blob/main/README.md",
    links: [{ label: "Releases", url: "https://github.com/shnolk/monomodule/releases" }], related: ["gearmulator", "firmware-tool", "mpc-monomodule", "mpc-machinedrum"]
  },
  {
    id: "ems-monomachine", name: "Em’s Monomachine firmware", author: "emuyia", devices: ["monomachine"], kind: "Firmware", stage: "No public patcher yet",
    summary: "Monomachine firmware experiments with per-track lengths and speeds, trig conditions, sequencer changes, and fixes.",
    why: "Follow the feature history and data-format changes while the author prepares a patcher-based distribution path.",
    features: ["Per-track loop lengths and speeds", "Trig and track conditions", "Song offsets and lengths up to 512 steps", "Extended-data SysEx backups and sequencer fixes"],
    requirements: "The repository currently provides documentation and changelogs; it does not provide a current patcher or build to run.",
    steps: [
      { title: "Read the notice and changelog", body: "The README explains the shift away from complete .syx files. The changelog records each firmware change and the affected data formats." },
      { title: "Prepare your data before any future build", body: "Back up projects and move anything in SONG slots 13–24 to slots 1–12; the author says those slots were repurposed and their data will be corrupted on boot." }
    ],
    caveat: "No current download or patching instructions are provided. The author has stopped publishing complete images and is preparing a patcher. SONG slots 13–24 are repurposed and their existing data is corrupted on boot.",
    source: "https://github.com/emuyia/ems-monomachine-firmware", docs: "https://github.com/emuyia/ems-monomachine-firmware/blob/main/README.md",
    links: [{ label: "Changelog", url: "https://github.com/emuyia/ems-monomachine-firmware/blob/main/CHANGELOG.md" }], related: ["monomodule", "gearmulator", "octakit"]
  },
  {
    id: "gearmulator", name: "gearmulator MD/MM", author: "joelanders", devices: ["machinedrum", "monomachine"], kind: "Emulator", stage: "Alpha release available",
    summary: "A Gearmulator fork that emulates Elektron Machinedrum and Monomachine as standalone apps and plugins.",
    why: "Play with MD/MM emulations on a computer and use the virtual panel, SysEx transfer, and host audio routing.",
    features: ["Virtual Machinedrum and Monomachine panels", "Shift-click key holds and encoder presses", "Send SysEx File menu", "Standalone stereo and multi-output VST3 options"],
    requirements: "A release build for Windows, macOS, or Linux x86_64 and firmware/ROM files obtained from your own hardware. Current Linux builds require glibc 2.38 or newer.",
    steps: [
      { title: "Get a build", body: "Open Releases and choose the Windows, macOS, or Linux archive for your CPU. Extract a standalone app, or put the VST3 in your host's plugin folder: C:\\Program Files\\Common Files\\VST3 on Windows, ~/.vst3/ on Linux. Supply your own firmware image when the app asks." },
      { title: "Use the panel", body: "Shift-click holds buttons; Alt/Option-click presses DATA ENTRY encoders. Right-click to send a SysEx file to the emulated machine." }
    ],
    caveat: "This is joelanders's fork of The Usual Suspects' Gearmulator; direct support questions to this fork. The project does not provide copyrighted firmware images.",
    source: "https://github.com/joelanders/gearmulator-md-mm", docs: "https://github.com/joelanders/gearmulator-md-mm/blob/release/md-mm-alpha/README.md",
    links: [{ label: "Releases", url: "https://github.com/joelanders/gearmulator-md-mm/releases" }], related: ["firmware-tool", "mcl", "mpc-machinedrum"]
  },
  {
    id: "mpc-machinedrum", name: "Machinedrum Module", author: "sd88me", devices: ["machinedrum"], kind: "Emulator", stage: "Build from source",
    summary: "The Machinedrum UW sound engine as a VST2 instrument for Akai MPC OS standalone devices. It runs on the MPC or Force, not on a Machinedrum.",
    why: "Play all 16 Machinedrum tracks from one plugin on an Akai Force, with the MD's own DSP code, machine maths, and LCD-style touchscreen pages.",
    features: ["16 tracks from one instance; MIDI notes 36-51 play tracks 1-16", "GND, TRX, EFM, E12, P-I, and ROM machines", "SYN, AMP/EFX, ROUTE, and per-track LFO pages with Q-Link support", "Factory kits and dropped-in kit .syx banks", "Voice budget and ROM on/off switch for the Force's CPU", "Recompiled voice DSP with a bit-exactness gate"],
    requirements: "An Akai MPC OS standalone device with root file access (the author installs over SSH on a modded Force). Your own Machinedrum UW OS 1.63 file (Elektron_SPS1-1UW_OS1.63.syx), your own 8 MB UW flash image, and your own Monomachine OS 1.32B .syx for the skin's LCD fonts. A Linux or macOS computer with Docker, git, CMake, Ninja, a C++ compiler, and Python 3.",
    steps: [
      { title: "Clone the two repositories side by side", body: "The build script looks for Monomodule's font file at ../mpc-vst-monomodule by default.", code: "git clone --recursive https://github.com/sd88me/mpc-vst-machinedrum\ngit clone --recursive https://github.com/sd88me/mpc-vst-monomodule" },
      { title: "Build the LCD fonts from your Monomachine OS", body: "Build Monomodule for MPC OS (its own catalog entry) without -d. Its skin step writes mpc-vst-monomodule/vst/build/art.json, which the Machinedrum skin reuses.", code: "cd mpc-vst-monomodule\nrelease/release.sh /path/to/your-monomachine-os-1.32B.syx\ncd .." },
      { title: "Build mdProbe", body: "The README lists mdProbe as a prerequisite but gives no build commands, and the build script stops without it. These commands, from tools/mdtrace/README.md, put mdProbe at the path the script expects.", code: "cd mpc-vst-machinedrum/libs/gearmulator-md-mm\ngit apply ../../tools/mdtrace/gearmulator-md-mm.patch\ncp ../../tools/mdtrace/mdProbe.cpp ../../tools/mdtrace/mdTraceTool.cpp source/elektron/md/mdLibTest/\ngit submodule update --init --depth 1 source/dsp56300 source/mc68k source/cpp-terminal \\\n    source/3rdparty/freetype source/3rdparty/RmlUi\n(cd source/dsp56300 && git submodule update --init --depth 1 source/asmjit \\\n    && git apply ../../../../tools/mdtrace/dsp56300-md-mm.patch)\ncmake -S . -B build -G Ninja -DCMAKE_BUILD_TYPE=RelWithDebInfo \\\n    -Dgearmulator_BUILD_JUCEPLUGIN=OFF -Dgearmulator_BUILD_JUCEPLUGIN_CLAP=OFF -DBUILD_TESTING=ON\ncmake --build build --target mdProbe\ncd ../.." },
      { title: "Build the installer", body: "The script needs both files, although the README calls the flash image optional. It stops if the recompiled DSP does not match the interpreter bit for bit. The output is dist/Machinedrum-Module-<version>-mpc-armv7.zip.", code: "release/build_release.sh /path/to/Elektron_SPS1-1UW_OS1.63.syx /path/to/md-uw-flash.bin" },
      { title: "Install on the device", body: "Save your MPC project first: the installer stops and restarts MPC. Add -d <device-ip> to the build command to copy and install over SSH as root, or unzip the result on the device and run its install.sh as root." }
    ],
    caveat: "v0.1.0 is a pre-release, tested only on an Akai Force with MPC OS 3.9.1. The README expects other MPC OS devices to work but they are untested. The build output is armv7, and the sibling Monomodule port lists only first-generation 32-bit devices. Master effects are missing, so REV and DEL do nothing. One Force core plays about 4-5 voices. RAM, INP, and MID/CTR machines are not offered. The zip contains firmware-derived code and data: keep it for your own devices and do not share it.",
    source: "https://github.com/sd88me/mpc-vst-machinedrum", docs: "https://github.com/sd88me/mpc-vst-machinedrum/blob/main/README.md",
    links: [{ label: "Build state (HANDOFF)", url: "https://github.com/sd88me/mpc-vst-machinedrum/blob/main/HANDOFF.md" }, { label: "mdProbe build notes", url: "https://github.com/sd88me/mpc-vst-machinedrum/blob/main/tools/mdtrace/README.md" }, { label: "Device test record", url: "https://github.com/sd88me/mpc-vst-machinedrum/blob/main/tested.json" }, { label: "mpc-vst-monomodule", url: "https://github.com/sd88me/mpc-vst-monomodule" }, { label: "mpc-vst-plugins", url: "https://github.com/sd88me/mpc-vst-plugins" }],
    related: ["gearmulator", "monomodule", "mpc-monomodule", "ems-machinedrum"]
  },
  {
    id: "mpc-monomodule", name: "Monomodule for MPC OS", author: "sd88me", devices: ["monomachine"], kind: "Emulator", stage: "Build from source",
    summary: "A port of shnolk's Monomodule to Akai MPC OS standalone devices as VST2 instrument and effect plugins. It runs on the MPC or Force, not on a Monomachine.",
    why: "Play the Monomachine's synth and effect machines inside MPC's own plugin host on a Force or 32-bit MPC, without a computer.",
    features: ["Monomodule One: 15 synth machines as an instrument", "Monomodule FX: 7 effect machines as an insert effect", "Upstream knob layouts and LCD art drawn from your own OS file", "Presets from kit .syx dumps, with bank and preset steppers", "Factory kit bank extracted from your own OS file", "Static DSP recompiler, bit-exact against the x86 emulator on all 22 machines"],
    requirements: "A first-generation, 32-bit MPC OS standalone device (Force, MPC Live/Live II, One, X, or Key 61) with root SSH access. Your own Monomachine OS 1.32B .syx. A Linux or macOS computer with Docker, git, and Python 3.",
    steps: [
      { title: "Clone the repository", code: "git clone --recursive https://github.com/sd88me/mpc-vst-monomodule\ncd mpc-vst-monomodule" },
      { title: "Build the installer", body: "The script clones mpc-vst-plugins if needed, builds inside Docker, and stops if the recompiled DSP does not match the interpreter bit for bit. The output is dist/Monomodule-<version>-mpc-armv7.zip.", code: "release/release.sh /path/to/your-monomachine-os-1.32B.syx" },
      { title: "Install on the device", body: "Save your MPC project first: installing needs one MPC restart and backs up MPC.settings. Add -d <device-ip> to the build command to copy and install over SSH as root, or copy the unzipped folder yourself.", code: "scp -r dist/Monomodule-<version>-mpc-armv7 root@<device-ip>:/tmp/\nssh root@<device-ip> sh /tmp/Monomodule-<version>-mpc-armv7/install.sh" },
      { title: "Add presets (optional)", body: "Put Monomachine kit dumps in /sdcard/vst/monomodule/dumps/ or Force Documents/Monomachine Dumps/. To add the factory bank, extract it from your OS file and copy the result there.", code: "release/extract_factory.sh /path/to/your-monomachine-os-1.32B.syx factory.syx" }
    ],
    caveat: "tested.json records only v0.9.0, on an Akai Force with MPC OS 3.9.1; the other listed devices are untested. Installing plugins this way is unofficial: back up first. In MPC's Track Q-Link mode, a 0-127 knob can jump back near 0 (Screen mode is fine). One instance uses about 46-69% of a Force core. release/uninstall.sh removes both plugins. Built zips and extracted banks contain Elektron's firmware data: do not share them.",
    source: "https://github.com/sd88me/mpc-vst-monomodule", docs: "https://github.com/sd88me/mpc-vst-monomodule/blob/main/README.md",
    links: [{ label: "Device test record", url: "https://github.com/sd88me/mpc-vst-monomodule/blob/main/tested.json" }, { label: "Build state (HANDOFF)", url: "https://github.com/sd88me/mpc-vst-monomodule/blob/main/HANDOFF.md" }, { label: "mpc-vst-plugins", url: "https://github.com/sd88me/mpc-vst-plugins" }],
    related: ["monomodule", "mpc-machinedrum", "gearmulator"]
  },
  {
    id: "digikit", name: "digikit", author: "m-dwyer", devices: ["digitakt", "digitone"], kind: "Emulator", kinds: ["Emulator", "Tool", "Firmware"], stage: "Source research toolkit",
    summary: "Digitakt II and Digitone II control-processor screen emulator, SHARC analysis tools, and experimental machine patch work.",
    why: "Boot the II-series user interface from your own OS image or study its audio-processor firmware without treating screen emulation as audio emulation.",
    features: ["ColdFire OS boot and live screen", "Scripted key/encoder checks", "SHARC database and instruction tracer", "Experimental ColdFire machine registration patch"],
    requirements: "Your own Digitakt II OS 1.16 or Digitone II OS 1.11 .syx; Python 3.12 with uv; patched Unicorn installed by the repository script.",
    steps: [
      { title: "Clone and install", code: "git clone https://github.com/m-dwyer/digikit\ncd digikit\nuv sync\ntools/install-patched-unicorn.sh" },
      { title: "Boot a screen", body: "Put your own OS .syx in the repository root, or pass its full path. First run extracts sections and makes boot snapshots.", code: "uv run python -m emu.run Digitakt_II_OS1.16.syx\nuv run python -m emu.run Digitone_II_OS1.11.syx" },
      { title: "Start SHARC analysis", code: "uv run python -m emu.extract Digitakt_II_OS1.16.syx -o out/sections/dt2-1.16\nuv run python tools/sharcdb.py build out/sections/dt2-1.16/section_7_BLOB.bin\nuv run python tools/sharc.py dt2-1.16 \"SELECT kind, count(*) FROM roots GROUP BY kind\"" }
    ],
    caveat: "The emulator has no audio, does not run SHARC DSP code, has an empty +Drive, and does not accept live human key/encoder input. The machine patch path is experimental, ColdFire-only, and not hardware-tested.",
    source: "https://github.com/m-dwyer/digikit", docs: "https://github.com/m-dwyer/digikit/blob/main/README.md",
    links: [{ label: "Emulator and patched Unicorn", url: "https://github.com/m-dwyer/digikit/blob/main/docs/UNICORN.md" }, { label: "Tool index", url: "https://github.com/m-dwyer/digikit/blob/main/docs/TOOLS.md" }, { label: "DSP findings", url: "https://github.com/m-dwyer/digikit/blob/main/docs/findings/06-sharc-engine-and-startup.md" }], related: ["digiemu", "dnfw", "digitakt-ii-research"]
  },
  {
    id: "digitakt-ii-research", name: "Digitakt II firmware research", author: "lalzart", devices: ["digitakt"], kind: "Research", stage: "Documentation only",
    summary: "A bounded public architecture map of Digitakt II OS 1.15C, covering its ColdFire control side, SHARC audio side, and their known data paths.",
    why: "Use it to understand what is evidenced in the II-series architecture and where real hardware or package-rebuild evidence is still missing.",
    features: ["Update/boot and package-domain map", "ColdFire-to-SHARC recurring state exchange", "Project-sample resource lifecycle", "Explicit evidence vocabulary and modification gates"],
    requirements: "No firmware, extracted images, installable patch, or hardware procedure is included. It is Markdown documentation only; there is nothing to build or run.",
    steps: [
      { title: "Read the architecture boundary", body: "Start with the architecture overview, then use the research method to distinguish static, simulated, and physical claims." },
      { title: "Or read it offline", code: "git clone https://github.com/lalzart/digitakt-ii-firmware-research-public" }
    ],
    caveat: "This is a research publication for OS 1.15C. It reports authenticated board photographs but no electrical capture, device execution, or audible experiment. It publishes no accepted modified update, and recovery remains unproved.",
    source: "https://github.com/lalzart/digitakt-ii-firmware-research-public", docs: "https://github.com/lalzart/digitakt-ii-firmware-research-public/blob/main/docs/architecture-overview.md",
    links: [{ label: "Architecture overview", url: "https://github.com/lalzart/digitakt-ii-firmware-research-public/blob/main/docs/architecture-overview.md" }, { label: "Research method", url: "https://github.com/lalzart/digitakt-ii-firmware-research-public/blob/main/docs/research-method.md" }], related: ["digikit"]
  },
  {
    id: "digiemu", name: "digiemu", author: "irpina", devices: ["digitakt", "digitone"], kind: "Emulator", kinds: ["Emulator", "Tool"], stage: "Windows release available",
    summary: "Digitakt MKI and Digitone MKI emulator with clickable panels, persistent +Drive, live audio, and firmware comparison checks.",
    why: "Run the first-generation devices from your own OS images on Windows, or compare a modified image with stock before hardware testing.",
    features: ["Live 48 kHz Digitakt and Digitone audio", "Clickable keys, LEDs, and encoders", "Persistent projects and +Drive", "Custom firmware check with stock baseline (source only for now)"],
    requirements: "Windows 64-bit release, a writable folder outside OneDrive, and your own Digitakt OS 1.53 or Digitone/Keys OS 1.43 .syx.",
    steps: [
      { title: "Unzip and add your firmware", body: "Download digiemu-win64-<version>.zip from Releases and extract it to a writable folder outside OneDrive. Run digiemu.exe, click Add firmware, select Digitakt_OS1.53.syx or Digitone_and_Digitone_Keys_OS1.43.syx, wait for first boot, then click Play." },
      { title: "Use the panel", body: "Click keys, shift-click to latch a key, press Esc to release latched keys, and wheel or drag encoders. On Digitakt, save the on-device project before LOAD SAMPLES: adding WAVs to /incoming restarts the emulator." },
      { title: "Check a custom firmware image (source only)", body: "The check is on the main branch, not in the 0.2.0 release. From a source checkout (next step), it compares boot, screens, and audio with your stock image. A pass is an emulator result, not proof on hardware.", code: "uv run python -m emu.fwcheck CUSTOM.syx --baseline STOCK.syx --out check" },
      { title: "Or run from source", body: "For Linux/WSL shell, use Python 3.12, uv, and a C toolchain for patched Unicorn. On Windows use tools\\install-patched-unicorn.ps1 instead of the .sh script.", code: "git clone https://github.com/irpina/digiemu\ncd digiemu\nuv sync\ntools/install-patched-unicorn.sh\nuv run python -m emu.portable" }
    ],
    caveat: "The Digitakt factory sample library is absent, so /factory starts empty. The Digitone Keys' extra physical controls are not modeled. Other OS versions require an untested-version confirmation. Reset to factory deletes the +Drive; Rebuild preserves it.",
    source: "https://github.com/irpina/digiemu", docs: "https://github.com/irpina/digiemu/blob/main/README.md",
    links: [{ label: "Windows releases", url: "https://github.com/irpina/digiemu/releases" }, { label: "Firmware checker limits", url: "https://github.com/irpina/digiemu/blob/main/docs/FIRMWARE-CHECK.md" }, { label: "Current status", url: "https://github.com/irpina/digiemu/blob/main/docs/STATUS.md" }], related: ["digikit", "elekloader", "dnfw"]
  },
  {
    id: "overwitch", name: "Overwitch", author: "dagargo", devices: ["digitakt", "digitone", "analog-four", "analog-rytm", "analog-heat", "syntakt"], kind: "Tool", stage: "Build from source",
    summary: "Linux JACK/PipeWire audio clients for supported Overbridge 2 Elektron devices, with GUI, hotplug service, record, and play tools.",
    why: "Route multitrack Overbridge audio through JACK or PipeWire on Linux without changing device firmware.",
    features: ["GUI for multiple devices", "D-Bus/systemd hotplug service", "Single-device JACK client", "Multitrack recording and playback"],
    requirements: "Linux, JACK or PipeWire's JACK layer, libusb and the documented build dependencies; an Overbridge 2 device. A4 MKI, Analog Keys, and Rytm MKI are not supported yet.",
    steps: [
      { title: "Install build dependencies", body: "This command is for Debian or Ubuntu. Fedora and Void package lists are in the upstream README; Arch needs no extra dependencies.", code: "sudo apt install automake libtool libusb-1.0-0-dev libjack-jackd2-dev libsamplerate0-dev libsndfile1-dev autopoint gettext libsystemd-dev libjson-glib-dev libgtk-4-dev systemd-dev" },
      { title: "Build and install", body: "Run these from its source tree. For CLI-only builds use ./configure CLI_ONLY=yes.", code: "git clone https://github.com/dagargo/overwitch\ncd overwitch\nautoreconf --install\n./configure\nmake\nsudo make install\nsudo ldconfig" },
      { title: "Open the GUI or one device", body: "The GUI starts its D-Bus service. Use the CLI to list device IDs and select one for a single JACK client.", code: "overwitch\noverwitch-cli -l\noverwitch-cli -n 0" },
      { title: "Record or play", code: "overwitch-record -n 0\noverwitch-play -n 0 audio_file" }
    ],
    caveat: "Do not run the GUI (overwitch) and the standalone overwitch-service at the same time; upstream recommends only the CLI utilities when testing. Blocks below 10 can stress a device enough to require a reboot; start with the project's defaults.",
    source: "https://github.com/dagargo/overwitch", docs: "https://github.com/dagargo/overwitch/blob/master/README.md",
    links: [{ label: "Project documentation", url: "https://github.com/dagargo/overwitch/tree/master/docs" }], related: ["digiemu"]
  },
  {
    id: "rytm1-mods", name: "rytm1_mods", author: "gdeo607", devices: ["analog-rytm"], kind: "Firmware", stage: "Build from source",
    summary: "Analog Rytm MKI OS 1.73 patch set with sample low/high cut, per-note random parameter modifiers, Euclidean accents, and velocity humanization.",
    why: "Build one of two verified-source images for the MKI, or inspect the guarded porting and allocation work behind them.",
    features: ["SMP CUT page on a second FILTER press", "LFO RND page on a second LFO press", "Euclidean accent operators", "Per-track random velocity offset"],
    requirements: "Your own Analog Rytm MKI OS 1.73 at stock/Analog-Rytm_OS1.73.syx; Python 3.11+, git, make, C compiler, and m68k binutils. Keep a physical DIN-MIDI interface for recovery.",
    steps: [
      { title: "Clone and place your verified stock file", code: "git clone https://github.com/gdeo607/rytm1_mods\ncd rytm1_mods\ncp /path/to/Analog-Rytm_OS1.73.syx stock/Analog-Rytm_OS1.73.syx\nmake setup" },
      { title: "Prove the container first", body: "This creates a stock-code repack and verifies it before adding a mod.", code: "make control" },
      { title: "Build one mutually exclusive image", body: "SMP CUT and LFO RND share one stored sound-data word, so they cannot be combined.", code: "make verify   # SMP CUT: build/AR1_OS1.73_0000_0002_0003_0008.syx\nmake random   # LFO RND: build/AR1_OS1.73_0000_0002_0003_0004.syx" }
    ],
    caveat: "The repository labels the listed MKI changes built, not hardware-verified. Its USB update path may reject an elekloader-sized image; recovery is FUNC at boot, TRIG 4, then the stock 1.73 .syx through Transfer's legacy mode over DIN MIDI.",
    source: "https://github.com/gdeo607/rytm1_mods", docs: "https://github.com/gdeo607/rytm1_mods/blob/main/README.md",
    links: [{ label: "Controls", url: "https://github.com/gdeo607/rytm1_mods/blob/main/docs/MANUAL.md" }, { label: "Flashing and recovery", url: "https://github.com/gdeo607/rytm1_mods/blob/main/docs/FLASHING.md" }, { label: "Hazards", url: "https://github.com/gdeo607/rytm1_mods/blob/main/docs/HAZARDS.md" }], related: ["elekloader", "firmware-tool"]
  },
  {
    id: "ems-machinedrum", name: "Em’s Machinedrum firmware", author: "emuyia", devices: ["machinedrum"], kind: "Firmware", stage: "Patcher in progress",
    summary: "Machinedrum custom-firmware project for per-track timing, trig conditions, sequencer changes, and fixes.",
    why: "Follow the patcher transition for the Machinedrum project.",
    features: ["Per-track lengths and speeds (per the repository description)", "Trig conditions (per the repository description)"],
    requirements: "The repository currently provides only a notice (its CHANGELOG.md is empty), without a current complete .syx, patcher, source tree, or install procedure.",
    steps: [
      { title: "Read the current notice", body: "The author says complete .syx files were removed while a patcher-based route is being prepared." },
      { title: "Protect existing song data", body: "Back up projects and move SONG slots 13–32 before any future test; the author says those slots are removed and their remaining data is corrupted on boot." }
    ],
    caveat: "No runnable build or patcher is published at the checked source. The author warns that beta changes can be destructive and advises against using critical projects on beta firmware.",
    source: "https://github.com/emuyia/ems-machinedrum-firmware", docs: "https://github.com/emuyia/ems-machinedrum-firmware/blob/main/README.md",
    links: [], related: ["mcl", "gearmulator", "octamachine"]
  },
  {
    id: "octamachine", name: "octamachine", author: "repeat98", devices: ["octatrack", "machinedrum"], kind: "Research", stage: "Feasibility research",
    summary: "A research program to port Machinedrum firmware and DSP programs to Octatrack hardware, using Gearmulator and octemu as reference environments.",
    why: "Read or contribute when you need an evidence-led view of the Machinedrum-on-Octatrack port, rather than a claimed runnable port.",
    features: ["Machinedrum OS 1.63 and Octatrack 1.40C provenance work", "Reference MD and target OT emulator baselines", "Port-plan work packets and compatibility matrix", "Synthetic capture-comparison checks"],
    requirements: "Git, Make, and Python 3.10+ run the public documentation and synthetic checks. Firmware images, captures, and emulator prerequisites stay local and are not supplied.",
    steps: [
      { title: "Run the public checks", code: "git clone https://github.com/repeat98/octamachine.git\ncd octamachine\nmake check" },
      { title: "Read status before choosing work", body: "The project status and compatibility matrix identify the accepted emulator baselines, current gates, and unproved port requirements." }
    ],
    caveat: "No Machinedrum boot in octemu or on an Octatrack, ported DSP audio, flashable candidate, or physical hardware result has been demonstrated. The repository has no installation or flashing procedure.",
    source: "https://github.com/repeat98/octamachine", docs: "https://github.com/repeat98/octamachine/blob/main/docs/STATUS.md",
    links: [{ label: "Project status", url: "https://github.com/repeat98/octamachine/blob/main/docs/STATUS.md" }, { label: "Compatibility matrix", url: "https://github.com/repeat98/octamachine/blob/main/docs/COMPATIBILITY_MATRIX.md" }, { label: "Port plan", url: "https://github.com/repeat98/octamachine/blob/main/docs/PORT_PLAN.md" }], related: ["octabam", "octemu", "gearmulator", "ems-machinedrum"]
  },
  {
    id: "mcl", name: "MegaCommand Live (MCL)", author: "jmamma", devices: ["machinedrum", "monomachine", "analog-four"], kind: "Tool", stage: "Controller firmware release",
    summary: "Machinedrum-centered sequencer firmware for separate MegaCommand and TBD controllers; Analog Four is supported as a secondary MIDI device.",
    why: "Extend a Machinedrum-centered setup with grid sequencing, track loading, performance controls, sample management, and secondary-device MIDI tracks.",
    features: ["MegaCommand grid sequencer and project library", "Machinedrum Enhanced Mode integration", "Secondary Monomachine/Analog Four MIDI tracks", "Controller builds for AVR and RP2040/RP2350 hardware"],
    requirements: "A supported controller. For Machinedrum/Monomachine integration, MCL 5.02 release notes specify OS X.13/X.01A respectively; USB MCU firmware 1.04 is also specified for MegaCMD hardware (not MegaCommand DIY).",
    steps: [
      { title: "Back up and get the controller firmware", body: "Back up MCL projects before upgrading: 5.00+ converts the project format and older MCL versions cannot open the converted project. The current release provides MCL controller firmware and USB MCU update files." },
      { title: "Upload to MegaCommand or MegaCMD", body: "Hold Page while powering on the controller, choose OS UPGRADE, then run the command for your exact controller. PlatformIO fetches the current MCL release firmware.", code: "pip install platformio\ngit clone https://github.com/jmamma/MCL.git\ncd MCL\nplatformio run -t nobuild -t upload -e megacommand_latest\n# For MegaCMD instead: platformio run -t nobuild -t upload -e megacmd_latest" },
      { title: "Connect a Machinedrum", body: "Connect MD MIDI OUT to MCL MIDI IN1 and MCL MIDI OUT1 to MD MIDI IN. In MCL choose CONFIG > MIDI > DEVICES > GRID X > DEVICE MD, with MIDI1 as its port. See the manual before connecting further devices." }
    ],
    caveat: "The checked 5.02 release assets contain MCL controller firmware and a USB MCU update, but no Machinedrum X.13 image. X.13 is a separate required OS. MCL's README, manual, and release notes do not say where to obtain it.",
    source: "https://github.com/jmamma/MCL", docs: "https://jmamma.github.io/MCL/",
    links: [{ label: "Current MCL releases", url: "https://github.com/jmamma/MCL/releases" }, { label: "MCL 5.02 requirements", url: "https://github.com/jmamma/MCL/releases/tag/5.02" }, { label: "MCL changelog", url: "https://github.com/jmamma/MCL/blob/master/Changelog" }], related: ["gearmulator", "ems-monomachine", "ems-machinedrum"]
  },
  {
    id: "model-tg", name: "Model-TG", author: "TinyGregAudio", devices: ["model-cycles"], kind: "Firmware", stage: "Build from your stock OS",
    summary: "Adds a Sampler machine, resampling, beat-repeat, master effects, and other features to Model:Cycles OS 1.13.",
    why: "Explore a substantial Model:Cycles firmware extension with sample playback, sampling, and performance effects.",
    features: ["Seventh machine with seven sample playback modes", "Track, master, and USB audio resampling", "Retrig page with beat-repeat and 12 master effects", "Additional controls on stock machines", "Scale Lock and sample transfer"],
    requirements: "Model:Cycles OS 1.13 and your own stock OS file; Python 3 and the tools listed in docs/BUILD.md. The project builds locally and does not distribute firmware images.",
    steps: [
      { title: "Clone the project", code: "git clone https://github.com/TinyGregAudio/Model-TG\ncd Model-TG" },
      { title: "Build from your own OS 1.13 file", code: "python3 build.py --stock /path/to/model-cycles_OS1.13.syx" },
      { title: "Read the user guide and recovery notes", body: "Follow the button-by-button guide and the project's instructions for installing the locally built OS and returning to stock." }
    ],
    caveat: "Unofficial firmware can affect the device. Back up first and follow the project's build and recovery documentation; no prebuilt firmware is provided. The README identifies OS 1.13 as its target.",
    source: "https://github.com/TinyGregAudio/Model-TG", docs: "https://github.com/TinyGregAudio/Model-TG/blob/main/README.md",
    links: [{ label: "Build instructions", url: "https://github.com/TinyGregAudio/Model-TG/blob/main/docs/BUILD.md" }, { label: "User guide", url: "https://github.com/TinyGregAudio/Model-TG/blob/main/docs/USER_GUIDE.md" }, { label: "Firmware tweaks used by Model-TG", url: "https://github.com/drumkilla/elektron-model-tweaks" }], related: ["model-tweaks"]
  },
  {
    id: "model-tweaks", name: "Elektron Model Tweaks", author: "drumkilla", devices: ["model-cycles", "model-samples"], kind: "Firmware", kinds: ["Firmware", "Tool"], stage: "Build from your stock OS",
    summary: "A Python patcher for three selectable Model:Cycles and Model:Samples firmware tweaks: latching mute, trig preview, and browser name scrolling.",
    why: "Apply one or more small interface and workflow tweaks to a locally supplied Model:Cycles or Model:Samples OS.",
    features: ["Latching track mute", "Trig preview while the sequencer is stopped", "Scrolling long names in sound, sample, and folder browsers", "Checks original firmware identity and rebuilt checksums"],
    requirements: "Python 3 and your own supported OS 1.13 .syx file for Model:Cycles or Model:Samples. The repository provides shell and batch launchers.",
    steps: [
      { title: "Get the repository and your own OS file", code: "git clone https://github.com/drumkilla/elektron-model-tweaks\ncd elektron-model-tweaks" },
      { title: "Choose and build tweaks", body: "Put the stock .syx in the project folder, then run the platform launcher and choose tweaks. Or use the command line:", code: "./apply.sh\n# Windows: apply.bat\npython3 tweak.py -i model-cycles_OS1.13.syx -t trig-preview,browser-scroll" },
      { title: "Verify and install", body: "The output is written next to the input. Review the recovery notes and back up projects before transferring it to the device." }
    ],
    caveat: "The README reports testing on real Model:Cycles and Model:Samples hardware, but warns that modified firmware may void the warranty or brick a device. It documents STARTUP MENU recovery and requires backups; only supported OS 1.13 inputs are accepted.",
    source: "https://github.com/drumkilla/elektron-model-tweaks", docs: "https://github.com/drumkilla/elektron-model-tweaks/blob/main/README.md",
    links: [], related: ["model-tg"]
  }
];
