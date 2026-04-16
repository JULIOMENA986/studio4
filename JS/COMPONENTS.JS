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
fetch('../COMPONENTS/NAV.HTML')
  .then(res => res.text())
  .then(html => {
    document.getElementById('navbar-container').innerHTML = html;

    // Active link — va AQUÍ adentro, después de insertar el nav
    const currentPage = window.location.pathname.split('/').pop().toUpperCase();
    document.querySelectorAll('.nav-link, .mobile-menu .nav-link').forEach(link => {
      const linkPage = link.getAttribute('href').split('/').pop().toUpperCase();
      if (linkPage === currentPage) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  });