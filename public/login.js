const tabLogin = document.querySelector("#tab-login");
const tabRegister = document.querySelector("#tab-register");
const loginForm = document.querySelector("#login-form");
const registerForm = document.querySelector("#register-form");
const loginError = document.querySelector("#login-error");
const registerError = document.querySelector("#register-error");

function showTab(mode) {
  const isLogin = mode === "login";
  tabLogin.classList.toggle("active", isLogin);
  tabRegister.classList.toggle("active", !isLogin);
  tabLogin.setAttribute("aria-selected", String(isLogin));
  tabRegister.setAttribute("aria-selected", String(!isLogin));
  loginForm.hidden = !isLogin;
  registerForm.hidden = isLogin;
  loginError.textContent = "";
  registerError.textContent = "";
  (isLogin ? document.querySelector("#login-username") : document.querySelector("#register-username")).focus();
}

async function api(url, body) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || "Request failed");
  return data;
}

tabLogin.addEventListener("click", () => showTab("login"));
tabRegister.addEventListener("click", () => showTab("register"));

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  loginError.textContent = "";
  try {
    await api("/api/auth/login", {
      username: document.querySelector("#login-username").value,
      password: document.querySelector("#login-password").value,
    });
    window.location.href = "/app";
  } catch (error) {
    loginError.textContent = error.message;
  }
});

registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  registerError.textContent = "";
  const password = document.querySelector("#register-password").value;
  const confirm = document.querySelector("#register-password2").value;
  if (password !== confirm) {
    registerError.textContent = "Passwords do not match.";
    return;
  }
  try {
    await api("/api/auth/register", {
      username: document.querySelector("#register-username").value,
      displayName: document.querySelector("#register-display").value,
      password,
    });
    window.location.href = "/app";
  } catch (error) {
    registerError.textContent = error.message;
  }
});

const session = await fetch("/api/session").then((r) => r.json()).catch(() => ({ authenticated: false }));
if (session.authenticated) window.location.href = "/app";

const params = new URLSearchParams(window.location.search);
if (params.get("mode") === "register") showTab("register");
else showTab("login");
