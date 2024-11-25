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
const typingDelay = 80;
const erasingDelay = 40;
const newTextDelay = 1500; // Delay between current and next text
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

// Chatbot Code

// Chatbot Elements
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbot = document.getElementById('chatbot');
const chatbotClose = document.getElementById('chatbot-close');
const chatbotMessages = document.getElementById('chatbot-messages');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');
const voiceBtn = document.getElementById('voice-btn');

// Toggle Chatbot Window
chatbotToggle.addEventListener('click', () => {
    chatbot.style.display = 'flex';
    chatbotToggle.style.display = 'none';
});

chatbotClose.addEventListener('click', () => {
    chatbot.style.display = 'none';
    chatbotToggle.style.display = 'flex';
});

// Send Message
sendBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const message = chatInput.value.trim();
    if (message === '') return;

    // Display user's message
    displayMessage(message, 'user');
    chatInput.value = '';

    // Get bot's response
    getBotResponse(message);
}

// Display message in chat window
function displayMessage(message, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    const messageText = document.createElement('p');
    messageText.textContent = message;
    messageDiv.appendChild(messageText);
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

    if (sender === 'bot') {
        speak(message);
    }
}

function getBotResponse(userMessage) {
    // Show typing indicator
    displayMessage('', 'bot typing');
  
    // Send user message to backend server
    fetch('https://backend-nu-nine-97.vercel.app/', { // Replace with your actual Vercel URL
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: userMessage })
    })
      .then(response => response.json())
      .then(data => {
        // Remove typing indicator
        const typingMessage = document.querySelector('.message.bot.typing');
        if (typingMessage) {
          typingMessage.remove();
        }
  
        if (data.reply) {
          const botMessage = data.reply;
          displayMessage(botMessage, 'bot');
        } else {
          displayMessage('Sorry, there was an error processing your request.', 'bot');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        displayMessage('Sorry, there was an error processing your request.', 'bot');
      });
      //test check

      //check fail
      //check fail 2
  }
  