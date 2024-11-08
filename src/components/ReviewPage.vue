<template>
    <div class="review-container">
      <h2>{{ productName }}</h2>

      <div v-if="shoeDetailInfo">
      <h2>{{ shoeDetailInfo.name }}</h2>
      <p>Price: ${{ shoeDetailInfo.price }}</p>

      <!-- 메인 이미지 -->
      <div class="main-image-container">
        <img :src="mainImage" alt="Main Shoe Image" class="main-shoe-image"/>
      </div>
    </div>
    
      
      <div class="rating">
        <i v-for="n in 5" :key="n" class="fas" 
          :class="n <= rating ? 'fa-star filled' : 'fa-star'"
          @click="setRating(n)"></i>
      </div>
      

      <div class="review-form">
        <label for="review-title">Review title</label>
        <input type="text" id="review-title" v-model="title" placeholder="Summarize your review in 150 characters or less" />
  
        <label for="review-comment">Your Review</label>
        <textarea id="review-comment" v-model="comment" placeholder="Describe what you liked, what you didn’t like and other key things shoppers should know. Minimum 30 characters."></textarea>
        
        <button @click="submitReview">Submit Review</button>
      </div>

      <div v-if="successMessage" class="success-message">
        {{ successMessage }}
      </div>

    </div>
    
  </template>
  
<script>

import ApiService from "../services/ApiService"; 
import axios from 'axios';

export default {
  name: 'ReviewPage',
  props: {
    productCode: String
  },
  data() {
    return {
      shoeDetailInfo: null,
      mainImage: null, 
      productName: "",
      rating: 0.0,
      title: "",
      comment: "",
      reviews: [],
      successMessage: "",
     // isAuthenticated: false // 추가
    };
  },
  async created() {
    // 로그인 상태 확인 후, 비회원일 경우 로그인 페이지로 이동
    //await this.checkAuthentication();
    await this.getShoeDetailInfo(this.productCode); 
    this.fetchReviews();
  },
  methods: {
   /* async checkAuthentication() {
      try {
        const userInfo = await ApiService.getUserInfo();
        console.log("User info:", userInfo); 
        if (userInfo.data && userInfo.data.email) {
          this.isAuthenticated = true; // 로그인된 상태
        } else {
          throw new Error("Not logged in");
        }
      } catch (error) {
        // 로그인되지 않은 경우 로그인 페이지로 이동
        this.$router.push({ name: "UserLogin" });
      }
    },*/
    async getShoeDetailInfo(productCode) {
      try {
        const response = await ApiService.getShoeDetailInfo(productCode);
        this.shoeDetailInfo = response.data;
        this.mainImage = this.shoeDetailInfo.images ? this.shoeDetailInfo.images[0] : null;
      } catch (error) {
        console.error("Failed to fetch shoe details:", error);
      }
    },
    setRating(index) {
      this.rating = index;
    },
    async fetchReviews() {
      try {
        const response = await axios.get(`http://localhost:8080/api/reviews/${this.productCode}`);
        this.reviews = response.data;
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    },

    async submitReview() {
      if (this.comment.length >= 5 && this.title.length > 0 && this.rating > 0) {
        try {
          const reviewInfo = {
            productCode: this.productCode,
            rating: this.rating,
            title: this.title,
            comment: this.comment
          };
          await ApiService.addReview(reviewInfo); 
          this.successMessage = 'Thank you for sharing your experience!';

          setTimeout(() => {
            this.$router.back();
          }, 1000);
          
          this.fetchReviews(); 
          this.resetForm();
        } catch (error) {
          console.error("Failed to submit review:", error);
        }
      } else {
        alert('Please fill out all fields with valid information.');
      }
    },
    resetForm() {
      this.rating = 0.0;
      this.title = '';
      this.comment = '';
    }
  }
};
</script>

    <style scoped>
    .review-container {
    max-width: 600px;
    margin: 0 auto;
    text-align: center;
    }

    h2 {
    font-size: 1.5em;
    margin-bottom: 20px;
    }

    .rating {
    display: flex;
    justify-content: center;
    gap: 5px;
    font-size: 2em;
    margin-bottom: 20px;
    }

    .rating i {
    font-size: 1em;
    cursor: pointer;
    color: #ccc;
    }

    .rating i.filled {
    color:  #FFD700;
    }

    .review-form label {
    display: block;
    margin: 10px 0 5px;
    }

    .review-form input,
    .review-form textarea {
    width: 100%;
    padding: 8px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
    }

    button {
    padding: 10px 20px;
    border: none;
    background-color: black;
    color: white;
    cursor: pointer;
    }

    button:hover {
    background-color: #0056b3;
    }

  .success-message {
    margin-top: 20px;
    color: blue;
    font-size: 1.2em;
  }
</style>
  
  