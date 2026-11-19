"use strict";

/* =========================
    IDIOMAS
    Para agregar uno nuevo (ej. francés):
    1) sumalo en LANGUAGES y LOCALES
    2) agregá un bloque fr: { ... } en TRANSLATIONS con las mismas claves
    Las claves son el texto original en español; "{0}" marca valores variables (nombres, números).
========================= */
const LANGUAGES = { es: "Español", en: "English", pt: "Português" };
const LOCALES = { es: "es-AR", en: "en-US", pt: "pt-BR" };

const TRANSLATIONS = {
    en: {
        "Descubrir": "Discover", "Mensajes": "Messages", "Proyectos": "Projects", "Configuración": "Settings",
        "Mi perfil": "My profile", "Salir": "Log out", "Contraer menú": "Collapse menu", "Abrir menú": "Open menu",
        "Cerrar menú": "Close menu", "Listo": "Done", "Acción realizada.": "Action completed.", "Conectá ideas": "Connect ideas",

        "DESCUBRIR": "DISCOVER", "Encontrá personas para": "Find people to", "hacer crecer una idea.": "grow an idea.",
        "Conectá con emprendedores, desarrolladores, diseñadores, inversores y profesionales.": "Connect with entrepreneurs, developers, designers, investors and professionals.",
        "Disponible": "Available", "Descartar": "Skip", "Saber más": "Learn more", "Contactar": "Contact", "Me interesa": "Interested",
        "SOBRE EL PROYECTO": "ABOUT THE PROJECT", "ESTÁ BUSCANDO": "LOOKING FOR", "Categoría": "Category", "Etapa": "Stage",
        "Ubicación": "Location", "NUEVA CONEXIÓN": "NEW CONNECTION", "Contactar a": "Contact",
        "Presentate brevemente y contale por qué te interesa conectar.": "Briefly introduce yourself and tell them why you want to connect.",
        "Asunto": "Subject", "Ej: Me interesa colaborar con tu proyecto": "E.g. I'm interested in collaborating on your project",
        "Mensaje": "Message", "Hola, vi tu proyecto y me interesó porque...": "Hi, I saw your project and it caught my interest because...",
        "Enviar mensaje": "Send message",
        "Perfil descartado": "Profile skipped", "Seguimos buscando después de {0}.": "We'll keep looking after {0}.",
        "Ya era un match": "Already a match", "{0} ya estaba en tus matches.": "{0} was already in your matches.",
        "Límite alcanzado": "Limit reached", "El plan Free permite hasta {0} matches. Pasate a Premium.": "The Free plan allows up to {0} matches. Upgrade to Premium.",
        "¡Nuevo match!": "New match!", "{0} fue agregado a tus matches.": "{0} was added to your matches.",

        "Tus conexiones": "Your connections", "Personas con las que marcaste interés y querés seguir en contacto.": "People you showed interest in and want to stay in touch with.",
        "Nuevos": "New", "Contactados": "Contacted", "Buscar un match...": "Search a match...", "Filtrar matches": "Filter matches", "Todos": "All",
        "Todavía no tenés matches": "You have no matches yet",
        "Cuando marques un perfil como “Me interesa”, va a aparecer acá.": "When you mark a profile as “Interested”, it will show up here.",
        "Sin resultados": "No results", "Probá con otra búsqueda o filtro.": "Try a different search or filter.",
        "Ver chat": "View chat", "Eliminar": "Delete", "Match eliminado": "Match removed", "{0} fue eliminado de tus matches.": "{0} was removed from your matches.",

        "MENSAJES": "MESSAGES", "Conversaciones": "Conversations", "Tus conversaciones con matches y personas que contactaste.": "Your conversations with matches and people you contacted.",
        "Buscar conversación...": "Search conversation...", "No hay conversaciones todavía.": "No conversations yet.",
        "Seleccioná una conversación": "Select a conversation", "Tus mensajes con esa persona aparecerán acá.": "Your messages with this person will appear here.",
        "Escribí un mensaje...": "Write a message...", "Destacar": "Pin", "Destacar conversación": "Pin conversation",
        "Eliminar conversación": "Delete conversation", "Destacada": "Pinned", "Quitar de destacadas": "Unpin", "Sin resultados.": "No results.",
        "Vos:": "You:", "Reaccionar con {0}": "React with {0}", "Eliminar mensaje": "Delete message", "Quitar reacción": "Remove reaction",
        "¿Eliminar este mensaje? Esta acción no se puede deshacer.": "Delete this message? This can't be undone.",
        "Mensaje eliminado": "Message deleted", "El mensaje fue borrado de la conversación.": "The message was removed from the conversation.",
        "Conversación destacada": "Conversation pinned", "{0} aparece primero en tu lista.": "{0} now appears first in your list.",
        "Destacado quitado": "Pin removed", "{0} volvió a su lugar.": "{0} went back to its place.",
        "Conversación eliminada": "Conversation deleted", "Se borró el chat con {0}.": "The chat with {0} was deleted.",
        "¿Eliminar la conversación con {0}? Se borrarán todos sus mensajes.": "Delete the conversation with {0}? All its messages will be deleted.",
        "Mensaje nuevo": "New message", "{0} te respondió.": "{0} replied to you.",
        "¡Hola! Gracias por escribirme, me encantó tu mensaje. ¿Te parece si coordinamos una llamada?": "Hi! Thanks for writing, I loved your message. Shall we set up a call?",
        "Qué bueno que nos conectemos. Contame un poco más sobre lo que estás construyendo.": "Great that we connected. Tell me a bit more about what you're building.",
        "¡Gracias por contactarme! Justo estaba buscando alguien con tu perfil.": "Thanks for reaching out! I was just looking for someone with your profile.",
        "Me interesa la propuesta. ¿Tenés disponibilidad esta semana para charlar?": "I'm interested in the proposal. Are you available this week to chat?",

        "PROYECTOS": "PROJECTS", "Proyectos destacados": "Featured projects", "Descubrí las ideas que más visitas y conexiones están generando.": "Discover the ideas getting the most visits and connections.",
        "Buscar proyecto...": "Search project...", "Ordenar proyectos": "Sort projects", "Más matches": "Most matches", "Más visitas": "Most visits",
        "Más recientes": "Most recent", "No encontramos proyectos con esa búsqueda.": "We couldn't find projects for that search.",

        "Elegí el plan que más te sirva": "Choose the plan that suits you best",
        "Empezá gratis y actualizá cuando quieras llevar tus conexiones más lejos.": "Start for free and upgrade whenever you want to take your connections further.",
        "para siempre": "forever", "Para conocer Emprein y empezar a generar conexiones.": "To get to know Emprein and start making connections.",
        "10 perfiles diarios": "10 daily profiles", "Hasta 5 matches": "Up to 5 matches", "Mensajes básicos": "Basic messages", "Crear 1 proyecto": "Create 1 project",
        "Estadísticas avanzadas": "Advanced statistics", "Proyecto destacado": "Featured project", "Plan actual": "Current plan", "RECOMENDADO": "RECOMMENDED",
        "por mes": "per month", "Para quienes quieren conseguir más oportunidades y hacer crecer sus proyectos.": "For those who want more opportunities and to grow their projects.",
        "Perfiles ilimitados": "Unlimited profiles", "Matches ilimitados": "Unlimited matches", "Mensajes ilimitados": "Unlimited messages",
        "Saber quién mostró interés": "See who showed interest", "Destacar proyectos": "Feature your projects", "Badge Premium": "Premium badge",
        "Estadísticas de visitas": "Visit statistics", "Obtener Premium": "Get Premium", "Cancelar Premium (demo)": "Cancel Premium (demo)",
        "Iniciá sesión": "Log in first", "Necesitás una cuenta para activar Premium.": "You need an account to activate Premium.",
        "Premium activado": "Premium activated", "Demo: sin pago real. Ya no tenés límite de matches.": "Demo: no real payment. You no longer have a match limit.",
        "Plan Free": "Free plan", "Volviste al plan Free (máx. {0} matches).": "You're back on the Free plan (max. {0} matches).",

        "CONFIGURACIÓN": "SETTINGS", "Preferencias": "Preferences", "Personalizá cómo querés usar Emprein.": "Customize how you want to use Emprein.",
        "Apariencia": "Appearance", "Elegí cómo querés ver Emprein.": "Choose how you want to see Emprein.", "Modo oscuro": "Dark mode",
        "Alterná entre el tema claro y oscuro.": "Switch between the light and dark theme.", "Idioma": "Language",
        "Elegí el idioma de la aplicación.": "Choose the app language.", "Se aplica a toda la aplicación.": "Applies to the whole app.",

        "PERFIL": "PROFILE", "Tu cuenta": "Your account", "Creá un perfil simbólico para probar el flujo de registro, sesión y cierre de sesión.": "Create a demo profile to try the sign-up, login and logout flow.",
        "Crear cuenta": "Create account", "Iniciar sesión": "Log in", "Armá tu perfil para empezar a conectar.": "Build your profile to start connecting.",
        "Nombre completo": "Full name", "Contraseña": "Password", "Rol": "Role", "Ej: Desarrollador, emprendedor, inversor...": "E.g. Developer, entrepreneur, investor...",
        "Idea o proyecto": "Idea or project", "Contá brevemente qué estás construyendo o qué buscás.": "Briefly tell us what you're building or looking for.",
        "Ingresá con la cuenta que creaste en este navegador.": "Log in with the account you created in this browser.", "Entrar": "Log in",
        "Esta cuenta será solo una simulación local. No usaremos autenticación real todavía.": "This account is just a local simulation. We won't use real authentication yet.",
        "Perfil activo": "Active profile", "Idea / proyecto": "Idea / project", "Tu idea aparecerá acá.": "Your idea will appear here.",
        "Editar perfil": "Edit profile", "Cerrar sesión": "Log out", "Sin rol": "No role", "Todavía no cargaste tu idea.": "You haven't added your idea yet.",
        "Dejalo vacío para mantener la actual": "Leave empty to keep the current one", "Contraseña débil": "Weak password",
        "Usá al menos 6 caracteres.": "Use at least 6 characters.", "Perfil actualizado": "Profile updated", "Tus cambios se guardaron.": "Your changes were saved.",
        "Cuenta creada": "Account created", "Bienvenido a Emprein, {0}.": "Welcome to Emprein, {0}.", "No pudimos entrar": "We couldn't log you in",
        "Email o contraseña incorrectos.": "Incorrect email or password.", "Sesión iniciada": "Logged in", "Hola de nuevo, {0}.": "Welcome back, {0}.",
        "Sesión cerrada": "Logged out", "Tu cuenta sigue guardada para volver a entrar.": "Your account is still saved so you can log back in."
    },

    pt: {
        "Descubrir": "Descobrir", "Mensajes": "Mensagens", "Proyectos": "Projetos", "Configuración": "Configurações",
        "Mi perfil": "Meu perfil", "Salir": "Sair", "Contraer menú": "Recolher menu", "Abrir menú": "Abrir menu",
        "Cerrar menú": "Fechar menu", "Listo": "Pronto", "Acción realizada.": "Ação concluída.", "Conectá ideas": "Conecte ideias",

        "DESCUBRIR": "DESCOBRIR", "Encontrá personas para": "Encontre pessoas para", "hacer crecer una idea.": "fazer uma ideia crescer.",
        "Conectá con emprendedores, desarrolladores, diseñadores, inversores y profesionales.": "Conecte-se com empreendedores, desenvolvedores, designers, investidores e profissionais.",
        "Disponible": "Disponível", "IDEA": "IDEIA", "Descartar": "Descartar", "Saber más": "Saber mais", "Contactar": "Contatar", "Me interesa": "Tenho interesse",
        "SOBRE EL PROYECTO": "SOBRE O PROJETO", "ESTÁ BUSCANDO": "ESTÁ PROCURANDO", "Categoría": "Categoria", "Ubicación": "Localização",
        "NUEVA CONEXIÓN": "NOVA CONEXÃO", "Contactar a": "Contatar",
        "Presentate brevemente y contale por qué te interesa conectar.": "Apresente-se brevemente e conte por que você quer se conectar.",
        "Asunto": "Assunto", "Ej: Me interesa colaborar con tu proyecto": "Ex: Tenho interesse em colaborar com o seu projeto",
        "Mensaje": "Mensagem", "Hola, vi tu proyecto y me interesó porque...": "Olá, vi o seu projeto e me interessei porque...",
        "Enviar mensaje": "Enviar mensagem",
        "Perfil descartado": "Perfil descartado", "Seguimos buscando después de {0}.": "Continuamos procurando depois de {0}.",
        "Ya era un match": "Já era um match", "{0} ya estaba en tus matches.": "{0} já estava nos seus matches.",
        "Límite alcanzado": "Limite atingido", "El plan Free permite hasta {0} matches. Pasate a Premium.": "O plano Free permite até {0} matches. Assine o Premium.",
        "¡Nuevo match!": "Novo match!", "{0} fue agregado a tus matches.": "{0} foi adicionado aos seus matches.",

        "Tus conexiones": "Suas conexões", "Personas con las que marcaste interés y querés seguir en contacto.": "Pessoas em quem você demonstrou interesse e com quem quer manter contato.",
        "Nuevos": "Novos", "Contactados": "Contatados", "Buscar un match...": "Buscar um match...", "Todavía no tenés matches": "Você ainda não tem matches",
        "Cuando marques un perfil como “Me interesa”, va a aparecer acá.": "Quando você marcar um perfil como “Tenho interesse”, ele vai aparecer aqui.",
        "Sin resultados": "Sem resultados", "Probá con otra búsqueda o filtro.": "Tente outra busca ou filtro.",
        "Eliminar": "Excluir", "Match eliminado": "Match removido", "{0} fue eliminado de tus matches.": "{0} foi removido dos seus matches.",

        "MENSAJES": "MENSAGENS", "Conversaciones": "Conversas", "Tus conversaciones con matches y personas que contactaste.": "Suas conversas com matches e pessoas que você contatou.",
        "Buscar conversación...": "Buscar conversa...", "No hay conversaciones todavía.": "Ainda não há conversas.",
        "Seleccioná una conversación": "Selecione uma conversa", "Tus mensajes con esa persona aparecerán acá.": "Suas mensagens com essa pessoa vão aparecer aqui.",
        "Escribí un mensaje...": "Escreva uma mensagem...", "Destacar conversación": "Destacar conversa", "Eliminar conversación": "Excluir conversa",
        "Quitar de destacadas": "Remover dos destaques", "Sin resultados.": "Sem resultados.", "Vos:": "Você:", "Reaccionar con {0}": "Reagir com {0}",
        "Eliminar mensaje": "Excluir mensagem", "Quitar reacción": "Remover reação",
        "¿Eliminar este mensaje? Esta acción no se puede deshacer.": "Excluir esta mensagem? Esta ação não pode ser desfeita.",
        "Mensaje eliminado": "Mensagem excluída", "El mensaje fue borrado de la conversación.": "A mensagem foi removida da conversa.",
        "Conversación destacada": "Conversa destacada", "{0} aparece primero en tu lista.": "{0} aparece primeiro na sua lista.",
        "Destacado quitado": "Destaque removido", "{0} volvió a su lugar.": "{0} voltou ao seu lugar.",
        "Conversación eliminada": "Conversa excluída", "Se borró el chat con {0}.": "O chat com {0} foi excluído.",
        "¿Eliminar la conversación con {0}? Se borrarán todos sus mensajes.": "Excluir a conversa com {0}? Todas as mensagens serão apagadas.",
        "Mensaje nuevo": "Nova mensagem", "{0} te respondió.": "{0} respondeu a você.",
        "¡Hola! Gracias por escribirme, me encantó tu mensaje. ¿Te parece si coordinamos una llamada?": "Olá! Obrigado por escrever, adorei a sua mensagem. Que tal marcarmos uma ligação?",
        "Qué bueno que nos conectemos. Contame un poco más sobre lo que estás construyendo.": "Que bom que nos conectamos. Conte um pouco mais sobre o que você está construindo.",
        "¡Gracias por contactarme! Justo estaba buscando alguien con tu perfil.": "Obrigado por entrar em contato! Eu estava mesmo procurando alguém com o seu perfil.",
        "Me interesa la propuesta. ¿Tenés disponibilidad esta semana para charlar?": "Tenho interesse na proposta. Você tem disponibilidade esta semana para conversar?",

        "PROYECTOS": "PROJETOS", "Proyectos destacados": "Projetos em destaque", "Descubrí las ideas que más visitas y conexiones están generando.": "Descubra as ideias que mais geram visitas e conexões.",
        "Buscar proyecto...": "Buscar projeto...", "Ordenar proyectos": "Ordenar projetos", "Más matches": "Mais matches", "Más visitas": "Mais visitas",
        "Más recientes": "Mais recentes", "No encontramos proyectos con esa búsqueda.": "Não encontramos projetos para essa busca.",

        "Elegí el plan que más te sirva": "Escolha o plano que mais combina com você",
        "Empezá gratis y actualizá cuando quieras llevar tus conexiones más lejos.": "Comece grátis e faça o upgrade quando quiser levar suas conexões mais longe.",
        "para siempre": "para sempre", "Para conocer Emprein y empezar a generar conexiones.": "Para conhecer o Emprein e começar a gerar conexões.",
        "10 perfiles diarios": "10 perfis por dia", "Hasta 5 matches": "Até 5 matches", "Mensajes básicos": "Mensagens básicas", "Crear 1 proyecto": "Criar 1 projeto",
        "Estadísticas avanzadas": "Estatísticas avançadas", "Proyecto destacado": "Projeto em destaque", "Plan actual": "Plano atual", "RECOMENDADO": "RECOMENDADO",
        "por mes": "por mês", "Para quienes quieren conseguir más oportunidades y hacer crecer sus proyectos.": "Para quem quer mais oportunidades e fazer seus projetos crescerem.",
        "Perfiles ilimitados": "Perfis ilimitados", "Matches ilimitados": "Matches ilimitados", "Mensajes ilimitados": "Mensagens ilimitadas",
        "Saber quién mostró interés": "Saber quem demonstrou interesse", "Destacar proyectos": "Destacar projetos", "Badge Premium": "Selo Premium",
        "Estadísticas de visitas": "Estatísticas de visitas", "Obtener Premium": "Obter Premium", "Cancelar Premium (demo)": "Cancelar Premium (demo)",
        "Iniciá sesión": "Faça login", "Necesitás una cuenta para activar Premium.": "Você precisa de uma conta para ativar o Premium.",
        "Premium activado": "Premium ativado", "Demo: sin pago real. Ya no tenés límite de matches.": "Demo: sem pagamento real. Você não tem mais limite de matches.",
        "Plan Free": "Plano Free", "Volviste al plan Free (máx. {0} matches).": "Você voltou ao plano Free (máx. {0} matches).",

        "CONFIGURACIÓN": "CONFIGURAÇÕES", "Preferencias": "Preferências", "Personalizá cómo querés usar Emprein.": "Personalize como você quer usar o Emprein.",
        "Apariencia": "Aparência", "Elegí cómo querés ver Emprein.": "Escolha como você quer ver o Emprein.", "Modo oscuro": "Modo escuro",
        "Alterná entre el tema claro y oscuro.": "Alterne entre o tema claro e o escuro.", "Idioma": "Idioma",
        "Elegí el idioma de la aplicación.": "Escolha o idioma do aplicativo.", "Se aplica a toda la aplicación.": "Aplica-se a todo o aplicativo.",

        "PERFIL": "PERFIL", "Tu cuenta": "Sua conta", "Creá un perfil simbólico para probar el flujo de registro, sesión y cierre de sesión.": "Crie um perfil de teste para experimentar o fluxo de cadastro, login e logout.",
        "Crear cuenta": "Criar conta", "Iniciar sesión": "Entrar", "Armá tu perfil para empezar a conectar.": "Monte o seu perfil para começar a se conectar.",
        "Nombre completo": "Nome completo", "Email": "E-mail", "Contraseña": "Senha", "Rol": "Função", "Ej: Desarrollador, emprendedor, inversor...": "Ex: Desenvolvedor, empreendedor, investidor...",
        "Idea o proyecto": "Ideia ou projeto", "Contá brevemente qué estás construyendo o qué buscás.": "Conte brevemente o que você está construindo ou procurando.",
        "Ingresá con la cuenta que creaste en este navegador.": "Entre com a conta que você criou neste navegador.", "Entrar": "Entrar",
        "Esta cuenta será solo una simulación local. No usaremos autenticación real todavía.": "Esta conta é apenas uma simulação local. Ainda não usaremos autenticação real.",
        "Perfil activo": "Perfil ativo", "Plan": "Plano", "Idea / proyecto": "Ideia / projeto", "Tu idea aparecerá acá.": "A sua ideia vai aparecer aqui.",
        "Editar perfil": "Editar perfil", "Cerrar sesión": "Sair da conta", "Sin rol": "Sem função", "Todavía no cargaste tu idea.": "Você ainda não adicionou a sua ideia.",
        "Dejalo vacío para mantener la actual": "Deixe em branco para manter a atual", "Contraseña débil": "Senha fraca",
        "Usá al menos 6 caracteres.": "Use pelo menos 6 caracteres.", "Perfil actualizado": "Perfil atualizado", "Tus cambios se guardaron.": "Suas alterações foram salvas.",
        "Cuenta creada": "Conta criada", "Bienvenido a Emprein, {0}.": "Bem-vindo ao Emprein, {0}.", "No pudimos entrar": "Não foi possível entrar",
        "Email o contraseña incorrectos.": "E-mail ou senha incorretos.", "Sesión iniciada": "Login realizado", "Hola de nuevo, {0}.": "Olá de novo, {0}.",
        "Sesión cerrada": "Sessão encerrada", "Tu cuenta sigue guardada para volver a entrar.": "Sua conta continua salva para você entrar de novo."
    }
};

