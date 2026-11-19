"use strict";

// index.html está en la raíz; el resto de las páginas en /pages/
const PAGES_DIR = location.pathname.includes("/pages/") ? "" : "pages/";

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
const formatTime = iso => new Date(iso).toLocaleTimeString(LOCALES[LANG], { hour: "2-digit", minute: "2-digit" });

async function hashPassword(text) {
    if (!crypto?.subtle) return btoa(unescape(encodeURIComponent(text)));
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
    return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, "0")).join("");
}

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

let toastTimeout;
function showToast(title, message) {
    $("#toastTitle").textContent = title;
    $("#toastMessage").textContent = message;
    $("#toast").classList.add("show");
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => $("#toast").classList.remove("show"), 2800);
}


/* =========================
   COMÚN A TODAS LAS PÁGINAS
========================= */
function applyDarkMode() { document.body.classList.toggle("dark-mode", settings.dark); }

function renderSidebarAccount() {
    const avatar = $("#sidebarProfileAvatar"), name = $("#sidebarProfileName");
    if (avatar) avatar.textContent = loggedIn ? initialsOf(user.name) : "👤";
    if (name) name.textContent = loggedIn ? user.name.split(" ")[0] : "Mi perfil";
}

// Los mensajes y respuestas simuladas viven en localStorage, así sobreviven al cambiar de página
function addMessage(name, from, text, subject = "") {
    if (!conversations[name]) conversations[name] = { messages: [] };
    conversations[name].messages.push({ id: newId(), from, text, subject, date: new Date().toISOString() });
    if (from === "me") conversations[name].replyAt = Date.now() + 1500 + Math.random() * 1500;
    saveConversations();
    deliverReplies();
    window.renderMatches?.();
    window.renderConversations?.();
}

function deliverReplies() {
    let changed = false;
    Object.entries(conversations).forEach(([name, c]) => {
        if (!c.replyAt) return;
        const wait = c.replyAt - Date.now();
        if (wait > 0) { setTimeout(deliverReplies, wait + 50); return; }
        const reply = t(AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)]);
        c.messages.push({ id: newId(), from: "them", text: reply, subject: "", date: new Date().toISOString() });
        delete c.replyAt;
        changed = true;
        if (settings.message && currentChat !== name) showToast("Mensaje nuevo", `${name} te respondió.`);
    });
    if (changed) {
        saveConversations();
        window.renderConversations?.();
        window.renderMatches?.();
    }
}

const newId = () => "m" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

// Los mensajes viejos no tenían id: se lo asignamos para poder borrarlos y reaccionar
function ensureMessageIds() {
    let changed = false;
    Object.values(conversations).forEach(c => c.messages.forEach(m => {
        if (!m.id) { m.id = newId(); changed = true; }
    }));
    if (changed) saveConversations();
}

function logout(e) {
    e?.preventDefault();
    if (!loggedIn) return;
    loggedIn = false;
    editingProfile = false;
    save("empreinSession", false);
    showToast("Sesión cerrada", "Tu cuenta sigue guardada para volver a entrar.");
    (window.renderAccount || renderSidebarAccount)();
    window.showAuthTab?.("login");
}

function openContactModal(profile) {
    const modal = $("#contactModal");
    if (!modal || !profile) return;
    modal.dataset.profileName = profile.name;
    $("#contactName").textContent = profile.name;
    modal.classList.add("active");
    setTimeout(() => $("#subject")?.focus(), 50);
}

function closeModal(modal) { modal?.classList.remove("active"); }

// Los ítems del sidebar navegan al hacer clic en cualquier parte del ítem
$$(".sidebar__item:not(#logoutButton)").forEach(item => {
    item.addEventListener("click", e => {
        if (!e.target.closest("a")) item.querySelector("a")?.click();
    });
});
$("#logoutButton")?.addEventListener("click", logout);

$$("[data-close-modal]").forEach(b => b.addEventListener("click", () => closeModal(b.closest(".modal-overlay"))));
$$(".modal-overlay").forEach(m => m.addEventListener("click", e => { if (e.target === m) closeModal(m); }));
document.addEventListener("keydown", e => {
    if (e.key === "Escape") $$(".modal-overlay.active").forEach(closeModal);
});

$("#contactForm")?.addEventListener("submit", e => {
    e.preventDefault();
    const name = $("#contactModal").dataset.profileName;
    const subject = $("#subject").value.trim();
    const text = $("#message").value.trim();
    if (!byName(name) || !text) return;
    addMessage(name, "me", text, subject);
    location.href = PAGES_DIR + "mensajes.html?chat=" + encodeURIComponent(name);
});

applyDarkMode();
renderSidebarAccount();
ensureMessageIds();
deliverReplies();
if (isMobile()) $("#open-menu").checked = true; // checked = menú cerrado
