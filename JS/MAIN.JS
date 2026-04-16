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

if (sliderWraps.length > 0) {
  sliderWraps.forEach((wrap) => {
    const slider = wrap.querySelector('.portfolio-slider');
    const originalSlides = Array.from(slider.querySelectorAll('.portfolio-slide'));
    const dotsContainer = wrap.nextElementSibling;

    let current = 0;

    function getVisibleSlides() {
      return window.innerWidth <= 600 ? 1 : 3;
    }

    // Duplica slides para garantizar loop visual siempre
    function ensureLoop() {
      const VISIBLE = getVisibleSlides();
      const existing = slider.querySelectorAll('.portfolio-slide').length;
      // Necesitamos al menos VISIBLE*2 slides para que el loop funcione
      while (slider.querySelectorAll('.portfolio-slide').length < VISIBLE * 2) {
        originalSlides.forEach(slide => {
          const clone = slide.cloneNode(true);
          clone.dataset.clone = true;
          slider.appendChild(clone);
        });
      }
    }

    function getAllSlides() {
      return Array.from(slider.querySelectorAll('.portfolio-slide'));
    }

    function getTotal() {
      return originalSlides.length; // dots basados en slides originales
    }

    function buildDots() {
      if (!dotsContainer) return;
      dotsContainer.innerHTML = '';
      const total = getTotal();
      for (let i = 0; i < total; i++) {
        const btn = document.createElement('button');
        btn.className = 'slider-dot' + (i === 0 ? ' active' : '');
        btn.setAttribute('aria-label', `Slide ${i + 1}`);
        btn.addEventListener('click', () => {
          current = i;
          updateSlider();
        });
        dotsContainer.appendChild(btn);
      }
    }

    function updateSlider() {
      const VISIBLE = getVisibleSlides();
      const allSlides = getAllSlides();
      const total = originalSlides.length;

      // Calcula qué índices mostrar con wrap circular
      const indices = [];
      for (let i = 0; i < VISIBLE; i++) {
        indices.push((current + i) % total);
      }

      // Oculta todos
      allSlides.forEach(s => s.style.display = 'none');

      // Muestra solo los originales en los índices correctos
      indices.forEach(idx => {
        originalSlides[idx].style.display = '';
      });

      // Actualiza dots (basado en el primer índice visible)
      const dots = dotsContainer?.querySelectorAll('.slider-dot') || [];
      dots.forEach((d, i) => d.classList.toggle('active', i === current % total));
    }

    ensureLoop();
    buildDots();
    updateSlider();

    wrap.querySelector('.slider-arrow--next')?.addEventListener('click', () => {
      current = (current + 1) % originalSlides.length;
      updateSlider();
    });

    wrap.querySelector('.slider-arrow--prev')?.addEventListener('click', () => {
      current = (current - 1 + originalSlides.length) % originalSlides.length;
      updateSlider();
    });

    window.addEventListener('resize', () => {
      current = 0;
      buildDots();
      updateSlider();
    });
  });
}