<template>
    <div class="card">
      <img :src="product.image" alt="Product Image" class="card-image">
      <div class="card-des">
        <router-link
          class="card-title"
          :to="{ name: 'CardView', params: { id: product.id } }"
        >
          {{ product.title }}
        </router-link>
        <p class="card-price">{{ product.price }}$</p>
        <p class="card-rating">{{ product.rating.rate }} ☆</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CardItem',
    props: {
      product: {
        type: Object,
        required: true,
      },
    },
  };
  </script>
  
<style scoped>


.card {
  border: 1px solid #ccc;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  width: 250px;
  position: relative;
  height: 400px;
}

.card:hover {
  transform: translateY(-7px) translateX(+7px);
}

.card-image {
  width: 100%;
  height: 250px;
}

.card-des {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.card-title {
  font-size: 1.2em;
  font-weight: bold;
  text-decoration: none;
  color: black;
  margin-bottom: 35px;
}

.card-title:hover {
  text-decoration: none;
  color: #296c3e;

}

.card-price{
  font-size: 2em;
  color: black;
  position: absolute;
  bottom: 10px; 
  right: 10px; 
  margin: 0;  
  margin-top: 30px;
}

.card-rating{
  font-size: 2em;
  color: black;
  position: absolute;
  bottom: 10px; 
  left: 10px;
  margin: 0;
}

  </style>
