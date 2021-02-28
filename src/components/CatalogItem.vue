<template>
  <div class="catalog__item">
    <img :src="product.image" alt="" @click="showPopupInfo">
    <h3 class="catalog__item-title" @click="showPopupInfo">{{ product.model }}</h3>
    <p class="catalog__item-stock">{{ product.stock }} left in stock</p>
    <p class="catalog__item-description">{{ product.description }}</p>
    <div class="price__block">
      <p class="price-cost">{{ product.price | toFix | formatPrice }}</p>
      <button class="price__block-btn btn" @click="addToCart">Add to cart</button>
    </div>
    <Popup
        v-if="isInfoPopupVisible"
        @closePopup="closePopup"
        rightBtnTitle="Add to card"
        :popupModel="product.model"
        @rightBtnAction="addToCart"
    >
      <img :src="product.image" alt="loading">
      <h3 class="catalog__item-title">{{ product.model }}</h3>
      <p class="catalog__item-stock">{{ product.stock }} left in stock</p>
      <p class="catalog__item-description">{{ product.description }}</p>
      <div class="price__block">
        <p class="price-cost">{{ product.price | toFix | formatPrice }}</p>
      </div>
    </Popup>
  </div>
</template>

<script>
import Popup from '@/popup/Popup'
import formatPrice from '@/filters/price-format'
import toFix from '@/filters/toFix'

export default {
  name: "CatalogItem",
  components: {Popup},
  data() {
    return {
      isInfoPopupVisible: false
    }
  },
  props: {
    product: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    addToCart() {
      this.$emit('addToCart', this.product)
    },
    showPopupInfo() {
      this.isInfoPopupVisible = true
    },
    closePopup() {
      this.isInfoPopupVisible = false
    }
  },
  filters: {
    toFix,
    formatPrice
  }
}
</script>

<style scoped lang="scss">
.catalog__item {
  width: 30%;
  text-align: center;
  box-shadow: 0 0 8px 0 #e0e0e0;
  padding: 10px 30px;
  background: #ffffff;
  margin: 20px 10px;

  &-title {
    font-size: 24px;
    color: #2a7754;

    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }

  &-stock {
    margin: 15px 0;
    color: #d17581;
  }

  &-description {
    margin: 15px 0 25px 0;
  }

  & img {
    margin: 60px 0;
    width: 300px;

    &:hover {
      cursor: pointer;
    }
  }
}

.price__block {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price__block-btn {
  color: #ffffff;
  border: 1px solid #494ce8;
  background-color: #494ce8;

  &:hover {
    background-color: #1f2083;
  }
}


</style>



















