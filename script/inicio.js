"use strict";

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

$("#infoButton").addEventListener("click", openInfoModal);
$("#contactButton").addEventListener("click", () => openContactModal(profiles[currentProfile]));
$("#contactFromInfo").addEventListener("click", () => {
    closeModal($("#infoModal"));
    openContactModal(profiles[currentProfile]);
});

renderProfile();
