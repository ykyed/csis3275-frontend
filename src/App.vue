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

    <!-- 로그아웃 확인 팝업 창 -->
    <div v-if="showSignOutDialog" class="dialog-overlay">
      <div class="dialog">
        <p>Are you sure you want to sign out?</p>
        <div class="buttons">
          <button class="confirm-btn" @click="logout">Yes</button>
          <button class="cancel-btn" @click="showSignOutDialog = false">No</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ApiService from "./services/ApiService";
import http from "./http-common.js";
import { useUserStore } from './store/user';
import { useCartStore } from './store/cart';

export default {
  name: 'App',
  data() {
    return {
      showSignOutDialog: false // 팝업 창의 초기 상태를 숨김으로 설정
  };
},

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
        await http.post('http://localhost:8080/logout', {}, { withCredentials: true });
        const userStore = useUserStore();
        userStore.clearUserName();
        userStore.clearUserRole();

        const cartStore = useCartStore();
        cartStore.clearCartItem();

        this.$router.push({ name: 'ShoeList' });
      } catch (error) {
        console.error("Logout failed:", error);
      } finally{
        this.showSignOutDialog = false;
      }
    },
    

    /* async goToLogin() {
      
      const response = await ApiService.getUserInfo();
      if (response.data.name && response.data.name.length > 0) {
        console.log("logout");
        this.logout();
        this.showSignOutDialog = true;
      }
      else {
        this.$router.push({ name: 'UserLogin' });
      }
    },*/
    goToLogin() {
    const userStore = useUserStore();
    if (userStore.userName) {
      this.showSignOutDialog = true; // 팝업 창을 표시하여 로그아웃 여부 확인
    } else {
      this.$router.push({ name: 'UserLogin' }); // 로그인 페이지로 이동
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

.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.dialog {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  width: 300px;
}

.buttons {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.confirm-btn,
.cancel-btn {
  padding: 10px 20px;
  cursor: pointer;
  background-color: black; /* 기본 색상을 검정색으로 설정 */
  color: white;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.confirm-btn:hover,
.cancel-btn:hover {
  background-color: #ccc;
    color: black;
}

</style>
