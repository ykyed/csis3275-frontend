<template>
    <div>
        <h2>Shoes List</h2>
        <div>
            <RouterLink to="ShoesDetail">
            <div v-if="loading">Loading...</div>
            <div v-else class="card-container">
                
                    <div class="card" v-for="shoe in shoes" :key="shoe.id">
                        <div>
                            <img :src="shoe.thumbnail" alt="Shoe Image" class="shoe-image" />
                                <div class="card-content">
                                    <h3>{{ shoe.title }}</h3>
                                    <p>{{ shoe.brand }}</p>
                                    <p>{{ shoe.price }}</p>
                                </div>
                        </div>
                    </div>
            </div>
            </RouterLink>
        </div>
    </div>
</template>

<script>
import ShoesService from "../services/ShoesService";

export default {
    name: "shoesList",
    data() {           
        return {
            shoes: [],
            loading: true,
            shoesListRequest: { productCode:"", title: "", price: "", brand: "", thumbnail: "" }, 
        };
    },
    created() {
        this.getShoes();
    },
    methods: {
        getShoes() {
            ShoesService.shoesList(this.shoesListRequest)
                .then(response => {       // HttpStatus.OK
                    this.shoes = response.data;
                    this.loading = false;
                    //localStorage.setItem("shoeId", shoes.productCode);
                    //this.message = shoes.productCode;
                    //this.$router.push({ name: "shoeList" });
                })
                .catch(e => {
                    //this.shoesListRequest.id = "";
                   console.log(e.response.data);
                });
        }
    },
    mounted() {  
        this.message = "";
    }
};
</script>

<style>
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
