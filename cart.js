const { productCards } = require("./productCards");

// Sélectionne l’élément où le prix total sera affiché
const totalPriceElement = document.querySelector(‘.total’);

// Fonction pour mettre à jour le prix total du panier
function updateTotalPrice() {
  let total = 0;
  productCards.forEach(card => {
    const unitPrice = parseFloat(card.querySelector(‘.unit-price’).textContent.replace(‘$’, ‘’));
    const quantity = parseInt(card.querySelector(‘.quantity’).textContent);
    total += unitPrice * quantity;
  });
  totalPriceElement.textContent = `${total} $`;
}
// Fonction pour ajuster la quantité d’un article
function adjustQuantity(card, increment) {
    const quantityElement = card.querySelector(‘.quantity’);
    let quantity = parseInt(quantityElement.textContent);
    // Incrémente ou décrémente la quantité
    quantity = increment ? quantity + 1 : Math.max(0, quantity - 1);
    quantityElement.textContent = quantity;
    updateTotalPrice();
  }
  
  // Fonction pour basculer l’état “aimé” d’un article
  function toggleLike(button) {
    button.classList.toggle(‘liked’);  // Ajoute ou enlève la classe “liked”
  }
  // Fonction pour supprimer un article du panier
function deleteProduct(card) {
    card.remove();  // Supprime l’élément du DOM
    updateTotalPrice();  // Recalcule le prix total
  }
  
  // Ajoute des événements aux boutons de chaque produit
  productCards.forEach(card => {
    const plusButton = card.querySelector(‘.fa-plus-circle’);
    const minusButton = card.querySelector(‘.fa-minus-circle’);
    const deleteButton = card.querySelector(‘.fa-trash-alt’);
    const likeButton = card.querySelector(‘.fa-heart’);
  
    // Événement pour augmenter la quantité
    plusButton.addEventListener(‘click’, () => adjustQuantity(card, true));
    
    // Événement pour diminuer la quantité
    minusButton.addEventListener(‘click’, () => adjustQuantity(card, false));
    
  // Événement pour supprimer le produit
    deleteButton.addEventListener(‘click’, () => deleteProduct(card));
    
    // Événement pour aimer le produit
    likeButton.addEventListener(‘click’, () => toggleLike(likeButton));
  });