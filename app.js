import { devices, projects } from "./projects.js";
import { octabamPages } from "./octabam.js";
import { extraGuides } from "./guides.js";

const main = document.getElementById("main");
const nav = document.getElementById("side-nav");
const pathLabel = document.getElementById("topbar-path");
const searchInput = document.getElementById("site-search");
const menuButton = document.getElementById("mobile-menu");
const kinds = ["Emulator", "Firmware", "Tool", "Research"];
const siteTitle = "Unofficial Elektron Hacking Wiki";
const projectById = new Map(projects.map((project) => [project.id, project]));
const octabamPageById = new Map(octabamPages.map((page) => [page.id, page]));
const octabamPageByTitle = new Map(octabamPages.map((page) => [page.title, page]));
const extraGuideMaps = new Map(Object.entries(extraGuides).map(([id, pages]) => [id, new Map(pages.map((page) => [page.id, page]))]));

function projectKinds(project) {
  return project.kinds || [project.kind];
}

function esc(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
}

function deviceName(id) {
  return devices.find((device) => device.id === id)?.name || id;
}

function projectUrl(project) {
  return "#/project/" + project.id;
}

function projectCard(project) {
  const label = project.devices.length > 2 ? "Multi-device" : project.devices.map(deviceName).join(" + ");
  return '<a class="project-card" href="' + projectUrl(project) + '">' +
    '<div class="card-top"><span class="card-kind">' + esc(projectKinds(project).join(" / ")) + '</span><span>' + esc(label) + '</span></div>' +
    '<h3>' + esc(project.name) + '</h3><p>' + esc(project.summary) + '</p>' +
    '<div class="card-bottom"><span>' + esc(project.stage) + '</span><span>EXPLORE ↗</span></div></a>';
}

function projectGrid(items) {
  return items.length ? '<div class="project-grid">' + items.map(projectCard).join("") + '</div>' :
    '<div class="empty"><h2>No matches yet</h2><p>Try a device name, feature, or project author.</p></div>';
}

function sectionHeading(eyebrow, title, description, link, linkText) {
  return '<div class="section-heading"><div><span class="eyebrow">' + esc(eyebrow) + '</span><h2>' + esc(title) + '</h2><p>' + esc(description) + '</p></div>' +
    (link ? '<a class="text-link" href="' + esc(link) + '">' + esc(linkText) + ' ↗</a>' : '') + '</div>';
}

function homePage() {
  const browseKinds = [
    { kind: "Emulator", title: "Emulators", description: "Run device firmware, a virtual panel, or an audio engine on a computer." },
    { kind: "Firmware", title: "Firmware mods", description: "Find OS patches, remixers, and firmware build workflows." },
    { kind: "Tool", title: "Hacking tools", description: "Inspect firmware, connect audio, or control hardware over MIDI." },
    { kind: "Research", title: "Research notes", description: "Read experiments and findings that have no public build yet." }
  ];
  main.innerHTML = '<header class="home-intro"><span class="eyebrow">INDEPENDENT PROJECT INDEX</span>' +
    '<h1>Unofficial Elektron<br>hacking wiki</h1>' +
    '<p class="lede">Emulators, firmware changes, tools, and research notes in one source-linked index. Entries give supported devices and OS versions, a way to start, and known limits.</p>' +
    '<div class="home-meta"><span>' + projects.length + ' repositories</span><span>' + devices.length + ' device families</span><span>Checked 30 Sep 2026</span></div>' +
    '<div class="home-links"><a href="#/all">Browse every project <span aria-hidden="true">→</span></a><a href="#/guide/start">How to use the wiki <span aria-hidden="true">→</span></a></div></header>' +
    '<section class="section home-section"><div class="home-section-head"><h2>Browse by device</h2><p>Projects appear wherever the author documents support. Each project page explains its exact role and OS version.</p></div>' +
    '<div class="device-grid">' + devices.map((device) => {
      const count = projects.filter((project) => project.devices.includes(device.id)).length;
      return '<a class="device-card" href="#/device/' + device.id + '"><div class="device-top"><span>' + esc(device.shorthand) + '</span><span>' + count + ' ' + (count === 1 ? 'project' : 'projects') + '</span></div><div><h3>' + esc(device.name) + '</h3><p>' + esc(device.detail) + '</p></div></a>';
    }).join("") + '</div></section>' +
    '<section class="section home-section"><div class="home-section-head"><h2>Browse by project type</h2><p>Projects with more than one role appear in each relevant group.</p></div>' +
    '<div class="browse-list">' + browseKinds.map(({ kind, title, description }) => {
      const count = projects.filter((project) => projectKinds(project).includes(kind)).length;
      return '<a class="browse-item" href="#/kind/' + kind.toLowerCase() + '"><div><h3>' + esc(title) + '</h3><p>' + esc(description) + '</p></div><span>' + count + ' <span aria-hidden="true">→</span></span></a>';
    }).join("") + '</div></section>';
  pathLabel.textContent = "INDEX / ALL PROJECTS";
  document.title = siteTitle;
}

