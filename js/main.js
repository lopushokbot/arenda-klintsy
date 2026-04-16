// Mobile navigation
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    nav.classList.toggle('active');
});

// Close nav on link click
nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('active');
        nav.classList.remove('active');
    });
});

// Callback modal
const callbackBtn = document.getElementById('callbackBtn');
const callbackModal = document.getElementById('callbackModal');

callbackBtn.addEventListener('click', () => {
    callbackModal.classList.add('active');
});

callbackModal.querySelector('.modal__overlay').addEventListener('click', () => {
    callbackModal.classList.remove('active');
});

callbackModal.querySelector('.modal__close').addEventListener('click', () => {
    callbackModal.classList.remove('active');
});

// Property buttons open contact form with property name
document.querySelectorAll('.property-card__btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const propertyName = btn.dataset.property;
        document.getElementById('formProperty').value = propertyName;
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });
});

// Fade-in on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Form submission via EmailJS
// EmailJS will be configured later — for now, forms use mailto fallback
function handleFormSubmit(form, successEl) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const name = formData.get('name');
        const phone = formData.get('phone');
        const property = formData.get('property') || '';
        const message = formData.get('message') || '';

        const subject = property
            ? `Заявка на аренду: ${property}`
            : 'Заказ звонка с сайта';

        const body = `Имя: ${name}\nТелефон: ${phone}${property ? `\nОбъект: ${property}` : ''}${message ? `\nСообщение: ${message}` : ''}`;

        // Try EmailJS if configured
        if (typeof emailjs !== 'undefined' && window.EMAILJS_SERVICE_ID) {
            emailjs.send(window.EMAILJS_SERVICE_ID, window.EMAILJS_TEMPLATE_ID, {
                from_name: name,
                phone: phone,
                property: property,
                message: message,
                subject: subject
            }).then(() => {
                form.reset();
                if (successEl) {
                    successEl.hidden = false;
                    form.style.display = 'none';
                    setTimeout(() => {
                        successEl.hidden = true;
                        form.style.display = '';
                    }, 5000);
                }
            }).catch(() => {
                // Fallback to mailto
                window.location.href = `mailto:info@arenda-k.ru?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            });
        } else {
            // Mailto fallback
            window.location.href = `mailto:info@arenda-k.ru?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        }
    });
}

const contactForm = document.getElementById('contactForm');
const contactSuccess = document.getElementById('contactSuccess');
handleFormSubmit(contactForm, contactSuccess);

const callbackForm = document.getElementById('callbackForm');
const callbackSuccess = document.getElementById('callbackSuccess');
handleFormSubmit(callbackForm, callbackSuccess);
