<template>
    <div class="dialog">
      <button class="close-button" @click="$emit('cancel')">×</button>
      <p>{{ message }}</p>
      <div class="buttons">
        <button class="confirm-btn" @click="$emit('confirm')">Yes</button>
        <button @click="$emit('cancel')">No</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['message']
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
    width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
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
  
  p {
    font-size: 1rem;
    text-align: center;
    margin: 15px 0;
  }
  
  .buttons {
    display: flex;
    justify-content: right;
    gap: 10px;
    margin-top: 15px;
  }
  
  button {
    padding: 7px 10px;
    background-color: #aaaaaa;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 0.9rem;
    border-radius: 3px;
  }

  .confirm-btn {
    background-color: #000000;
    color: white;
  }
  </style>
  