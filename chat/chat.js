const preloader = document.querySelector(".preloader");
const chat = document.querySelector(".chat");
const urlApi = "https://python.yagotka.repl.co";
const token = localStorage.getItem("token");
const chatMenuForm = document.querySelector(".chat--menu");
const messages = document.querySelector(".chat--messages");
const chatDeleteButton = document.querySelector('.chat--menu-button.chat--menu-del');

function notification(text) {
    console.log(text);
}

function processMarkdown(text) {
  const md = window.markdownit();
  return md.render(text);
}

function addMessage(message, sender) {
    const blob = document.createElement("div");
    blob.className = `blob ${sender}`;
    blob.innerHTML = processMarkdown(message);
    messages.appendChild(blob);
    messages.scrollTop = messages.scrollHeight;
}

async function fetchApi(url) {
    const response = await fetch(url, {
        method: "GET",
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true'
        }
    });
    return response;
}

async function handleRequest(url, successCallback, errorCallback = () => {}) {
    const response = await fetchApi(url);
    const data = await response.json();
    
    if (response.ok) {
        successCallback(data);
    } else {
        errorCallback(response.status);
    }
}

async function handleChatDelete(event) {
    event.preventDefault();
    handleRequest(`${urlApi}/api/clearContext?token=${token}`, () => {
        localStorage.setItem("token", token);
        messages.innerHTML = '';
    }, notification);
}

async function handleMessageSubmit(event) {
    event.preventDefault();

    const input = document.querySelector(".chat--menu-input");
    const message = input.value.trim();

    if (message) {
        addMessage(message, "user");
        input.value = "";

        handleRequest(`${urlApi}/api/request?data=${message}&token=${token}`, (data) => {
            addMessage(data.response, "bot");
        }, notification);
    }
}

function displayChatHistory(chatHistory) {
    for (const messageId in chatHistory) {
        const message = chatHistory[messageId];
        const messageIssuer = messageId.split('-')[0];
        const sender = messageIssuer === 'user' ? 'user' : 'bot';
        addMessage(message, sender);
    }
}

async function getHistoryChat(token) {
    handleRequest(`${urlApi}/api/chatHistory?token=${token}`, displayChatHistory, notification);
}

function showPreloader() {
    preloader.animate([{ opacity: 1 }, { opacity: 0 }], 550);

    setTimeout(() => {
        preloader.style.setProperty("--display-preloader", "none");
        chat.style.setProperty("--display-chat", "flex");
    }, 500);
}

function openChat(token) {
    getHistoryChat(token);
    showPreloader();
}

async function getLoad(token) {
    handleRequest(`${urlApi}/api/serverStatus?token=${token}`, (data) => {
        notification(data.server);
        openChat(token);
    }, notification);
}

function checkToken() {
    token ? getLoad(token) : (window.location = "../index.html");
}
checkToken();

chatMenuForm.addEventListener("submit", handleMessageSubmit);
chatDeleteButton.addEventListener('click', handleChatDelete);