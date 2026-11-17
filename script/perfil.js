"use strict";

function showAuthTab(tab) {
    const register = tab === "register";
    $("#registerForm").hidden = !register;
    $("#loginForm").hidden = register;
    $("#showRegisterButton").classList.toggle("active", register);
    $("#showLoginButton").classList.toggle("active", !register);
}
$("#showRegisterButton").addEventListener("click", () => showAuthTab("register"));
$("#showLoginButton").addEventListener("click", () => showAuthTab("login"));

function renderAccount() {
    $("#profileGuest").hidden = loggedIn;
    $("#profileLoggedIn").hidden = !loggedIn;
    $("#sidebarProfileAvatar").textContent = loggedIn ? initialsOf(user.name) : "👤";
    $("#sidebarProfileName").textContent = loggedIn ? user.name.split(" ")[0] : "Mi perfil";

    if (!loggedIn) return;
    $("#accountAvatar").textContent = initialsOf(user.name);
    $("#accountDisplayName").textContent = user.name;
    $("#accountDisplayRole").textContent = user.role || "Sin rol";
    $("#accountDisplayEmail").textContent = user.email;
    $("#accountDisplayPlan").textContent = user.plan || "Free";
    $("#accountDisplayIdea").textContent = user.idea || "Todavía no cargaste tu idea.";
}

$("#registerForm").addEventListener("submit", async e => {
    e.preventDefault();
    const name = $("#registerName").value.trim();
    const email = $("#registerEmail").value.trim().toLowerCase();
    const password = $("#registerPassword").value;
    const role = $("#registerRole").value.trim();
    const idea = $("#registerIdea").value.trim();

    if (!editingProfile && password.length < 6) {
        showToast("Contraseña débil", "Usá al menos 6 caracteres.");
        return;
    }
    if (password && password.length < 6) {
        showToast("Contraseña débil", "Usá al menos 6 caracteres.");
        return;
    }

    const passwordHash = password ? await hashPassword(password) : user.passwordHash;
    user = { name, email, role, idea, passwordHash, plan: user?.plan && editingProfile ? user.plan : "Free" };
    loggedIn = true;
    saveUser();
    save("empreinSession", true);

    showToast(editingProfile ? "Perfil actualizado" : "Cuenta creada",
        editingProfile ? "Tus cambios se guardaron." : `Bienvenido a Emprein, ${name.split(" ")[0]}.`);

    editingProfile = false;
    $("#registerPassword").required = true;
    $("#registerForm").reset();
    renderAccount();
});

$("#loginForm").addEventListener("submit", async e => {
    e.preventDefault();
    const email = $("#loginEmail").value.trim().toLowerCase();
    const password = $("#loginPassword").value;
    const stored = load("empreinUser", null);

    // Compatibilidad con cuentas viejas que guardaban la contraseña en texto plano
    const ok = stored && stored.email?.toLowerCase() === email &&
        (stored.passwordHash ? stored.passwordHash === await hashPassword(password) : stored.password === password);

    if (!ok) { showToast("No pudimos entrar", "Email o contraseña incorrectos."); return; }

    user = stored;
    loggedIn = true;
    save("empreinSession", true);
    $("#loginForm").reset();
    showToast("Sesión iniciada", `Hola de nuevo, ${user.name.split(" ")[0]}.`);
    renderAccount();
});

$("#editProfileButton").addEventListener("click", () => {
    editingProfile = true;
    $("#registerName").value = user.name;
    $("#registerEmail").value = user.email;
    $("#registerRole").value = user.role || "";
    $("#registerIdea").value = user.idea || "";
    $("#registerPassword").required = false;
    $("#registerPassword").placeholder = "Dejalo vacío para mantener la actual";
    loggedIn = false; // muestra el formulario; se restaura al guardar
    renderAccount();
    showAuthTab("register");
});

$("#profileLogoutButton").addEventListener("click", logout);


renderAccount();
