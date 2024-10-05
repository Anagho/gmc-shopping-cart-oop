// Base Item class
class Item {
  constructor(id, name, image, price, quantity = 1, liked = false) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.price = price;
    this.quantity = quantity;
    this.liked = liked;
  }

  // Get the total price for this item based on the quantity
  getTotalPrice() {
    return this.price * this.quantity;
  }
}

// Cart class to manage CartItems
class Cart {
  constructor() {
    this.cartItems = [];
    this.totalPriceText = document.getElementById("total-price");
    this.cartCountText = document.getElementById("cart-count-text");
    this.cartList = document.getElementById("cart-items");
    this.thankYouModal = document.getElementById("thank-you-modal");
    this.modalOverlay = document.getElementById("modal-overlay");
    this.emptyCartModal = document.getElementById("empty-cart-modal");
  }

  // Add item to the cart
  addItem(item) {
    this.cartItems.push(item);
    this.renderCartItems();
  }

  // Render the cart items on the page
  renderCartItems() {
    this.cartList.innerHTML = ""; // Clear the cart list
    let totalPrice = 0;

    this.cartItems.forEach((item, index) => {
      totalPrice += item.getTotalPrice();

      // Create a list element
      const cartItem = document.createElement("li");
      cartItem.className = "cart-item";

      // Fill up the list elements with the items
      cartItem.innerHTML = `
                <div class="item-box">
                    <img src="${item.image}" alt="${item.name}">
                    <article class="item-info">
                        <span class="item-name">${item.name}</span>
                        <span class="item-price">₦${item.price.toLocaleString()}</span>
                        <div>
                            <span class="heart-btn ${
                              item.liked ? "liked" : ""
                            }" 
                            onClick="cart.toggleLike(${index})" aria-label="Like item">
                            <i class="fa-solid fa-heart"></i></span>
                            <button class="delete-btn" onClick="cart.deleteItem(${index})" aria-label="Delete item">Delete</button>
                        </div>
                    </article>
                </div>
                <div class="item-actions">
                    <p class="item-price">₦${item
                      .getTotalPrice()
                      .toLocaleString()}</p>
                    <div>
                        <button id="decrease" onClick="cart.decreaseQuantity(${index})" aria-label="Decrease quantity">-</button>
                        <span>${item.quantity}</span>
                        <button id="increase" onClick="cart.increaseQuantity(${index})" aria-label="Increase quantity">+</button>
                    </div>
                </div>
            `;

      // Append the cart item to the list
      this.cartList.appendChild(cartItem);
    });

    this.totalPriceText.innerText = totalPrice.toFixed(2);
    this.updateCartCount(); // Update cart item count
  }

  // Function to delete an item from the cart
  deleteItem(index) {
    this.cartItems.splice(index, 1); // Remove the item from the cartItems array
    this.renderCartItems(); // Re-render the cart
  }

  // Function to increase item quantity
  increaseQuantity(index) {
    this.cartItems[index].quantity += 1;
    this.renderCartItems();
  }

  // Function to decrease item quantity
  decreaseQuantity(index) {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity -= 1;
      this.renderCartItems();
    }
  }

  // Function to toggle like for an item
  toggleLike(index) {
    this.cartItems[index].liked = !this.cartItems[index].liked;
    this.renderCartItems();
  }

  // Function to update the cart item count in the header
  updateCartCount() {
    const itemCount = this.cartItems.length;
    this.cartCountText.innerText = `My Cart Items (${itemCount})`;
  }

  // Function to proceed to checkout
  proceedToCheckout() {
    if (this.cartItems.length === 0) {
      this.showEmptyCartModal();
      return;
    }

    // Confirm checkout action
    const proceed = confirm(
      "Are you sure you want to proceed to checkout with " +
        this.cartItems.length +
        " item(s)?"
    );

    if (proceed) {
      this.cartItems.length = 0; // Empty the cartItems array
      this.renderCartItems(); // Re-render the cart (which will now be empty)
      this.showThankYouMessage(); // Display a thank you message
    }
  }

  // Function to show the Thank You message
  showThankYouMessage() {
    this.thankYouModal.classList.add("active");
    this.modalOverlay.classList.add("active");
  }

  // Function to close the Thank You message
  closeThankYouMessage() {
    this.thankYouModal.classList.remove("active");
    this.modalOverlay.classList.remove("active");
  }

  // Function to show the empty cart modal
  showEmptyCartModal() {
    this.emptyCartModal.classList.add("active");
    this.modalOverlay.classList.add("active");

    // Close modal when clicking the close button or the overlay
    document
      .querySelector(".close-btn")
      .addEventListener("click", () => this.closeEmptyCartModal());
    this.modalOverlay.addEventListener("click", () =>
      this.closeEmptyCartModal()
    );
    document
      .getElementById("continue-shopping")
      .addEventListener("click", () => this.closeEmptyCartModal());
  }

  // Function to close the empty cart modal
  closeEmptyCartModal() {
    this.emptyCartModal.classList.remove("active");
    this.modalOverlay.classList.remove("active");
  }
}

// Initialize the cart
const cart = new Cart();

// Add initial items to the cart
const items = [
  new Item(
    1,
    "HP ENVY 17M-CH0013DX",
    "./images/HP ENVY 17M-CH0013DX.jpg",
    750000
  ),
  new Item(
    2,
    "HP EliteBook 840 G3",
    "./images/HP EliteBook 840 G3.png",
    198195
  ),
  new Item(
    3,
    "Lenovo Ideapad 320 (15)",
    "./images/Lenovo Ideapad 320 (15).png",
    137500
  ),
  new Item(4, "Lenovo IdeaPad 720", "./images/Lenovo IdeaPad 720.png", 1500000),
  new Item(
    5,
    "ROG STRIX SCAR Edition Gaming Laptop GL503",
    "./images/ROG STRIX SCAR Edition Gaming Laptop GL503.png",
    1785361
  ),
];

// Add items to the cart
items.forEach((item) => cart.addItem(item));

// Initial render of the cart items
cart.renderCartItems();
