"use strict";

/* =========================
   DATOS
========================= */
const profiles = [
    { name: "Lucía Fernández", initials: "LF", role: "UX / Product Designer", location: "Buenos Aires, Argentina", category: "EdTech", stage: "MVP",
      idea: "Una plataforma de aprendizaje accesible que adapta contenido educativo según las necesidades de cada estudiante.",
      description: "Estoy desarrollando una plataforma educativa enfocada en accesibilidad y personalización. La idea es ayudar a estudiantes que tienen diferentes ritmos y formas de aprendizaje usando tecnología, diseño inclusivo y herramientas inteligentes.",
      lookingFor: "Busco un desarrollador frontend o fullstack interesado en EdTech y accesibilidad para construir una primera versión pública del producto.",
      skills: ["UX Research", "Figma", "Product Design", "EdTech"], project: { name: "IncluLearn", visits: 4831, matches: 324 } },
    { name: "Martín López", initials: "ML", role: "Fullstack Developer", location: "Córdoba, Argentina", category: "SaaS", stage: "Prototipo",
      idea: "Software de gestión simple para pequeños negocios que todavía administran ventas, stock y clientes de forma manual.",
      description: "Quiero crear una plataforma SaaS enfocada en comercios chicos que necesitan digitalizarse pero encuentran demasiado complejas las herramientas actuales.",
      lookingFor: "Busco alguien con experiencia en ventas B2B o marketing que pueda ayudar a validar el producto con comercios reales.",
      skills: ["React", "Node.js", "PostgreSQL", "APIs"], project: { name: "PymeOS", visits: 3742, matches: 281 } },
    { name: "Ana Torres", initials: "AT", role: "Inversora Ángel", location: "Montevideo, Uruguay", category: "Investment", stage: "Inversión",
      idea: "Estoy buscando startups tecnológicas latinoamericanas con modelos escalables y equipos fundadores fuertes.",
      description: "Me interesa invertir principalmente en proyectos tecnológicos en etapa temprana. Busco equipos pequeños que ya hayan validado un problema real y tengan una visión clara de crecimiento.",
      lookingFor: "Startups de SaaS, inteligencia artificial, FinTech, logística o sustentabilidad que estén buscando capital inicial.",
      skills: ["Venture Capital", "Finanzas", "Startups", "Strategy"], project: { name: "Latam Seed Circle", visits: 2980, matches: 212 } },
    { name: "Lucas Pereira", initials: "LP", role: "Growth Marketer", location: "Rosario, Argentina", category: "MarTech", stage: "Validación",
      idea: "Una agencia que combina automatización e inteligencia artificial para ejecutar campañas de marketing para pequeñas empresas.",
      description: "El objetivo es reducir el costo operativo de una agencia tradicional automatizando investigación, generación de contenido y análisis de campañas.",
      lookingFor: "Busco un perfil técnico con interés en inteligencia artificial y automatización para desarrollar herramientas internas.",
      skills: ["Marketing", "Growth", "Analytics", "AI"], project: { name: "GrowPilot", visits: 2564, matches: 174 } },
    { name: "Sofía Ramírez", initials: "SR", role: "Data Scientist", location: "Santiago, Chile", category: "HealthTech", stage: "Investigación",
      idea: "Sistema predictivo que permita detectar patrones de riesgo en pacientes y ayudar a clínicas a anticiparse a complicaciones.",
      description: "Estoy investigando cómo aplicar modelos predictivos a información clínica para detectar tendencias y asistir a profesionales de salud en la toma de decisiones.",
      lookingFor: "Busco profesionales del sector salud y desarrolladores backend interesados en participar en una prueba de concepto.",
      skills: ["Python", "Machine Learning", "Data", "HealthTech"], project: { name: "CliniPredict", visits: 2218, matches: 159 } },
    { name: "Tomás Navarro", initials: "TN", role: "Emprendedor", location: "Madrid, España", category: "FinTech", stage: "Pre-seed",
      idea: "Una herramienta financiera para freelancers que automatiza presupuestos, seguimiento de ingresos y objetivos de ahorro.",
      description: "Muchos freelancers mezclan sus finanzas personales y profesionales. Estoy construyendo una herramienta sencilla para visualizar ingresos, gastos, impuestos y objetivos.",
      lookingFor: "Busco diseñador de producto e inversores interesados en soluciones financieras para trabajadores independientes.",
      skills: ["FinTech", "Business", "Sales", "Finance"], project: { name: "Freela", visits: 1988, matches: 143 } }
];

