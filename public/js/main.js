// This file contains the JavaScript code that handles user interactions and API calls for login and registration.

document.addEventListener("DOMContentLoaded", () => {
  const formArea = document.getElementById("formArea");

  function showLogin() {
    formArea.innerHTML = `
      <h5>Login</h5>
      <div class="mb-2"><input id="username" class="form-control" placeholder="username" /></div>
      <div class="mb-2"><input id="password" type="password" class="form-control" placeholder="password" /></div>
      <button id="doLogin" class="btn btn-primary w-100">Login</button>
    `;
    document.getElementById("doLogin").onclick = async () => {
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (!res.ok) return alert(data.error || JSON.stringify(data));
      localStorage.setItem("auth_token", data.token);
      alert("Login successful");
      window.location.href = "index.html";
    };
  }

  function showRegister() {
    formArea.innerHTML = `
      <h5>Register</h5>
      <div class="mb-2"><input id="r_username" class="form-control" placeholder="username" /></div>
      <div class="mb-2"><input id="r_password" type="password" class="form-control" placeholder="password" /></div>
      <button id="doRegister" class="btn btn-success w-100">Register</button>
    `;
    document.getElementById("doRegister").onclick = async () => {
      const username = document.getElementById("r_username").value;
      const password = document.getElementById("r_password").value;
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (!res.ok) return alert(data.error || JSON.stringify(data));
      alert("Registered. Please login.");
      showLogin();
    };
  }

  document.getElementById("showLogin").onclick = showLogin;
  document.getElementById("showRegister").onclick = showRegister;
  showLogin();
});