function catalogPage(title, description, items, activeKind) {
  main.innerHTML = '<section class="page-head compact"><span class="eyebrow">PROJECT INDEX / 2026</span><h1>' + esc(title) + '</h1><p class="lede">' + esc(description) + '</p></section>' +
    '<div class="catalog-toolbar"><div class="chip-row"><a class="chip' + (!activeKind ? ' selected' : '') + '" href="#/all">All</a>' +
    kinds.map((kind) => '<a class="chip' + (activeKind === kind ? ' selected' : '') + '" href="#/kind/' + kind.toLowerCase() + '">' + esc(kind) + '</a>').join("") + '</div><p>' + items.length + ' PROJECTS</p></div>' +
    projectGrid(items);
  pathLabel.textContent = "INDEX / " + title.toUpperCase();
  document.title = title + " · " + siteTitle;
}

function devicePage(device) {
  const items = projects.filter((project) => project.devices.includes(device.id));
  const emulators = items.filter((project) => projectKinds(project).includes("Emulator"));
  const firmwareAndTools = items.filter((project) => projectKinds(project).some((kind) => kind === "Firmware" || kind === "Tool"));
  const research = items.filter((project) => projectKinds(project).includes("Research"));
  main.innerHTML = '<section class="page-head compact"><span class="eyebrow">DEVICE / ' + esc(device.shorthand) + '</span><h1>' + esc(device.name) + '</h1><p class="lede">' + esc(device.detail) + '. Explore the emulators, firmware work, tools, and research in the starter list.</p></section>' +
    '<section class="section">' + sectionHeading('01 / Run it on a computer', 'Emulators', 'Projects that run the machine or part of its engine on a computer.') +
    (emulators.length ? projectGrid(emulators) : '<div class="empty"><h2>No emulator in this list yet.</h2><p>Have a link? Add it to repos.txt and the project index.</p></div>') + '</section>' +
    '<section class="section">' + sectionHeading('02 / Work with the device', 'Firmware hacks & tools', 'Mods, patchers, controllers, audio connections, and tools for studying OS images.') + projectGrid(firmwareAndTools) + '</section>' +
    (research.length ? '<section class="section">' + sectionHeading('03 / Read the work', 'Research notes', 'Useful experiments and findings without a public build.') + projectGrid(research) + '</section>' : '');
  pathLabel.textContent = "DEVICES / " + device.name.toUpperCase();
  document.title = device.name + " · " + siteTitle;
}

