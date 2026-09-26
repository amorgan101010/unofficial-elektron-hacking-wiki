// Curated from the upstream project documentation on 2026-09-26.
// Keep claims about hardware testing and compatibility scoped to what authors report.
export const devices = [
  { id: "octatrack", name: "Octatrack", shorthand: "OT", detail: "MKI / MKII · OS 1.40C" },
  { id: "digitakt", name: "Digitakt", shorthand: "DT", detail: "MKI / II · check each project's OS version" },
  { id: "digitone", name: "Digitone", shorthand: "DN", detail: "DN1 / Keys / II · check each project's OS version" },
  { id: "machinedrum", name: "Machinedrum", shorthand: "MD", detail: "Emulation and companion tools" },
  { id: "monomachine", name: "Monomachine", shorthand: "MM", detail: "Emulation, mods, and companion tools" },
  { id: "analog-four", name: "Analog Four", shorthand: "A4", detail: "MCL secondary MIDI; Overbridge 2 on MKII" },
  { id: "analog-rytm", name: "Analog Rytm", shorthand: "AR", detail: "Overbridge 2 on MKII" },
  { id: "analog-heat", name: "Analog Heat", shorthand: "AH", detail: "Overbridge 2, MKII, and +FX" },
  { id: "syntakt", name: "Syntakt", shorthand: "ST", detail: "Overbridge 2" }
];

