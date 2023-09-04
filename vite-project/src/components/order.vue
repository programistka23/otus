<script setup>
import { onUpdated, ref } from 'vue'
import { useField, useForm } from 'vee-validate';
import axios from "axios";

const props = defineProps({
  isShow: Boolean,
  user: Object
})

const isLoading = ref(false);
const snackbar = ref(false);
const isOpen = ref(false);

const emit = defineEmits(["closeOrder"]);

const { handleSubmit } = useForm({
  validationSchema: {
    fio(value) {
      if (value?.length >= 2) return true
      return 'Name needs to be at least 2 characters.'
    },
    email(value) {
      if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true
      return 'Must be a valid e-mail.'
    },
    phone(value) {
      if (/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(value)) return true
      return 'Must be a valid phone number'
    },
    agreement(value) {
      if (value === '1') return true
      return 'Must be checked.'
    },
    house(value) {
      if (value) return true
      return 'Required.'
    },
  },
});

const fio = useField('fio');
const email = useField('email');
const phone = useField('phone');
const house = useField('house');

const birthDate = ref("");
const city = ref("");
const street = ref("");

const comment = ref("");

const agreement = useField('agreement');

onUpdated(() => {
  fio.value.value = props.user.fio;
  email.value.value = props.user.email;
  phone.value.value = props.user.phone;
  birthDate.value = props.user.birthDate;
  city.value = props.user.city;
  street.value = props.user.street;
  house.value.value = props.user.house;
  isOpen.value = props.isShow;
});

const submit = handleSubmit(values => {
  isLoading.value = true;
  axios
    .post('https://httpbin.org/post', {
      params: values
    })
    .then((response) => {
      //alert(JSON.stringify(response, null, 2))
      isLoading.value = false;
      snackbar.value = true;
    });
})

const onClose = () => {
  snackbar.value = false;
  emit('closeOrder');
}

</script>

<template>
  <div class="order">
    <v-dialog
        v-model="isOpen"
        width="800"
    >
      <v-card :loading="isLoading">
        <form @submit.prevent="submit">
          <v-card-title>Ordering</v-card-title>
          <v-card-text>
            <div style="display: flex;">
              <div style="flex-grow: 1; margin-right: 10px;">
                <v-text-field
                    label="Name"
                    v-model="fio.value.value"
                    :error-messages="fio.errorMessage.value"
                />
                <v-text-field
                    v-model="email.value.value"
                    :error-messages="email.errorMessage.value"
                    label="E-mail"
                />
                <v-text-field
                    v-model="phone.value.value"
                    :error-messages="phone.errorMessage.value"
                    label="Phone"
                />
                <v-text-field type="date" label="Date of Birth" v-model="birthDate"/>
              </div>
              <div style="flex-grow: 1;">
                <v-radio-group v-model="city">
                  <v-radio label="Moskow" value="Moskow"></v-radio>
                  <v-radio label="New York" value="New York"></v-radio>
                  <v-radio label="London" value="London"></v-radio>
                </v-radio-group>
                <v-select
                    label="Street"
                    :items="['Wall Street', 'Liberty Street', 'Fifth Avenue']"
                    v-model="street"
                ></v-select>
                <v-text-field
                    label="House"
                    :error-messages="house.errorMessage.value"
                    v-model="house.value.value"
                />
              </div>
            </div>

            <v-textarea v-model="comment" label="Comment" rows="2"></v-textarea>

            <v-checkbox
                v-model="agreement.value.value"
                :error-messages="agreement.errorMessage.value"
                value="1"
                label="I agree"
                type="checkbox"
            ></v-checkbox>
          </v-card-text>

          <v-card-actions>
            <v-btn type="submit" color="primary" :disabled="!agreement.value.value">Ok</v-btn>
            <v-btn @click="onClose">Close</v-btn>
          </v-card-actions>
        </form>
      </v-card>
    </v-dialog>

    <v-snackbar
        v-model="snackbar"
    >
      Заказ успешно оформлен!

      <template v-slot:actions>
        <v-btn
            color="pink"
            variant="text"
            @click="onClose"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<style scoped>
  input[type="text"],
  input[type="email"],
  input[type="date"],
  select {
    border: 1px solid gray;
    padding: 0 5px;
  }

  select {
    -moz-appearance: button;
    -webkit-appearance: button;
  }
</style>