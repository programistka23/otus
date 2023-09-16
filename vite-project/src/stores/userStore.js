import { defineStore } from "pinia";
import { reactive } from "vue";

export const useUserStore = defineStore('userStore', () => {
    const user = reactive({
        fio: 'Иванов Иван Иванович',
        email: 'ivanov@mail.ru',
        phone: '+7 777 777 77 77',
        birthDate: '2000-01-01',
        city: 'New York',
        street: 'Wall Street',
        house: '123'
    });

    return { user }
})