"use strict";

const settingToggles = {
    darkModeToggle: "dark"
};


Object.entries(settingToggles).forEach(([id, key]) => {
    const input = document.getElementById(id);
    input.checked = !!settings[key];
    input.addEventListener("change", () => {
        settings[key] = input.checked;
        if (key === "dark") { save("empreinDarkMode", settings.dark); applyDarkMode(); }
        else {
            const { dark, ...rest } = settings;
            save("empreinSettings", rest);
        }
    });
});

/* =========================
    IDIOMA
========================= */
const languageSelect = document.getElementById("languageSelect");
languageSelect.innerHTML = Object.entries(LANGUAGES)
    .map(([code, name]) => `<option value="${code}">${name}</option>`).join("");
languageSelect.value = LANG;
languageSelect.addEventListener("change", () => setLanguage(languageSelect.value));
