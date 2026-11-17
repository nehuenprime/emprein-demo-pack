"use strict";

function renderPremiumButton() {
    $("#premiumButton").textContent = isPremium() ? "Cancelar Premium (demo)" : "Obtener Premium";
}

$("#premiumButton").addEventListener("click", () => {
    if (!loggedIn) {
        showToast("Iniciá sesión", "Necesitás una cuenta para activar Premium.");
        location.href = PAGES_DIR + "perfil.html";
        return;
    }
    user.plan = isPremium() ? "Free" : "Premium";
    saveUser();
    renderPremiumButton();
    showToast(isPremium() ? "Premium activado" : "Plan Free", isPremium()
        ? "Demo: sin pago real. Ya no tenés límite de matches."
        : `Volviste al plan Free (máx. ${FREE_MATCH_LIMIT} matches).`);
});


renderPremiumButton();
