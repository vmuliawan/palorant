function showAbility(id) {
    const cards = document.querySelectorAll('.ability-card');
    cards.forEach(card => card.style.display = 'none');
  
    const selectedCard = document.getElementById(id);
    selectedCard.style.display = 'block';

    const icons = document.querySelectorAll('.icons img');
    icons.forEach(icon => icon.classList.remove('active'));

    const clickedIcon = document.querySelector(`.icons img[onclick*="${id}"]`);
    if (clickedIcon) {
        clickedIcon.classList.add('active');
    }
  }
  
  window.onload = function() {
    showAbility('ab1'); // Biar langsung tampil skill pertama
  }