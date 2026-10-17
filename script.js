document.addEventListener('DOMContentLoaded', () => {
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link, .nav-cta');
  const header = document.getElementById('header');
  const appointmentForm = document.getElementById('appointmentForm');
  const formFeedback = document.getElementById('formFeedback');
  const dateInput = document.getElementById('date');
  const newsletterForm = document.getElementById('newsletterForm');
  const yearSpan = document.getElementById('currentYear');

  // Actualizar año del footer
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Configurar fecha mínima en el selector de citas (hoy)
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

  // Menú móvil responsive
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', String(!isExpanded));
      navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Sombra en el header al hacer scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Validación y envío simulado del formulario de citas
  if (appointmentForm) {
    appointmentForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const ownerName = document.getElementById('ownerName').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const petName = document.getElementById('petName').value.trim();
      const species = document.getElementById('species').value;
      const service = document.getElementById('service').value;
      const date = document.getElementById('date').value;

      if (!ownerName || !phone || !petName || !species || !service || !date) {
        formFeedback.className = 'form-feedback error';
        formFeedback.textContent = 'Por favor, completa todos los campos obligatorios (*) para reservar tu cita.';
        return;
      }

      const formattedDate = new Date(date + 'T00:00:00').toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });

      formFeedback.className = 'form-feedback success';
      formFeedback.textContent = `¡Gracias, ${ownerName}! Hemos recibido la solicitud de ${service.toLowerCase()} para ${petName} (${species}) el día ${formattedDate}. Te llamaremos al ${phone} en breve para confirmar la hora.`;

      appointmentForm.reset();
    });
  }

  // Suscripción a la newsletter
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input[type="email"]');
      if (input && input.value.trim()) {
        alert(`¡Gracias por suscribirte! Enviaremos nuestros consejos veterinarios a ${input.value.trim()}.`);
        newsletterForm.reset();
      }
    });
  }
});