function projectPage(project) {
  const meta = [...projectKinds(project), project.stage, ...project.devices.map(deviceName), "by " + project.author];
  const sourceLinks = [{ label: "Project repository", url: project.source }, { label: "Documentation", url: project.docs }, ...project.links];
  const related = project.related.map((id) => projectById.get(id)).filter(Boolean);
  main.innerHTML = '<div class="breadcrumbs"><a href="#/">Home</a><span>/</span><a href="#/all">Projects</a><span>/</span><span>' + esc(project.name) + '</span></div>' +
    '<header class="project-head"><span class="eyebrow">PROJECT / ' + esc(project.author.toUpperCase()) + '</span><h1>' + esc(project.name) + '</h1><p class="lede">' + esc(project.summary) + '</p>' +
    '<div class="project-meta">' + meta.map((item) => '<span>' + esc(item) + '</span>').join("") + '</div>' +
    '<div class="action-row"><a class="button primary" href="' + esc(project.source) + '" target="_blank" rel="noopener noreferrer">Open repository ↗</a><a class="button" href="' + esc(project.docs) + '" target="_blank" rel="noopener noreferrer">Read upstream docs ↗</a></div></header>' +
    '<div class="detail-layout"><div class="detail-body">' +
    '<section class="detail-section"><h2>What it is for</h2><p>' + esc(project.why) + '</p><ul class="feature-list">' + project.features.map((feature) => '<li>' + esc(feature) + '</li>').join("") + '</ul></section>' +
    '<section class="detail-section"><h2>How to start</h2>' + project.steps.map((step, index) => '<div class="step" data-step="' + (index + 1) + '"><h3>' + esc(step.title) + '</h3>' +
      (step.body ? '<p>' + esc(step.body) + '</p>' : '') + (step.code ? '<pre><code>' + esc(step.code) + '</code></pre>' : '') + '</div>').join("") + '</section>' +
    '<section class="detail-section"><h2>Before you run it</h2><p>' + esc(project.requirements) + '</p><div class="callout"><strong>Status & limits</strong>' + esc(project.caveat) + '</div></section>' +
    '<section class="detail-section"><h2>Related projects</h2>' + projectGrid(related) + '</section></div>' +
    '<aside class="detail-aside"><div class="aside-box"><h3>At a glance</h3><p>' + esc(project.stage) + '<br>' + esc(project.devices.map(deviceName).join(" · ")) + '<br>Maintained by ' + esc(project.author) + '</p></div>' +
    '<div class="aside-box"><h3>Primary sources</h3>' + sourceLinks.map((link) => '<a href="' + esc(link.url) + '" target="_blank" rel="noopener noreferrer">' + esc(link.label) + '</a>').join("") + '</div>' +
    '<div class="aside-box"><h3>Reading this page</h3><p>This is a short guide based on the author’s documentation, checked 26 Sep 2026 and re-audited 29 Sep 2026. Use the upstream instructions for current versions and device-specific recovery steps.</p></div></aside></div>';
  pathLabel.textContent = "PROJECTS / " + project.name.toUpperCase();
  document.title = project.name + " · " + siteTitle;
}

function octabamUrl(page) {
  return "#/project/octabam" + (page.id === "overview" ? "" : "/" + page.id);
}

function octabamSection(section) {
  let html = '<section class="detail-section"><h2>' + esc(section.title) + '</h2>';
  for (const paragraph of section.paragraphs || []) html += '<p>' + esc(paragraph) + '</p>';
  if (section.steps) html += section.steps.map((step, index) =>
    '<div class="step" data-step="' + (index + 1) + '"><h3>' + esc(step.title) + '</h3>' +
    (step.body ? '<p>' + esc(step.body) + '</p>' : '') +
    (step.code ? '<pre><code>' + esc(step.code) + '</code></pre>' : '') + '</div>').join("");
  if (section.table) html += '<p class="table-hint">Swipe sideways to see every column →</p><div class="table-scroll" role="region" aria-label="' + esc(section.title) + ' table" tabindex="0"><table class="guide-table"><thead><tr>' +
    section.table.headers.map((header) => '<th>' + esc(header) + '</th>').join("") +
    '</tr></thead><tbody>' + section.table.rows.map((row) => '<tr>' + row.map((cell) => {
      const linkedPage = octabamPageByTitle.get(cell);
      return '<td>' + (linkedPage ? '<a class="inline-link" href="' + octabamUrl(linkedPage) + '">' + esc(cell) + '</a>' : esc(cell)) + '</td>';
    }).join("") + '</tr>').join("") + '</tbody></table></div>';
  if (section.code) html += '<pre><code>' + esc(section.code) + '</code></pre>';
  if (section.callout) html += '<div class="callout"><strong>Before loading hardware</strong>' + esc(section.callout) + '</div>';
  return html + '</section>';
}

