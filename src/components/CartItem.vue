<template>
  <div class="cart-container">
    <div v-if="cartItems.length > 0" class="cart-list">
      <div v-for="(item, index) in cartItems" :key="index" class="cart-item">
        <img :src="item.mainImage" alt="Shoe Image" class="cart-item-image" />
        <p v-if="item.productName"><strong>Product Name:</strong> {{ item.productName }}</p>
        <p v-else><strong>Product Name:</strong> Not available</p>
        <p><strong>Size:</strong> {{ item.size }}</p>
        <p><strong>Quantity:</strong> {{ item.quantity }}</p>
        <button @click="removeItem(index)">Remove</button>
      </div>
    </div>
    <div v-else>
      <p>Your cart is empty</p>
    </div>

    <hr class="divider">
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartItems: [],
    };
  },
  created() {
    this.loadCart();
  },
  methods: {
    loadCart() {
        const cartData = JSON.parse(localStorage.getItem('cart')) || [];
        this.cartItems = cartData.map(item => ({
            ...item,
            productName: item.productName || 'No Name'  // Default if name is missing
        }));
    },
    removeItem(index) {
      this.cartItems.splice(index, 1); // Remove the item from the cart
      localStorage.setItem('cart', JSON.stringify(this.cartItems)); // Update cart in localStorage
    },
  },
};
</script>


<style scoped>
.cart-container {
  padding: 20px;
}

.cart-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* Keeps the cart items aligned at the top */
}

.cart-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 8px;
  width: 700px;
  max-width: 100%;
}

.cart-item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-right: 15px;
}

.cart-item-details {
  flex: 1;
}

.cart-item p {
  margin: 20px;
}

button {
  background-color: red;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 10px;
  margin-left: 20px;
}

.divider {
    margin: 20px 0;
    border: 0;
    border-top: 1px solid #ccc;
}
</style>