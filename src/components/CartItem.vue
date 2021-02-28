<template>
  <div class="cart-item">
    <img class="cart-item__img" :src="cart__item_data.image" alt="loading">
    <div class="cart-item__info">
      <p>{{ cart__item_data.model }}</p>
      <p>{{ cart__item_data.price | toFix | formatPrice }}</p>
      <p>Article: {{ cart__item_data.article }}</p>
    </div>
    <div class="cart-item__quantity">
      <p>Qty:</p>
      <span class="quantity__btn" @click="decrementItem">-</span>
      {{ cart__item_data.quantity }}
      <span class="quantity__btn" @click="incrementItem">+</span>
    </div>
    <button @click="deleteFromCart">Delete</button>
  </div>
</template>

<script>
import toFix from '@/filters/toFix'
import formatPrice from '@/filters/price-format'

export default {
  name: "CartItem",
  props: {
    cart__item_data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    decrementItem() {
      this.$emit('decrement')
    },
    incrementItem() {
      this.$emit('increment')
    },
    deleteFromCart() {
      this.$emit('deleteFromCart')
    }
  },
  filters: {
    toFix,
    formatPrice
  }
}
</script>

<style lang="scss" scoped>
.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  box-shadow: 0 0 8px 0 #e0e0e0;
  padding: 0 30px;
  margin-bottom: 30px;

  &__img {
    max-width: 50px;

  }
}

.quantity__btn {
  cursor: pointer;
}
</style>