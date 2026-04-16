// ===============================
// NAVBAR SCROLL
// ===============================
const navbar = document.getElementById('navbar');

if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });
}

// ===============================
// HAMBURGER MENU
// ===============================
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
    hamburger.classList.toggle('active', isOpen);
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', false);
    });
  });
}

// ===============================
// FORM (SOLO INDEX)
// ===============================
const form = document.querySelector('.contact-form');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.nombre.value.trim();
    const lastName = form.apellido.value.trim();
    const email = form.correo.value.trim();
    const phone = form.telefono.value.trim();

    const alertBox = form.querySelector('.alert');
  
    if (!name || !lastName || !email || !phone) {
      alertBox.style.display = 'block';
      alertBox.style.color = '#dc3545';
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      alertBox.style.display = 'block';
      alertBox.style.color = '#dc3545';
      alertBox.textContent = 'El número de teléfono debe tener 10 dígitos.';
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alertBox.style.display = 'block';
      alertBox.style.color = '#dc3545';
      alertBox.textContent = 'Por favor, ingresa un correo electrónico válido.';
      return;
    }

    alertBox.style.display = 'none';
    alertBox.textContent = '';
  
    const btn = form.querySelector('button[type=submit]');
    btn.textContent = 'Enviando...'; 
    btn.disabled = true;
    btn.style.background = '#6c757d';

    fetch("MAIL/MAIL.PHP", {
      method: "POST",
      body: new FormData(form)
    })
    .then(res => res.json())
    .then(response => {
      if (response.ok) {
        btn.textContent = '!Enviado¡';
        btn.style.background = '#28a745';
      } else {
        btn.textContent = 'Enviar →';
        btn.style.background = '#FF2D9B';
      }
    }).catch(error => {
      alertBox.style.display = 'block';
      alertBox.style.color = '#dc3545';
      alertBox.textContent = 'Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.';
    });

    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = 'Enviar →';
      btn.style.background = '#FF2D9B';
      form.reset();
    }, 2000);
  });
}

const sliderWraps = document.querySelectorAll('.portfolio-slider-wrap');

sliderWraps.forEach((wrap) => {
  const slider = wrap.querySelector('.portfolio-slider');
  const slides = slider.querySelectorAll('.portfolio-slide');
  const dotsContainer = wrap.nextElementSibling;

  const prevBtn = wrap.querySelector('.slider-arrow--prev');
  const nextBtn = wrap.querySelector('.slider-arrow--next');

  let index = 0;

  function getVisibleSlides() {
    return window.innerWidth <= 600 ? 1 : 3;
  }

  function getTotalPages() {
    return Math.ceil(slides.length / getVisibleSlides());
  }

  function updateControls() {
    const visible = getVisibleSlides();

    // 🔥 ocultar si no se necesita
    if (slides.length <= visible) {
      if (prevBtn) prevBtn.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';
      if (dotsContainer) dotsContainer.style.display = 'none';
      return false;
    } else {
      if (prevBtn) prevBtn.style.display = '';
      if (nextBtn) nextBtn.style.display = '';
      if (dotsContainer) dotsContainer.style.display = 'flex';
      return true;
    }
  }

  function buildDots() {
    if (!dotsContainer) return;

    dotsContainer.innerHTML = '';
    const total = getTotalPages();

    for (let i = 0; i < total; i++) {
      const dot = document.createElement('button');
      dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => {
        index = i;
        updateSlider();
      });
      dotsContainer.appendChild(dot);
    }
  }

  function updateSlider() {
    const visible = getVisibleSlides();
    const slideWidth = slider.offsetWidth / visible;

    slider.style.transform = `translateX(-${index * slideWidth * visible}px)`;

    const dots = dotsContainer?.querySelectorAll('.slider-dot') || [];
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
  }

  function init() {
    index = 0;

    const needsControls = updateControls();

    if (needsControls) {
      buildDots();
    }

    updateSlider();
  }

  // Eventos
  nextBtn?.addEventListener('click', () => {
    const max = getTotalPages() - 1;
    index = (index >= max) ? 0 : index + 1;
    updateSlider();
  });

  prevBtn?.addEventListener('click', () => {
    const max = getTotalPages() - 1;
    index = (index <= 0) ? max : index - 1;
    updateSlider();
  });

  window.addEventListener('resize', init);

  // INIT
  init();
});

document.getElementById("year").textContent = new Date().getFullYear();