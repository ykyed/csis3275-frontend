<template>
    <div>
        <div>
            <!-- Shoe Information -->
            <div v-if="shoeDetailInfo">
                <h2>{{ shoeDetailInfo.name }}</h2>
                <p>Price: ${{ shoeDetailInfo.price }}</p>

                <!-- Rating as Stars -->
                <div class="rating">
                    <i v-for="n in 5" :key="n" class="fas" :class="n <= Math.floor(shoeDetailInfo.rating) ? 'fa-star' : 'fa-star-half-alt'"></i>
                    <p>Rating: {{ shoeDetailInfo.rating }} / 5</p>
                </div>

                <!-- Main Shoe Image -->
                <div v-if="shoeDetailInfo && shoeDetailInfo.images && shoeDetailInfo.images.length">
                    <div class="main-image-container">
                        <img :src="mainImage" alt="Main Shoe Image" class="main-shoe-image"/>
                    </div>
                    <!-- Thumbnails -->
                    <div class="thumbnail-container">
                        <img 
                            v-for="(image, index) in shoeDetailInfo.images.slice(1)" 
                            :key="index" 
                            :src="image" 
                            alt="Shoe Thumbnail" 
                            class="thumbnail-image"
                            @click="setMainImage(image)"/> <!-- Thumbnail click handler -->
                    </div>
                </div>

                <div v-else>
                    <p>No images available</p>
                </div>
                
                <!-- Size Selection -->
                <div class="sizes-grid">
                    <p>Select Size:</p>
                    <div class="grid-container">
                        <button 
                            v-for="(size, index) in shoeSizes" 
                            :key="index" 
                            @click="selectSize(size)" 
                            :class="{ selected: selectedSize === size }">
                            {{ size }}
                        </button>
                    </div>
                </div>

                <!-- Add to Cart Button -->
                <div>
                    <button :disabled="!selectedSize" @click="addToCart" class="add-to-cart-button">
                        Add to Cart
                    </button>
                </div>

                <hr class="divider">
                <!-- Display Reviews -->
                <div v-if="reviews.length">
                    <h3>Customer Reviews</h3>
                    <div v-for="(review, index) in reviews" :key="index" class="review">
                        <h4>{{ review.title }}</h4>
                        <p>Rating: {{ review.rating }} / 5</p>
                        <p>{{ review.comment }}</p>
                    </div>
                </div>
                <div v-else>
                    <p>No reviews available for this product.</p>
                </div>

                <!-- Add to Write A Review Button -->
                <div>
                    <button @click="writeAReview" class="review-button">
                        Write a review
                    </button>
                </div>

            </div>

            <!-- Loading Message -->
            <div v-else-if="loading">
                <p>Loading...</p>
            </div>
        </div>
    </div>
</template>

<script>
import ApiService from "../services/ApiService";
import '@fortawesome/fontawesome-free/css/all.css';