const FREE_MATCH_LIMIT = 5;
const AUTO_REPLIES = [
    "¡Hola! Gracias por escribirme, me encantó tu mensaje. ¿Te parece si coordinamos una llamada?",
    "Qué bueno que nos conectemos. Contame un poco más sobre lo que estás construyendo.",
    "¡Gracias por contactarme! Justo estaba buscando alguien con tu perfil.",
    "Me interesa la propuesta. ¿Tenés disponibilidad esta semana para charlar?"
];

/* =========================
   UTILIDADES
========================= */
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

const load = (key, fallback) => {
    try {
        const raw = localStorage.getItem(key);
        return raw === null ? fallback : JSON.parse(raw);
    } catch { return fallback; }
};
const save = (key, value) => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* storage lleno o bloqueado */ }
};

const escapeHtml = str => String(str ?? "").replace(/[&<>"']/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

const initialsOf = name =>
    name.trim().split(/\s+/).slice(0, 2).map(w => w[0]?.toUpperCase() || "").join("") || "?";

const byName = name => profiles.find(p => p.name === name);
const isMobile = () => matchMedia("(max-width: 700px)").matches;
const formatTime = iso => new Date(iso).toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" });

async function hashPassword(text) {
    if (!crypto?.subtle) return btoa(unescape(encodeURIComponent(text)));
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
    return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, "0")).join("");
}

/* =========================
   ESTADO
========================= */
let currentProfile = 0;
let animating = false;
let currentChat = null;
let editingProfile = false;

// Migra matches viejos (objetos) a nombres
let matches = load("empreinMatches", []).map(m => typeof m === "string" ? m : m?.name).filter(Boolean);
let conversations = load("empreinConversations", {});
let user = load("empreinUser", null);
let loggedIn = load("empreinSession", false) && !!user;
const settings = {
    match: true, message: true, email: false, public: true,
    ...load("empreinSettings", {}),
    dark: load("empreinDarkMode", matchMedia("(prefers-color-scheme: dark)").matches)
};

const isPremium = () => loggedIn && user?.plan === "Premium";
const hasConversation = name => (conversations[name]?.messages?.length || 0) > 0;
const saveMatches = () => save("empreinMatches", matches);
const saveConversations = () => save("empreinConversations", conversations);
const saveUser = () => save("empreinUser", user);

/* =========================
   TOAST
========================= */
let toastTimeout;
function showToast(title, message) {
    $("#toastTitle").textContent = title;
    $("#toastMessage").textContent = message;
    $("#toast").classList.add("show");
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => $("#toast").classList.remove("show"), 2800);
}

/* =========================
   NAVEGACIÓN
========================= */
const sidebarItems = $$(".sidebar__item[data-view]");
const appSections = $$(".app-section");

function showView(view, updateHash = true) {
    if (!document.getElementById(view)) view = "discover";

    sidebarItems.forEach(i => i.classList.toggle("active", i.dataset.view === view));
    appSections.forEach(s => s.classList.toggle("active", s.id === view));

    if (view === "matches") renderMatches();
    if (view === "messages") renderConversations();
    if (view === "projects") renderProjects();
    if (view === "profile") renderAccount();

    if (updateHash) history.replaceState(null, "", "#" + view);
    if (isMobile()) $("#open-menu").checked = true; // checked = menú cerrado
    window.scrollTo({ top: 0 });
}

sidebarItems.forEach(item => {
    item.addEventListener("click", e => {
        e.preventDefault();
        showView(item.dataset.view);
    });
});

/* =========================
   DESCUBRIR
========================= */
function renderProfile() {
    const p = profiles[currentProfile];
    $("#profileAvatar").textContent = p.initials;
    $("#profileName").textContent = p.name;
    $("#profileRole").textContent = p.role;
    $("#profileLocation").textContent = p.location;
    $("#profileCategory").textContent = p.category;
    $("#profileStage").textContent = p.stage;
    $("#profileIdea").textContent = p.idea;
    $("#currentProfileNumber").textContent = currentProfile + 1;
    $("#totalProfiles").textContent = profiles.length;
    $("#profileSkills").innerHTML = p.skills.map(s => `<span class="skill">${escapeHtml(s)}</span>`).join("");
}

function nextProfile(direction) {
    if (animating) return;
    animating = true;
    const card = $("#profileCard");
    const cls = direction === "left" ? "card-leave-left" : "card-leave-right";
    card.classList.add(cls);

    setTimeout(() => {
        currentProfile = (currentProfile + 1) % profiles.length;
        renderProfile();
        card.classList.remove(cls);
        animating = false;
    }, 240);
}

