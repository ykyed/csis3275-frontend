<template>
  <div id="app">
    <header class="header">
        <div class="logo">
          <button class="logo-btn" @click="goToMainPage">
            <img src="@/assets/appLogo_b.png" alt="App Logo" class="app-logo" />
          </button>
        </div>
        <nav class="nav-buttons">
            <button @click="goToCart" class="nav-btn">
                <img src="@/assets/cart.png" alt="Cart" class="icon" />
            </button>
            
            <button @click="goToLogin" class="nav-btn">
                <img src="@/assets/account.png" alt="Login" class="icon" />
            </button>

            <span v-if="userName" :key="componentKey" class="user-info">Hi, {{ userName }}</span>
        </nav>
    </header>

    <router-view />
  </div>
</template>

<script>
import ApiService from "./services/ApiService";
import http from "./http-common.js";

export default {
  name: 'App',
  data() {
    return {
      userName: null,
      componentKey: 0,
    };
  },

  methods: {
    goToMainPage() {
      this.$router.push({ name: 'ShoeList' });
    },

    async logout() {
      try {
        http.post('http://localhost:8080/logout', {}, { withCredentials: true });
        this.userName = null;
        this.componentKey += 1;
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

    goToCart() {
      this.$router.push({ name: 'CartItem' });
    },

    

    async fetchUserInfo() {
      try {
    
        console.log("fetchUserInfo called.");
        const response = await ApiService.getUserInfo();
        
        if (response.data.name.length > 0) {
          console.log("yh " + response.data.name);
          this.userName = response.data.name;
          this.componentKey += 1;
          this.$route.go(0);
        }
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    },

  },
  mounted() {
    this.fetchUserInfo();
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

.user-info {
    color: white;            
    font-size: 1rem;           
    align-self: flex-end;     
    margin-right: 10px;        
    padding-bottom: 0px;       
}
</style>
