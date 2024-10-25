<template>
    <div>
        <div>
            <!-- Shoe Information -->
            <div v-if="shoeDetailInfo">
                <h2 class="title">{{ shoeDetailInfo.shoeInfo.title }}</h2>
                <p>Price: ${{ shoeDetailInfo.shoeInfo.price }}</p>

                <!-- Rating as Stars -->
                <div class="rating">
                    <i v-for="n in 5" :key="n" class="fas" :class="n <= Math.floor(shoeDetailInfo.shoeInfo.rating) ? 'fa-star' : 'fa-star-half-alt'"></i>
                    <p>{{ shoeDetailInfo.shoeInfo.rating }} / 5</p>
                </div>

                <!-- Main Shoe Image -->
                <div v-if="shoeDetailInfo && shoeDetailInfo.images && shoeDetailInfo.images.length">
                    <div class="main-image-container">
                        <img :src="mainImage" alt="Main Shoe Image" class="main-shoe-image"/>
                    </div>
                    <!-- Thumbnails -->
                    <div class="thumbnail-container">
                        <img 
                            v-for="(image, index) in shoeDetailInfo.images.slice(0)" 
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
                    <button :disabled="!selectedSize" @click="addToCart">
                        Add to Cart
                    </button>
                </div>

                <!-- Add to Write A Review Button -->
                <div>
                    <button :disabled="!selectedSize" @click="writeAReview">
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
    title: "shoeDetailInfo",
    data() {
        return {
        shoeDetailInfo: null,
        mainImage: null,
        loading: true,
        selectedSize: null,  // Track selected size
        shoeSizes: this.generateShoeSizes(6, 13, 0.5), // Create size range from 6 to 13 in 0.5 increments
        };
    },
    created() {
        const productcode = this.$route.params.productCode;
        this.getShoeDetailInfo(productcode);
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
</style>