<template>
  <div v-if="product" class="card-view">
      <h1>{{ product.title }}</h1>
      
      <img :src="product.image" alt="Product Image" class="card-image"/>
      <p class="card-description">{{ product.description }}</p>
      <p class="card-price">Price: {{ product.price }}$</p>
      <p class="card-category">Category: {{ product.category }}</p>
      <p class="card-rating">Rating: {{ product.rating.rate }} </p>
  </div>
  <div v-else-if="loading">
      Загрузка
  </div>
  <div v-else-if="error">
      Error: {{ error.message }}
  </div>
  
</template>

<script>
export default {
  name: 'CardView',
  data() {
      return {
          product: null,
          loading: true,
          error: null
      }
  },
  async mounted() {
      const productId = this.$route.params.id;
      try {
          const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          this.product = await response.json();
          this.loading = false;
      } catch (error) {
          console.error("Failed to fetch product:", error);
          this.error = error;
          this.loading=false;
      }
  }
}
</script>


<style scoped>
.card-view {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: transparent;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    min-height: 80vh;
    font-size: 1.2em;

}
.product-title {
    font-size: 2em;
    font-weight: bold;
    margin-bottom: 20px;
    color: #333;
    text-align: center;
}
.product-content {
    display: flex;
    align-items: flex-start;
    gap: 20px;
    width: 100%;
    margin-bottom: 20px;
}
.product-image {
    width: 200px;
    height: auto;
    max-height: 300px;
    object-fit: contain;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.product-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.card-description {
    font-size: 1.1em;
    line-height: 1.6;
    text-align: justify;
    color: #444;
}
.price-category-rating {
    display: flex;
    flex-direction: column;
    gap: 5px;
    font-size: 1.5em;
    color: #666;
}
.card-price {
    font-weight: bold;
    color: #4caf50;
}
.card-category {
    font-style: italic;
    color: #999;
}
.card-rating {
    color: #444;
}
.loading-message {
    text-align: center;
    font-size: 18px;
    margin-top: 30px;
    color: #888;
}
.error-message {
    text-align: center;
    font-size: 18px;
    margin-top: 30px;
    color: #f44336;
}

</style>


