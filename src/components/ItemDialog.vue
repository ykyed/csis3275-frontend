<template>
    <div class="dialog">
      <!-- Close button in the top-right corner -->
      <button class="close-button" @click="close">×</button>
      <h3>{{ item ? 'Update Item' : 'Add New Item' }}</h3>
      <div class="content">
        <form @submit.prevent="submitForm">
          <div class="label-input-group">
            <label>Product Code:</label>
            <input v-model="formData.productCode" placeholder="Product Code" required />
          </div>
          <div class="label-input-group">
            <label>Title:</label>
            <input v-model="formData.title" placeholder="Title" required />
          </div>
          <div class="label-input-group">
            <label>Price:</label>
            <input v-model.number="formData.price" placeholder="Price" required />
          </div>
          <div class="label-input-group">
            <label>Color:</label>
            <input v-model="formData.color" placeholder="Color" required />
          </div>
          <div class="label-input-group">
            <label>Style:</label>
            <input v-model="formData.style" placeholder="Style" required />
          </div>
          <div class="label-input-group">
            <label>Brand:</label>
            <input v-model="formData.brand" placeholder="Brand" required />
          </div>
          <div class="label-input-group">
            <label>Thumbnail URL:</label>
            <input v-model="formData.thumbnail" placeholder="Thumbnail URL" required />
          </div>
          <div class="label-input-group">
            <label>Image URLs:</label>
            <textarea v-model="formData.images" placeholder="Image URLs (comma-separated)" required />
          </div>
          
          <!-- Sizes and Quantities in 3-column grid -->
          <h4 class="sizes-title">Sizes</h4>
          <div class="sizes-grid">
            <div v-for="(quantity, index) in formData.sizeQuantities" :key="index" class="size-item">
              <label>{{ quantity.size }}:</label>
              <input v-model.number="quantity.quantity" placeholder="Quantity" type="number" min="0" />
            </div>
          </div>
        </form>
      </div>
      <div class="buttons">
        <button type="submit" @click="submitForm">{{ item ? 'Update' : 'Add' }}</button>
        <button @click.prevent="close">Cancel</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['item', 'sizes'],
    data() {
      return {
        formData: {
          productCode: this.item?.productCode || '',
          title: this.item?.title || '',
          price: this.item?.price || 0,
          color: this.item?.color || '',
          style: this.item?.style || '',
          brand: this.item?.brand || '',
          thumbnail: this.item?.thumbnail || '',
          images: this.item?.images ? this.item.images.join(', ') : '',
          sizeQuantities: Array.from({ length: 21 }, (_, i) => ({
            size: (3 + i * 0.5).toFixed(1), 
            quantity: this.sizes?.find(s => s.size == (3 + i * 0.5))?.quantity || 0
          }))
        }
      };
    },
    methods: {
      submitForm() {
        const data = { 
          ...this.formData, 
          images: this.formData.images.split(',').map(img => img.trim()),
          sizes: this.formData.sizeQuantities.map(({ size, quantity }) => ({ size: parseFloat(size), quantity }))
        };
        this.$emit('save', data);
      },
      close() {
        this.$emit('close');
      }
    },
  };
  </script>
  
  <style scoped>
  .dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #eee;
    padding: 20px;
    border: 3px solid #ccc;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    max-height: 70vh;
    width: 600px;
    display: flex;
    flex-direction: column;
    resize: horizontal;
    overflow: auto;
  }
  
  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 1.5rem;
    background: none;
    border: none;
    cursor: pointer;
    color: #333;
  }
  
  h3 {
    margin-bottom: 15px;
    text-align: center;
  }
  
  .sizes-title {
    font-weight: bold;
    margin-top: 30px;
    text-align: center;
    font-size: 0.9rem;
  }
  
  .content {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .label-input-group {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  
  label {
    font-weight: bold;
    width: 120px;
    text-align: right;
    margin-right: 10px;
    font-size: 0.9rem;
  }
  
  input,
  textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    text-align: left;
  }
  
  /* Grid layout for sizes */
  .sizes-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* 3 columns */
    gap: 10px;
    margin-top: 15px;
  }
  
  .size-item {
    display: flex;
    align-items: center;
  }
  
  .size-item label {
    width: 40px;
    text-align: right;
  }
  
  .buttons {
    display: flex;
    justify-content: right;
    margin-top: 15px;
  }
  
  button {
    padding: 7px 10px;
    background-color: #aaaaaa;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 0.9rem;
    border-radius: 5px;
    margin-left: 10px;
  }
  
  button[type="submit"] {
    background-color: #000000;
    color: white;
  }
  
  button[type="button"] {
    background-color: #f44336;
    color: white;
  }
  </style>
  