function octabamPage(page) {
  const project = projectById.get("octabam");
  const sourceLinks = page.sources.map((link) => '<a href="' + esc(link.url) + '" target="_blank" rel="noopener noreferrer">' + esc(link.label) + '</a>').join("");
  const otherPages = octabamPages.filter((item) => item.id !== "overview");
  main.innerHTML = '<div class="breadcrumbs"><a href="#/">Home</a><span>/</span><a href="#/device/octatrack">Octatrack</a><span>/</span>' +
    (page.id === "overview" ? '<span>Octabam</span>' : '<a href="#/project/octabam">Octabam</a><span>/</span><span>' + esc(page.title) + '</span>') + '</div>' +
    '<header class="project-head"><span class="eyebrow">OCTABAM / ' + esc(page.kicker.toUpperCase()) + '</span><h1>' + esc(page.title) + '</h1><p class="lede">' + esc(page.summary) + '</p>' +
    '<div class="project-meta"><span>Firmware</span><span>Emulator</span><span>Octatrack MKI / MKII</span><span>Checked against upstream 666b615, 29 Sep 2026</span></div>' +
    '<div class="action-row"><a class="button primary" href="' + esc(project.source) + '" target="_blank" rel="noopener noreferrer">Open repository ↗</a>' +
    (page.id === "overview" ? '<a class="button" href="#/project/octabam/build">Build & flash →</a>' : '<a class="button" href="#/project/octabam">Project overview →</a>') + '</div></header>' +
    '<nav class="octabam-mobile-nav" aria-label="Octabam guide pages">' + octabamPages.map((item) => '<a href="' + octabamUrl(item) + '"' + (item.id === page.id ? ' class="current" aria-current="page"' : '') + '>' + esc(item.title) + '</a>').join("") + '</nav>' +
    (page.id === "overview" ? '<section class="section"><div class="section-heading"><div><span class="eyebrow">EXPLORE THE PROJECT</span><h2>Go straight to the part you need.</h2></div></div><div class="octabam-page-grid">' +
      otherPages.map((item, index) => '<a class="octabam-page-card" href="' + octabamUrl(item) + '"><span>' + String(index + 1).padStart(2, "0") + ' / ' + esc(item.kicker) + '</span><h3>' + esc(item.title) + '</h3><p>' + esc(item.summary) + '</p><b>OPEN GUIDE ↗</b></a>').join("") + '</div></section>' : '') +
    '<div class="detail-layout octabam-layout"><div class="detail-body">' + page.sections.map(octabamSection).join("") +
    (page.id === "testing" ? '<section class="detail-section"><h2>More test projects</h2><p>The <a class="inline-link" href="#/guide/stress">Octatrack stress-testing guide</a> explains the generated project and links related harnesses.</p></section>' : '') +
    (page.id === "overview" ? '<section class="detail-section"><h2>Related projects</h2>' + projectGrid(project.related.map((id) => projectById.get(id)).filter(Boolean)) + '</section>' : '') +
    '</div><aside class="detail-aside"><div class="aside-box octabam-toc"><h3>Octabam guide</h3>' + octabamPages.map((item) => '<a href="' + octabamUrl(item) + '"' + (item.id === page.id ? ' class="current" aria-current="page"' : '') + '>' + esc(item.title) + '</a>').join("") + '</div>' +
    '<div class="aside-box"><h3>Upstream sources for this page</h3>' + sourceLinks + '</div>' +
    '<div class="aside-box"><h3>Reading this guide</h3><p>Checked against sambanks/octabam 666b615 on 29 Sep 2026. Confirm commands and hardware status in the linked repository before using a new build.</p></div></aside></div>';
  pathLabel.textContent = "OCTABAM / " + page.title.toUpperCase();
  document.title = (page.id === "overview" ? "Octabam" : page.title + " · Octabam") + " · " + siteTitle;
}

