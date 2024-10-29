// Mobile Navigation Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Smooth Scrolling
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', smoothScroll);
});

function smoothScroll(e) {
    //e.preventDefault();
    const targetId = e.currentTarget.getAttribute("href");
    window.scrollTo({
        top: document.querySelector(targetId).offsetTop - 70,
        behavior: "smooth"
    });
}

// Contact Form Submission
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    // For forms with "mailto:" action, prevent default is not needed
    // Remove preventDefault to allow mailto to work
    // e.preventDefault(); 

    // Optionally, display a thank-you message before form submission
    alert('Your email client will now open to send the message.');
});
