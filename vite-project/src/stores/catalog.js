import {defineStore} from "pinia";
import {reactive} from "vue";
import axios from "axios";

export const useCatalogStore = defineStore('catalog', () => {
    const catalog = reactive([])

    async function getData() {
        return axios.get('https://fakestoreapi.com/products');
    }

    function findById(id) {
        return catalog.find((i) => i.id === id)
    }

    return { catalog, getData, findById }
})