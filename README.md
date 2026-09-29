# Unofficial Elektron Hacking Wiki

An independent, unofficial wiki for Elektron emulators, firmware mods, reverse-engineering tools, controller software, audio utilities, and research notes. The catalog covers all 31 repository links in [`repos.txt`](repos.txt); the two companion websites are linked from their projects.

## Run it

The site is plain HTML, CSS, and JavaScript. It has no build step or package install.

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000`. A local server is needed because the project data is loaded as a JavaScript module.

## Find things

- Browse by device or by project type.
- Use the search box for features, authors, and project names (`/` focuses it).
- Each project page explains what the project does, its prerequisites, a first-use path, caveats, and links to the author's documentation. Octabam has a project map and eight focused guides. Digikit and MCL also have separate pages for their major workflows.
- The Digitakt/Digitone entries distinguish the MKI `digiemu` audio emulator from the II-series `digikit` screen emulator. Overwitch is listed as a Linux Overbridge 2 audio tool, and MCL as controller firmware with a separate Machinedrum OS prerequisite.
- Project pages link to relevant upstream tests and technical documentation where available. A separate guide collects existing test harnesses.

## Keep the wiki current

Edit [`projects.js`](projects.js) to update entries, [`octabam.js`](octabam.js) and [`guides.js`](guides.js) for detailed project guides, [`app.js`](app.js) for page behavior, and [`styles.css`](styles.css) for appearance. When adding a repository to `repos.txt`, add one project object with a stable `id`, device and kind, a concise summary, requirements, steps, an evidence-based caveat, and direct upstream links. Use `kinds` when a project belongs in multiple categories. Link companion websites through the project's `links` array rather than creating a duplicate entry.

Treat the upstream README and release notes as the source of truth. Hardware testing and mod compatibility vary by feature and OS version, so update those claims only when the project author documents them. The catalog was researched on **26 September 2026**; the site does not fetch live status.

This wiki hosts no Elektron firmware. Users supply stock OS files themselves where a project requires them. Check a project's current instructions and recovery documentation before building or loading modified firmware.
