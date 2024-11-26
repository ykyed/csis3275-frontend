<template>
    <div class="signup-container">
        <h2>Sign up</h2>
        <form @submit.prevent="signup">
        <div>
            <label for="email">Email:</label>
            <input type="email" v-model="email" 
            required 
            placeholder="Enter your email"/>
            
        </div>
        <div>
          <label for="firstName">First Name:</label>
          <input type="text" v-model="firstName" required 
          placeholder="First name"/>
        </div>
        <div>
            <label for="lastName">Last Name:</label>
            <input type="text" v-model="lastName" required 
            placeholder="Last name"/>
        </div>

        <div>
            <label for="dob">Date of Birth:</label>
            <input type="date" v-model="dob" required />
        </div>

        <div>
            <label for="password">Password:</label>
            <input type="password" v-model="password" required 
            placeholder="Minimum of 8 characters"/>
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

        signup() {
          if (!this.validatePassword(this.password)) {
            this.passwordError = "Minimum of 8 characters. Uppercase, lowercase letters, and one number";
            return;
          } else {
            this.passwordError = ""; 
          }

          ApiService.signup({
            firstName: this.firstName,
            lastName: this.lastName,
            dob: this.dob,
            email: this.email,
            password: this.password
          })
          .then(response => {
            console.log(response.data);
            console.log(this.firstName);

            if (response.data === true) {
              this.successMessage = "Congratulations! Your account has been successfully created!";
              this.errorMessage = "";

              setTimeout(() => {
                this.$router.back();
              }, 1000);
            } else {
              this.errorMessage = "User with this email already exists.";
            }
          })
          .catch(error => {
            this.errorMessage = "User with this email already exists.";
            console.error(error);
          });
        }
      }
    };

  </script>
  
  
  <style scoped>
  .signup-container {
    max-width: 400px;
    margin: 100px auto; 
    padding: 20px; 
    border: 1px solid #ccc; 
    border-radius: 5px; 
    background-color: #f9f9f9; 
    font-family: 'Arial', sans-serif;
  }

  h2 {
    text-align: center;
    margin-bottom: 2rem;
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
    width: 80%;
    padding: 0.8rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
    transition: border-color 0.3s ease;
    
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
    padding-top: 0.7rem;
    padding-bottom: 0.7rem;
    padding-left: 1rem;
    padding-right: 1rem;
    font-size: 1rem;
    background-color: black;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
  }

  .signup-btn:hover {
    background-color: #ccc;
    color: black;
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