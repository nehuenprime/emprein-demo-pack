"use strict";

const settingToggles = {
    darkModeToggle: "dark",
    matchNotifications: "match",
    messageNotifications: "message",
    emailNotifications: "email",
    publicProfileToggle: "public"
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