function extraGuidePage(project, pages, page) {
  const guideUrl = (item) => "#/project/" + project.id + (item.id === "overview" ? "" : "/" + item.id);
  const sourceLinks = page.sources.map((link) => '<a href="' + esc(link.url) + '" target="_blank" rel="noopener noreferrer">' + esc(link.label) + '</a>').join("");
  const otherPages = pages.filter((item) => item.id !== "overview");
  const linkedTitles = new Map(pages.map((item) => [item.title, item]));
  const sections = page.sections.map((section) => {
    let html = octabamSection(section);
    for (const [title, linked] of linkedTitles) {
      const cell = '<td>' + esc(title) + '</td>';
      html = html.replaceAll(cell, '<td><a class="inline-link" href="' + guideUrl(linked) + '">' + esc(title) + '</a></td>');
    }
    return html;
  }).join("");
  main.innerHTML = '<div class="breadcrumbs"><a href="#/">Home</a><span>/</span><a href="#/device/' + project.devices[0] + '">' + esc(deviceName(project.devices[0])) + '</a><span>/</span>' +
    (page.id === "overview" ? '<span>' + esc(project.name) + '</span>' : '<a href="' + guideUrl(pages[0]) + '">' + esc(project.name) + '</a><span>/</span><span>' + esc(page.title) + '</span>') + '</div>' +
    '<header class="project-head"><span class="eyebrow">' + esc(project.name.toUpperCase()) + ' / ' + esc(page.kicker.toUpperCase()) + '</span><h1>' + esc(page.title) + '</h1><p class="lede">' + esc(page.summary) + '</p>' +
    '<div class="project-meta">' + [...projectKinds(project), project.stage, ...project.devices.map(deviceName)].map((item) => '<span>' + esc(item) + '</span>').join("") + '</div>' +
    '<div class="action-row"><a class="button primary" href="' + esc(project.source) + '" target="_blank" rel="noopener noreferrer">Open repository ↗</a>' +
    (page.id === "overview" ? '<a class="button" href="' + guideUrl(pages[1]) + '">Start the guide →</a>' : '<a class="button" href="' + guideUrl(pages[0]) + '">Project overview →</a>') + '</div></header>' +
    '<nav class="octabam-mobile-nav" aria-label="' + esc(project.name) + ' guide pages">' + pages.map((item) => '<a href="' + guideUrl(item) + '"' + (item.id === page.id ? ' class="current" aria-current="page"' : '') + '>' + esc(item.title) + '</a>').join("") + '</nav>' +
    (page.id === "overview" ? '<section class="section">' + sectionHeading('Explore the project', 'Choose a workflow', 'Each page covers one documented part of the project.') + '<div class="octabam-page-grid">' +
      otherPages.map((item, index) => '<a class="octabam-page-card" href="' + guideUrl(item) + '"><span>' + String(index + 1).padStart(2, "0") + ' / ' + esc(item.kicker) + '</span><h3>' + esc(item.title) + '</h3><p>' + esc(item.summary) + '</p><b>OPEN GUIDE ↗</b></a>').join("") + '</div></section>' : '') +
    '<div class="detail-layout octabam-layout"><div class="detail-body">' + sections +
    (page.id === "overview" ? '<section class="detail-section"><h2>Related projects</h2>' + projectGrid(project.related.map((id) => projectById.get(id)).filter(Boolean)) + '</section>' : '') +
    '</div><aside class="detail-aside"><div class="aside-box octabam-toc"><h3>' + esc(project.name) + ' guide</h3>' + pages.map((item) => '<a href="' + guideUrl(item) + '"' + (item.id === page.id ? ' class="current" aria-current="page"' : '') + '>' + esc(item.title) + '</a>').join("") + '</div>' +
    '<div class="aside-box"><h3>Upstream sources for this page</h3>' + sourceLinks + '</div>' +
    '<div class="aside-box"><h3>Reading this guide</h3><p>Checked 26 Sep 2026; re-audited 29 Sep 2026. Confirm current release files and support in the linked repository.</p></div></aside></div>';
  pathLabel.textContent = project.name.toUpperCase() + " / " + page.title.toUpperCase();
  document.title = (page.id === "overview" ? project.name : page.title + " · " + project.name) + " · " + siteTitle;
}

