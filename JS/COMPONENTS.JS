// ===============================
// LOAD COMPONENTS
// ===============================
function loadComponent(id, file, callback) {
  fetch(file)
    .then(res => res.text())
    .then(data => {
      document.getElementById(id).innerHTML = data;
      if (callback) callback();
    })
    .catch(err => console.error("Error loading component:", err));
}

// Cargar navbar y footer
document.addEventListener("DOMContentLoaded", () => {
  loadComponent("navbar-container", "COMPONENTS/NAV.HTML");
  loadComponent("footer-container", "COMPONENTS/FOOTER.HTML");
});