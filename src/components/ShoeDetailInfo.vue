<template>
    <div class="shoe-detail-wrapper">
        <div class="shoe-detail-container">
            <!-- Image Section -->
            <div class="image-section">
                <div class="main-image-container">
                    <img :src="mainImage" alt="Main Shoe Image" class="main-shoe-image"/>
                </div>
                <div class="thumbnail-container">
                    <img 
                        v-for="(image, index) in shoeDetailInfo.images.slice(0)" 
                        :key="index" 
                        :src="image" 
                        alt="Shoe Thumbnail" 
                        class="thumbnail-image"
                        @click="setMainImage(image)" />
                </div>
            </div>

            <!-- Info Section -->
            <div class="info-section" v-if="!loading">
                <h2>{{ shoeDetailInfo.title }}</h2>
                <p>Price: ${{ shoeDetailInfo.price }}</p>

                <div class="rating-container">
                    <div class="rating-bar">
                        <div class="stars">
                            <svg v-for="star in 5" :key="star" viewBox="0 0 24 24" class="star-svg" :style="getStarStyle(shoeDetailInfo.rating, star)">
                                <defs>
                                    <linearGradient :id="'grad' + star" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stop-color="rgb(249, 216, 73)" />
                                        <stop :offset="Math.max((shoeDetailInfo.rating - star + 1) * 100, 0) + '%'" stop-color="rgb(249, 216, 73)" />
                                        <stop :offset="Math.max((shoeDetailInfo.rating - star + 1) * 100, 0) + '%'" stop-color="transparent" />
                                    </linearGradient>
                                </defs>
                                <path :fill="'url(#grad' + star + ')'" d="M12 3.1c.5 0 .9.3 1.1.7l1.8 3.6 3.9.6c.5.1.9.5 1 .9.1.5-.1 1-.5 1.3l-2.9 2.8.7 4.1c.1.5-.1 1-.5 1.2-.3.3-.8.3-1.2.1L12 16.5l-3.7 1.9c-.4.2-.9.1-1.2-.1-.4-.2-.6-.7-.5-1.2l.7-4.1-2.9-2.8c-.4-.3-.6-.8-.5-1.3.1-.5.5-.8 1-.9l3.9-.6 1.8-3.6c.2-.4.6-.7 1.1-.7z"/>
                            </svg>
                        </div>
                    </div>
                </div>

                <p>Rating: {{ shoeDetailInfo.rating }} / 5</p>

                <!-- Size Selection -->
                <div class="sizes-grid">
                    <h3>Select Size:</h3>
                    <div class="grid-container">
                        <button 
                        v-for="(sizeInfo, index) in shoeSizes" 
                        :key="index" 
                        @click="selectSize(sizeInfo.size)" 
                        :class="{ selected: selectedSize === sizeInfo.size }"
                        :disabled="sizeInfo.quantity == 0">
                        {{ sizeInfo.size }} <!-- 사이즈만 출력 -->
                        </button>
                    </div>
                </div>

                <!-- Add to Cart Button -->
                <div>
                    <button :disabled="!selectedSize" @click="addToCart" class="add-to-cart-button" :class="{ 'hover-enabled': selectedSize }">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>

        <!-- Review Section -->
        <div v-if="reviews.length">
            <h3>Customer Reviews</h3>
            
            <div class="review" v-if="reviews.length > 0">
            <h4>{{ reviews[0].title }}</h4>
            <div class="rating-container">
                <div class="rating-bar">
                    <div class="stars">
                        <svg v-for="star in 5" :key="star" viewBox="0 0 24 24" class="star-svg" :style="getStarStyle(reviews[0].rating, star)">
                            <defs>
                                <linearGradient :id="'grad' + star" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stop-color="rgb(249, 216, 73)" />
                                    <stop :offset="Math.max((reviews[0].rating - star + 1) * 100, 0) + '%'" stop-color="rgb(249, 216, 73)" />
                                    <stop :offset="Math.max((reviews[0].rating - star + 1) * 100, 0) + '%'" stop-color="transparent" />
                                </linearGradient>
                            </defs>
                            <path :fill="'url(#grad' + star + ')'" d="M12 3.1c.5 0 .9.3 1.1.7l1.8 3.6 3.9.6c.5.1.9.5 1 .9.1.5-.1 1-.5 1.3l-2.9 2.8.7 4.1c.1.5-.1 1-.5 1.2-.3.3-.8.3-1.2.1L12 16.5l-3.7 1.9c-.4.2-.9.1-1.2-.1-.4-.2-.6-.7-.5-1.2l.7-4.1-2.9-2.8c-.4-.3-.6-.8-.5-1.3.1-.5.5-.8 1-.9l3.9-.6 1.8-3.6c.2-.4.6-.7 1.1-.7z"/>
                        </svg>
                    </div>
                </div>
            </div>
            <p>Rating: {{ reviews[0].rating }} / 5</p>
            <p>{{ reviews[0].comment }}</p>
        </div>

        <!-- Show more reviews if button clicked -->
            <div v-show="showMoreReviews">
                <div v-for="(review, index) in reviews.slice(1)" :key="index" class="review">
                    <h4>{{ review.title }}</h4>
                    <div class="rating-container">
                        <div class="rating-bar">
                            <div class="stars">
                                <svg v-for="star in 5" :key="star" viewBox="0 0 24 24" class="star-svg" :style="getStarStyle(review.rating, star)">
                                    <defs>
                                        <linearGradient :id="'grad' + star" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stop-color="rgb(249, 216, 73)" />
                                            <stop :offset="Math.max((review.rating - star + 1) * 100, 0) + '%'" stop-color="rgb(249, 216, 73)" />
                                            <stop :offset="Math.max((review.rating - star + 1) * 100, 0) + '%'" stop-color="transparent" />
                                        </linearGradient>
                                    </defs>
                                    <path :fill="'url(#grad' + star + ')'" d="M12 3.1c.5 0 .9.3 1.1.7l1.8 3.6 3.9.6c.5.1.9.5 1 .9.1.5-.1 1-.5 1.3l-2.9 2.8.7 4.1c.1.5-.1 1-.5 1.2-.3.3-.8.3-1.2.1L12 16.5l-3.7 1.9c-.4.2-.9.1-1.2-.1-.4-.2-.6-.7-.5-1.2l.7-4.1-2.9-2.8c-.4-.3-.6-.8-.5-1.3.1-.5.5-.8 1-.9l3.9-.6 1.8-3.6c.2-.4.6-.7 1.1-.7z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <p>Rating: {{ review.rating }} / 5</p>
                    <p>{{ review.comment }}</p>
                </div>
            </div>
            <!-- Show More / Show Less Button -->
            <button v-if="reviews.length > 1" @click="toggleMoreReviews" class="more-reviews-button">
                {{ showMoreReviews ? 'Show Less' : 'Show More' }}
            </button>
        </div>

        <div v-else>
            <p>No reviews available for this product.</p>
        </div>

        <!-- Review Button -->
        <div>
            <button @click="writeAReview" class="review-button">
                Write a review
            </button>
        </div> 
    </div>        
