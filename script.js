const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle.querySelector("i");
const THEME_KEY = "pce-hub-theme-v2";
const LANGUAGE_KEY = "pce-hub-language";
const savedTheme = localStorage.getItem(THEME_KEY);

// Matte black is the default. A visitor can still choose light mode.
if (savedTheme !== "light") document.body.classList.add("dark");

function syncThemeIcon() {
  const isDark = document.body.classList.contains("dark");
  themeIcon.classList.toggle("fa-moon", !isDark);
  themeIcon.classList.toggle("fa-sun", isDark);
  themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
}
syncThemeIcon();

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem(THEME_KEY, document.body.classList.contains("dark") ? "dark" : "light");
  syncThemeIcon();
});

const translations = {
  en: {
    headline1: "Great to have you here.",
    headline2: "Welcome to PCE.",
    intro: "Meet our three companies and discover the people, ideas and expertise behind the PCE Gruppe.",
    explore: "EXPLORE OUR COMPANIES",
    ei_desc: "Engineering · EMSR · Process automation",
    es_desc: "Energy · Automation · Smart solutions",
    dkh_desc: "Technical training · Industrial knowledge",
    follow: "FOLLOW PCE PROCESS CONTROL ENGINEERS",
    footer: "Engineering connected.",
    outside: "THREE AREAS. ONE GROUP."
  },
  de: {
    headline1: "Schön, dass Sie da sind.",
    headline2: "Willkommen bei PCE.",
    intro: "Lernen Sie unsere drei Unternehmen kennen – und entdecken Sie die Menschen und Ideen, die uns verbinden.",
    explore: "UNSERE UNTERNEHMEN",
    ei_desc: "Engineering · EMSR · Prozessautomatisierung",
    es_desc: "Energie · Automatisierung · Smarte Lösungen",
    dkh_desc: "Technische Weiterbildung · Industriewissen",
    follow: "FOLGEN SIE PCE PROCESS CONTROL ENGINEERS",
    footer: "Engineering verbindet.",
    outside: "DREI BEREICHE. EINE GRUPPE."
  }
};

function setLanguage(language) {
  const selected = translations[language] ? language : "en";
  document.documentElement.lang = selected;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (translations[selected][key]) element.textContent = translations[selected][key];
  });
  document.querySelectorAll(".language-button").forEach((button) => {
    const active = button.dataset.lang === selected;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  document.title = selected === "de" ? "PCE Gruppe | Unternehmen entdecken" : "PCE Gruppe | Connect with us";
  localStorage.setItem(LANGUAGE_KEY, selected);
}

document.querySelectorAll(".language-button").forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang));
});
setLanguage(localStorage.getItem(LANGUAGE_KEY) || "en");

document.getElementById("year").textContent = new Date().getFullYear();
