<script setup>
  import { ref, onUpdated } from "vue"
  import { useField, useForm } from 'vee-validate';

  const { handleSubmit } = useForm({
    validationSchema: {
      login(value) {
        if (value) return true
        return 'Required.'
      },
      password(value) {
        if (value) return true
        return 'Required.'
      },
    },
  });

  const login = useField('login');
  const password = useField('password');

  const props = defineProps({
    isShow: Boolean,
  })

  const emit = defineEmits("closeAuth", "login");

  const isOpen = ref(false);

  onUpdated(() => {
    isOpen.value = props.isShow;
  })

  const onClose = () => {
    emit("closeAuth");
  }

  const submit = handleSubmit(values => {
    emit("login", {
      login: values.login,
      password: values.password
    })
    onClose();
  })
</script>

<template>
  <div class="auth">
    <v-dialog
        v-model="isOpen"
        width="300"
    >
      <v-card>
        <v-form @submit.prevent="submit">
          <v-card-title>
            Authorization
          </v-card-title>
          <v-card-text>
            <v-text-field label="Login" v-model="login.value.value" :error-messages="login.errorMessage.value"></v-text-field>
            <v-text-field label="Password" v-model="password.value.value" type="password" :error-messages="password.errorMessage.value"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" type="submit">Login</v-btn>
            <v-btn @click="onClose">Cancel</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>