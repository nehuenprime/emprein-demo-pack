"use strict";

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
                <span class="project-stat"><span class="material-symbols-outlined">visibility</span>${p.project.visits.toLocaleString(LOCALES[LANG])}</span>
                <span class="project-stat"><span class="material-symbols-outlined">handshake</span>${p.project.matches.toLocaleString(LOCALES[LANG])}</span>
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


renderProjects();