function guidePage(name) {
  if (name === "stress") {
    main.innerHTML = '<div class="breadcrumbs"><a href="#/">Home</a><span>/</span><span>Guides</span><span>/</span><span>Stress testing</span></div>' +
      '<header class="page-head compact"><span class="eyebrow">FIELD NOTE / OCTATRACK</span><h1>Existing stress tests.</h1><p class="lede guide-intro">Before writing another load test, start with octabam’s documented stress-project generator. It exercises eight FLEX tracks, dense locks, LFOs, and costly effects.</p></header>' +
      '<div class="guide-grid"><div class="guide-main">' +
      '<section class="detail-section"><h2>The ready-made project</h2><p>The <a class="inline-link" href="https://github.com/sambanks/octabam/blob/main/tools/harness/STRESS_PROJECT.md" target="_blank" rel="noopener noreferrer">upstream stress-project guide ↗</a> documents <code>tools/harness/stress_project.py</code>. It writes A01 with 16 locked trigs per track, A02 with 32, A03 with 64, and A04 with trigless locks. It verifies the generated bank data and writes a count and audio hash summary.</p>' +
      '<div class="step" data-step="1"><h3>Supply a local Octatrack project</h3><p>The generator copies local project files; no project or stock firmware is included in the repo. Its default source is a local template path. Pass <code>--source</code> for your own saved project.</p></div>' +
      '<div class="step" data-step="2"><h3>Generate an isolated output</h3><pre><code>python3 tools/harness/stress_project.py --remix bottleservice --source /path/to/your/project --out out/stress-project</code></pre><p>Name the remix whose effects you want to load; it places the DSP modules of that remix at their most expensive settings and refuses a remix with none. It also refuses to overwrite existing output, so choose a new destination for another run.</p></div>' +
      '<div class="step" data-step="3"><h3>Run the emulator check or copy it to your card</h3><p>The guide provides the exact <code>stage_card.py</code> and <code>ot_emu</code> commands for a short playback check. On hardware, keep its generated <code>AUDIO</code> folder with the project and switch A01–A04 while listening for dropouts and checking locks.</p></div>' +
      '</section><section class="detail-section"><h2>Other test harnesses</h2><table class="guide-table"><thead><tr><th>Project</th><th>Useful for</th><th>Where</th></tr></thead><tbody>' +
      '<tr><td><a class="inline-link" href="#/project/octabam">octabam</a></td><td>Remix build gates, local DSP render, full-machine boot, stress project</td><td><a class="inline-link" href="https://github.com/sambanks/octabam/blob/main/docs/remixer/HARNESS.md" target="_blank" rel="noopener noreferrer">HARNESS.md ↗</a></td></tr>' +
      '<tr><td><a class="inline-link" href="#/project/octemu">octemu</a></td><td>Boot/audio fixtures, USB MIDI stress, USB audio stream checks</td><td><a class="inline-link" href="https://github.com/markandrus/octemu/blob/main/tests/README.md" target="_blank" rel="noopener noreferrer">tests/README.md ↗</a></td></tr>' +
      '<tr><td><a class="inline-link" href="#/project/dnfw">dn2_firmware_explore</a></td><td>Digitone integrity checks, cold-boot emulation, per-mod harnesses</td><td><a class="inline-link" href="https://github.com/angellinares/dn2_firmware_explore/blob/main/README.md" target="_blank" rel="noopener noreferrer">README ↗</a></td></tr>' +
      '</tbody></table></section></div><aside class="guide-side"><div class="aside-box"><h3>Use with</h3><a href="#/project/octabam">octabam</a><a href="#/project/octemu">octemu</a></div><div class="callout"><strong>Hardware check</strong>The emulator smoke run checks loading and short playback. Long hardware soaks and manual pattern switching are separate checks in the upstream guide.</div></aside></div>';
    pathLabel.textContent = "GUIDES / STRESS TESTING";
    document.title = "Existing stress tests · " + siteTitle;
    return;
  }
  main.innerHTML = '<div class="breadcrumbs"><a href="#/">Home</a><span>/</span><span>Guides</span><span>/</span><span>Start here</span></div>' +
    '<header class="page-head compact"><span class="eyebrow">HOW TO READ THE MAP</span><h1>Start with the job.</h1><p class="lede guide-intro">These repositories range from downloadable emulators to experimental firmware notes. Choose the device, then the result you want.</p></header>' +
    '<div class="guide-grid"><div class="guide-main">' +
    '<section class="detail-section"><h2>Choose a path</h2><table class="guide-table"><thead><tr><th>If you want to…</th><th>Start with</th></tr></thead><tbody>' +
    '<tr><td>Run an Octatrack on a computer</td><td><a class="inline-link" href="#/project/octabam/emulator">octabam</a>, <a class="inline-link" href="#/project/octemu">octemu</a>, or <a class="inline-link" href="#/project/octa-panel">octa-panel</a></td></tr>' +
    '<tr><td>Run a Digitakt/Digitone MKI with audio</td><td><a class="inline-link" href="#/project/digiemu">digiemu</a></td></tr>' +
    '<tr><td>Boot a Digitakt II/Digitone II screen or study SHARC code</td><td><a class="inline-link" href="#/project/digikit">digikit</a></td></tr>' +
    '<tr><td>Combine Octatrack firmware mods</td><td><a class="inline-link" href="#/project/octabam">octabam</a> and its remix compatibility list</td></tr>' +
    '<tr><td>Add Digitakt MKI mods</td><td><a class="inline-link" href="#/project/elekloader">elekloader</a>, then <a class="inline-link" href="#/project/digislicer">digislicer</a> or <a class="inline-link" href="#/project/digihealth">digihealth</a></td></tr>' +
    '<tr><td>Explore Digitone II firmware</td><td><a class="inline-link" href="#/project/dnfw">dn2_firmware_explore</a></td></tr>' +
    '<tr><td>Play a Monomachine or Machinedrum plugin</td><td><a class="inline-link" href="#/project/monomodule">Monomodule</a> or <a class="inline-link" href="#/project/gearmulator">gearmulator MD/MM</a></td></tr>' +
    '<tr><td>Sequence a Machinedrum from a controller</td><td><a class="inline-link" href="#/project/mcl">MegaCommand Live</a></td></tr>' +
    '<tr><td>Route Overbridge 2 audio on Linux</td><td><a class="inline-link" href="#/project/overwitch">Overwitch</a></td></tr>' +
    '<tr><td>Inspect a firmware file</td><td><a class="inline-link" href="#/project/firmware-tool">elektron-firmware-tool</a></td></tr>' +
    '<tr><td>Find an Octatrack load test</td><td><a class="inline-link" href="#/guide/stress">Existing stress tests</a></td></tr>' +
    '</tbody></table></section>' +
    '<section class="detail-section"><h2>Read the status labels</h2><p><strong>Release available</strong> means the project links to prebuilt downloads or mod packages. <strong>Build from source</strong> means its author documents a local build. <strong>Browser patcher</strong> means you supply your own OS file in a web workflow. <strong>Notes only</strong> means there is no public build to run. These are access labels, not quality ratings.</p><p>Hardware testing is recorded per project, and often per feature. Follow the author’s latest test status before loading a modified OS on a unit.</p></section>' +
    '<section class="detail-section"><h2>Firmware basics</h2><p>Most firmware projects expect an exact stock OS version and reject other files. Keep a copy of the official firmware and a backup of projects and samples. A locally generated modified image still contains Elektron code; upstream authors generally ask you to share the patch or repository, not the built image.</p><p>Recovery controls differ by device and project. Read the linked flashing guide for your device before using a modified image.</p></section>' +
    '</div><aside class="guide-side"><div class="aside-box"><h3>Browse directly</h3><a href="#/all">Every project</a><a href="#/kind/emulator">Emulators</a><a href="#/kind/firmware">Firmware mods</a><a href="#/kind/tool">Hacking tools</a><a href="#/kind/research">Research notes</a></div></aside></div>';
  pathLabel.textContent = "GUIDES / START HERE";
  document.title = "Start here · " + siteTitle;
}