function rejectProfile() {
    if (animating) return;
    showToast("Perfil descartado", `Seguimos buscando después de ${profiles[currentProfile].name}.`);
    nextProfile("left");
}

function likeProfile() {
    if (animating) return;
    const p = profiles[currentProfile];

    if (matches.includes(p.name)) {
        showToast("Ya era un match", `${p.name} ya estaba en tus matches.`);
    } else if (!isPremium() && matches.length >= FREE_MATCH_LIMIT) {
        showToast("Límite alcanzado", `El plan Free permite hasta ${FREE_MATCH_LIMIT} matches. Pasate a Premium.`);
        return;
    } else {
        matches.push(p.name);
        saveMatches();
        if (settings.match) showToast("¡Nuevo match!", `${p.name} fue agregado a tus matches.`);
    }
    renderMatches();
    nextProfile("right");
}

$("#rejectButton").addEventListener("click", rejectProfile);
$("#likeButton").addEventListener("click", likeProfile);

// Atajos de teclado: ← descartar, → me interesa
document.addEventListener("keydown", e => {
    const typing = /INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName);
    if (typing || $(".modal-overlay.active") || !$("#discover").classList.contains("active")) return;
    if (e.key === "ArrowLeft") rejectProfile();
    if (e.key === "ArrowRight") likeProfile();
});

/* =========================
   MODALES
========================= */
function openInfoModal() {
    const p = profiles[currentProfile];
    $("#modalAvatar").textContent = p.initials;
    $("#modalName").textContent = p.name;
    $("#modalRole").textContent = p.role;
    $("#modalDescription").textContent = p.description;
    $("#modalLookingFor").textContent = p.lookingFor;
    $("#modalCategory").textContent = p.category;
    $("#modalStage").textContent = p.stage;
    $("#modalLocation").textContent = p.location;
    $("#infoModal").classList.add("active");
}

function openContactModal(profile) {
    if (!profile) return;
    $("#contactModal").dataset.profileName = profile.name;
    $("#contactName").textContent = profile.name;
    $("#contactModal").classList.add("active");
    setTimeout(() => $("#subject").focus(), 50);
}

function closeModal(modal) { modal?.classList.remove("active"); }

$("#infoButton").addEventListener("click", openInfoModal);
$("#contactButton").addEventListener("click", () => openContactModal(profiles[currentProfile]));
$("#contactFromInfo").addEventListener("click", () => {
    closeModal($("#infoModal"));
    openContactModal(profiles[currentProfile]);
});

$$("[data-close-modal]").forEach(b => b.addEventListener("click", () => closeModal(b.closest(".modal-overlay"))));
$$(".modal-overlay").forEach(m => m.addEventListener("click", e => { if (e.target === m) closeModal(m); }));
document.addEventListener("keydown", e => {
    if (e.key === "Escape") $$(".modal-overlay.active").forEach(closeModal);
});

$("#contactForm").addEventListener("submit", e => {
    e.preventDefault();
    const name = $("#contactModal").dataset.profileName;
    const subject = $("#subject").value.trim();
    const text = $("#message").value.trim();
    if (!byName(name) || !text) return;

    addMessage(name, "me", text, subject);
    $("#contactForm").reset();
    closeModal($("#contactModal"));
    showToast("Mensaje enviado", `Tu mensaje fue enviado a ${name}.`);
    showView("messages");
    openChat(name);
});

/* =========================
   MATCHES
========================= */
function renderMatches() {
    const grid = $("#matchesGrid");
    const q = $("#matchSearch").value.trim().toLowerCase();
    const filter = $("#matchFilter").value;

    const all = matches.map(byName).filter(Boolean);
    const contacted = all.filter(p => hasConversation(p.name));
    $("#totalMatchesCount").textContent = all.length;
    $("#newMatchesCount").textContent = all.length - contacted.length;
    $("#contactedMatchesCount").textContent = contacted.length;

    const list = all.filter(p => {
        const okFilter = filter === "all" || (filter === "contacted") === hasConversation(p.name);
        const okSearch = !q || `${p.name} ${p.role} ${p.category} ${p.location}`.toLowerCase().includes(q);
        return okFilter && okSearch;
    });

    if (!list.length) {
        const filtering = q || filter !== "all";
        grid.innerHTML = `
            <div class="empty-state">
                <span class="material-symbols-outlined">${filtering ? "search_off" : "handshake"}</span>
                <h3>${filtering ? "Sin resultados" : "Todavía no tenés matches"}</h3>
                <p>${filtering ? "Probá con otra búsqueda o filtro." : "Cuando marques un perfil como “Me interesa”, va a aparecer acá."}</p>
            </div>`;
        return;
    }

    grid.innerHTML = list.map(p => `
        <article class="match-card">
            <div class="match-card__top">
                <div class="match-avatar">${escapeHtml(p.initials)}</div>
                <div>
                    <h3>${escapeHtml(p.name)}</h3>
                    <p class="match-card__role">${escapeHtml(p.role)}</p>
                </div>
            </div>
            <p class="match-card__idea">${escapeHtml(p.idea)}</p>
            <div class="match-actions">
                <button class="primary-button" data-msg="${escapeHtml(p.name)}">${hasConversation(p.name) ? "Ver chat" : "Mensaje"}</button>
                <button class="danger-button" data-del="${escapeHtml(p.name)}">Eliminar</button>
            </div>
        </article>`).join("");
}

