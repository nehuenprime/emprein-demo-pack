const profiles = [
    {
        name: "Lucía Fernández",
        initials: "LF",
        role: "UX / Product Designer",
        location: "Buenos Aires, Argentina",
        category: "EdTech",
        stage: "MVP",
        idea: "Una plataforma de aprendizaje accesible que adapta contenido educativo según las necesidades de cada estudiante.",
        description: "Estoy desarrollando una plataforma educativa enfocada en accesibilidad y personalización. La idea es ayudar a estudiantes que tienen diferentes ritmos y formas de aprendizaje usando tecnología, diseño inclusivo y herramientas inteligentes.",
        lookingFor: "Busco un desarrollador frontend o fullstack interesado en EdTech y accesibilidad para construir una primera versión pública del producto.",
        skills: ["UX Research", "Figma", "Product Design", "EdTech"],
        project: { name: "IncluLearn", visits: 4831, matches: 324 }
    },
    {
        name: "Martín López",
        initials: "ML",
        role: "Fullstack Developer",
        location: "Córdoba, Argentina",
        category: "SaaS",
        stage: "Prototipo",
        idea: "Software de gestión simple para pequeños negocios que todavía administran ventas, stock y clientes de forma manual.",
        description: "Quiero crear una plataforma SaaS enfocada en comercios chicos que necesitan digitalizarse pero encuentran demasiado complejas las herramientas actuales.",
        lookingFor: "Busco alguien con experiencia en ventas B2B o marketing que pueda ayudar a validar el producto con comercios reales.",
        skills: ["React", "Node.js", "PostgreSQL", "APIs"],
        project: { name: "PymeOS", visits: 3742, matches: 281 }
    },
    {
        name: "Ana Torres",
        initials: "AT",
        role: "Inversora Ángel",
        location: "Montevideo, Uruguay",
        category: "Investment",
        stage: "Inversión",
        idea: "Estoy buscando startups tecnológicas latinoamericanas con modelos escalables y equipos fundadores fuertes.",
        description: "Me interesa invertir principalmente en proyectos tecnológicos en etapa temprana. Busco equipos pequeños que ya hayan validado un problema real y tengan una visión clara de crecimiento.",
        lookingFor: "Startups de SaaS, inteligencia artificial, FinTech, logística o sustentabilidad que estén buscando capital inicial.",
        skills: ["Venture Capital", "Finanzas", "Startups", "Strategy"],
        project: { name: "Latam Seed Circle", visits: 2980, matches: 212 }
    },
    {
        name: "Lucas Pereira",
        initials: "LP",
        role: "Growth Marketer",
        location: "Rosario, Argentina",
        category: "MarTech",
        stage: "Validación",
        idea: "Una agencia que combina automatización e inteligencia artificial para ejecutar campañas de marketing para pequeñas empresas.",
        description: "El objetivo es reducir el costo operativo de una agencia tradicional automatizando investigación, generación de contenido y análisis de campañas.",
        lookingFor: "Busco un perfil técnico con interés en inteligencia artificial y automatización para desarrollar herramientas internas.",
        skills: ["Marketing", "Growth", "Analytics", "AI"],
        project: { name: "GrowPilot", visits: 2564, matches: 174 }
    },
    {
        name: "Sofía Ramírez",
        initials: "SR",
        role: "Data Scientist",
        location: "Santiago, Chile",
        category: "HealthTech",
        stage: "Investigación",
        idea: "Sistema predictivo que permita detectar patrones de riesgo en pacientes y ayudar a clínicas a anticiparse a complicaciones.",
        description: "Estoy investigando cómo aplicar modelos predictivos a información clínica para detectar tendencias y asistir a profesionales de salud en la toma de decisiones.",
        lookingFor: "Busco profesionales del sector salud y desarrolladores backend interesados en participar en una prueba de concepto.",
        skills: ["Python", "Machine Learning", "Data", "HealthTech"],
        project: { name: "CliniPredict", visits: 2218, matches: 159 }
    },
    {
        name: "Tomás Navarro",
        initials: "TN",
        role: "Emprendedor",
        location: "Madrid, España",
        category: "FinTech",
        stage: "Pre-seed",
        idea: "Una herramienta financiera para freelancers que automatiza presupuestos, seguimiento de ingresos y objetivos de ahorro.",
        description: "Muchos freelancers mezclan sus finanzas personales y profesionales. Estoy construyendo una herramienta sencilla para visualizar ingresos, gastos, impuestos y objetivos.",
        lookingFor: "Busco diseñador de producto e inversores interesados en soluciones financieras para trabajadores independientes.",
        skills: ["FinTech", "Business", "Sales", "Finance"],
        project: { name: "Freela", visits: 1988, matches: 143 }
    }
];