function detectLanguage() {
    try {
        const saved = localStorage.getItem("empreinLang");
        if (saved && LANGUAGES[saved]) return saved;
    } catch { /* sin acceso a localStorage */ }
    const browser = (typeof navigator !== "undefined" ? navigator.language || "" : "").slice(0, 2);
    return LANGUAGES[browser] ? browser : "es";
}

const LANG = detectLanguage();

function setLanguage(code) {
    if (!LANGUAGES[code]) return;
    try { localStorage.setItem("empreinLang", code); } catch { /* ignorar */ }
    location.reload();
}

/* ---------- Traducción de texto (acepta claves con {0}, {1}...) ---------- */
const patternCache = {};
function patternsFor(lang) {
    return patternCache[lang] ??= Object.keys(TRANSLATIONS[lang] || {})
        .filter(key => key.includes("{"))
        .map(key => [new RegExp("^" + key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\\\{\d+\\\}/g, "(.+?)") + "$"), key]);
}

function t(text, lang = LANG) {
    const dict = TRANSLATIONS[lang];
    if (!dict || typeof text !== "string") return text;

    const [, start, body, end] = text.match(/^(\s*)([\s\S]*?)(\s*)$/);
    const core = body.replace(/\s+/g, " ");
    if (!core) return text;

    let out = dict[core];
    if (out === undefined) {
        for (const [regex, key] of patternsFor(lang)) {
            const found = core.match(regex);
            if (found) { out = dict[key].replace(/\{(\d+)\}/g, (_, i) => found[+i + 1]); break; }
        }
    }
    return out === undefined ? text : start + out + end;
}

