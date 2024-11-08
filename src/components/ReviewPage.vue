<template>
    <div class="review-container">
      <h2>{{ productName }}</h2>
      
      <div class="rating">
        <span v-for="index in 5" :key="index" @click="setRating(index)" :class="{ 'filled': index <= rating }">★</span>
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
    
      <div class="reviews-list">
        <h3>Reviews</h3>
        <div v-for="review in reviews" :key="review.id">
          <p><strong>{{ review.title }}</strong> - {{ review.rating }} ★</p>
          <p>{{ review.comment }}</p>
        </div>
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
      productName: "",
      rating: 0.0,
      title: "",
      comment: "",
      reviews: [],
      successMessage:"",
    };
  },
  created() {
    this.fetchReviews();
  },
  methods: {
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
      if (this.comment.length >= 30 && this.title.length > 0 && this.rating > 0) {
        try {
          const reviewInfo = {
            productCode: this.productCode,
            rating: this.rating,
            title: this.title,
            comment: this.comment
          };
          console.log("Sending review data: %s , %f, %s, %s", reviewInfo.productCode, reviewInfo.rating, reviewInfo.title, reviewInfo.comment);  //써놓기만 하고 시도를 못해봄 방법을 모르겠어요
          await ApiService.addReview(reviewInfo); 
          this.successMessage = 'Thank you for sharing your experience!';// 성공메시지 뜨게 해봄
          
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

    .rating span {
    cursor: pointer;
    color: #ccc;
    }

    .rating .filled {
    color: yellow;
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
  
  