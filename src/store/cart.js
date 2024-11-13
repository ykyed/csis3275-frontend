import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItem: localStorage.getItem('cartItem') || 0,
  }),
  actions: {

    setCartItem(count) {
      console.log("setCartItem: " + count);
      this.cartItem = count;
      localStorage.setItem('cartItem', count);
    },

    getCartItem() {
      return this.cartItem;
    },
    
    clearCartItem() {
      console.log("clearUsclearCartItemerName");
      this.cartItem = 0;
      localStorage.removeItem('cartItem'); 
    },

  },
});