let currentProfile = 0;
let matches = JSON.parse(localStorage.getItem("empreinMatches")) || [];
let conversations = JSON.parse(localStorage.getItem("empreinConversations")) || {};
let savedUser = JSON.parse(localStorage.getItem("empreinUser")) || null;
let currentConversation = null;

const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);

const profileCard = $("#profileCard");
const profileAvatar = $("#profileAvatar");
const profileName = $("#profileName");
const profileRole = $("#profileRole");
const profileLocation = $("#profileLocation");
const profileCategory = $("#profileCategory");
const profileStage = $("#profileStage");
const profileIdea = $("#profileIdea");
const profileSkills = $("#profileSkills");
const currentProfileNumber = $("#currentProfileNumber");
const totalProfiles = $("#totalProfiles");
const rejectButton = $("#rejectButton");
const likeButton = $("#likeButton");
const infoButton = $("#infoButton");
const contactButton = $("#contactButton");
const infoModal = $("#infoModal");
const contactModal = $("#contactModal");
const contactForm = $("#contactForm");
const toast = $("#toast");
const toastTitle = $("#toastTitle");
const toastMessage = $("#toastMessage");
const sidebarItems = $$(".sidebar__item[data-view]");
const appSections = $$(".app-section");
const matchesGrid = $("#matchesGrid");
const conversationList = $("#conversationList");
const chat = $("#chat");
const projectsGrid = $("#projectsGrid");
const darkModeToggle = $("#darkModeToggle");
const premiumButton = $("#premiumButton");
const logoutButton = $("#logoutButton");
const registerForm = $("#registerForm");
const loginForm = $("#loginForm");
const accountContainer = $("#accountContainer");
const loggedProfile = $("#loggedProfile");

if (totalProfiles) totalProfiles.textContent = profiles.length;

/* =========================
   NAVEGACIÓN ENTRE SECCIONES
========================= */
sidebarItems.forEach(item => {
    item.addEventListener("click", event => {
        event.preventDefault();
        const view = item.dataset.view;

        sidebarItems.forEach(el => el.classList.remove("active"));
        item.classList.add("active");

        appSections.forEach(section => section.classList.remove("active"));
        const section = document.getElementById(view);
        if (section) section.classList.add("active");

        if (view === "matches") renderMatches();
        if (view === "messages") renderConversations();
        if (view === "projects") renderProjects();
        if (view === "profile") renderAccount();
    });
});

/* =========================
   DESCUBRIR
========================= */
function renderProfile() {
    const profile = profiles[currentProfile];
    if (!profile) return;

    if (profileAvatar) profileAvatar.textContent = profile.initials;
    if (profileName) profileName.textContent = profile.name;
    if (profileRole) profileRole.textContent = profile.role;
    if (profileLocation) profileLocation.textContent = profile.location;
    if (profileCategory) profileCategory.textContent = profile.category;
    if (profileStage) profileStage.textContent = profile.stage;
    if (profileIdea) profileIdea.textContent = profile.idea;

    if (profileSkills) {
        profileSkills.innerHTML = "";
        profile.skills.forEach(skill => {
            const span = document.createElement("span");
            span.className = "skill";
            span.textContent = skill;
            profileSkills.appendChild(span);
        });
    }

    if (currentProfileNumber) currentProfileNumber.textContent = currentProfile + 1;
}

function nextProfile(direction) {
    if (!profileCard) return;

    const animationClass = direction === "left"
        ? "card-leave-left"
        : "card-leave-right";

    profileCard.classList.add(animationClass);

    setTimeout(() => {
        currentProfile = (currentProfile + 1) % profiles.length;
        renderProfile();
        profileCard.classList.remove(animationClass);
    }, 240);
}

rejectButton?.addEventListener("click", () => {
    const profile = profiles[currentProfile];
    showToast("Perfil descartado", `Seguimos buscando después de ${profile.name}.`);
    nextProfile("left");
});

