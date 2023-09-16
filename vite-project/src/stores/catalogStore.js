import { defineStore } from "pinia";
import { reactive } from "vue";

export const useCatalogStore = defineStore('catalogStore', () => {
    const catalog = reactive([]);
    return { catalog }
})