export const projects = [
  {
    id: "octabam", name: "octabam", author: "sambanks", devices: ["octatrack"], kind: "Firmware", kinds: ["Firmware", "Emulator"], stage: "Build from source",
    summary: "A modular Octatrack firmware remixer, with new DSP effects, community ports, an emulator, and a virtual panel.",
    why: "Start here when you want to combine Octatrack mods, audition new effects, or test a custom OS before flashing.",
    features: ["Compose modules into named remixes", "BusVerb, BusDelay, send bus, and insert effects", "Ports for MIDI scenes, Octakit, USB audio/MIDI, and other work", "ColdFire/DSP emulation and a browser panel", "Stress project generator and test harness"],
    requirements: "Your own Octatrack OS 1.40C; macOS and Homebrew for the documented build path; git submodules. The current WSL note flags a missing m68k-elf-gcc toolchain and unverified build commands.",
    steps: [
      { title: "Clone with community modules", code: "git clone --recurse-submodules https://github.com/sambanks/octabam\ncd octabam" },
      { title: "Prepare tools and your own OS", code: "make setup\nmake os && make recon" },
      { title: "Inspect and test a remix", code: "make modules\nmake check REMIX=ok-ms\nmake panel REMIX=ok-ms" },
      { title: "Build an image if the checks pass", code: "make image REMIX=ok-ms BUILD=1" }
    ],
    caveat: "Module compatibility is checked by the remixer. The emulator does not cover every hardware behavior; read each remix's hardware status before flashing.",
    source: "https://github.com/sambanks/octabam", docs: "https://github.com/sambanks/octabam/blob/main/docs/remixes/BUILDING.md",
    links: [{ label: "Remix status", url: "https://github.com/sambanks/octabam/blob/main/docs/remixes/README.md" }, { label: "Stress project", url: "https://github.com/sambanks/octabam/blob/main/tools/harness/STRESS_PROJECT.md" }],
    related: ["octakit", "midisc", "octatrick", "octa-panel", "octemu"]
  },
  {
    id: "octamax", name: "OCTAMAX", author: "mxldyn", devices: ["octatrack"], kind: "Firmware", stage: "Build from source",
    summary: "Octatrack reverse engineering workspace with optional behavior patches and 256 STATIC sample slots.",
    why: "Use it to study the OS layout or build its guarded 1.40C patch from your own firmware file.",
    features: ["256 STATIC slots", "Slice playhead view", "Lazy Part transitions", "More MIDI arp scales and persistent PERSONALIZE toggles"],
    requirements: "Your own official Octatrack OS 1.40C; Python 3.8+; its setup script builds a local firmware tool.",
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
    id: "octalab", name: "octalab", author: "nordseele", devices: ["octatrack"], kind: "Research", stage: "Notes only",
    summary: "Octatrack firmware experiments around groove import, capture, generators, and workflow shortcuts.",
    why: "Read it for implemented behavior, interface ideas, and findings about the stock firmware.",
    features: ["Bank groove pool experiments", "Groove conversion from Ableton .agr files", "Capture and generator pages", "Octatrack firmware notes"],
    requirements: "No public build or source code is currently provided.",
    steps: [{ title: "Read the research", body: "Start with the README and its linked docs. Treat the described controls as experimental until a public build is available." }],
    caveat: "The author explicitly publishes no firmware, build, flashing procedure, or source code here. The old octalab-notes URL redirects to octalab.",
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
    summary: "Three octabam modules: FM synth machine, scale quantizer with glide, and direct pattern jump.",
    why: "Use the dedicated remix when these three musical features are the main goal.",
    features: ["Two-operator FM synth on FLEX tracks", "24-scale quantizer and legato glide", "Direct pattern jump", "Optional USB MIDI and 20-channel USB audio remix"],
    requirements: "Your own Octatrack OS 1.40C, octabam toolchain, and initialized git submodules.",
    steps: [
      { title: "Clone with the actual module sources", code: "git clone --recurse-submodules https://github.com/timhastie/octatrick\ncd octatrick" },
      { title: "Build a remix", code: "make setup\nmake os && make recon\nmake image REMIX=octatrick-usb BUILD=1 VERSION=OCTATRICK1" }
    ],
    caveat: "The author reports the octatrick-usb remix running on an MKI. The synth conflicts with tempo-bus in the documented placement; let the build ledger enforce combinations.",
    source: "https://github.com/timhastie/octatrick", docs: "https://github.com/timhastie/octatrick/blob/main/README.md", links: [], related: ["octabam", "octa-panel"]
  },
  {
    id: "octa-panel", name: "octa-panel", author: "timhastie", devices: ["octatrack"], kind: "Emulator", kinds: ["Emulator", "Firmware"], stage: "Build from source",
    summary: "An octabam fork focused on a real-time Octatrack emulator with sound and a browser or macOS virtual front panel.",
    why: "Explore firmware behavior with a visible panel, keys, LEDs, encoders, crossfader, and audio outputs.",
    features: ["Browser/macOS front panel", "ColdFire plus both DSP cores", "Real-time audio", "Companion emulator for Octatrick modules"],
    requirements: "Your own Octatrack OS 1.40C; the fork's toolchain and panel setup instructions.",
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
    summary: "A fork of OCTAMAX with opt-in Octatrack behavior changes, quality-of-life additions, and bug fixes.",
    why: "Study or build targeted changes such as mute modes, side-chain compression, live-record controls, and fixes.",
    features: ["Selectable MUTE MODE behaviors", "Side-chain compressor and reload-from-project", "MIDI Plays-Free, pattern LED, and Part carryover fixes", "Guarded per-feature build scripts"],
    requirements: "Your own Octatrack OS 1.40C; source build tools described in BUILD_KYOTI.md.",
    steps: [
      { title: "Clone and prepare the source tree", code: "git clone https://github.com/Zac-Kyoti/octatrack-kyoti-fw\ncd octatrack-kyoti-fw\n./fetch-os.sh && ./analyze.sh && ./setup.sh" },
      { title: "Choose a documented build", body: "The single-feature MUTE MODE image is reported hardware-confirmed; bugbuild composites are built separately and have not been flashed as a combination.", code: "python3 tools/build_mutemode_dt.py\n# For the unflashed composites instead: python3 tools/build_bugbuilds.py" }
    ],
    caveat: "The README tracks hardware status per feature. Its all-in-one image is staged and deliberately not buildable; direct jump remains in development.",
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
    id: "elekloader", name: "elekloader", author: "irpina", devices: ["digitakt"], kind: "Tool", stage: "Source + core release",
    summary: "A Digitakt MKI mod loader that combines .elemod packages with your own stock OS 1.53.",
    why: "Use it to install compatible Digitakt mods together and have conflicts checked before building an OS file.",
    features: ["Tk GUI and Python CLI", "Checks stock hash and mod conflicts", "Core hook bus for linkable mods", "Re-verifies generated OS"],
    requirements: "Digitakt MKI OS 1.53 .syx from Elektron; Python 3.9+ for the documented source path and the core .elemod from Releases.",
    steps: [
      { title: "Run the GUI from source", body: "Download core-2.0a.elemod from Releases and your own Digitakt_OS1.53.syx, then open the app:", code: "git clone https://github.com/irpina/elekloader\ncd elekloader\npython -m elekloader" },
      { title: "Select mods and check the build", body: "Choose the stock OS, install .elemod files, tick your mods, and click BUILD FIRMWARE. For a digislicer example, put the stock .syx and both .elemod files in this directory and verify before building:", code: "python -m elekloader.patch --stock Digitakt_OS1.53.syx --mod core-2.0a.elemod --mod digislicer-1.0.elemod --check\npython -m elekloader.patch --stock Digitakt_OS1.53.syx --mod core-2.0a.elemod --mod digislicer-1.0.elemod --out Digitakt_OS1.53-slicer.syx --version SL10" },
      { title: "Send the new OS through Transfer", body: "Connect the MKI by USB, select and connect it in Elektron Transfer, drag the generated .syx to Drop files here, then press YES on the unit. If it fails to boot, power on while holding FUNC, press TRIG 4 for OS UPGRADE, and send the stock .syx with Transfer's legacy OS mode." }
    ],
    caveat: "Current support is Digitakt MKI OS 1.53. The README describes a bundled Windows executable, but the current latest release exposes only the core .elemod; use the source path unless a Windows zip is attached later.",
    source: "https://github.com/irpina/elekloader", docs: "https://github.com/irpina/elekloader/blob/main/README.md",
    links: [{ label: "Releases", url: "https://github.com/irpina/elekloader/releases/latest" }], related: ["digislicer", "digihealth"]
  },
  {
    id: "digislicer", name: "digislicer", author: "irpina", devices: ["digitakt"], kind: "Firmware", stage: "Release available",
    summary: "An on-device slice editor for Digitakt MKI's SLICE machine, packaged as an elekloader mod.",
    why: "Create, audition, move, and persist up to 64 slices per sample without saving a separate sliced copy first.",
    features: ["Waveform slice editor", "Transient auto-slicing and grid creation", "Slice data stored per sample", "Keyboard and trig slice playback"],
    requirements: "Digitakt MKI stock OS 1.53, elekloader (currently use its source path), and the digislicer .elemod release.",
    steps: [
      { title: "Build via elekloader", body: "Download digislicer-1.0.elemod and core-2.0a.elemod from this project's release page. In elekloader choose your Digitakt_OS1.53.syx, install both .elemod files, tick digislicer, confirm No conflicts / Ready to build, then click BUILD FIRMWARE. Send the generated .syx to the Digitakt MKI with Elektron Transfer." },
      { title: "Open the editor on the device", body: "On a SLICE track's SRC page, hold YES for about a second." }
    ],
    caveat: "The author reports hardware tests on a Digitakt MKI. The mod targets OS 1.53 specifically; use elekloader's compatibility check.",
    source: "https://github.com/irpina/digislicer", docs: "https://github.com/irpina/digislicer/blob/main/README.md",
    links: [{ label: "Mod release", url: "https://github.com/irpina/digislicer/releases/latest" }], related: ["elekloader", "digihealth"]
  },
  {
    id: "digihealth", name: "digihealth", author: "irpina", devices: ["digitakt"], kind: "Firmware", stage: "Release available",
    summary: "Digitakt MKI performance and diagnostics mod with FAST AUDIO and SYSTEM INFO.",
    why: "Inspect load and memory use, and enable the author's measured audio-render optimization.",
    features: ["FAST AUDIO setting", "CPU/DSP/RAM and sample-memory display", "Read-only USB diagnostics commands", "Designed to combine with digislicer via elekloader"],
    requirements: "Digitakt MKI stock OS 1.53, elekloader (currently use its source path), and the digihealth .elemod release.",
    steps: [
      { title: "Build via elekloader", body: "Download digihealth-1.0.elemod and core-2.0a.elemod from this project's release page. In elekloader choose your Digitakt_OS1.53.syx, install both .elemod files, tick digihealth, confirm No conflicts / Ready to build, then click BUILD FIRMWARE. Send the generated .syx to the Digitakt MKI with Elektron Transfer." },
      { title: "Read diagnostics", body: "Clone digihealth for its USB helper. On Windows, close Elektron Transfer before running the helper so it can open the MIDI port.", code: "git clone https://github.com/irpina/digihealth\ncd digihealth\npython tools/digiusb.py cfw\npython tools/digiusb.py stats 10" }
    ],
    caveat: "The README's load improvement is a measurement on the author's unit, not a guarantee for every project. Close Elektron Transfer before the Windows USB diagnostic tool.",
    source: "https://github.com/irpina/digihealth", docs: "https://github.com/irpina/digihealth/blob/main/README.md",
    links: [{ label: "Mod release", url: "https://github.com/irpina/digihealth/releases/latest" }], related: ["elekloader", "digislicer"]
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
    caveat: "The README reports individual mods confirmed on hardware, while no combined pair has yet been flashed. Use the generated compatibility matrix before combining mods.",
    source: "https://github.com/angellinares/dn2_firmware_explore", docs: "https://github.com/angellinares/dn2_firmware_explore/blob/main/README.md",
    links: [{ label: "Browser patcher", url: "https://angellinares.github.io/dn2_firmware_explore/" }, { label: "Compatibility matrix", url: "https://github.com/angellinares/dn2_firmware_explore/blob/main/docs/mods-compatibility.md" }], related: ["firmware-tool"]
  },
  {
    id: "monomodule", name: "Monomodule", author: "shnolk", devices: ["monomachine"], kind: "Emulator", stage: "Release available",
    summary: "Monomachine DSP emulation as DAW instruments and effects, plus a SysEx library app.",
    why: "Use it for a single Monomachine track, all six tracks, the FX machines, or browsing your own SysEx dumps in a DAW workflow.",
    features: ["One and Six instruments", "FX plugin for Monomachine effects", "AU/VST3 and standalone builds", "Library for presets, kits, patterns, and audio previews"],
    requirements: "Elektron_SFX6-60_OS1.32B.syx from Elektron's OS 1.32B ZIP; release builds for macOS 12+, Windows 10+ x64, and Linux x64.",
    steps: [
      { title: "Install the matching release", body: "On macOS run the installer for AU/VST3 and the Library app. On Windows run the x64 installer, or copy the ZIP's .vst3 folders into C:\\Program Files\\Common Files\\VST3\\. On Linux copy the .vst3 folders into ~/.vst3/." },
      { title: "Point it at the exact OS file", body: "Download Elektron_SFX6-60_OS1.32B.zip from Elektron and unzip it. Open a plugin or the Library app, choose Select OS File…, then select Elektron_SFX6-60_OS1.32B.syx." },
      { title: "Choose a format", body: "Use One for a track, Six for six tracks with separate outputs, or FX for audio processing." }
    ],
    caveat: "The author documents substitute Digibank waveforms and incomplete delay tempo behavior. MIDI transfer to hardware is not implemented; use .syx files for dumps.",
    source: "https://github.com/shnolk/monomodule", docs: "https://github.com/shnolk/monomodule/blob/main/README.md",
    links: [{ label: "Releases", url: "https://github.com/shnolk/monomodule/releases" }, { label: "Elektron OS 1.32B ZIP", url: "https://www.elektron.se/wp-content/uploads/2024/09/Elektron_SFX6-60_OS1.32B.zip" }], related: ["gearmulator", "firmware-tool"]
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
    links: [{ label: "Releases", url: "https://github.com/joelanders/gearmulator-md-mm/releases" }], related: ["firmware-tool", "mcl"]
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
    links: [{ label: "Emulator and patched Unicorn", url: "https://github.com/m-dwyer/digikit/blob/main/docs/UNICORN.md" }, { label: "Tool index", url: "https://github.com/m-dwyer/digikit/blob/main/docs/TOOLS.md" }, { label: "DSP findings", url: "https://github.com/m-dwyer/digikit/blob/main/docs/findings/06-sharc-engine-and-startup.md" }], related: ["digiemu", "dnfw"]
  },
  {
    id: "digiemu", name: "digiemu", author: "irpina", devices: ["digitakt", "digitone"], kind: "Emulator", kinds: ["Emulator", "Tool"], stage: "Windows release available",
    summary: "Digitakt MKI and Digitone MKI emulator with clickable panels, persistent +Drive, live audio, and firmware comparison checks.",
    why: "Run the first-generation devices from your own OS images on Windows, or compare a modified image with stock before hardware testing.",
    features: ["Live 48 kHz Digitakt and Digitone audio", "Clickable keys, LEDs, and encoders", "Persistent projects and +Drive", "Custom firmware check with stock baseline"],
    requirements: "Windows 64-bit release, a writable folder outside OneDrive, and your own Digitakt OS 1.53 or Digitone/Keys OS 1.43 .syx.",
    steps: [
      { title: "Unzip and add your firmware", body: "Download digiemu-win64-<version>.zip from Releases and extract it to a writable folder outside OneDrive. Run digiemu.exe, click Add firmware, select Digitakt_OS1.53.syx or Digitone_and_Digitone_Keys_OS1.43.syx, wait for first boot, then click Play." },
      { title: "Use the panel", body: "Click keys, shift-click to latch a key, press Esc to release latched keys, and wheel or drag encoders. On Digitakt, save the on-device project before LOAD SAMPLES: adding WAVs to /incoming restarts the emulator." },
      { title: "Check a custom firmware image", body: "In PowerShell, run this from the extracted release folder. It compares boot, screens, and audio with your stock image. A pass is an emulator result, not proof on hardware.", code: ".\\digiemu-console.exe --check CUSTOM.syx --baseline STOCK.syx" },
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
    requirements: "Linux, JACK or PipeWire's JACK layer, libusb and the documented build dependencies; an Overbridge 2 device. A4 MKI, Analog Keys, and Rytm MKI are not supported.",
    steps: [
      { title: "Install build dependencies", body: "This command is for Debian or Ubuntu. Fedora, Arch, and Void package lists are in the upstream README.", code: "sudo apt install automake libtool libusb-1.0-0-dev libjack-jackd2-dev libsamplerate0-dev libsndfile1-dev autopoint gettext libsystemd-dev libjson-glib-dev libgtk-4-dev systemd-dev" },
      { title: "Build and install", body: "Run these from its source tree. For CLI-only builds use ./configure CLI_ONLY=yes.", code: "git clone https://github.com/dagargo/overwitch\ncd overwitch\nautoreconf --install\n./configure\nmake\nsudo make install\nsudo ldconfig" },
      { title: "Open the GUI or one device", body: "The GUI starts its D-Bus service. Use the CLI to list device IDs and select one for a single JACK client.", code: "overwitch\noverwitch-cli -l\noverwitch-cli -n 0" },
      { title: "Record or play", code: "overwitch-record -n 0\noverwitch-play -n 0 audio_file" }
    ],
    caveat: "The GUI/service and CLI modes should not run against the same device simultaneously. Blocks below 10 can stress a device enough to require a reboot; start with the project's defaults.",
    source: "https://github.com/dagargo/overwitch", docs: "https://github.com/dagargo/overwitch/blob/master/README.md",
    links: [{ label: "Project documentation", url: "https://github.com/dagargo/overwitch/tree/master/docs" }], related: ["digiemu"]
  },
  {
    id: "mcl", name: "MegaCommand Live (MCL)", author: "jmamma", devices: ["machinedrum", "monomachine", "analog-four"], kind: "Tool", stage: "Controller firmware release",
    summary: "Machinedrum-centered sequencer firmware for separate MegaCommand and TBD controllers; Analog Four is supported as a secondary MIDI device.",
    why: "Extend a Machinedrum-centered setup with grid sequencing, track loading, performance controls, sample management, and secondary-device MIDI tracks.",
    features: ["MegaCommand grid sequencer and project library", "Machinedrum Enhanced Mode integration", "Secondary Monomachine/Analog Four MIDI tracks", "Controller builds for AVR and RP2040/RP2350 hardware"],
    requirements: "A supported controller. For Machinedrum/Monomachine integration, MCL 5.02 release notes specify OS X.13/X.01A respectively; MegaCommand USB MCU firmware 1.04 is also specified.",
    steps: [
      { title: "Back up and get the controller firmware", body: "Back up MCL projects before upgrading: 5.00+ converts the project format and older MCL versions cannot open the converted project. The current release provides MCL controller firmware and USB MCU update files." },
      { title: "Upload to MegaCommand or MegaCMD", body: "Hold Page while powering on the controller, choose OS UPGRADE, then run the command for your exact controller. PlatformIO fetches the current MCL release firmware.", code: "pip install platformio\ngit clone https://github.com/jmamma/MCL.git\ncd MCL\nplatformio run -t nobuild -t upload -e megacommand_latest\n# For MegaCMD instead: platformio run -t nobuild -t upload -e megacmd_latest" },
      { title: "Connect a Machinedrum", body: "Connect MD MIDI OUT to MCL MIDI IN1 and MCL MIDI OUT1 to MD MIDI IN. In MCL choose CONFIG > MIDI > DEVICES > GRID X > DEVICE MD, with MIDI1 as its port. See the manual before connecting further devices." }
    ],
    caveat: "The checked 5.02 release assets contain MCL controller firmware and a USB MCU update, but no Machinedrum X.13 image. X.13 is a separate required OS. Its future distribution path is not documented in MCL's current README or release notes; check the project's current links for updates.",
    source: "https://github.com/jmamma/MCL", docs: "https://jmamma.github.io/MCL/",
    links: [{ label: "Current MCL releases", url: "https://github.com/jmamma/MCL/releases" }, { label: "MCL 5.02 requirements", url: "https://github.com/jmamma/MCL/releases/tag/5.02" }, { label: "MCL changelog", url: "https://github.com/jmamma/MCL/blob/master/Changelog" }], related: ["gearmulator", "ems-monomachine"]
  }
];