likeButton?.addEventListener("click", () => {
    const profile = profiles[currentProfile];
    const alreadyMatched = matches.some(match => match.name === profile.name);

    if (!alreadyMatched) {
        matches.push(profile);
        localStorage.setItem("empreinMatches", JSON.stringify(matches));
    }

    showToast(
        alreadyMatched ? "Ya era un match" : "¡Nuevo match!",
        alreadyMatched
            ? `${profile.name} ya estaba en tus matches.`
            : `${profile.name} fue agregado a tus matches.`
    );

    renderMatches();
    nextProfile("right");
});

/* =========================
   SABER MÁS
========================= */
infoButton?.addEventListener("click", openInfoModal);

function openInfoModal() {
    const profile = profiles[currentProfile];
    $("#modalAvatar").textContent = profile.initials;
    $("#modalName").textContent = profile.name;
    $("#modalRole").textContent = profile.role;
    $("#modalDescription").textContent = profile.description;
    $("#modalLookingFor").textContent = profile.lookingFor;
    $("#modalCategory").textContent = profile.category;
    $("#modalStage").textContent = profile.stage;
    $("#modalLocation").textContent = profile.location;
    infoModal?.classList.add("active");
}

/* =========================
   CONTACTAR
========================= */
contactButton?.addEventListener("click", () => {
    openContactModal(profiles[currentProfile]);
});

$("#contactFromInfo")?.addEventListener("click", () => {
    closeModal(infoModal);
    openContactModal(profiles[currentProfile]);
});

function openContactModal(profile) {
    if (!contactModal || !profile) return;
    contactModal.dataset.profileName = profile.name;
    $("#contactName").textContent = profile.name;
    contactModal.classList.add("active");
}

contactForm?.addEventListener("submit", event => {
    event.preventDefault();

    const targetName = contactModal.dataset.profileName;
    const profile = profiles.find(p => p.name === targetName) || matches.find(p => p.name === targetName);
    if (!profile) return;

    const subject = $("#subject")?.value.trim() || "";
    const text = $("#message")?.value.trim() || "";
    if (!text) return;

    if (!conversations[profile.name]) {
        conversations[profile.name] = { profile, messages: [] };
    }

    conversations[profile.name].messages.push({
        from: "me",
        subject,
        text,
        date: new Date().toISOString()
    });

    localStorage.setItem("empreinConversations", JSON.stringify(conversations));

    showToast("Mensaje enviado", `Tu mensaje fue enviado a ${profile.name}.`);
    contactForm.reset();
    closeModal(contactModal);
    renderConversations();
});

/* =========================
   MATCHES
========================= */
function renderMatches() {
    if (!matchesGrid) return;
    matchesGrid.innerHTML = "";

    if (matches.length === 0) {
        matchesGrid.innerHTML = `
            <div class="empty-state">
                <span class="material-symbols-outlined">handshake</span>
                <h3>Todavía no tenés matches</h3>
                <p>Explorá perfiles y marcá a alguien como interesante.</p>
            </div>
        `;
        return;
    }

    matches.forEach((profile, index) => {
        const card = document.createElement("article");
        card.className = "match-card";
        card.innerHTML = `
            <div class="match-avatar">${profile.initials}</div>
            <h3>${profile.name}</h3>
            <p>${profile.role}</p>
            <span class="match-meta">${profile.location}</span>
            <div class="match-actions">
                <button class="primary-button" data-message-index="${index}">Mensaje</button>
                <button class="remove-button" data-remove-index="${index}">Eliminar</button>
            </div>
        `;
        matchesGrid.appendChild(card);
    });

    matchesGrid.querySelectorAll("[data-message-index]").forEach(button => {
        button.addEventListener("click", () => {
            const profile = matches[Number(button.dataset.messageIndex)];
            openContactModal(profile);
        });
    });

    matchesGrid.querySelectorAll("[data-remove-index]").forEach(button => {
        button.addEventListener("click", () => removeMatch(Number(button.dataset.removeIndex)));
    });
}

function removeMatch(index) {
    const removed = matches[index];
    matches.splice(index, 1);
    localStorage.setItem("empreinMatches", JSON.stringify(matches));
    showToast("Match eliminado", `${removed.name} fue eliminado de tus matches.`);
    renderMatches();
}

