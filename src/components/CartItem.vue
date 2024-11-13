<template>

  <div class="cart-container">

    <div v-if="cartItems.length > 0" class="cart-list">

      <div class="left-panel">
        <h2 class="cart-title">YOUR CART ({{ cartItems.length }})</h2>

        <div class="cart-header">
          <span>Product</span>
          <span></span>
          <span>Quantity</span>
          <span>Price</span>
          <span class="remove-all" @click="removeAllItems()">Remove All</span>
        </div>

        <div v-for="item in cartItems" :key="item.id" class="cart-item">
          <img :src="item.image" alt="Shoe Image" class="cart-item-image" />

          <div class="product-details">
            <p class="product-name">{{ item.title }}</p>
            <p>Size: {{ item.size }}</p>
          </div>
          <div class="quantity">
            <button class="change-quantity" @click="decreaseQuantity(item)">-</button>
            <span>{{ item.quantity }}</span>
            <button class="change-quantity" @click="increaseQuantity(item)">+</button>
          </div>
          <div class="price">${{ item.price }}</div>
          <button @click="removeItem(item)" class="remove-button">✕</button>
       </div>
      </div>

      <div class="checkout-section">
        <h3 class="checkout-title">Purchase Summary</h3>
        <hr class="divider">

        <div class="checkout-subinfo">
          <p class="checkout-detail">Subtotal ({{ cartItems.length }} items): </p>
          <p class="checkout-detail">${{ totalPrice.toFixed(2) }}</p>
        </div>

        <div class="checkout-subinfo">
          <p class="checkout-detail">Estimated Shipping: </p>
          <p class="checkout-detail">Calculated at Checkout</p>
        </div>

        <div class="checkout-subinfo">
          <p class="checkout-detail">Tax:  </p>
          <p class="checkout-detail">TBD</p>
        </div>
        
        <hr class="divider">

        <div class="checkout-total">
          <h3 class="checkout-title">Total: </h3>
          <h3 class="checkout-title">${{ totalPrice.toFixed(2) }}</h3>
        </div>
       
        <button @click="openDialog" class="checkout-button">Proceed to Checkout</button>
      </div>

      <div v-if="showDialog" class="dialog-overlay" @click="closeDialog">
        <div class="dialog" @click.stop>
          <h3>Checkout</h3>

          <div class="checkout-subinfo">
            <p class="checkout-detail">Cart Total</p>
            <p class="checkout-detail">${{ totalPrice.toFixed(2) }}</p>
          </div>

          <div class="checkout-subinfo">
            <p class="checkout-detail">Shipping</p>
            <p class="checkout-detail">Free</p>
          </div>

          <div class="checkout-subinfo">
            <p class="checkout-detail">Estimated GST/HST</p>
            <p class="checkout-detail">${{ gst.toFixed(2) }}</p>
          </div>

          <div class="checkout-subinfo">
            <p class="checkout-detail">Estimated PST/RST/QST</p>
            <p class="checkout-detail">${{ pst.toFixed(2) }}</p>
          </div>

          <hr class="divider">
          
          <div class="checkout-total">
            <h3 class="checkout-title">Order Total: </h3>
            <h3 class="checkout-title">${{ finalPrice.toFixed(2) }}</h3>
          </div>
          <button @click="closeDialog" class="close-button">Close</button>
        </div>
      </div>
    </div>

    <div v-else>
      <br><br><br>
      <p>Your cart is empty</p>
    </div>
  </div>

</template>

<script>
import ApiService from '@/services/ApiService';
import { useCartStore } from '../store/cart';

