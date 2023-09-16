import axios from 'axios';

export default {
    async getData() {
        return axios.get('https://fakestoreapi.com/products');
    }
};