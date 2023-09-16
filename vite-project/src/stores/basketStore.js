import { defineStore } from "pinia";
import { reactive } from "vue";

export const useBasketStore = defineStore('basketStore', () => {
    const basket = reactive([]);

    function addToBasket(product) {
        var count = +product.count || 1;
        var basketElem = basket.find((elem) => {
            return elem.id === product.id;
        })
        if (basketElem) {
            basketElem.count = +basketElem.count + count;
        } else {
            basket.push({
                id: product.id,
                count: count
            });
        }
    }

    return { basket, addToBasket }
})