export default {
  data() {
    return {
      cartItems: [],
      totalPrice: 0,
      showDialog: false,
    };
  },

  created() {
    this.loadCart();
  },
  
  methods: {
    async loadCart() {

      const userInfo = await ApiService.getUserInfo();
      console.log("loadCart, user Email: " + userInfo.data.username);

      ApiService.getCartItemByUser(userInfo.data.username)
        .then(async response => {
          
          console.log("loadCart, cart item size: " + response.data.length);
          for (let i = 0; i < response.data.length; i++) {
            console.log("loadCart, cart item size: " + response.data[i].productCode);

            ApiService.getShoeDetailInfo(response.data[i].productCode)
              .then(async shoeInfo => {

              const cartItem = {
                  id: response.data[i].id,
                  productCode: shoeInfo.data.productCode,
                  userEmail: userInfo.data.username,
                  title: shoeInfo.data.title,
                  price: shoeInfo.data.price,
                  size: response.data[i].size,
                  quantity: response.data[i].quantity,
                  image: shoeInfo.data.thumbnail,
              };
              console.log("loadCart, cart item info: " + cartItem.title + ", " + cartItem.price + ", " + cartItem.size + ", " + cartItem.quantity);
              this.cartItems.push(cartItem);

              this.totalPrice += cartItem.price * cartItem.quantity;
              })
          }
        })
        .catch(error => {
            console.error(error);
        });
    },

    async removeItem(currentItem) {

      this.totalPrice -= (currentItem.price * currentItem.quantity);
      
      await ApiService.deleteCartItem(currentItem.id);
      this.cartItems = this.cartItems.filter(item => item.id !== currentItem.id);

      const cartStore = useCartStore()
      cartStore.setCartItem(this.cartItems.length);
    },

    async removeAllItems() {
      const userInfo = await ApiService.getUserInfo();
      await ApiService.deleteCartItems(userInfo.data.username);
      this.cartItems = [];

      const cartStore = useCartStore()
      cartStore.setCartItem(this.cartItems.length);
    },

    async decreaseQuantity(item) {

        this.totalPrice -= item.price;

        const cartItem = {
                  id: item.id,
                  userEmail: item.userEmail,
                  productCode: item.productCode,
                  quantity: item.quantity - 1,
                  size: item.size,
              };

        await ApiService.updateCartItem(cartItem);

        item.quantity = item.quantity - 1;

        if (item.quantity === 0) {
          this.removeItem(item);
        }
    },

    increaseQuantity(item) {
      this.totalPrice += item.price;

        const cartItem = {
                  id: item.id,
                  userEmail: item.userEmail,
                  productCode: item.productCode,
                  quantity: item.quantity + 1,
                  size: item.size,
              };

        ApiService.updateCartItem(cartItem);

        item.quantity = item.quantity + 1;
    },

    openDialog() {
        this.showDialog = true;
        this.gst = this.totalPrice * 0.05;
        this.pst = this.totalPrice * 0.07;
        this.finalPrice = this.totalPrice + this.gst + this.pst;
    },

    closeDialog() {
      this.showDialog = false;
    }
  },
};
</script>


<style scoped>
.cart-container {
  display: flex;
  justify-content: center;  
}

.cart-list {
    width: 80%;
    display: flex;
    justify-content: center;
}

.cart-title {
  font-size: 20px;
}

.left-panel {
  width: 55%;
  margin-right: 2%;
}

.left-panel > h2 {
  display: flex;
}

.cart-item {
  display: grid;
  grid-template-columns: 100px 1fr 15% 15% 15%;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0;
  font-size: small;
}

.cart-header {
  display: grid;
  grid-template-columns: 100px 1fr 15% 15% 15%;
  align-items: center;
  padding: 10px 0;
  font-weight: bold;
  font-size: small;
  border-bottom: 2px solid #000;
}

.cart-header > span {
  justify-content: left;
  margin-right: 20px;
}

.remove-all {
  text-decoration: underline;
  cursor: pointer;
}

.cart-item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
}

.product-details {
  display: flex;
  flex-direction: column;
  text-align: start;
}

.quantity {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-right: 20px;
}

.change-quantity {
  background-color: white;
  color: black;
  border: none;
  cursor: pointer;
  font-weight: bold;
}

.price, .remove-button {
  text-align: center;
  margin-right: 20px;
}

.remove-button {
  background: none;
  border: none;
  font-size: 1.0rem;
  cursor: pointer;
}

.checkout-section {
  width: 30%;
  height: 250px;
  background-color: #f9f9f9;
  margin-top: 60px;
}

.checkout-title {
  text-align: left;
  font-size: small;
  padding-left: 10px;
}

.checkout-detail {
  text-align: left;
  font-size: small;
  padding-left: 10px;
  margin-bottom: 7px;
  margin-top: 0px;
}

.checkout-subinfo {
  display: flex;
  justify-content: space-between;
  margin-left: 10px;
  margin-right: 10px;
}

.checkout-total {
  display: flex;
  justify-content: space-between;
  font-size: small;
  margin-right: 10px;
}

.checkout-button {
  margin-top: 10px;
  width: 95%;
  padding: 10px;
  font-weight: bold;
  cursor: pointer;
  background-color: black;
  color: white;
  border: none;
  border-radius: 5px;
}

.divider {
    margin: 10px 10px 10px 10px;
    border: 0;
    border-top: 1px solid #ccc;
}

.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  text-align: center;
}

.close-button {
  margin-top: 20px;
  padding: 10px;
  background-color: #333;
  color: white;
  border: none;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 5px;
}
</style>