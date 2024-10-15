<template>
  <div id="app">
    <header class="header">
        <div class="logo" @click="goToAdminPage"> 
            <img src="@/assets/appLogo_b.png" alt="App Logo" class="app-logo" />
        </div>
        <nav class="nav-buttons">
            <button @click="goToCart" class="nav-btn">
                <img src="@/assets/cart.png" alt="Cart" class="icon" />
            </button>
            <button @click="goToLogin" class="nav-btn">
                <img src="@/assets/account.png" alt="Login" class="icon" />
            </button>
        </nav>
    </header>

    <router-view />
  </div>
</template>

<script>


export default {
  name: 'App',
  methods: {
    goToLogin() {
      this.$router.push({ name: 'UserLogin' });
    },
    goToCart() {
      this.$router.push({ name: 'CartItem' });
    },
    goToAdminPage() {
      this.$router.push({ name: 'AdminPage' });
    }
      }
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
</style>
