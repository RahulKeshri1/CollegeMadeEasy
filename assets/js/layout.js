async function loadComponent(id, file) {
  try {
    const response = await fetch(file);
    const html = await response.text();
    document.getElementById(id).innerHTML = html;
  } catch (err) {
    console.error(`Error loading \${file}:`, err);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  loadComponent("header", "components/header.html");
  loadComponent("footer", "components/footer.html");
});