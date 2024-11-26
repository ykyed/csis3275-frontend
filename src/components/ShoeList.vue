<template>  
    <div class="shoe-list-wrapper">

    <div class="shoe-count">
        Total Shoes: {{ filteredShoeList.length }}
    </div>

        <div class="main-container">

            <div class="shoeList">

                <div class="filter-container">

                    <div class="dropdown">
                        <button @click="toggleDropdown('brandDropdown')" class="dropdown-btn">
                            Brand
                            <span class="dropdownicon">{{ showDropdowns.brandDropdown ? '-' : '+' }}</span>
                        </button>
                        <div v-if="showDropdowns.brandDropdown" class="dropdown-content">
                            <label v-for="brand in brands" :key="brand">
                                <input type="checkbox" :value="brand" v-model="selectedBrands"  @change="applyFilters"/> {{ brand }}
                            </label>
                        </div>

                        <hr>

                        <button @click="toggleDropdown('styleDropdown')" class="dropdown-btn">
                            Style
                            <span class="dropdownicon">{{ showDropdowns.styleDropdown ? '-' : '+' }}</span>
                        </button>
                        <div v-if="showDropdowns.styleDropdown" class="dropdown-content">
                            <label v-for="style in styles" :key="style">
                                <input type="checkbox" :value="style" v-model="selectedStyles"  @change="applyFilters"/> {{ style }}
                            </label>
                        </div>

                        <hr>

                        <button @click="toggleDropdown('colorDropdown')" class="dropdown-btn">
                            Color
                            <span class="dropdownicon">{{ showDropdowns.colorDropdown ? '-' : '+' }}</span>
                        </button>
                        <div v-if="showDropdowns.colorDropdown" class="dropdown-content">
                            <label v-for="color in colors" :key="color">
                                <input type="checkbox" :value="color" v-model="selectedColors"  @change="applyFilters"/> {{ color }}
                            </label>
                        </div>

                        <hr>

                        <button @click="toggleDropdown('sizeDropdown')" class="dropdown-btn">
                            Size
                            <span class="dropdownicon">{{ showDropdowns.sizeDropdown ? '-' : '+' }}</span>
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
                                        <svg v-for="star in 5" :key="star" viewBox="0 0 24 24" class="star-svg" :style="getStarStyle(shoe.rating, star)">
                                            <defs>
                                                <linearGradient :id="`grad-${shoe.productCode}-${star}`" x1="0%" y1="0%" x2="100%" y2="0%">
                                                    <stop offset="0%" stop-color="rgb(249, 216, 73)" />
                                                    <stop :offset="Math.max((shoe.rating - star + 1) * 100, 0) + '%'" stop-color="rgb(249, 216, 73)" />
                                                    <stop :offset="Math.max((shoe.rating - star + 1) * 100, 0) + '%'" stop-color="transparent" />
                                                </linearGradient>
                                            </defs>
                                            <path :fill="`url(#grad-${shoe.productCode}-${star})`" d="M12 3.1c.5 0 .9.3 1.1.7l1.8 3.6 3.9.6c.5.1.9.5 1 .9.1.5-.1 1-.5 1.3l-2.9 2.8.7 4.1c.1.5-.1 1-.5 1.2-.3.3-.8.3-1.2.1L12 16.5l-3.7 1.9c-.4.2-.9.1-1.2-.1-.4-.2-.6-.7-.5-1.2l.7-4.1-2.9-2.8c-.4-.3-.6-.8-.5-1.3.1-.5.5-.8 1-.9l3.9-.6 1.8-3.6c.2-.4.6-.7 1.1-.7z"/>
                                        </svg>
                                    </div>
                                    <span v-if="shoe.reviewCount > 0" class="review-count">({{ shoe.reviewCount }})</span>
                                </div>
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
                    console.log("getShoeList title: " + this.shoeList[0].title);
                })
                .catch(e => {
                   console.log("getShoeList: " + e.response.data);
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
                    console.log("applyFilters : " + this.filteredShoeList);
                })
                .catch(error => {
                    console.error(error);
                });
        },
        
        toggleDropdown(dropdown) {
            this.showDropdowns[dropdown] = !this.showDropdowns[dropdown];
        },

        getStarStyle(rating, star) {
            console.log("getStarStyle, rating : " + rating);
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

.shoe-count {
    margin: auto;
    margin-top: 20px;
    width: 79%;
    justify-content: center;
    text-align: left;
    font-size: 0.8rem;
}

.shoeList {
    width: 80%;
    display: flex;
    margin-top: 0px;
}

.filter-container {
    width: 15%; 
    margin-top: 8px;
}

.dropdown {
    margin-bottom: 10px;
}

.dropdown-btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
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

.dropdownicon {
    margin-left: 10px;
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

.rating-container {
    display: flex;
    align-items: center; 
}

.rating-bar {
  display: flex;
}

.star-svg {
  width: 12px;
  height: 12px;

}

.review-count {
    margin-left: 8px; 
    color: #888; 
    font-size: 10px; 
}

</style>
