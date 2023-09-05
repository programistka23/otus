import {defineStore} from "pinia";
import {reactive} from "vue";
import axios from "axios";

export const useStore = defineStore('store', () => {
    const catalog = reactive([]);
    const basket = reactive([]);
    const user = reactive({
        fio: 'Иванов Иван Иванович',
        email: 'ivanov@mail.ru',
        phone: '+7 777 777 77 77',
        birthDate: '2000-01-01',
        city: 'New York',
        street: 'Wall Street',
        house: '123'
    });

    async function getData() {
        return axios.get('https://fakestoreapi.com/products');
    }

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

    function getFiltered(filter, items) {
        var filterObj = JSON.parse(filter);
        return items.filter(item => item.price >= filterObj.minPrice && item.price <= filterObj.maxPrice);
    }

    return { catalog, basket, user, getData, addToBasket, getFiltered }
})