/* ---------- Traducción del DOM (estático y dinámico) ---------- */
if (typeof document !== "undefined" && document.body) {
    document.documentElement.lang = LANG;

    if (LANG !== "es") {
        const SKIP = "script, style, .message-bubble, [data-no-i18n]"; // los mensajes son contenido del usuario
        const ATTRS = ["placeholder", "title", "aria-label", "data-name", "data-tooltip"];

        const translateAttrs = el => {
            if (el.closest(SKIP)) return;
            ATTRS.forEach(attr => {
                const value = el.getAttribute(attr);
                if (value) el.setAttribute(attr, t(value));
            });
        };

        const translateNode = node => {
            if (node.nodeType === Node.TEXT_NODE) {
                if (!node.parentElement?.closest(SKIP)) node.nodeValue = t(node.nodeValue);
                return;
            }
            if (node.nodeType !== Node.ELEMENT_NODE) return;

            translateAttrs(node);
            node.querySelectorAll("*").forEach(translateAttrs);

            const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
            const texts = [];
            while (walker.nextNode()) texts.push(walker.currentNode);
            texts.forEach(translateNode);
        };

        translateNode(document.body);
        document.title = document.title.replace(/\|\s*(.+)$/, (_, name) => "| " + t(name));

        // Todo lo que el JS agregue después (tarjetas, toasts, chats) se traduce solo
        new MutationObserver(mutations =>
            mutations.forEach(m => m.addedNodes.forEach(translateNode))
        ).observe(document.body, { childList: true, subtree: true });
    }
}
