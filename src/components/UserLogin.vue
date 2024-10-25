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
        <button type="submit" class="login-button">Sign in</button>
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
import ApiService from "../services/ApiService"; 

export default {
  data() {
    return {
      email: "",
      password: "",
      successMessage: "",
      errorMessage: "",
    };
  },


  methods: {
  handleLogin() {
    if (this.email && this.password) {
      ApiService.login({
        email: this.email,
        password: this.password,
      })
        .then(response => {
          console.log(response.data);

          if (response.data === true) { // 서버가 true를 반환하면 로그인 성공
            this.successMessage = "You have successfully logged in!";
            this.errorMessage = "";

            setTimeout(() => {
              this.$router.back(); //약간의 문제가 있음
            }, 1000);
          } else {
            this.errorMessage = "Invalid email or password"; // 실패 메시지
          }
        })
        .catch(error => {
          this.errorMessage = "Login failed."; // 서버 호출 중 에러 처리
          console.error(error);
        });
    } else {
      this.errorMessage = "Please enter both email and password."; // 유효성 검사
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
    width: 80%;
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
  