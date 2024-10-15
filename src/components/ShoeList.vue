<template>
    <div class="main-container">
        <div class="shoeList">

            <div class="filter-container">
                <div class="dropdown">
                    <button @click="toggleDropdown('brandDropdown')" class="dropdown-btn">
                        Brand
                    </button>
                    <div v-if="showDropdowns.brandDropdown" class="dropdown-content">
                        <label v-for="brand in brands" :key="brand">
                            <input type="checkbox" :value="brand" v-model="selectedBrands"  @change="applyFilters"/> {{ brand }}
                        </label>
                    </div>

                    <hr>

                    <button @click="toggleDropdown('styleDropdown')" class="dropdown-btn">
                        Style
                    </button>
                    <div v-if="showDropdowns.styleDropdown" class="dropdown-content">
                        <label v-for="style in styles" :key="style">
                            <input type="checkbox" :value="style" v-model="selectedStyles"  @change="applyFilters"/> {{ style }}
                        </label>
                    </div>

                    <hr>

                    <button @click="toggleDropdown('colorDropdown')" class="dropdown-btn">
                        Color
                    </button>
                    <div v-if="showDropdowns.colorDropdown" class="dropdown-content">
                        <label v-for="color in colors" :key="color">
                            <input type="checkbox" :value="color" v-model="selectedColors"  @change="applyFilters"/> {{ color }}
                        </label>
                    </div>

                    <hr>

                    <button @click="toggleDropdown('sizeDropdown')" class="dropdown-btn">
                        Size
                    </button>
                    <div v-if="showDropdowns.sizeDropdown" class="dropdown-content">
                        <label v-for="size in sizes" :key="size">
                            <input type="checkbox" :value="size" v-model="selectedSizes"  @change="applyFilters"/> {{ size }}
                        </label>
                    </div>

                    <hr>
                </div>
            </div>

            <div v-if="loading" class="card-container">Loading...</div>
            <div v-else class="card-container">
        
                <div class="card" v-for="shoe in filteredShoeList" :key="shoe.productCode">
                    <div @click="viewDetailInfo(shoe.productCode)">
                        <img :src="shoe.thumbnail" alt="Shoe Image" class="shoe-image" />
                            <div class="card-content">
                                <p class="card-content-title">{{ shoe.title }}</p>
                                <p class="card-content-price">${{ shoe.price }}</p>
                                <div class="rating-container">
                                    <div class="rating-bar">
                                        
                                        <span v-for="star in 5" :key="star" class="star"  :style="getStarStyle(shoe.rating, star)">
                                        ★
                                        </span>
                                    </div>
                                    <span v-if="shoe.reviewCount > 0" class="review-count">({{ shoe.reviewCount }})</span>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ApiService from "../services/ApiService";

export default {
    name: "ShoeList",
    data() {           
        return {
            shoeList: [],
            filteredShoeList: [],
            brands:[],
            selectedBrands: [],
            styles: [],
            selectedStyles:[],   
            colors: [],
            selectedColors: [],
            sizes: [],
            selectedSizes: [],
            loading: true,
            showDropdowns: { 
                brandDropdown: false,
                styleDropdown: false,
                colorDropdown: false,
                sizeDropdown: false
            }
        };
    },
    created() {
        this.getShoeList();
        this.getBrands();
        this.getStyles();
        this.getColors();
        this.getSizes();
    },
  
    methods: {
        getShoeList() {
            ApiService.getShoeList()
                .then(response => { 
                    this.shoeList = response.data;
                    this.filteredShoeList = this.shoeList;
                    this.loading = false;
                })
                .catch(e => {
                   console.log(e.response.data);
                });
        },

        getBrands() {
            ApiService.getBrandList()
                .then(response => {
                    this.brands = response.data;
                })
                .catch(error => {
                    console.error(error);
                });
        },

        getStyles() {
            ApiService.getStyleList()
                .then(response => {
                    this.styles = response.data;
                })
                .catch(error => {
                    console.error(error);
                });

        },

        getColors() {
            ApiService.getColorList()
                .then(response => {
                    this.colors = response.data;
                })
                .catch(error => {
                    console.error(error);
                });

        },

        getSizes() {
            ApiService.getSizeList()
                .then(response => {
                    this.sizes = response.data;
                })
                .catch(error => {
                    console.error(error);
                });
        },

        clearFilters() {
            this.filteredShoeList = this.shoeList; 
        },

        applyFilters() {
            
            ApiService.getFilteredShoeList(this.selectedBrands, this.selectedStyles, this.selectedColors, this.selectedSizes) 
                .then(response => {
                    
                    this.filteredShoeList = response.data;  
                    console.log(this.filteredShoeList);
                })
                .catch(error => {
                    console.error(error);
                });
        },
        
        toggleDropdown(dropdown) {
            this.showDropdowns[dropdown] = !this.showDropdowns[dropdown];
        },

        getStarStyle(rating, star) {
            if (star <= Math.floor(rating)) {
                return { color: 'rgb(215, 187, 29)' };
            } else if (star === Math.ceil(rating)) {
                const percentage = (rating % 1) * 100;
                return {
                    background: `linear-gradient(90deg,  rgb(215, 187, 29)  ${percentage}%, white ${percentage}%)`,
                    'background-clip': 'text',
                    color: 'transparent'
                };
            } else {
                return { color: 'transparent' };
            }
        },
    

        viewDetailInfo(productCode) {
            this.$router.push({ name: 'ShoeDetailInfo', params: { productCode }});
        }
    },
    mounted() {  
    }
};
</script>

<style>

.main-container {
    display: flex;
    justify-content: center;
}

.shoeList {
    width: 80%;
    display: flex;
    margin-top: 30px;
}

.filter-container {
    width: 15%; 
    margin-top: 20px;
}

.dropdown-btn {
    width: 100%;
    background-color: white;
    color: black;
    text-align: left;
    font-weight: bold;
    font-size: medium;
    margin-top: 10px;
    padding: 10px;
    border: none;
    cursor: pointer;
}

.dropdown-content {
    display: flex;
    flex-direction: column;
    margin-top: 5px;
    padding-left: 10px;
    text-align: left;
    font-size: small;
}

.dropdown-content label {
    margin-bottom: 10px;
}

.card-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, 200px);
    grid-template-rows: repeat(auto-fit, 300px);
    grid-gap: 20px; 
    padding: 10px;
    width: 85%;
    justify-content: start;
    margin-left: 70px;
}

.card {
    width: 200px;
    height: 300px;
    border-radius: 4px; 
    transition: transform 0.1s;
    padding: 10px;
}

.card:hover {
    transform: scale(1.02);
}

.shoe-image {
    width: 100%;
    height: 100%;
    object-fit: cover; 
}

.card-content {
    font-size: 11px;
    text-align: left;
    padding: 5px;
}

.card-content-title {
    font-weight: normal;
}

.card-content-price {
    font-weight: bolder;
}

.star {
    font-size: 12px;
    color: transparent;
}

.rating-container {
    display: flex;
    align-items: center; 
}

.review-count {
    margin-left: 8px; 
    color: #888; 
    font-size: 10px; 
}

</style>
