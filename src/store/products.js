let cart = window.localStorage.getItem('cart')


import axios from 'axios'

export default {
    state: {
        products: [],
        cart: cart ? JSON.parse(cart) : []
    },
    mutations: {
        SET_PRODUCTS_TO_STATE(state, products) {
            state.products = products
        },
        REMOVE_FROM_CART(state, index) {
            state.cart.splice(index, 1)
        },
        saveData(state) {
            window.localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        SET_CART (state, product) {
            if (state.cart.length) {
                let isProductExists = false
                state.cart.map((item) => {
                    if (item.article === product.article) {
                        isProductExists = true
                        item.quantity++
                    }
                })
                if (!isProductExists) {
                    state.cart.push(product)
                }
            } else {
                state.cart.push(product)
            }

            this.commit('saveData')
        },
        INCREMENT(state, index) {
            state.cart[index].quantity++
        },
        DECREMENT(state, index) {
            if (state.cart[index].quantity > 1) {
                state.cart[index].quantity--
            }
        },
    },
    actions: {
        GET_PRODUCTS_FROM_API({commit}) {
            return axios.get('http://localhost:3000/products')
                .then(products => {
                    commit('SET_PRODUCTS_TO_STATE', products.data)
                    return products
                })
                .catch(e => {
                    console.log(e)
                    return e
                })
        },
        ADD_TO_CART({commit}, product) {
            commit('SET_CART', product)
        },
        DELETE_FROM_CART({commit}, index) {
            commit('REMOVE_FROM_CART', index)

            this.commit('saveData')
        },
        INCREMENT_CART_ITEM({commit}, index) {
            commit('INCREMENT', index)
        },
        DECREMENT_CART_ITEM({commit}, index) {
            commit('DECREMENT', index)
        },
    },
    getters: {
        PRODUCTS(state) {
            return state.products
        },
        CART(state) {
            return state.cart
        },
    }
}