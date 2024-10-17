<template>
    <div class="signup-container">
        <h2>Sign up</h2>
        <form @submit.prevent="signup">
        <div>
            <label for="email">Email:</label>
            <input type="email" v-model="email" required />
        </div>
        <div>
          <label for="Firstname">First Name:</label>
          <input type="text" v-model="firstname" required />
        </div>
        <div>
            <label for="Lastname">Last Name:</label>
            <input type="text" v-model="lastname" required />
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



        <button type="submit">Sign up</button>
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
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
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
        if (response.data === "Registration success.") {
          this.successMessage = "Congratulationes. your account has been successfully created!";
          this.errorMessage = "";
        } else {
          this.errorMessage = response.data;
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
    margin: 100px auto;
  }
  .success {
    color: green;
  }
  .error {
    color: red;
  }
  </style>