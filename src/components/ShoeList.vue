<template>
    <!-- define the layout -->
    <div>

        <div>
            <label for="brand">Brand</label>
            <input type="text" id="brand" v-model="shoeListRequest.brand" />
        </div>

        <button type="submit" @click="getShoes">Get Shoes</button>
        <p>{{ message }}</p>
    </div>
</template>

<script>
import ShoeService from "../services/ShoeService";

export default {
    name: "shoeList",
    data() {           
        return {
            shoeListRequest: { shoeId:"", brand: "" },  // json
            message: ""
        };
    },
    methods: {
        getShoes() {
            ShoeService.shoeList(this.shoeListRequest)
                .then(response => {       // HttpStatus.OK
                    var shoe = response.data;
                    console.log(shoe.shoeId);
                    localStorage.setItem("shoeId", shoe.shoeId);
                    this.message = shoe.shoeId;
                    // store the student (sid) to the local storage
                    // RESTful server does not have session
                    // Session info is saved in local storage and talk to
                    // server as json
                    this.$router.push({ name: "shoeList" });
                })
                .catch(e => {
                    this.shoeListRequest.id = "";
                   console.log(e.response.data);
                });
        }
    },
    mounted() {   // called when component is loaded
        this.message = "";
    }
};
</script>

<style>
.edit-form {
    max-width: 300px;
    margin: auto;
}
</style>
