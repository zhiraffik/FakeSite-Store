<template>
    <html lang="en">
        
    <head>
        <title>Онлайн Магазин</title>
    </head>
    <body>
        
    <header>
        <p>Онлайн Магазин</p>
    </header>
    
    <div class="filter-block">
        <button @click="updateProducts('electronics')">Электроника</button>
        <button @click="updateProducts('jewelery')">Украшения</button>
        <button @click="updateProducts('men\'s clothing')">Мужская одежда</button>
        <button @click="updateProducts('women\'s clothing')">Женская одежда</button>
    </div>
    
    <main>
        <router-view/>
        
         
        <div class="cards">
            <CardItem
                v-for="product in paginatedProducts"
                :key="product.id"
                :product="product"
            />
        </div>
        
    </main>
    


    <div class="pagination">
        <button
            :disabled="currentPage === 1"
            @click="prevPage"
        >

            Назад
        </button>
        
        <span class="page-number">Cтраница {{ currentPage }} из {{ totalPages }}</span>
        <button
            :disabled="currentPage === totalPages"
            @click="nextPage"
        >
            Далее
        </button>
        
    </div>

    <footer>

    </footer>
    
    </body>
    
    </html>
    
</template>

<script>

import CardItem from './components/CardItem.vue'

export default {
    name: 'App',
    data() {
        return {
            products: [],
            currentPage: 1,
            productsPerPage: 10,
            loading: true,
            error: null
        }
    },
    computed: {
        totalPages() {
            return Math.ceil(this.products.length / this.productsPerPage);
        },
        paginatedProducts() {
            const startIndex = (this.currentPage - 1) * this.productsPerPage;
            const endIndex = startIndex + this.productsPerPage;
            return this.products.slice(startIndex, endIndex);
        },
    },
    async mounted() {
       try {
           await this.fetchProducts()
       } catch(error) {
           console.log(error);
       } finally {
           this.loading = false;
       }
    },
    
    methods:{
        async fetchProducts() {
            try {
                const response = await fetch('https://fakestoreapi.com/products')
                if(!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                this.products = await response.json();
            } catch (error) {
                this.error = error;
            }
        },
        async updateProducts(category){
            try {
                const response = await fetch(`https://fakestoreapi.com/products/category/${category}`)
                if(!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                this.products = await response.json();
                this.currentPage=1;
            }
            catch(error){
                this.error = error;
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },

    },
    components: {
        CardItem
    }
    
}

</script>

  <!-- СТИЛИ -->
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
}
body {
  margin: 0%;
  background-color: #eafdd0;
  
}
header {
  padding-left: 19%;
  padding-right: 13%;
  font: bold 30pt Verdana, sans-serif;
  display: flex;
  justify-content: start;
  padding-bottom: 2%;
}

.filter-block {
  display: flex;
  justify-content: space-around;
  margin-bottom: 5%;
  background-color: #c8ff7c;
  position: relative;
  padding-left: 13%;
  padding-right: 13%;
  
}
button {
  font: lighter 16pt Verdana, sans-serif;
  padding: 2% 2% 2% 2%;
  margin: 0%;
  border: 0px;
  background-color: transparent;
  color: black;
  cursor: pointer;
  
}

.cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
main {
  padding-left: 13%;
  padding-right: 13%;
}
button:focus {
  font: bold 17pt Verdana, sans-serif;
}

.card{
 margin: 3%;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
  
.pagination button {
  padding: 8px 12px;
  margin: 0 5px;
  border: 2px solid #ccc;
  background-color: #c8ff7c;
  cursor: pointer;
  height: 80px;
  width: 200px;
  border-radius: 5px;
  margin-bottom: 100px;
}
  
.pagination button:disabled {
  opacity: 0.5;
  cursor: default;
}

.page-number {
  margin: 0 10px;
  font-size: 20px;
  font-weight: bold;
  margin-top: 30px;
}

    
</style>
