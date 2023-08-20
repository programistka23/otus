<script setup>
	import { ref } from 'vue'
</script>	

<template>
	<v-layout>
	  <v-footer class="d-flex flex-column">
	    <div class="px-4 py-2 bg-black text-center w-100">
	      {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
	    </div>
	  </v-footer>
	</v-layout>
</template>

<style scoped>
	.v-footer {
		height: auto;
	  position: fixed;
	  bottom: 0;
	  width: 100%;
	  padding: 0;
	}
</style>