/* =========================
   MENSAJES
========================= */
function renderConversations() {
    if (!conversationList || !chat) return;

    conversationList.innerHTML = "";
    const entries = Object.values(conversations);

    if (entries.length === 0) {
        conversationList.innerHTML = `
            <div class="empty-state compact">
                <span class="material-symbols-outlined">chat</span>
                <p>Todavía no enviaste mensajes.</p>
            </div>
        `;
        chat.innerHTML = `
            <div class="empty-chat">
                <span class="material-symbols-outlined">chat</span>
                <p>Seleccioná una conversación</p>
            </div>
        `;
        return;
    }

    entries.forEach(entry => {
        const button = document.createElement("button");
        button.className = "conversation-item";
        const last = entry.messages[entry.messages.length - 1];
        button.innerHTML = `
            <div class="conversation-avatar">${entry.profile.initials}</div>
            <div>
                <strong>${entry.profile.name}</strong>
                <span>${last?.text || "Sin mensajes"}</span>
            </div>
        `;

        button.addEventListener("click", () => {
            currentConversation = entry.profile.name;
            renderChat(entry.profile.name);
        });

        conversationList.appendChild(button);
    });

    if (currentConversation && conversations[currentConversation]) {
        renderChat(currentConversation);
    }
}

function renderChat(profileName) {
    const conversation = conversations[profileName];
    if (!conversation || !chat) return;

    currentConversation = profileName;
    chat.innerHTML = `
        <div class="chat-header">
            <div class="conversation-avatar">${conversation.profile.initials}</div>
            <div>
                <strong>${conversation.profile.name}</strong>
                <span>${conversation.profile.role}</span>
            </div>
        </div>
        <div class="chat-messages" id="chatMessages"></div>
        <form class="chat-form" id="chatForm">
            <input type="text" id="chatInput" placeholder="Escribí un mensaje..." autocomplete="off" required>
            <button type="submit" class="primary-button">Enviar</button>
        </form>
    `;

    const messagesContainer = $("#chatMessages");
    conversation.messages.forEach(message => {
        const bubble = document.createElement("div");
        bubble.className = message.from === "me" ? "message-bubble mine" : "message-bubble";
        bubble.innerHTML = `
            ${message.subject ? `<small>${message.subject}</small>` : ""}
            <p>${message.text}</p>
        `;
        messagesContainer.appendChild(bubble);
    });

    $("#chatForm")?.addEventListener("submit", event => {
        event.preventDefault();
        const input = $("#chatInput");
        const text = input.value.trim();
        if (!text) return;

        conversations[profileName].messages.push({
            from: "me",
            text,
            date: new Date().toISOString()
        });

        localStorage.setItem("empreinConversations", JSON.stringify(conversations));
        input.value = "";
        renderChat(profileName);
    });
}

/* =========================
   PROYECTOS
========================= */
function renderProjects() {
    if (!projectsGrid) return;

    const sorted = [...profiles].sort((a, b) => b.project.matches - a.project.matches);
    projectsGrid.innerHTML = "";

    sorted.forEach((profile, index) => {
        const project = document.createElement("article");
        project.className = "project-card";
        project.innerHTML = `
            <div class="project-ranking">#${index + 1}</div>
            <span class="project-category">${profile.category}</span>
            <h3>${profile.project.name}</h3>
            <p>${profile.idea}</p>
            <div class="project-stats">
                <span>👁 ${profile.project.visits.toLocaleString("es-AR")} visitas</span>
                <span>🤝 ${profile.project.matches.toLocaleString("es-AR")} matches</span>
            </div>
            <div class="project-owner">${profile.initials}<span>${profile.name}</span></div>
        `;
        projectsGrid.appendChild(project);
    });
}

/* =========================
   PREMIUM
========================= */
premiumButton?.addEventListener("click", () => {
    showToast("Emprein Premium", "El sistema de pagos llegará próximamente.");
});

/* =========================
   MODO OSCURO
========================= */
const savedDarkMode = localStorage.getItem("empreinDarkMode") === "true";

if (savedDarkMode) {
    document.body.classList.add("dark-mode");
    if (darkModeToggle) darkModeToggle.checked = true;
}

darkModeToggle?.addEventListener("change", () => {
    document.body.classList.toggle("dark-mode", darkModeToggle.checked);
    localStorage.setItem("empreinDarkMode", darkModeToggle.checked);
});

/* =========================
   CUENTA / LOGIN SIMBÓLICO
========================= */
function renderAccount() {
    const registerBlock = $("#registerBlock");
    const loginBlock = $("#loginBlock");

    if (savedUser) {
        if (registerBlock) registerBlock.style.display = "none";
        if (loginBlock) loginBlock.style.display = "none";

        if (loggedProfile) {
            loggedProfile.style.display = "block";
            const name = loggedProfile.querySelector("[data-account-name]");
            const email = loggedProfile.querySelector("[data-account-email]");
            const role = loggedProfile.querySelector("[data-account-role]");
            if (name) name.textContent = savedUser.name;
            if (email) email.textContent = savedUser.email;
            if (role) role.textContent = savedUser.role || "Sin rol";
        }
    } else {
        if (registerBlock) registerBlock.style.display = "";
        if (loginBlock) loginBlock.style.display = "";
        if (loggedProfile) loggedProfile.style.display = "none";
    }
}

