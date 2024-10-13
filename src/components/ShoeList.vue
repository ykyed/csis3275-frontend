<template>
    <div class="shoeList">
        <div v-if="loading">Loading...</div>
        <div v-else class="card-container">
            
            <div class="card" v-for="shoe in shoeList" :key="shoe.productCode">
                <div @click="viewDetailInfo(shoe.productCode)">
                    <img :src="shoe.thumbnail" alt="Shoe Image" class="shoe-image" />
                        <div class="card-content">
                            <h3>{{ shoe.title }}</h3>
                            <p>{{ shoe.brand }}</p>
                            <p>{{ shoe.price }}</p>
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
            loading: true,
        };
    },
    created() {
        this.getShoeList();
    },
    methods: {
        getShoeList() {
            ApiService.getShoeList()
                .then(response => { 
                    this.shoeList = response.data;
                    this.loading = false;
                    console.log(this.shoeList);
                })
                .catch(e => {
                   console.log(e.response.data);
                });
        },
        viewDetailInfo(productCode) {
            console.log("yh" + productCode);
            this.$router.push({ name: 'ShoeDetailInfo', params: { productCode }});
        }
    },
    mounted() {  
    }
};
</script>

<style>

.shoeList {
    width: 80%;
    margin: 0 auto;
    margin-top: 30px;
}

.card-container {
  display: grid;
  grid-template-columns: auto auto auto auto; 
  grid-gap: 16px; 
  padding: 10px;
}

.card {
  border: 1px solid #ccc; 
  border-radius: 8px; 
  overflow: hidden; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
  transition: transform 0.2s; 
}

.card:hover {
  transform: scale(1.05);
}

.shoe-image {
  width: 100%;
  height: 100%;
  object-fit: cover; 
}

.card-content {
  padding: 16px; 
}
</style>
