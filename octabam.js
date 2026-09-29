// Octabam guide researched from the linked upstream docs on 2026-09-26.
// Keep remix and hardware claims tied to their individual upstream pages.
const upstream = "https://github.com/sambanks/octabam/blob/main/";
const source = (label, path) => ({ label, url: upstream + path });

export const octabamPages = [
  {
    id: "overview", title: "Octabam", kicker: "Project map", summary: "A modular Octatrack firmware workbench with a full-machine emulator, virtual front panel, DSP effect lab, community ports, and guarded build tools.",
    sections: [
      { title: "The pieces fit together", paragraphs: ["Octabam starts with your own Octatrack OS 1.40C. Its remixer assembles named combinations of modules, builds a patched image, and checks it in an emulator. A separate DSP harness renders effects against audio files. The browser panel lets you operate an emulated Octatrack with its LCD, controls, audio, and a virtual CF card.", "A module may alter ColdFire behavior, add DSP code, provide a bus service, or combine these. A remix chooses modules and their configuration. Compatibility and memory placement are checked during the build; the presence of a module in the repository does not mean every combination or every feature has passed hardware testing."],
        table: { headers: ["Part", "Use it for", "Start here"], rows: [
          ["Build and flash", "Create a locally patched OS from stock 1.40C", "Build & flash"],
          ["Remixer", "Pick modules, inspect budgets, save and audition remixes", "Interactive remixer"],
          ["Emulator and panel", "Boot a remix with a project, controls, and sound", "Emulator & panel"],
          ["USB", "Add MIDI or multichannel audio over the Octatrack's USB port", "USB MIDI & audio"],
          ["DSP lab", "Render and compare effects without a device", "Effects & bus"],
          ["Tests", "Run build gates, DSP checks, and generated load projects", "Testing" ]
        ] } },
      { title: "Choose a first run", steps: [
        { title: "For software exploration", body: "Clone with submodules, run setup, prepare your own stock OS, then launch the virtual panel with a project folder (the panel stops without one). The panel guide covers the project card and audio behavior.", code: "git clone --recurse-submodules https://github.com/sambanks/octabam\ncd octabam\nmake setup\nmake os && make recon\nmake emu-setup && make emu-cf\nmake panel REMIX=ok-ms OT_PROJECT=/path/to/project" },
        { title: "For a hardware build", body: "Read the build and recovery page first. Start with a remix whose status table reports testing on hardware, then run its checks before making an image.", code: "make modules\nmake check REMIX=ok-ms\nmake image REMIX=ok-ms BUILD=1" }
      ] },
      { title: "How to read status", paragraphs: ["The remix list mixes hardware-confirmed combinations, ports that build, and experiments. The remix page identifies these separately and links to the dated upstream status list. The emulator is useful for iteration, but a successful boot is not proof of long-run timing, recorder, or cross-core behavior on an Octatrack."] }
    ],
    sources: [source("Repository overview", "README.md"), source("Remix status", "docs/remixes/README.md"), source("Emulator architecture", "docs/remixer/EMU.md")]
  },
  {
    id: "build", title: "Build & flash", kicker: "First hardware path", summary: "Prepare stock OS 1.40C, build a named remix, check it, and load the generated image from a CF card.",
    sections: [
      { title: "Prerequisites", paragraphs: ["You need an Octatrack MKI or MKII on OS 1.40C, Python 3.10 or newer, git, CMake, a compatible build host, and a CF card. Keep a 5-pin DIN MIDI interface and SysEx sending app available for recovery. The upstream guide documents macOS with Homebrew as its working path. Its WSL guide currently says the required m68k-elf-gcc toolchain is missing from the earlier WSL setup and that make setup and make check are unverified there. Treat WSL as an incomplete route until that note changes.", "Back up the Octatrack project and card before loading a modified OS. If you plan to use Octakit or Kits Reload, read its migration notes before opening an existing project."] },
      { title: "From clone to image", steps: [
        { title: "Get the repository and tools", body: "The recursive clone fetches community module submodules. On macOS, make setup provisions the pinned toolchain and required Homebrew packages.", code: "git clone --recurse-submodules https://github.com/sambanks/octabam\ncd octabam\nmake setup" },
        { title: "Get and reconstruct the stock OS", body: "make os fetches the official 1.40C package into downloads/OCTATRACK_OS1.40C_dist.zip and prints its SHA256 (expected 370c55a3dad3996b8e4b46400a205066fdaf185ad4d0255a3a3f835060573ff0). It extracts downloads/extracted/OCTATRACK_OS1.40C.syx for recovery. make recon derives out/raw/section_3_MAIN_OS.bin. The project does not distribute a patched image.", code: "make os\nmake recon" },
        { title: "Check a named remix", body: "List modules and inspect the selected remix's hardware status. emu-setup enables the Unicorn-based checks; emu-cf builds the full-machine port. Without those, some check gates are skipped.", code: "make modules\nmake emu-setup\nmake emu-cf\nmake check REMIX=ok-ms" },
        { title: "Build and load", body: "The first example build writes out/OCTATRACK_OCTABAM1.bin and out/OCTATRACK_OS1.40C_OCTABAM1.syx. Increase BUILD for each image you flash so the device sees a new version. VERSION can override the short version text.", code: "make image REMIX=ok-ms BUILD=1" }
      ] },
      { title: "CF-card upgrade and recovery", paragraphs: ["On the device, open PROJECT → SYSTEM → USB DISK MODE → YES. Copy out/OCTATRACK_OCTABAM1.bin to the CF card root, safely eject the card from the computer, leave USB disk mode, then choose PROJECT → SYSTEM → OS UPGRADE → YES. After the upgrade, power cycle once more and verify SYSTEM STATUS → OS VERSION.", "Keep the stock downloads/extracted/OCTATRACK_OS1.40C.syx ready for recovery. The documented fallback is FUNC + power → Startup Menu → TRIG 3 MIDI UPGRADE, then send that stock SysEx over 5-pin DIN MIDI. Read the upstream flashing guide for the transfer procedure before you need it."], callout: "A build or emulator check cannot establish that a particular remix is safe for your projects. Confirm its own hardware status and migration notes first." }
    ],
    sources: [source("Build guide", "docs/remixes/BUILDING.md"), source("Flashing and recovery", "docs/remixer/FLASHING.md"), source("WSL status", "docs/WSL.md"), source("Remix status", "docs/remixes/README.md")]
  },
  {
    id: "remixer", title: "Interactive remixer", kicker: "Compose a remix", summary: "Use the terminal interface to choose modules, inspect fit, save a configuration, and run checks or DSP auditioning.",
    sections: [
      { title: "Launch and orient", paragraphs: ["After the initial OS reconstruction, make emu-setup creates the Python environment used by the interactive tools. The remixer has Available, Choosers, and Unit panes. Available holds modules and saved remixes, Choosers shows tunable settings, and Unit shows where the current selection lands and what it costs."], code: "make emu-setup\nmake bus\nmake remix" },
      { title: "Common controls", table: { headers: ["Key", "Action"], rows: [["Enter", "Add or remove a module"], ["1", "Give the highlighted effect an FX1 row, or remove it"], ["l / s / k", "Load, save, or reset a remix"], ["c", "Run the current remix through checks"], ["r", "Render and audition audio"], ["a / b", "Mark A/B selections for comparison"], ["d", "Choose a sample folder"], ["?", "Open built-in help"]] }, paragraphs: ["The interface reports collisions and budget use. Saving a selection does not flash hardware. Run the checks and build an image separately when the combination is ready."] },
      { title: "Modules, choosers, and placement", paragraphs: ["A module declares its DSP and ColdFire payloads, settings, hooks, and resource claims in a manifest. The remixer places these into limited firmware space and can reject overlaps. Some combinations require explicit bridge modules; Octakit plus MIDI SCENES uses a Kits Reload bridge in the ok-ms remix.", "The main ROM cave is small; larger payloads can use the project's DRAM placement route, which reserves part of the sample pool. Use make modules for the current compatibility index and read the placement notes before planning a large combination."], code: "make modules\nmake check REMIX=ok-ms" }
    ],
    sources: [source("Remixer controls", "docs/remixer/REMIXER.md"), source("Module anatomy", "docs/remixer/MODULES.md"), source("Placement and budgets", "docs/remixer/PLACEMENT.md")]
  },
  {
    id: "remixes", title: "Remix catalog", kicker: "Known combinations", summary: "A map of named builds, their intended features, and what the upstream status list actually confirms.",
    sections: [
      { title: "Pick by evidence", paragraphs: ["A remix is a build recipe, not a separate downloadable firmware file. Build it from your own stock OS with make image REMIX=<name> BUILD=<number>. The upstream status list is dated and changes as features move from a port to hardware testing; check it again before flashing."],
        table: { headers: ["Remix or family", "What it combines", "Upstream status on 26 Sep 2026"], rows: [
          ["ok-ms", "Octakit + MIDI SCENES + Kits Reload bridge", "Hardware reported 14 Sep"],
          ["recfix", "Recorder loop-click fix on stock effects", "Three of its caves measured on hardware (12 Sep, OCTABAM83/84); RECORDER HOLD port-gated only"],
          ["repitch", "Repitch module", "Hardware reported 16 Sep"],
          ["bamsep26", "Sam's bus and FX rig", "Reported on Sam's unit"],
          ["octatrick-usb", "Octatrick features with USB route", "Hardware reported 26 Sep on Tim's MKI"],
          ["usb-audio", "USB MIDI and multichannel audio rig", "Sam's MKII: 16-channel images 64 and 69; see USB guide"],
          ["mods / scenes / kits", "MIDI SCENES, Octakit, LO-FI fix, and CC page 2 in different combinations", "Port only"],
          ["midi-scenes / octakit", "Individual community ports", "Shown together in ok-ms; standalone status not claimed"],
          ["lofi-amf-fix", "LO-FI AMF fix alone", "No hardware confirmation listed"],
          ["octatrick", "Octatrick features without the USB additions", "No hardware confirmation listed"],
          ["usb", "Rig plus USB MIDI", "No standalone hardware confirmation listed"],
          ["bottleservice", "usb-audio plus Octakit and bridge", "Port only; check with stress project reported"],
          ["bus", "BusVerb, BusDelay, sends, and tempo sync", "Hardware reported under earlier names"],
          ["mutables / nimbus / rig variants", "Experimental effects and rig combinations", "No hardware confirmation listed"],
          ["hello / hello-dram / restock", "Examples and reference builds", "No hardware confirmation listed"]
        ] } },
      { title: "Two useful starting points", steps: [
        { title: "Octakit with MIDI SCENES", body: "ok-ms pairs the two ports through a bridge and keeps stock effects. Octakit migrates Parts to Kits; back up project data and read its migration section before switching back to stock firmware.", code: "make check REMIX=ok-ms\nmake image REMIX=ok-ms BUILD=1" },
        { title: "Bus and effects rig", body: "bamsep26 is a full effect layout with BusDelay on T1 FX2, BusVerb on T5 FX2, sends on the remaining tracks, and FX1 stations. Its document separates hardware-confirmed behavior from still-open features.", code: "make check REMIX=bamsep26\nmake panel REMIX=bamsep26" }
      ] },
      { title: "Where to read further", paragraphs: ["The upstream remix index links each recipe and gives per-feature status. The ok-ms, bamsep26, and USB notes are particularly useful because they document migration, track layout, supported USB configurations, and unresolved behavior. Use those specific notes when choosing a build."] }
    ],
    sources: [source("Current remix index", "docs/remixes/README.md"), source("ok-ms recipe", "docs/remixes/ok-ms.md"), source("bamsep26 rig", "docs/remixes/bamsep26.md"), source("USB variants", "docs/remixes/usb.md")]
  },
  {
    id: "emulator", title: "Emulator & panel", kicker: "Run the machine", summary: "Boot a patched Octatrack locally, operate a virtual panel, and test a project before using hardware.",
    sections: [
      { title: "Two emulation layers", paragraphs: ["The main C++ port runs the ColdFire firmware with both DSP56300 cores, a virtual CF card, panel controls, MIDI, USB, and audio. A smaller Unicorn-based emulator supports fast firmware draw, formatter, and label checks during builds. The older Route A implementation mentioned in parts of the panel README was retired; follow its current In octabam section and the remixer emulator guide.", "Neither route fully models caches, recorder behavior, or all cross-core timing. A passing check means that the tested path ran in the emulator; the remix status page records separate hardware evidence."] },
      { title: "Open the browser panel", steps: [
        { title: "Prepare emulator tools and firmware", body: "Use the setup and stock-OS steps from Build & flash first. emu-setup supplies the Python panel dependencies and emu-cf builds the full-machine port.", code: "make emu-setup\nmake emu-cf" },
        { title: "Launch with a remix", body: "The panel server opens at http://localhost:8563/. It builds the requested remix, starts the emulator, and provides LCD, keys, encoders, crossfader, LEDs, and audio controls in the browser.", code: "make panel REMIX=ok-ms" },
        { title: "Use an existing project", body: "The panel requires a project: point OT_PROJECT at a project folder, or put a path in ~/.octabam_project. Without either, make panel stops. Its virtual card persists in out/cards/ after the first run; delete that card image and matching JSON if you intentionally want to regenerate it from the folder.", code: "OT_PROJECT=/path/to/your/project make panel REMIX=ok-ms" }
      ] },
      { title: "Other panel modes", paragraphs: ["make emu-live REMIX=ok-ms opens a Tk LCD and key interface without sound and uses a scratch card. The browser panel can use a different port or start without native sound; the documented macOS app wrapper is made with make panel-app. The panel defaults to an MKII skin, with PANELARGS=--mki for MKI."], code: "make emu-live REMIX=ok-ms\nmake panel REMIX=ok-ms PANEL_PORT=8571 PANELARGS='--sound off'\nmake panel-app" },
      { title: "Checking a build", paragraphs: ["make check REMIX=ok-ms runs the remix's available build and emulator gates. Run make emu-setup and make emu-cf first; otherwise some gates skip. A full make check can build many remixes and take several minutes."] , code: "make check REMIX=ok-ms" }
    ],
    sources: [source("Emulator guide", "docs/remixer/EMU.md"), source("Virtual panel", "tools/panel/README.md"), source("Build gates", "docs/remixer/HARNESS.md")]
  },
  {
    id: "usb", title: "USB MIDI & audio", kicker: "Computer connection", summary: "Choose the USB remix, understand its channel map, and distinguish the measured hardware images from the broader design.",
    sections: [
      { title: "Which USB build?", paragraphs: ["The USB modules come from markandrus/octemu and run inside Octabam's DRAM platform. The usb recipe adds a class-compliant MIDI port to the bamsep26 rig. usb-audio adds USB audio to that rig. The detailed USB note also describes a usb-lean hardware image with stock effects and the USB modules, used to isolate the stream from the rig."],
        table: { headers: ["Variant", "Host connection", "Hardware evidence on 26 Sep 2026"], rows: [["usb", "Card storage and MIDI mirroring the DIN ports", "Not flashed alone in the USB note"], ["usb-audio", "USB MIDI plus audio with the effect rig", "Sam's MKII: 16-channel images 64 and 69 tested"], ["usb-lean", "USB MIDI and audio with stock effects", "Bryan's MKII: 20-channel image 90 tested"]] } },
      { title: "Audio routing", paragraphs: ["At USB high speed, each track has a stereo post-FX, pre-fader pair: T1 on channels 1–2 through T8 on 15–16. The 20-channel configuration adds MAIN on 17–18 and CUE on 19–20. At full speed, the stream is a stereo sum. The track stream does not follow track LEVEL, crossfader, MAIN volume, or master effects; the MAIN and CUE pairs are separate outputs in the 20-channel design.", "USB MIDI receives through the DIN input path and mirrors outgoing DIN messages to USB. Firmware upgrades still use the CF card or 5-pin DIN MIDI; the Octatrack's own USB MIDI port does not load an OS image."] },
      { title: "Build and connect", steps: [
        { title: "Prepare and check", body: "Complete the stock OS and toolchain steps in Build & flash. The emulator's verify_usb check enumerates and streams from the selected image, but is separate from hardware testing.", code: "make emu-cf\nmake check REMIX=usb-audio\nmake image REMIX=usb-audio BUILD=1" },
        { title: "Load the image", body: "Back up the card and use the CF upgrade path in Build & flash. For an old project, read bamsep26's Before you flash section and its host and stamp-defaults preparation commands before opening it." },
        { title: "Record on macOS", body: "Connect USB and select Elektron Octatrack DPS-1 in Audio MIDI Setup or your DAW. Choose the channel count the specific image presents. The upstream example records a 20-channel, 44.1 kHz, 24-bit stream with SoX.", code: "sox -t coreaudio 'Elektron Octatrack DPS-1' -c 20 -r 44100 -b 24 take.wav trim 0 60" }
      ] },
      { title: "What has been measured", paragraphs: ["The USB note reports 16-bit and 24-bit, 16-channel captures from Sam's MKII on 25 Sep, and a 20-channel image on Bryan's MKII (image 90, now named usb-out-tracks-main-cue; the usb-lean remix has since been removed). A short reordered-sample burst after stream start remains open. USB MIDI timing against DIN, disk mode while a stream is open, and Windows and Linux hosts were not measured there.", "As of 29 Sep 2026 the repository overview lists USB AUDIO OUT TRACKS MAIN CUE as on hardware (Sam's MKII, image 64; Tim's MKI, OCTATRICK9), while other USB audio modules are port-gated and not on hardware. This page follows those measured results and does not extend them to every USB recipe or host."] }
    ],
    sources: [source("USB remix and measurements", "docs/remixes/usb.md"), source("USB MIDI module", "modules/usbmidi/README.md"), source("USB audio module", "modules/usbaudio/README.md"), source("Hardware failure notes", "docs/remixer/FAILURE_MODES.md"), source("Build and recovery", "docs/remixes/BUILDING.md")]
  },
  {
    id: "effects", title: "Effects & bus", kicker: "DSP workbench", summary: "Understand the shared send bus, the flagship rig, and the audio renderer used to audition effects.",
    sections: [
      { title: "The shared bus", paragraphs: ["Octabam's XBUS design has delay and reverb sends. Delay can feed reverb, with a DLY control determining the handoff. In the bamsep26 rig, BusDelay is hosted on T1 FX2 and BusVerb on T5 FX2; other tracks can send into them. Host placement matters because the wet output returns through those slots. A bus effect on the wrong track can simply pass dry audio.", "The rig also uses FX1 stations for spectrum, character, and modulation work, while keeping stock delay on T8. Its track layout and control map are in the upstream bamsep26 note; follow that note when recreating the rig on hardware."] },
      { title: "Audition outside the full emulator", paragraphs: ["The DSP harness assembles and executes real DSP56300 instructions against WAV input. This is useful for effect development, regression comparisons, and A/B listening. It does not model an entire Octatrack or prove hardware timing."], code: "make reverb IN=loop.wav ARGS='--wet --mode all'\nmake render\nmake render-delay\nmake render-rig" },
      { title: "Effect modules", table: { headers: ["Module", "Role", "Start with"], rows: [["BusVerb", "Shared reverb host", "modules/busverb/README.md"], ["BusDelay", "Shared delay host", "modules/busdelay/README.md"], ["XBUS", "Send and return architecture", "docs/effects/XBUS.md"], ["bamsep26", "Complete rig and controls", "docs/remixes/bamsep26.md"]] }, paragraphs: ["The table points to repository paths so you can inspect the exact controls and current limitations. Run make modules for the full effect inventory; it changes faster than this guide."] }
    ],
    sources: [source("Bus architecture", "docs/effects/XBUS.md"), source("Rig layout", "docs/remixes/bamsep26.md"), source("DSP harness", "docs/remixer/HARNESS.md"), source("BusVerb module", "modules/busverb/README.md"), source("BusDelay module", "modules/busdelay/README.md")]
  },
  {
    id: "modules", title: "Modules & ports", kicker: "Extend the OS", summary: "Find integrated community work and learn the shape of a module before writing or combining one.",
    sections: [
      { title: "What is integrated", paragraphs: ["Octabam includes local modules and community work via submodules. The exact buildable inventory and compatibility ledger come from make modules. A port means code has been integrated into the remixer; hardware evidence belongs to the specific remix that includes it."],
        table: { headers: ["Area", "What it adds", "Example recipe or note"], rows: [["Octakit", "Named Kits, migration from Parts, kit operations", "ok-ms"], ["MIDI SCENES", "Scene control for MIDI tracks", "ok-ms"], ["Octatrick", "FM synth, scale quantizer, pattern jump", "octatrick-usb"], ["USB", "USB MIDI; selected builds add multichannel USB audio", "usb / usb-audio"], ["LOFI, REPITCH, REC FIX", "Targeted effect and behavior patches", "mods / repitch / recfix"], ["Scenes and Kits bridges", "Compatibility glue between larger ports", "ok-ms and dedicated recipes"]] } },
      { title: "Make a small module", paragraphs: ["Each module has a manifest.py describing its name, settings, hooks, resource claims, and source payloads. DSP payloads are assembly; ColdFire patches use their own assembly. Start from modules/hello or the templates, then use the build checks and DSP audition tool before considering hardware."], code: "make modules\nmake check REMIX=hello\npython3 tools/remix/audition.py hello out/dry/drums_110.wav GAIN=64\npython3 tools/verify/verify_hello.py" },
      { title: "Understand the fit", paragraphs: ["The remixer checks placements and collisions. The small ROM cave is roughly 8 KB, so larger features may use the DRAM payload route. That route reserves about 10 MB from the sample pool. The hello-dram example and placement guide show the mechanics; bridges such as Kits Reload resolve behavioral interactions that address placement alone cannot fix.", "Before publishing a combination, record exactly which recipe was checked and what was observed on hardware. The same module can have different results in different mixes."] }
    ],
    sources: [source("Module format", "docs/remixer/MODULES.md"), source("Memory placement", "docs/remixer/PLACEMENT.md"), source("Remix status", "docs/remixes/README.md"), source("Octakit and MIDI SCENES", "docs/remixes/ok-ms.md"), source("USB variants", "docs/remixes/usb.md")]
  },
  {
    id: "testing", title: "Tests & limits", kicker: "Evidence before flashing", summary: "Use the build gates, emulator, audio renderer, and generated stress project for the questions each can answer.",
    sections: [
      { title: "A sensible check sequence", steps: [
        { title: "Check composition", body: "make modules shows inventory and compatibility. make check builds every remix and runs available static, formatter, DSP, and emulator gates; allow several minutes even when REMIX names your focus. Prepare both emulators first so their gates do not skip.", code: "make modules\nmake emu-setup && make emu-cf\nmake check REMIX=ok-ms" },
        { title: "Listen and interact", body: "Use the DSP renderer to compare effect output, then boot the selected remix in the browser panel with a copied project. Exercise the controls and patterns relevant to that remix.", code: "make render-rig\nOT_PROJECT=/path/to/your/project make panel REMIX=ok-ms" },
        { title: "Run a dense project", body: "The stress-project generator copies a source project to a new output path and writes eight FLEX tracks with increasing trig density. It refuses to overwrite the output. The separate wiki testing guide explains the patterns and other available harnesses.", code: "python3 tools/harness/stress_project.py --source /path/to/project --out out/stress-project" }
      ] },
      { title: "What the result means", table: { headers: ["Check", "Good evidence for", "Does not establish"], rows: [["Static/build gates", "Module fit, patch construction, known signatures", "Real device behavior"], ["DSP harness", "Effect instructions and audio output", "Full device scheduling"], ["ColdFire/DSP emulator", "Boot, menus, short playback and interaction", "All cache, recorder, or cross-core timing"], ["Hardware trial", "That build on that device and project", "Every combination or long-run workload"]] }, paragraphs: ["The upstream failure-mode and acceptance notes describe expected blind spots. The remix index provides actual hardware status by recipe and date; use both when deciding whether a build is ready for your machine."] }
    ],
    sources: [source("Harness and gates", "docs/remixer/HARNESS.md"), source("Stress-project generator", "tools/harness/STRESS_PROJECT.md"), source("Emulator limitations", "docs/remixer/EMU.md"), source("Failure modes", "docs/remixer/FAILURE_MODES.md"), source("Remix status", "docs/remixes/README.md")]
  }
];