$("#matchesGrid").addEventListener("click", e => {
    const msg = e.target.closest("[data-msg]");
    const del = e.target.closest("[data-del]");
    if (msg) {
        const name = msg.dataset.msg;
        if (hasConversation(name)) { showView("messages"); openChat(name); }
        else openContactModal(byName(name));
    }
    if (del) {
        matches = matches.filter(n => n !== del.dataset.del);
        saveMatches();
        showToast("Match eliminado", `${del.dataset.del} fue eliminado de tus matches.`);
        renderMatches();
    }
});
$("#matchSearch").addEventListener("input", renderMatches);
$("#matchFilter").addEventListener("change", renderMatches);

/* =========================
   MENSAJES
========================= */
function addMessage(name, from, text, subject = "") {
    if (!conversations[name]) conversations[name] = { messages: [] };
    conversations[name].messages.push({ from, text, subject, date: new Date().toISOString() });
    saveConversations();

    if (from === "me") scheduleReply(name);
    renderMatches();
    renderConversations();
}

// Respuesta simulada para que el chat se sienta vivo
function scheduleReply(name) {
    setTimeout(() => {
        const reply = AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)];
        conversations[name].messages.push({ from: "them", text: reply, subject: "", date: new Date().toISOString() });
        saveConversations();
        renderConversations();
        if (settings.message && currentChat !== name) showToast("Mensaje nuevo", `${name} te respondió.`);
    }, 1500 + Math.random() * 1500);
}

function renderConversations() {
    const list = $("#conversationList");
    const q = $("#conversationSearch").value.trim().toLowerCase();

    const entries = Object.entries(conversations)
        .filter(([name, c]) => byName(name) && c.messages.length)
        .filter(([name]) => !q || name.toLowerCase().includes(q))
        .sort((a, b) => new Date(b[1].messages.at(-1).date) - new Date(a[1].messages.at(-1).date));

    if (!entries.length) {
        list.innerHTML = `
            <div class="empty-state compact">
                <span class="material-symbols-outlined">chat_bubble</span>
                <p>${q ? "Sin resultados." : "No hay conversaciones todavía."}</p>
            </div>`;
    } else {
        list.innerHTML = entries.map(([name, c]) => {
            const last = c.messages.at(-1);
            return `
            <button class="conversation-item${name === currentChat ? " active" : ""}" data-chat="${escapeHtml(name)}">
                <div class="conversation-avatar">${escapeHtml(byName(name).initials)}</div>
                <div class="conversation-info">
                    <strong>${escapeHtml(name)}</strong>
                    <span>${last.from === "me" ? "Vos: " : ""}${escapeHtml(last.text)}</span>
                </div>
            </button>`;
        }).join("");
    }

    if (currentChat && conversations[currentChat]) renderChatMessages();
}

function openChat(name) {
    const p = byName(name);
    if (!p || !conversations[name]) return;
    currentChat = name;

    $("#emptyChat").hidden = true;
    $("#chatContent").hidden = false;
    $("#chatAvatar").textContent = p.initials;
    $("#chatName").textContent = p.name;
    $("#chatRole").textContent = p.role;

    renderConversations();
    $("#chatMessageInput").focus();
}

function renderChatMessages() {
    const box = $("#chatMessages");
    box.innerHTML = conversations[currentChat].messages.map(m => `
        <div class="message-bubble ${m.from === "me" ? "sent" : "received"}">
            ${m.subject ? `<strong>${escapeHtml(m.subject)}</strong><br>` : ""}
            ${escapeHtml(m.text)}
            <small>${formatTime(m.date)}</small>
        </div>`).join("");
    box.scrollTop = box.scrollHeight;
}

