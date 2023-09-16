import { defineStore } from "pinia";

export const useFilterStore = defineStore('filterStore', () => {
    function getFiltered(filter, items) {
        var result = items;
        var filterObj = JSON.parse(filter);
        if (filterObj.minPrice !== -1) {
            result = result.filter(item => item.price >= filterObj.minPrice);
        }
        if (filterObj.maxPrice !== -1) {
            result = result.filter(item => item.price <= filterObj.maxPrice);
        }
        return result;
    }

    return { getFiltered }
})