// Apparition des cartes de souvenirs
const cards = document.querySelectorAll(".photo-card");
cards.forEach((card, index) => {
  card.style.animation = `fade-up .55s ${index * 0.08}s both`;
});
