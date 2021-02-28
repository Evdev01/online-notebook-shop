<template>
  <div class="wrapper-content wrapper-content--fixed">
    <section>
      <div class="container">

        <Notification
            :messages="messages"
            :timeout="3000"
            @select="sortByCategories"
        />

        <div class="view__item">
          <div class="view__item_list" @click="itemList = true">
            <p>List</p>
            <span class="material-icons">list</span>
          </div>
          <div class="view__item_grid" @click="itemList = false">
            <p>Grid</p>
            <span class="material-icons">view_module</span>
          </div>
        </div>

        <div class="filters">
          <div class="range-slider">
            <input type="range" min="0" max="220000" step="1000" v-model.number="minPrice" @change="setRangeSliders">
            <input type="range" min="0" max="220000" step="1000" v-model.number="maxPrice" @change="setRangeSliders">
          </div>
          <div class="range-values">
            <p>Min: {{ minPrice }}</p>
            <p>Max: {{ maxPrice }}</p>
          </div>
        </div>
        <router-link :to="{name: 'cart', params: {cart__data: CART}}">
          <div class="catalog__link_to_cart">Cart: {{ CART.length }}</div>
        </router-link>
        <div class="item__wrapper">
          <CatalogItem
              v-for="product in filteredProducts"
              :product="product"
              :key="product.article"
              @addToCart="addToCart"
              :itemList="itemList"
          />
        </div>

      </div>
    </section>
  </div>
</template>

<script>
import CatalogItem from '@/components/CatalogItem'
import {mapActions, mapGetters} from 'vuex'
import Cart from '@/components/Cart'
import Notification from '@/components/notifications/Notification'

export default {
  name: "Catalog",
  components: {Notification, Cart, CatalogItem},
  data() {
    return {
      minPrice: 0,
      maxPrice: 220000,
      sortedProducts: [],
      messages: [],
      itemList: false,
    }
  },
  computed: {
    ...mapGetters(['PRODUCTS', 'CART']),
    filteredProducts() {
      if (this.sortedProducts.length) {
        return this.sortedProducts
      } else {
        return this.PRODUCTS
      }
    }
  },
  methods: {
    ...mapActions(['GET_PRODUCTS_FROM_API', 'ADD_TO_CART']),
    addToCart(data) {
      this.ADD_TO_CART(data)
      let timeStamp = Date.now().toLocaleString()
      this.messages.unshift(
          {name: 'Product added to cart', icon: 'check_circle', id: timeStamp}
      )
    },
    setRangeSliders() {
      if (this.minPrice > this.maxPrice) {
        let tmp = this.maxPrice
        this.maxPrice = this.minPrice
        this.minPrice = tmp
      }
      this.sortByCategories()
    },
    sortByCategories() {
      let vm = this
      this.sortedProducts = [...this.PRODUCTS]
      this.sortedProducts = this.sortedProducts
          .filter(item => item.price >= vm.minPrice && item.price <= vm.maxPrice)

    }
  },
  mounted() {
    this.GET_PRODUCTS_FROM_API()
        .then(response => {
          if (response.data) {
            this.sortByCategories()
          }
        })
  }
}
</script>

<style lang="scss">
.item__wrapper {
  flex-wrap: wrap;
  display: flex;
  justify-content: space-between;
}

.catalog__link_to_cart {
  text-align: right;
  font-size: 24px;
}


.view__item_list {
  text-align: center;
  margin-right: 30px;
  padding: 10px;
  border-radius: 9px;

  &:hover {
    cursor: pointer;
  }
}

.view__item_grid {
  text-align: center;
  margin-right: 30px;
  padding: 10px;
  border-radius: 9px;


  &:hover {
    cursor: pointer;
  }
}

.filters {
  display: flex;
  flex-direction: column;
}

.range-slider {
  width: 200px;
  margin: auto 16px;
  text-align: center;
  position: relative;
}

.view__item {
  display: flex;
  justify-content: center;
}

.range-slider svg, .range-slider input[type=range] {
  position: absolute;
  left: 0;
  top: 50px;
}

input[type=range]::-webkit-slider-thumb {
  z-index: 2;
  position: relative;
  top: 2px;
  margin-top: -7px;
}

.range-values {
  margin-left: 50px;
}
</style>