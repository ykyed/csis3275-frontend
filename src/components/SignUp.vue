<template>
    <div class="signup-container">
        <h2>Sign up</h2>
        <form @submit.prevent="signup">
        <div>
            <label for="email">Email:</label>
            <input type="email" v-model="email" required />
        </div>
        <div>
          <label for="firstName">First Name:</label>
          <input type="text" v-model="firstName" required />
        </div>
        <div>
            <label for="lastName">Last Name:</label>
            <input type="text" v-model="lastName" required />
        </div>

        <div>
            <label for="dob">Date of Birth:</label>
            <input type="date" v-model="dob" required />
        </div>

        <div>
            <label for="password">Password:</label>
            <input type="password" v-model="password" required />
            <p v-if="passwordError" class="error">{{ passwordError }}</p>
        </div>



        <button type="submit" class ="signup-btn">Sign up</button>
        <p v-if="successMessage" class="success">{{ successMessage }}</p>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
    </div>
  </template>
  
    <script>
    import ApiService from "../services/ApiService";

export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      dob: "",
      email: "",
      password: "",
      successMessage: "",
      errorMessage: "",
      passwordError: "",
    };
  },
  methods: {
    validatePassword(password) {
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*]{8,}$/;
      return regex.test(password);
    },
    
    async signup() {
      if (!this.validatePassword(this.password)) {
        this.passwordError = "Minimum of 8 characters. Uppercase, lowercase letters, and one number";
        return;
      } else {
        this.passwordError = ""; // Clear error if validation passes
      }

      try {
        const response = await ApiService.signup({
          
          firstName: this.firstName,
          lastName: this.lastName,
          dob: this.dob,
          email: this.email,
          password: this.password
        });
        console.log(response.data);
        console.log(this.firstName);

        

        
        if (response.data){
          this.successMessage = "Congratulationes! your account has been successfully created!";
          this.errorMessage = "";

          //성공메시지 보여주고 넘어가게 만듦
          setTimeout(() => {
            this.$router.back();
            }, 3000);  // 3000ms = 3초
          
        }else {
          this.errorMessage = "User with this email already exists."
        }
      } catch (error) {
        this.errorMessage = "Registration failed.";
        console.error(error);
      }
    }
  }
};

    </script>
  
  
  <style scoped>
  .signup-container {
    max-width: 400px;
    margin: 100px auto; /* 위쪽 여백을 100px로 설정하여 아래로 내리기 */
    padding: 20px; /* 내부 여백 추가 */
    border: 1px solid #ccc; /* 테두리 추가 */
    border-radius: 5px; /* 모서리 둥글게 */
    background-color: #f9f9f9; /* 배경색 추가 (선택 사항) */
    font-family: 'Arial', sans-serif;
  }

  h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
  }

  .form-group {
    margin-bottom: 15px;
  }

  label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
    color: #555;
    margin-top:3%
  }

  input[type="email"],
  input[type="text"],
  input[type="password"],
  input[type="date"] {
    width: 100%;
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    transition: border-color 0.3s ease;
    text-align: center; 
  }

  input[type="email"]:focus,
  input[type="text"]:focus,
  input[type="password"]:focus,
  input[type="date"]:focus {
    border-color: #007bff;
    outline: none;
  }

  .signup-btn {
    width: 40%;
    padding: 0.8rem;
    font-size: 1rem;
    background-color: black;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
  }

  .signup-btn:hover {
    background-color: #0056b3;
  }

  .success,
  .error {
    text-align: center;
    margin-top: 10px;
  }

  .success {
    color: green;
  }

  .error {
    color: red;
}
  </style>