$("#conversationList").addEventListener("click", e => {
    const item = e.target.closest("[data-chat]");
    if (item) openChat(item.dataset.chat);
});
$("#conversationSearch").addEventListener("input", renderConversations);

$("#chatForm").addEventListener("submit", e => {
    e.preventDefault();
    const input = $("#chatMessageInput");
    const text = input.value.trim();
    if (!text || !currentChat) return;
    addMessage(currentChat, "me", text);
    input.value = "";
    input.style.height = "";
});

// Enter envía, Shift+Enter hace salto de línea; el textarea crece solo
$("#chatMessageInput").addEventListener("keydown", e => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        $("#chatForm").requestSubmit();
    }
});
$("#chatMessageInput").addEventListener("input", e => {
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
});

/* =========================
   PROYECTOS
========================= */
function renderProjects() {
    const q = $("#projectSearch").value.trim().toLowerCase();
    const sort = $("#projectSort").value;

    const sorters = {
        matches: (a, b) => b.project.matches - a.project.matches,
        views: (a, b) => b.project.visits - a.project.visits,
        recent: (a, b) => profiles.indexOf(b) - profiles.indexOf(a)
    };

    const list = profiles
        .filter(p => !q || `${p.project.name} ${p.category} ${p.name} ${p.idea}`.toLowerCase().includes(q))
        .sort(sorters[sort]);

    $("#projectsGrid").innerHTML = list.length ? list.map((p, i) => `
        <article class="project-card">
            <span class="project-rank">#${i + 1}</span>
            <h3>${escapeHtml(p.project.name)}</h3>
            <p>${escapeHtml(p.idea)}</p>
            <div class="project-meta">
                <span class="badge green">${escapeHtml(p.category)}</span>
                <span class="badge">${escapeHtml(p.stage)}</span>
            </div>
            <div class="project-stats">
                <span class="project-stat"><span class="material-symbols-outlined">visibility</span>${p.project.visits.toLocaleString("es-AR")}</span>
                <span class="project-stat"><span class="material-symbols-outlined">handshake</span>${p.project.matches.toLocaleString("es-AR")}</span>
                <span class="project-stat">${escapeHtml(p.name)}</span>
            </div>
        </article>`).join("") : `
        <div class="empty-state" style="grid-column:1/-1">
            <span class="material-symbols-outlined">search_off</span>
            <h3>Sin resultados</h3>
            <p>No encontramos proyectos con esa búsqueda.</p>
        </div>`;
}
$("#projectSearch").addEventListener("input", renderProjects);
$("#projectSort").addEventListener("change", renderProjects);

/* =========================
   PREMIUM
========================= */
function renderPremiumButton() {
    $("#premiumButton").textContent = isPremium() ? "Cancelar Premium (demo)" : "Obtener Premium";
}

$("#premiumButton").addEventListener("click", () => {
    if (!loggedIn) {
        showToast("Iniciá sesión", "Necesitás una cuenta para activar Premium.");
        showView("profile");
        return;
    }
    user.plan = isPremium() ? "Free" : "Premium";
    saveUser();
    renderAccount();
    showToast(isPremium() ? "Premium activado" : "Plan Free", isPremium()
        ? "Demo: sin pago real. Ya no tenés límite de matches."
        : `Volviste al plan Free (máx. ${FREE_MATCH_LIMIT} matches).`);
});

/* =========================
   CONFIGURACIÓN
========================= */
const settingToggles = {
    darkModeToggle: "dark",
    matchNotifications: "match",
    messageNotifications: "message",
    emailNotifications: "email",
    publicProfileToggle: "public"
};

function applyDarkMode() { document.body.classList.toggle("dark-mode", settings.dark); }

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
   CUENTA (simulada, local)
========================= */
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
    renderPremiumButton();

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

function logout(e) {
    e?.preventDefault();
    if (!user) return;
    loggedIn = false;
    editingProfile = false;
    save("empreinSession", false);
    showToast("Sesión cerrada", "Tu cuenta sigue guardada para volver a entrar.");
    renderAccount();
    showAuthTab("login");
}
$("#logoutButton").addEventListener("click", logout);
$("#profileLogoutButton").addEventListener("click", logout);

/* =========================
   INICIAR
========================= */
applyDarkMode();
renderProfile();
renderMatches();
renderConversations();
renderProjects();
renderAccount();
if (isMobile()) $("#open-menu").checked = true;
showView(location.hash.slice(1) || "discover", false);