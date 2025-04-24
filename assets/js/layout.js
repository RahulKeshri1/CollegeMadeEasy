// layout.js -- Dynamic header/footer & robust authentication logic for all pages

// Load header or footer component dynamically
async function loadComponent(id, file) {
  try {
    const response = await fetch(file);
    const html = await response.text();
    document.getElementById(id).innerHTML = html;
    if (id === "header") {
      setupAuthUI(); 
    }
  } catch (err) {
    console.error(`Error loading ${file}:`, err);
  }
}

// Check if current page is the login page
function isLoginPage() {
  return window.location.pathname.endsWith("login.html");
}

// Set up authentication UI and handlers (called after header loads)
function setupAuthUI() {
  const loggedInUser = localStorage.getItem("loggedInUser");

  // Show greeting if available
  const userGreeting = document.getElementById("userGreeting");
  if (userGreeting) {
    userGreeting.textContent = loggedInUser ? `Hello ${loggedInUser}` : "";
  }

  // Handle login/logout link in the header
  const authLink = document.getElementById("auth-link");
  if (authLink) {
    if (loggedInUser) {
      authLink.textContent = "Logout";
      authLink.href = "#";
      authLink.addEventListener("click", function (e) {
        e.preventDefault();
        logout();
      });
    } else {
      authLink.textContent = "Login";
      authLink.href = "login.html";
    }
  }
}

// Logout logic: clear user and redirect, replace history to prevent back
function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.replace("login.html");
}

// Redirect to login if not authenticated (on every protected page)
function checkAuthOnLoad() {
  if (!localStorage.getItem("loggedInUser") && !isLoginPage()) {
    window.location.href = "login.html";
  }
}

// Periodically check login status (in case logout happens elsewhere)
function periodicAuthCheck() {
  setInterval(function () {
    if (!localStorage.getItem("loggedInUser") && !isLoginPage()) {
      window.location.href = "login.html";
    }
  }, 2500);
}

// Listen for logout/login in other tabs/windows
window.addEventListener("storage", function (event) {
  if (
    event.key === "loggedInUser" &&
    event.newValue === null &&
    !isLoginPage()
  ) {
    window.location.href = "login.html";
  }
});


// On page load, run everything
window.addEventListener("DOMContentLoaded", () => {
  checkAuthOnLoad();
  loadComponent("header", "components/header.html");
  loadComponent("footer", "components/footer.html");
  periodicAuthCheck();
});