</template>

<script>
import ApiService from "../services/ApiService";
import '@fortawesome/fontawesome-free/css/all.css';
import { useCartStore } from '../store/cart';

export default {
    name: "ShoeDetailInfo",
    data() {
        return {
        shoeDetailInfo: {
            images: []  // Initialize images as an empty array
        },
        rating: 0.0,
        mainImage: null,
        loading: true,
        selectedSize: null,  // Track selected size
        shoeSizes: [],
        reviews:[],
        showMoreReviews: false,
        cartInfo: {}
        };
    },
    created() {
        const productcode = this.$route.params.productCode;
        this.getShoeDetailInfo(productcode);
        this.fetchReviews();
        this.fetchShoeSizes(productcode);
    },
    methods: {
        //  // Add size to the product
        // addSize(productCode, sizeInfo) {
        //     ApiService.addSizes(productCode, sizeInfo)
        //     .then(response => {
        //         console.log('Size added successfully:', response);
        //         this.fetchShoeSizes(productCode);  // Refresh the sizes list
        //     })
        //     .catch(error => {
        //         console.error("Error adding size:", error);
        //     });
        // },

        // // Update existing sizes for the product
        // updateSize(productCode, sizeInfo) {
        //     ApiService.updateSizes(productCode, sizeInfo)
        //     .then(response => {
        //         console.log('Size updated successfully:', response);
        //         this.fetchShoeSizes(productCode);  // Refresh the sizes list
        //     })
        //     .catch(error => {
        //         console.error("Error updating size:", error);
        //     });
        // },

        fetchShoeSizes(productCode) {
            ApiService.getSizeByProductCode(productCode)
            .then(response => {
                this.shoeSizes = response.data;
            })
            .catch(error => {
                console.error("Error fetching shoe sizes:", error);
            });
        },

        toggleMoreReviews() {
        this.showMoreReviews = !this.showMoreReviews; // Toggle visibility of additional reviews
        },

        getShoeDetailInfo(productcode) {
            ApiService.getShoeDetailInfo(productcode)
                .then(response => {
                    this.shoeDetailInfo = response.data;
                    this.mainImage = this.shoeDetailInfo.images[0];
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

        async addToCart() {

            const response = await ApiService.getUserInfo();
            if (response.data.name && response.data.name.length > 0) {

                const cartInfo = {};
                cartInfo.userEmail = response.data.username;
                cartInfo.productCode = this.shoeDetailInfo.productCode;
                cartInfo.size = this.selectedSize;
                cartInfo.quantity = 1;
                
                await ApiService.addCartItem(cartInfo);

                const cartInfos = await ApiService.getCartItemByUser(response.data.username);
                const cartStore = useCartStore();
                cartStore.setCartItem(cartInfos.data.length);
                
            }
            else {
                this.$router.push({ name: 'UserLogin' });
            }
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
        },

        getStarStyle(rating, star) {
            console.log("getStarStyle, rating" + rating);
            if (star <= Math.floor(rating)) {
                return { fill: 'rgb(249, 216, 73)' };
            } else if (star === Math.ceil(rating)) {
                const percentage = (rating % 1) * 100;
                return {
                    fill: `url(#grad${star})`,
                    background: `linear-gradient(90deg,  rgb(249, 216, 73)  ${percentage}%, white ${percentage}%)`,
                    'background-clip': 'text',
                    color: 'transparent'
                };
            } else {
                return { color: 'transparent' };
            }
        } 
    }
};

</script>

<style scoped>
.shoe-detail-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70vh;
    margin-top: 10px;
}

.image-section, .info-section {
    flex: 0 0 20%;
}

.image-section {
    margin-right: 20px;
}

.info-section {
    margin-left: 20px;
}

.main-image-container {
    text-align: center;
    margin-bottom: 20px;
}

.main-shoe-image {
    width: 100%;
    max-width: 500px;
    height: auto;
    border: 2px solid #ccc;
    border-radius: 5px;
}

.thumbnail-container {
    display: flex;
    justify-content: center;
    gap: 10px;
}

.thumbnail-image {
    width: 70px;
    height: auto;
    cursor: pointer;
    border: 1px solid #ddd;
    transition: transform 0.2s ease-in-out;
    border-radius: 5px;
}

.thumbnail-image:hover {
    transform: scale(1.1);
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
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
    font-size: 16px;  /* Increase font size for better visibility */
}

.sizes button:hover {
    background-color: #ddd;
}

.grid-container button.selected {
    border-radius: 5px;
    background-color: black; /* Highlight selected size */
    color: white;
}

button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

.add-to-cart-button {
    margin-top: 30px;
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
}

.add-to-cart-button.hover-enabled:hover {
    background-color: #ccc;
    color: black;
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

.more-reviews-button {
    margin: 2px;
    padding-top: 0.7rem;
    padding-bottom: 0.7rem;
    padding-left: 1rem;
    padding-right: 1rem;
    font-size: 0.6rem;
    background-color: black;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.more-review-button:hover {
    background-color: #ccc;
    color: black;
}

.review-button {
    margin: 20px;
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
}

.review-button:hover {
    background-color: #ccc;
    color: black;
}

.rating-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.rating-bar {
  display: flex;
  align-items: center;
}

.stars {
    display: flex;
}

.star-svg {
    width: 25px;
    height: 25px;
    margin-right: 5px;
}

.rating-number {
    font-size: 16px;
    margin-left: 10px;
}
</style>