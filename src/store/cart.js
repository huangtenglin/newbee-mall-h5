import { defineStore } from "pinia";
import { getCart } from '@/service/cart'
export const useCartStroe = defineStore("cart", {
  state: () => {
    return {
      cartList: [],
    };
  },
  actions: {
    async getCartList() {
      const { data = [] } = await getCart()
      this.cartList = data
    },
  },
  getters:{
    count: state => state.cartList.length
  }
})
