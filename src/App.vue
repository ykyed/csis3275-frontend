<template>
  <div id="app">
    <header class="header">
        <div class="logo">
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
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.icon {
  width: 30px;  
  height: 30px;
  filter: invert(100%);
}
</style>
