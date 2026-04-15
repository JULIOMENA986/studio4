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

// ===============================
// INTERSECTION OBSERVER (INDEX)
// ===============================
const animatedElements = document.querySelectorAll('.animate-up');

if (animatedElements.length > 0) {
  const observerOpts = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOpts);

  animatedElements.forEach(el => observer.observe(el));
}

// ===============================
// PORTFOLIO SLIDER (SOLO PORTFOLIO)
// ===============================
const sliderWraps = document.querySelectorAll('.portfolio-slider-wrap');

if (sliderWraps.length > 0) {
  sliderWraps.forEach((wrap) => {
    const slider = wrap.querySelector('.portfolio-slider');
    const slides = slider.querySelectorAll('.portfolio-slide');
    const dotsContainer = wrap.nextElementSibling;
    const dots = dotsContainer ? dotsContainer.querySelectorAll('.slider-dot') : [];

    let current = 0;

    function getVisibleSlides() {
      return window.innerWidth <= 600 ? 2 : 3;
    }

    function updateSlider() {
      const VISIBLE = getVisibleSlides();
      const total = Math.ceil(slides.length / VISIBLE);

      slides.forEach((s, i) => {
        s.style.display = (i >= current * VISIBLE && i < (current + 1) * VISIBLE)
          ? ''
          : 'none';
      });

      dots.forEach((d, i) => {
        d.classList.toggle('active', i === current);
      });
    }

    // INIT
    updateSlider();

    // NEXT
    wrap.querySelector('.slider-arrow--next')?.addEventListener('click', () => {
      const VISIBLE = getVisibleSlides();
      const total = Math.ceil(slides.length / VISIBLE);

      current = (current + 1) % total;
      updateSlider();
    });

    // PREV
    wrap.querySelector('.slider-arrow--prev')?.addEventListener('click', () => {
      const VISIBLE = getVisibleSlides();
      const total = Math.ceil(slides.length / VISIBLE);

      current = (current - 1 + total) % total;
      updateSlider();
    });

    // DOTS
    dots.forEach((d, i) => {
      d.addEventListener('click', () => {
        current = i;
        updateSlider();
      });
    });

    // RESPONSIVE FIX
    window.addEventListener('resize', updateSlider);
  });
}