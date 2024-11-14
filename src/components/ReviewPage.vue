<template>
    <div class="review-container">
      <h2>{{ productName }}</h2>

      <div v-if="shoeDetailInfo">
      <h2>{{ shoeDetailInfo ? shoeDetailInfo.title : productName }}</h2>
      <p>Price: ${{ shoeDetailInfo.price }}</p>

      <!-- 메인 이미지 -->
      <div class="main-image-container">
        <img :src="mainImage" alt="Main Shoe Image" class="main-shoe-image"/>
      </div>
    </div>
    

      <div class="rating">
          <svg v-for="star in 5" :key="star" viewBox="0 0 24 24" class="star-svg" :class="{ filled: star <= rating }" @click="setRating(star)">
              <path d="M12 3.1c.5 0 .9.3 1.1.7l1.8 3.6 3.9.6c.5.1.9.5 1 .9.1.5-.1 1-.5 1.3l-2.9 2.8.7 4.1c.1.5-.1 1-.5 1.2-.3.3-.8.3-1.2.1L12 16.5l-3.7 1.9c-.4.2-.9.1-1.2-.1-.4-.2-.6-.7-.5-1.2l.7-4.1-2.9-2.8c-.4-.3-.6-.8-.5-1.3.1-.5.5-.8 1-.9l3.9-.6 1.8-3.6c.2-.4.6-.7 1.1-.7z"/>
          </svg>
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

    .star-svg {
      width: 50px;
      height: 50px;
      cursor: pointer;
      fill: #ccc;
      transition: fill 0.3s ease;
    }

    .star-svg.filled {
      fill: rgb(249, 216, 73);
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
      margin-bottom: 20px;
    }

    button:hover {
      background-color: #ccc;
      color: black;
    }

  .success-message {
    margin-top: 20px;
    color: blue;
    font-size: 1.2em;
  }

  .main-image-container{
    margin-top: 20px;
  }

  .main-shoe-image{
    width: 300px;
    height: auto;
    border-radius: 5px;
  }

  
</style>
  
  