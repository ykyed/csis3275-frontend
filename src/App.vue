<template>
  <div id="app">
    <header class="header">
        <div class="logo">
          <button class="logo-btn" @click="goToMainPage">
            <img src="@/assets/appLogo_b.png" alt="App Logo" class="app-logo" />
          </button>
        </div>
        <nav class="nav-buttons">
          <div class="cart-icon-wrapper">
            <button @click="goToCart" class="nav-btn">
                <img src="@/assets/cart.png" alt="Cart" class="icon" />
            </button>
            <span v-if="cartItem > 0" class="cart-badge">{{ cartItem }}</span>
          </div>
            
          <button @click="goToLogin" class="nav-btn">
              <img src="@/assets/account.png" alt="Login" class="icon" />
          </button>

          <span v-if="userName" class="user-info">Hi, {{ userName }}</span>
        </nav>
    </header>

    <router-view />
  </div>
</template>

<script>
import ApiService from "./services/ApiService";
import http from "./http-common.js";
import { useUserStore } from './store/user';
import { useCartStore } from './store/cart';

export default {
  name: 'App',
  data() {},

  computed: {
    userName() {
      const userStore = useUserStore();
      console.log("computed, userName: " + userStore.userName);
      return userStore.userName;
    },

    cartItem() {
      const cartStore = useCartStore();
      console.log("computed, cartItem: " + cartStore.cartItem);
      return cartStore.cartItem;
    }
  },

  async mounted() {
    const userStore = useUserStore();

    try {
      const userInfo = await ApiService.getUserInfo();

      console.log("mounted: name: " + userInfo);
      console.log("mounted: name: " + userInfo.data.name);

      if (userInfo.data.name && userInfo.data.name.length > 0) {
        userStore.setUserName(userInfo.data.name);
        userStore.setUserRole(userInfo.data.role);

        const cartStore = useCartStore();
        const cartInfo = await ApiService.getCartItemByUser(userInfo.data.username);

        console.log("mounted: cartInfo.length: " + cartInfo.data.length);

        cartStore.setCartItem(cartInfo.data.length);
        
      }
      else {
        userStore.clearUserName();
        userStore.clearUserRole();
      }
    } catch (error) {
      console.error("failed:", error);

      userStore.clearUserName();
      userStore.clearUserRole();

      this.logout();
    }

    
  },

  methods: {
    goToMainPage() {
      this.$router.push({ name: 'ShoeList' });
    },

    async logout() {
      try {
        http.post('http://localhost:8080/logout', {}, { withCredentials: true });
        const userStore = useUserStore();
        userStore.clearUserName();
        userStore.clearUserRole();

        const cartStore = useCartStore();
        cartStore.clearCartItem();

        this.$router.push({ name: 'ShoeList' });
      } catch (error) {
        console.error("Logout failed:", error);
      }
    },

    async goToLogin() {
      const response = await ApiService.getUserInfo();
      if (response.data.name && response.data.name.length > 0) {
        console.log("logout");
        this.logout();
      }
      else {
        this.$router.push({ name: 'UserLogin' });
      }
    },

    async goToCart() {
      const response = await ApiService.getUserInfo();
      if (response.data.name && response.data.name.length > 0) {
        this.$router.push({ name: 'CartItem' });
      }
      else {
        this.$router.push({ name: 'UserLogin' });
      }      
    },
  },
}
</script>

<style>

html {
  overflow-y: scroll;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    margin: 0;
    padding: 0;
}

body {
    margin: 0;
    padding-top: 0 !important;
}

.header {
    width: 100%;  
    height: 80px; 
    background-color: black;
    display: flex;
    justify-content: center; 
    align-items: center;
    position: relative;
}

.logo {
  position: relative;
  z-index: 2;
}

.logo .app-logo {
    height: 60px; 
    margin-top: 5px;
}

.nav-buttons {
    width: 80%;
    margin: 0 auto;
    position: absolute;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    z-index: 1;
}

.logo-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.logo-btn img {
  height: 60px;
  margin-top: 5px;
}

.nav-btn {
  width: 30px;  
  height: 30px;
  border: none;
  cursor: pointer;
  background-color: transparent;
}

.icon {
  filter: invert(100%);
  width: 30px;  
  height: 30px;
}

.cart-icon-wrapper {
  position: relative;
  width: 30px;
  height: 30px;
}

.cart-badge {
  position: absolute;
  top: 0;
  right: 0;
  background-color: white;
  color: black;
  border-radius: 50%;
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 2px;
  padding-bottom: 2px;
  font-size: 0.8rem;
  font-weight: bold;
  transform: translate(80%, -40%);
}

.user-info {
    color: white;            
    font-size: 1rem;           
    align-self: flex-end;     
    margin-right: 10px;        
    padding-bottom: 0px;       
}
</style>
