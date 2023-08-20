<script setup>
	import { ref } from 'vue'
	import ProductCard from './product.vue'

	const props = defineProps({
	  products: Array,
	})
</script>

<template>
	<div class="content-block">
	  <v-item-group selected-class="bg-primary">
	      <v-row>
	        <v-col
	          v-for="item in props.products"
	          :key="item.id"
	          cols="12"
	          md="3"
	        >
	        	<ProductCard :product="item"/>
	        </v-col>
	      </v-row>
	  </v-item-group>		
	</div>
</template>

<style scoped>
	.content-block {
		padding: 10px;
	}
</style>