registerForm?.addEventListener("submit", event => {
    event.preventDefault();

    const user = {
        name: $("#accountName")?.value.trim(),
        email: $("#accountEmail")?.value.trim(),
        password: $("#accountPassword")?.value,
        role: $("#accountRole")?.value.trim()
    };

    localStorage.setItem("empreinUser", JSON.stringify(user));
    savedUser = user;
    showToast("Cuenta creada", `Bienvenido a Emprein, ${user.name}.`);
    renderAccount();
});

loginForm?.addEventListener("submit", event => {
    event.preventDefault();

    const email = $("#loginEmail")?.value.trim();
    const password = $("#loginPassword")?.value;
    const stored = JSON.parse(localStorage.getItem("empreinUser"));

    if (stored && stored.email === email && stored.password === password) {
        savedUser = stored;
        showToast("Sesión iniciada", `Hola de nuevo, ${stored.name}.`);
        renderAccount();
    } else {
        showToast("No pudimos entrar", "Email o contraseña incorrectos.");
    }
});

logoutButton?.addEventListener("click", event => {
    event.preventDefault();
    savedUser = null;
    showToast("Sesión cerrada", "Tu cuenta sigue guardada para volver a iniciar sesión.");
    renderAccount();
});

/* =========================
   MODALES
========================= */
$$('[data-close-modal]').forEach(button => {
    button.addEventListener("click", () => {
        closeModal(button.closest(".modal-overlay"));
    });
});

$$('.modal-overlay').forEach(modal => {
    modal.addEventListener("click", event => {
        if (event.target === modal) closeModal(modal);
    });
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        $$(".modal-overlay.active").forEach(modal => closeModal(modal));
    }
});

function closeModal(modal) {
    modal?.classList.remove("active");
}

/* =========================
   TOAST
========================= */
let toastTimeout;

function showToast(title, message) {
    if (!toast) return;

    toastTitle.textContent = title;
    toastMessage.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => toast.classList.remove("show"), 2800);
}

/* =========================
   INICIAR
========================= */
renderProfile();
renderMatches();
renderConversations();
renderProjects();
renderAccount();


/* =========================
   SIDEBAR RESPONSIVE
========================= */

const sidebarToggle = document.getElementById("open-menu");

let empreinViewportMode = null;

function getEmpreinViewportMode() {
    if (window.innerWidth <= 700) return "mobile";
    if (window.innerWidth <= 1100) return "tablet";
    return "desktop";
}

function syncResponsiveSidebar() {
    if (!sidebarToggle) return;

    const newMode = getEmpreinViewportMode();

    // Solo cambiamos automáticamente el estado cuando cruzamos
    // de desktop/tablet/mobile. Así no pisamos lo que el usuario
    // haga manualmente mientras permanece en el mismo tamaño.
    if (newMode === empreinViewportMode) return;

    empreinViewportMode = newMode;

    if (newMode === "desktop") {
        // Desktop: sidebar abierto.
        sidebarToggle.checked = false;
    } else {
        // Tablet: compacto.
        // Mobile: drawer cerrado hasta tocar el botón menú.
        sidebarToggle.checked = true;
    }
}

syncResponsiveSidebar();

let responsiveResizeTimer;

window.addEventListener("resize", () => {
    clearTimeout(responsiveResizeTimer);

    responsiveResizeTimer = setTimeout(() => {
        syncResponsiveSidebar();
    }, 120);
});


// En celular, al elegir una sección cerramos automáticamente el drawer.
sidebarItems.forEach(item => {
    item.addEventListener("click", () => {
        if (
            sidebarToggle &&
            window.innerWidth <= 700
        ) {
            sidebarToggle.checked = true;

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    });
});


// Al abrir una conversación desde celular, acercamos el chat a pantalla.
document.addEventListener("click", event => {
    if (window.innerWidth > 700) return;

    const conversationItem =
        event.target.closest(".conversation-item");

    if (!conversationItem) return;

    setTimeout(() => {
        const chatPanel =
            document.getElementById("chatPanel");

        chatPanel?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }, 80);
});
