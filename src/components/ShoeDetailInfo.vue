<template>
    <div>
        <!-- for test -->
        <div v-if="shoeDetailInfo && shoeDetailInfo.images && shoeDetailInfo.images.length">
            <div class="images-container">
                <img v-for="(image, index) in shoeDetailInfo.images" :key="index" :src="image" alt="Shoe Image" class="shoe-image"/>
            </div>
        </div>
        <div v-else>
            <p></p>
        </div>
        <!-- end -->
    </div>
</template>

<script>
import ApiService from "../services/ApiService";

export default {
    name: "shoeDetailInfo",
    data() {
        return {
            shoeDetailInfo: null,
            loading: true,
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
                    this.loading = false;
                    console.log(this.shoeDetailInfo.images);
                    console.log(this.shoeDetailInfo.shoeInfo);
                })
                .catch(e => {
                    console.log(e.response.data);
                });
        }
    },
    mounted() {

    }

};
</script>