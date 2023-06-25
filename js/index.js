form = document.getElementById("loginForm");
tokenInput = document.getElementById("tokenInput");

function redirection() {
    window.location.replace("chat/index.html");
}

function checkToken() {
    if (localStorage.getItem("token")) redirection();
}
checkToken();

function notification(text) {
    console.log(text);
}

async function getToken(token) {
    let response = await fetch(`https://python.yagotka.repl.co/api/auth?token=${token}`, { 
        method: "GET", 
        mode: 'cors', 
        headers: { 
            'Content-Type': 'application/json', 
            'ngrok-skip-browser-warning': 'true'
        }
    });

    if (response.status == 200) {
        localStorage.setItem("token", token);
        notification("Authorized");
        redirection();
    } else {
        notification(response.status == 400 ? "Missing parameters" : response.status == 401 ? "Unauthorized" : "Unknown error");
    }
}

form.onsubmit = e => {
    e.preventDefault();
    getToken(tokenInput.value);
};
