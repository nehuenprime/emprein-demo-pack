"use strict";

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
        if (hasConversation(name)) location.href = PAGES_DIR + "mensajes.html?chat=" + encodeURIComponent(name);
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


renderMatches();
