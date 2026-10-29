// Personnalise cette date avec le prochain anniversaire : AAAA-MM-JJTHH:MM:SS
// Exemple : "2027-05-14T00:00:00"
const birthdayDate = new Date("2027-10-29T00:00:00")

const countdownMessage = document.getElementById("countdownMessage");
function updateCountdown() {
  const now = new Date();
  let diff = birthdayDate - now;

  if (Number.isNaN(birthdayDate.getTime())) {
    countdownMessage.textContent = "Vérifie la date d’anniversaire dans assets/js/script.js.";
    return;
  }

  if (diff <= 0) {
    ["days", "hours", "minutes", "seconds"].forEach(id => {
      document.getElementById(id).textContent = "00";
    });
    countdownMessage.textContent = "Joyeux anniversaire ! Que ta journée soit magique ! 🎂💜";
    return;
  }

  const days = Math.floor(diff / 86400000);
  diff %= 86400000;
  const hours = Math.floor(diff / 3600000);
  diff %= 3600000;
  const minutes = Math.floor(diff / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}
updateCountdown();
setInterval(updateCountdown, 1000);

// Animation d'apparition au défilement
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// Menu mobile
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "×" : "☰";
});
navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.textContent = "☰";
}));

// Mode clair / sombre
document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("light");
  document.getElementById("themeToggle").textContent =
    document.body.classList.contains("light") ? "☀" : "☾";
});

// Surprise
document.getElementById("wishButton").addEventListener("click", () => {
  const message = document.getElementById("secretMessage");
  message.hidden = !message.hidden;
  document.getElementById("wishButton").textContent =
    message.hidden ? "Une dernière surprise ♡" : "Refermer la surprise ♡";
  if (!message.hidden) launchConfetti(90);
});

// Confettis
function launchConfetti(amount = 65) {
  const layer = document.getElementById("confettiLayer");
  const colors = ["#a56bff", "#f16bdc", "#ffd6fa", "#8d42ff", "#ffffff"];
  for (let i = 0; i < amount; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.setProperty("--drift", `${Math.random() * 220 - 110}px`);
    piece.style.animationDelay = `${Math.random() * 0.7}s`;
    piece.style.animationDuration = `${2 + Math.random() * 2}s`;
    layer.appendChild(piece);
    setTimeout(() => piece.remove(), 4500);
  }
}
document.getElementById("confettiButton").addEventListener("click", () => launchConfetti());


// Cadeau : ouvre la vidéo de la famille
const familyGiftButton = document.getElementById("familyGiftButton");
const familyVideoModal = document.getElementById("familyVideoModal");
const closeFamilyVideo = document.getElementById("closeFamilyVideo");
const familyVideo = document.getElementById("familyVideo");

if (familyGiftButton && familyVideoModal) {
  familyGiftButton.addEventListener("click", () => {
    familyVideoModal.hidden = false;
    document.body.style.overflow = "hidden";
    launchConfetti(45);
    // La lecture automatique avec son est souvent bloquée par les navigateurs.
    familyVideo?.play().catch(() => {});
  });
}
function closeVideoModal() {
  if (!familyVideoModal) return;
  familyVideoModal.hidden = true;
  document.body.style.overflow = "";
  if (familyVideo) {
    familyVideo.pause();
    familyVideo.currentTime = 0;
  }
}
closeFamilyVideo?.addEventListener("click", closeVideoModal);
familyVideoModal?.addEventListener("click", (event) => {
  if (event.target === familyVideoModal) closeVideoModal();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeVideoModal();
});
