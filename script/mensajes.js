"use strict";

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

const REACTIONS = ["👍", "❤️", "😂", "😮", "🙏"];

function renderChatMessages() {
    const box = $("#chatMessages");
    const openId = box.querySelector(".message-row.show-actions")?.dataset.id;
    const nearBottom = box.scrollHeight - box.scrollTop - box.clientHeight < 80;

    box.innerHTML = conversations[currentChat].messages.map(m => `
        <div class="message-row ${m.from === "me" ? "sent" : "received"}${m.id === openId ? " show-actions" : ""}" data-id="${escapeHtml(m.id)}">
            <div class="message-actions">
                ${REACTIONS.map(e => `<button type="button" data-react="${e}" class="${m.reaction === e ? "on" : ""}" aria-label="Reaccionar con ${e}">${e}</button>`).join("")}
                <button type="button" data-delete aria-label="Eliminar mensaje" title="Eliminar mensaje">
                    <span class="material-symbols-outlined">delete</span>
                </button>
            </div>
            <div class="message-bubble ${m.from === "me" ? "sent" : "received"}">
                ${m.subject ? `<strong>${escapeHtml(m.subject)}</strong>` : ""}
                ${escapeHtml(m.text)}
                <small>${formatTime(m.date)}</small>
            </div>
            ${m.reaction ? `<button type="button" class="message-reaction" data-react="${m.reaction}" title="Quitar reacción">${m.reaction}</button>` : ""}
        </div>`).join("");

    if (nearBottom) scrollChatToBottom();
}

function scrollChatToBottom() {
    const box = $("#chatMessages");
    box.scrollTop = box.scrollHeight;
}

function closeChat() {
    currentChat = null;
    $("#chatContent").hidden = true;
    $("#emptyChat").hidden = false;
}

// Tocar la misma reacción otra vez la quita
function reactToMessage(id, emoji) {
    const msg = conversations[currentChat]?.messages.find(m => m.id === id);
    if (!msg) return;
    if (msg.reaction === emoji) delete msg.reaction;
    else msg.reaction = emoji;
    saveConversations();
    renderConversations();
}

// Se puede borrar cualquier mensaje, tanto los tuyos como los de la otra persona
function deleteMessage(id) {
    const convo = conversations[currentChat];
    if (!convo || !confirm("¿Eliminar este mensaje? Esta acción no se puede deshacer.")) return;

    convo.messages = convo.messages.filter(m => m.id !== id);
    if (!convo.messages.length) {
        delete conversations[currentChat];
        closeChat();
    }
    saveConversations();
    renderConversations();
    showToast("Mensaje eliminado", "El mensaje fue borrado de la conversación.");
}

$("#chatMessages").addEventListener("click", e => {
    const row = e.target.closest(".message-row");
    if (!row) return;

    const react = e.target.closest("[data-react]");
    if (react) {
        row.classList.remove("show-actions");
        reactToMessage(row.dataset.id, react.dataset.react);
        return;
    }
    if (e.target.closest("[data-delete]")) {
        row.classList.remove("show-actions");
        deleteMessage(row.dataset.id);
        return;
    }

    // En pantallas táctiles, tocar el mensaje muestra u oculta las acciones
    const wasOpen = row.classList.contains("show-actions");
    $$(".message-row.show-actions").forEach(r => r.classList.remove("show-actions"));
    if (!wasOpen) row.classList.add("show-actions");
});

document.addEventListener("click", e => {
    if (!e.target.closest(".message-row")) $$(".message-row.show-actions").forEach(r => r.classList.remove("show-actions"));
});

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
    scrollChatToBottom();
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


renderConversations();
const requestedChat = new URLSearchParams(location.search).get("chat");
if (requestedChat && conversations[requestedChat]) openChat(requestedChat);