function searchPage(query) {
  const needle = query.trim().toLowerCase();
  const matches = needle ? projects.filter((project) => [project.name, project.author, project.summary, project.why, ...projectKinds(project), project.stage, project.requirements, ...project.devices.map(deviceName), ...project.features].join(" ").toLowerCase().includes(needle)) : projects;
  const allGuides = [{ id: "octabam", pages: octabamPages }, ...Object.entries(extraGuides).map(([id, pages]) => ({ id, pages }))];
  const guideMatches = needle ? allGuides.flatMap(({ id, pages }) => pages.filter((page) => [page.title, page.kicker, page.summary, ...page.sections.flatMap((section) => [section.title, ...(section.paragraphs || []), ...(section.steps || []).flatMap((step) => [step.title, step.body || "", step.code || ""]), ...(section.table?.rows.flat() || []), section.code || "", section.callout || ""])].join(" ").toLowerCase().includes(needle)).map((page) => ({ id, page }))) : [];
  main.innerHTML = '<section class="page-head compact"><span class="eyebrow">SEARCH / THE INDEX</span><h1>Search results.</h1><p class="lede">' + (needle ? 'Projects and guides matching “' + esc(query) + '”.' : 'Enter a project, device, or feature in the search box above.') + '</p></section>' +
    '<div class="catalog-toolbar"><p>' + matches.length + ' PROJECTS FOUND</p></div>' + (matches.length || !guideMatches.length ? projectGrid(matches) : '') +
    (guideMatches.length ? '<section class="section">' + sectionHeading('In-depth guides', 'Guide pages', guideMatches.length + ' matching pages across the project guides.') + '<div class="octabam-page-grid">' + guideMatches.map(({ id, page }) => '<a class="octabam-page-card" href="#/project/' + id + (page.id === "overview" ? '' : '/' + page.id) + '"><span>' + esc(id.toUpperCase()) + ' / ' + esc(page.kicker) + '</span><h3>' + esc(page.title) + '</h3><p>' + esc(page.summary) + '</p><b>OPEN GUIDE ↗</b></a>').join("") + '</div></section>' : '') +
    (needle.includes("stress") || needle.includes("test") ? '<section class="section">' + sectionHeading('Guide match', 'Existing Octatrack stress tests', 'A generated eight-track project and emulator smoke run are documented in octabam.', '#/guide/stress', 'Open guide') + '</section>' : '');
  pathLabel.textContent = "INDEX / SEARCH";
  document.title = "Search · " + siteTitle;
}

