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

// Form submission via FormSubmit.co
// Sends emails directly to info@arenda-k.ru
// First submission will require email confirmation (one-time)
const FORMSUBMIT_URL = 'https://formsubmit.co/ajax/info@arenda-k.ru';

function handleFormSubmit(form, successEl) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Отправляем...';
        submitBtn.disabled = true;

        const formData = new FormData(form);
        const name = formData.get('name');
        const phone = formData.get('phone');
        const property = formData.get('property') || '';
        const message = formData.get('message') || '';

        const subject = property
            ? `Заявка на аренду: ${property}`
            : 'Заказ звонка с сайта arenda-klintsy.ru';

        const payload = {
            name: name,
            phone: phone,
            _subject: subject,
            _template: 'table',
            _captcha: 'false'
        };

        if (property) payload.property = property;
        if (message) payload.message = message;

        fetch(FORMSUBMIT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                form.reset();
                if (successEl) {
                    successEl.hidden = false;
                    form.style.display = 'none';
                    setTimeout(() => {
                        successEl.hidden = true;
                        form.style.display = '';
                    }, 5000);
                }
                // Close modal if inside one
                const modal = form.closest('.modal');
                if (modal) {
                    setTimeout(() => modal.classList.remove('active'), 2000);
                }
            } else {
                alert('Произошла ошибка. Пожалуйста, позвоните нам: +7 (930) 820-09-99');
            }
        })
        .catch(() => {
            alert('Ошибка соединения. Пожалуйста, позвоните нам: +7 (930) 820-09-99');
        })
        .finally(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    });
}

const contactForm = document.getElementById('contactForm');
const contactSuccess = document.getElementById('contactSuccess');
handleFormSubmit(contactForm, contactSuccess);

const callbackForm = document.getElementById('callbackForm');
const callbackSuccess = document.getElementById('callbackSuccess');
handleFormSubmit(callbackForm, callbackSuccess);
