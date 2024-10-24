<template>
    <div class="login-container">
      <h2>Sign in</h2>
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="email">Email:</label>
          <input 
            type="email" 
            v-model="email" 
            id="email" 
            required 
            placeholder="Enter your email" 
          />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input 
            type="password" 
            v-model="password" 
            id="password" 
            required 
            placeholder="Enter your password" 
          />
        </div>
        <button type="submit" class="login-button">Login</button>
      </form>
  
      <!-- 로그인 실패 시 에러 메시지 -->
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>

    <!-- Button to navigate to SignUp page -->
    <p>Would you like to join us?<router-link to="/SignUp">
        <br>Sign up</router-link></p>
        
  </div>


  </template>
  
  <script>
  import ApiService from "../services/ApiService"; // ApiService를 import

  export default {
    data() {
      return {
        email: "",
        password: "",
        errorMessage: "", // 로그인 실패 시 에러 메시지를 담을 변수
      };
    },



    methods: {
    async handleLogin() {
      if (this.email && this.password) {
        try {
          // ApiService의 login 메서드를 사용하여 로그인 요청 보내기
          const response = await ApiService.login({
            email: this.email,
            password: this.password,
          });

          // 로그인 성공 처리
          if (response.data === "Login success.") {
            this.successMessage = "You have successfully logged in!";
            this.errorMessage = "";
            // 필요 시 추가적인 로그인 후 동작 (페이지 이동 등)
          } else {
            this.errorMessage = response.data; 
          }
        } catch (error) {
          
          this.errorMessage = "Login failed.";
          console.error(error);
        }
      } else {
        this.errorMessage = "Please enter both email and password.";
      }
    },
  },
};
  </script>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: 100px auto; /* 위쪽 여백을 100px로 설정하여 아래로 내리기 */
    padding: 20px; /* 내부 여백 추가 */
    border: 1px solid #ccc; /* 테두리 추가 */
    border-radius: 5px; /* 모서리 둥글게 */
    background-color: #f9f9f9; /* 배경색 추가 (선택 사항) */

  }
  
  h2 {
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
  }
  
  input {
    width: 80%;
    padding: 0.8rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .login-button {
    width: 100%;
    padding: 0.8rem;
    font-size: 1rem;
    background-color: black;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .login-button:hover {
    background-color: #0056b3;
  }
  
  .error-message {
    margin-top: 1rem;
    color: red;
    text-align: center;
  }
  </style>
  