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


renderConversations();
const requestedChat = new URLSearchParams(location.search).get("chat");
if (requestedChat && conversations[requestedChat]) openChat(requestedChat);
