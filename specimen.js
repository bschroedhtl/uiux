// Chapter opener: set the chapter's specimen word as a type waterfall under the title.
const SPECIMEN = {
  "index": "UI/UX",
  "01-ux-ui": "UX",
  "02-ux-scrum": "Sprint",
  "03-demo-projekt": "Demo",
  "04-user-research": "Fragen",
  "05-personas": "Profil",
  "06-user-journey": "Weg",
  "07-product-backlog": "Story",
  "08-informationsarchitektur": "Ordnen",
  "09-wireframes-prototypen": "Plan",
  "10-visuelle-gestaltung": "Form",
  "11-designsysteme": "System",
  "12-barrierefreiheit": "Zugang",
  "13-usability-tests": "Test",
  "14-ki-werkzeuge": "KI",
  "anhang-glossar": "Begriff",
  "anhang-tools": "Tools",
};

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("#title-block-header");
  if (!header || !header.querySelector("h1.title")) return;

  const page = (location.pathname.split("/").pop() || "index.html").replace(/\.html$/, "") || "index";
  const word = SPECIMEN[page];
  if (!word) return;

  const sizes = ["72", "48", "28", "17.5", "12.5"];
  const row = document.createElement("div");
  row.className = "waterfall";
  row.setAttribute("aria-hidden", "true");
  for (const size of sizes) {
    const step = document.createElement("div");
    step.className = "step";
    const glyphs = document.createElement("span");
    glyphs.className = "glyphs";
    glyphs.textContent = word;
    const label = document.createElement("span");
    label.className = "size";
    label.textContent = size;
    step.append(glyphs, label);
    row.append(step);
  }
  header.after(row);

  // A specimen never shows a cut glyph. Steps leave only from the large end,
  // so the ladder that remains is always consecutive; at least three stay.
  const fit = () => {
    const steps = [...row.children];
    steps.forEach((s) => (s.hidden = false));
    let i = 0;
    while (i < steps.length - 3 && row.scrollWidth > row.clientWidth + 1) {
      steps[i].hidden = true;
      i++;
    }
  };

  const settle = () => {
    fit(); // measured at final widths, before anything moves
    row.classList.add("settling", "instant");
    void row.offsetWidth;
    row.classList.remove("instant");
    requestAnimationFrame(() => requestAnimationFrame(() => row.classList.remove("settling")));
  };

  if (document.fonts && document.fonts.ready) document.fonts.ready.then(settle);
  else settle();
  window.addEventListener("resize", fit);
});