function updateNav(route) {
  const items = [
    { label: "Overview", href: "#/", section: "Explore" },
    { label: "All projects", href: "#/all" },
    ...devices.map((device) => ({ label: device.name, href: "#/device/" + device.id, count: projects.filter((project) => project.devices.includes(device.id)).length, section: device.id === "octatrack" ? "By device" : undefined })),
    { label: "Emulators", href: "#/kind/emulator", section: "By type" },
    { label: "Firmware mods", href: "#/kind/firmware" },
    { label: "Hacking tools", href: "#/kind/tool" },
    { label: "Research notes", href: "#/kind/research" },
    { label: "Start here", href: "#/guide/start", section: "Guides" },
    { label: "Existing stress tests", href: "#/guide/stress" }
  ];
  let html = "";
  for (const item of items) {
    if (item.section) html += '<div class="nav-heading">' + esc(item.section) + '</div>';
    const selected = route === item.href.slice(1);
    html += '<a href="' + item.href + '" class="' + (selected ? 'active' : '') + '"' + (selected ? ' aria-current="page"' : '') + '><span>' + esc(item.label) + '</span>' + (item.count ? '<em>' + item.count + '</em>' : '') + '</a>';
  }
  nav.innerHTML = html;
}

function render() {
  const raw = location.hash.slice(1) || "/";
  const [route, queryString] = raw.split("?");
  const parts = route.split("/").filter(Boolean);
  updateNav(route);
  if (!parts.length) homePage();
  else if (parts[0] === "all") catalogPage("All projects", "Every source in the starter list, organized into one searchable catalog.", projects);
  else if (parts[0] === "device") {
    const device = devices.find((item) => item.id === parts[1]);
    if (device) devicePage(device);
    else catalogPage("All projects", "Browse the project index.", projects);
  } else if (parts[0] === "kind") {
    const kind = kinds.find((item) => item.toLowerCase() === parts[1]);
    if (kind) catalogPage(kind === "Firmware" ? "Firmware mods" : kind === "Tool" ? "Hacking tools" : kind + "s", "Projects grouped by what they help you do.", projects.filter((project) => projectKinds(project).includes(kind)), kind);
    else catalogPage("All projects", "Browse the project index.", projects);
  } else if (parts[0] === "project" && parts[1] === "octabam" && octabamPageById.has(parts[2] || "overview")) octabamPage(octabamPageById.get(parts[2] || "overview"));
  else if (parts[0] === "project" && extraGuideMaps.get(parts[1])?.has(parts[2] || "overview")) extraGuidePage(projectById.get(parts[1]), extraGuides[parts[1]], extraGuideMaps.get(parts[1]).get(parts[2] || "overview"));
  else if (parts[0] === "project" && projectById.has(parts[1])) projectPage(projectById.get(parts[1]));
  else if (parts[0] === "guide" && ["start", "stress"].includes(parts[1])) guidePage(parts[1]);
  else if (parts[0] === "search") {
    const query = new URLSearchParams(queryString || "").get("q") || "";
    searchInput.value = query;
    searchPage(query);
  } else catalogPage("All projects", "Browse the project index.", projects);
  document.body.classList.remove("nav-open");
  menuButton.setAttribute("aria-expanded", "false");
  window.scrollTo(0, 0);
}

document.getElementById("search-form").addEventListener("submit", (event) => {
  event.preventDefault();
  location.hash = "#/search?q=" + encodeURIComponent(searchInput.value.trim());
});
menuButton.addEventListener("click", () => {
  const open = document.body.classList.toggle("nav-open");
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
});
document.getElementById("nav-close").addEventListener("click", () => {
  document.body.classList.remove("nav-open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.focus();
});
nav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    document.body.classList.remove("nav-open");
    menuButton.setAttribute("aria-expanded", "false");
  }
});
document.addEventListener("keydown", (event) => {
  if (event.key === "/" && !["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)) {
    event.preventDefault();
    searchInput.focus();
  }
  if (event.key === "Escape") {
    document.body.classList.remove("nav-open");
    menuButton.setAttribute("aria-expanded", "false");
    if (document.activeElement === searchInput) searchInput.blur();
  }
});
window.addEventListener("hashchange", render);
render();
