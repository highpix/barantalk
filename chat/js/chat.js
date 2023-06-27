const querySelector = (selector) => document.querySelector(selector);
const preloader = querySelector(".preloader");
const chat = querySelector(".chat");
const urlApi = "https://python.yagotka.repl.co";
const token = localStorage.getItem("token");
const chatMenuForm = querySelector(".chat--menu");
const messages = querySelector(".chat--messages");
const chatDeleteButton = querySelector('.chat--menu-button.chat--menu-del');
const notification = document.getElementById('notification');
const notificationText = document.getElementById('notification-text');
const textarea = document.getElementById("textarea");

const logger = (text) => console.log(text);
const processMarkdown = (text) => window.markdownit().render(text);

function showNotification(text) {
    notificationText.textContent = text;
    
    let textWidth = notificationText.offsetWidth * 1.1;
    let iconWidth = 48; 
    let totalWidth = textWidth + iconWidth + 40;
    notification.style.width = totalWidth + 'px';

    notification.style.top = '20px';
    notification.style.opacity = '1';

    setTimeout(() => {
        hideNotification();
    }, 3000);
}

function hideNotification() {
    notification.style.top = '-100px';
    notification.style.opacity = '0';
}


function skeleton() {
    const element = document.createElement("div");
    element.className = "skeleton";
    messages.append(element);

    for (let i = 0; i != 6; i++) {
        const line = document.createElement("div");
        line.className = `skeleton--line`;
        element.append(line);
    }
}

function deletSkeleton() {
    const element = document.querySelector(".skeleton");
    element.parentNode.removeChild(element);
}

function textareaKeydown(event) {
    if (event.key === "Enter") {
        if (!event.shiftKey) {
            event.preventDefault();
            handleMessageSubmit(event);
        }
    }
}

function textareaCheck(event) {
    const text = textarea.value;
    const textSplit = text.split("\n");
    textSplit.length > 6 ? textarea.style.setProperty("overflow-y", "auto") : textarea.style.setProperty("overflow-y", "hidden");

    if (textSplit.length > 1 && textSplit.length < 6) {
        textarea.style.setProperty("--height-textarea", `${(textSplit.length * 45)+ 44}px`);
    } else if (textSplit.length === 1) {
        textarea.style.setProperty("--height-textarea", "92px");
    }
}
textarea.addEventListener("input", textareaCheck);
textarea.addEventListener("keydown", textareaKeydown);


function buttonClick(event) {
    const headDom = event.target.parentNode;
    let text = headDom.previousSibling.innerHTML.replaceAll("&lt;", "<").replaceAll("&gt;", ">");
    showNotification("Text copied to clipboard!")
    navigator.clipboard.writeText(text);
}

function addHeadPre(obj) {
    const head = obj.querySelector("pre").appendChild(document.createElement("div"));
    head.className = "blob--head";
    const h2 = head.appendChild(document.createElement("h2"));
    h2.innerHTML = obj.querySelector("pre code").className.match(/-(.*)/)[1];
    const button = head.appendChild(document.createElement("button"));
    button.innerHTML = "copy";
    button.addEventListener("click", buttonClick);
}

function addMessage(message, sender) {
    const blob = document.createElement("div");
    blob.className = `blob ${sender}`;
    blob.innerHTML = processMarkdown(message);
    messages.append(blob);
    messages.scrollTop = messages.scrollHeight;

    if (sender == "bot") {
        const re = message.match(/```(.*?)\n/);
        re && addHeadPre(blob, re[1]);
    }
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
    const response = await fetchApi(url), data = await response.json();
    response.ok ? successCallback(data) : errorCallback(response.status);
}

async function handleChatDelete(event) {
    event.preventDefault();
    showNotification("Cleaning up history...")
    handleRequest(`${urlApi}/api/clearContext?token=${token}`, () => {
        localStorage.setItem("token", token);
        messages.innerHTML = '';
    }, logger);
}

async function handleMessageSubmit(event) {
    event.preventDefault();

    const input = querySelector(".chat--menu-input");
    let message = input.value.trim();

    if (message) {
        addMessage(message, "user");
        input.value = "";
        textareaCheck();
        skeleton();
        message = message.replaceAll("\n", "($_->![NL]!<-_$)");

        handleRequest(`${urlApi}/api/request?data=${message}&token=${token}`, (data) => {
            deletSkeleton();
            addMessage(data.response, "bot");
        }, logger);
    }
}

function displayChatHistory(chatHistory) {
    for (const messageId in chatHistory) {
        const message = chatHistory[messageId];
        const messageIssuer = messageId.split('-')[0];
        addMessage(message.replaceAll('($_->![NL]!<-_$)', '\n'), messageIssuer === 'user' ? 'user' : 'bot');
    }
}

async function getHistoryChat(token) {
    handleRequest(`${urlApi}/api/chatHistory?token=${token}`, displayChatHistory, logger);
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
        logger(data.server);
        openChat(token);
    }, logger);
}

function checkToken() {
    token ? getLoad(token) : (window.location = "../index.html");
}
checkToken();

chatMenuForm.addEventListener("submit", handleMessageSubmit);
chatDeleteButton.addEventListener('click', handleChatDelete);
