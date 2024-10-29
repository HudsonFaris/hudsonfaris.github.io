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
    e.preventDefault();
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

// Typing Animation
const typedTextSpan = document.getElementById('typed-text');
const cursorSpan = document.getElementById('cursor');

const textArray = [
    "A driven and ambitious professional.",
    "Passionate about software engineering.",
    "Ready to make a meaningful impact."
];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000; // Delay @test between current and next text
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        textArrayIndex = (textArrayIndex + 1) % textArray.length;
        setTimeout(type, typingDelay + 1100);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    if (textArray.length) setTimeout(type, newTextDelay + 250);
});

