<template>
  <div class="wrapper-content wrapper-content--fixed">
    <section>
      <div class="container">
        <p class="cart__message" v-if="!cart__data.length">There are no products in cart...</p>
      <CartItem
          v-for="(item, index) in cart__data"
          :key="item.article"
          :cart__item_data="item"
          @deleteFromCart="deleteFromCart(index)"
          @increment="increment(index)"
          @decrement="decrement(index)"
      />

      <router-link :to="{name: 'catalog'}">
        <div class="catalog__link_to_cart">Back to Catalog</div>
      </router-link>

      <div class="cart__total">
        <p class="total__name">Total:</p>
        <p>{{ cartTotalCost }} P.</p>
      </div>
      </div>
    </section>
  </div>
</template>

<script>
import CartItem from '@/components/CartItem'
import {mapActions} from 'vuex'

export default {
  name: "Cart",
  components: {CartItem},
  props: {
    cart__data: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  computed: {
    cartTotalCost() {
      let result = []

      if (this.cart__data.length) {
        for (let item of this.cart__data) {
          result.push(item.price * item.quantity)
        }
        result = result.reduce((sum, el) => sum + el)
      } else {
        return 0
      }

      return result
    }
  },
  methods: {
    ...mapActions(['DELETE_FROM_CART', 'INCREMENT_CART_ITEM', 'DECREMENT_CART_ITEM']),
    deleteFromCart(index) {
      this.DELETE_FROM_CART(index)
    },
    increment(index) {
      this.INCREMENT_CART_ITEM(index)
    },
    decrement(index) {
      this.DECREMENT_CART_ITEM(index)
    }
  }
}
</script>

<style lang="scss" scoped>
.cart {
  margin-bottom: 100px;
}

.cart__total {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  padding: 16px 24px;
  display: flex;
  justify-content: center;
  font-size: 20px;
  background-color: #26ae68;
  color: #ffffff;

}

.total__name {
  margin-right: 16px;
}

.cart__message {
  text-align: center;
  font-size: 30px;
}

.catalog__link_to_cart {
  margin-top: 30px;
  text-align: center;
  font-size: 24px;
}
</style>