export default {
    name: "shoeDetailInfo",
    data() {
        return {
        shoeDetailInfo: {},
        mainImage: null,
        loading: true,
        selectedSize: null,  // Track selected size
        shoeSizes: this.generateShoeSizes(6, 13, 0.5), // Create size range from 6 to 13 in 0.5 increments
        reviews:[]
        };
    },
    created() {
        const productcode = this.$route.params.productCode;
        this.getShoeDetailInfo(productcode);
        this.fetchReviews();
    },
    methods: {
        getShoeDetailInfo(productcode) {
            ApiService.getShoeDetailInfo(productcode)
                .then(response => {
                    this.shoeDetailInfo = response.data;
                    this.mainImage = this.shoeDetailInfo.images[0]; // 첫 번째 이미지를 기본 메인 이미지로 설정
                    this.loading = false;
                })
                .catch(e => {
                    console.log(e.response.data);
                });
        },
        writeAReview(){
            //this.$router.push('/reviews'); // review 페이지로 이동
            this.$router.push({ name: 'ReviewPage', params: { productCode: this.productCode } });
        },

        addToCart() {
            const cartItem = {
                productCode: this.shoeDetailInfo.productCode,  // Ensure correct productCode
                productName: this.shoeDetailInfo.name,  // Store product name
                size: this.selectedSize,
                quantity: 1, // You can add logic to select the quantity
                mainImage: this.shoeDetailInfo.images[0],  // Add the main image URL
            };

            let cart = JSON.parse(localStorage.getItem('cart')) || [];  // Get existing cart from localStorage
            
            // Check if the productCode already exists in the cart
            const existingItemIndex = cart.findIndex(item => 
                item.productCode === cartItem.productCode && item.size === cartItem.size
            );

            if (existingItemIndex !== -1) {
                // If item already exists, update the quantity
                cart[existingItemIndex].quantity += cartItem.quantity;
                alert("Item updated in the cart!");
            } else {
                // If item does not exist, add new item to the cart
                cart.push(cartItem);
                alert("Item added to the cart!");
            }

            // Save updated cart back to localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
        },


        fetchReviews() {
            const productCode = this.$route.params.productCode;
            fetch(`http://localhost:8080/api/reviews/${productCode}`)
                .then(response => response.json())
                .then(data => {
                    this.reviews = data;
                })
                .catch(error => {
                    console.error("Error fetching reviews:", error);
                });
        },

        setMainImage(image) {
            this.mainImage = image; // 클릭된 썸네일 이미지를 메인 이미지로 변경
        },

        // Generate shoe sizes dynamically
        generateShoeSizes(start, end, step) {
            const sizes = [];
            for (let size = start; size <= end; size += step) {
                sizes.push(size.toFixed(1)); // Keep one decimal for half sizes
            }
            return sizes;
        },
        // Handle size selection
        selectSize(size) {
            this.selectedSize = size;  // Mark selected size
        }

        
    }
};

</script>

<style scoped>
/* Styling for Main Shoe Image and Thumbnails */
.main-image-container {
    text-align: center;
    margin-bottom: 20px;
}

.main-shoe-image {
    width: 100%;
    max-width: 500px;
    height: auto;
    border: 2px solid #ccc;
}

.thumbnail-container {
    display: flex;
    justify-content: center;
    gap: 10px;
}

.thumbnail-image {
    width: 100px;
    height: auto;
    cursor: pointer;
    border: 1px solid #ddd;
    transition: transform 0.2s ease-in-out;
}

.thumbnail-image:hover {
    transform: scale(1.1);
}

/* Rating (Yellow Stars) Styling */
.rating {
    display: center;
    align-items: center;
    gap: 5px;
    margin-bottom: 15px;
}

.rating i {
    color: #FFD700; /* Yellow color for stars */
    font-size: 20px;
}

/* Styling for Size Selection Grid */
.sizes-grid {
    margin-top: 50px;
}

.grid-container { 
    display: grid;
    grid-template-columns: repeat(5, 90px); /* 5 columns */
    grid-template-rows: repeat(3, auto);  /* 3 rows */
    gap: 10px;
    grid-gap: 10px;
    justify-content: center;
    justify-items: center;  /* Center buttons horizontally */
    align-items: center;    /* Center buttons vertically */
}

.grid-container button {
    width: 80px;  /* Set a fixed width */
    height: 40px; /* Set a fixed height */
    background-color: #eee;
    border: 1px solid #ccc;
    cursor: pointer;
    text-align: center;
    font-size: 16px;  /* Increase font size for better visibility */
}

.sizes button:hover {
    background-color: #ddd;
}

.grid-container button.selected {
    background-color: #007bff; /* Highlight selected size */
    color: white;
}

button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

.add-to-cart-button {
    margin-top: 30px;
    font-size: 15px;
    padding: 10px 15px;
}

.divider {
    margin: 20px 0;
    border: 0;
    border-top: 1px solid #ccc;
}

.review {
    margin: 15px 30px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
}

.review-button {
    margin: 20px;
    font-size: 15px;
    padding: 10px 15px;
}
</style>