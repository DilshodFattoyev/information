<template>
   <headpage :title="title"/>

   <product-table/>

   <product-dialog :title="title"/>
</template>
<script setup>
   import headpage from '../../components/usefull/headpage.vue';
   import {ref,onMounted} from 'vue'
   import productDialog from '../../components/dialog/product-dialog.vue';
   import productTable from '../../components/table/product-table.vue'
   import { useProductStore } from '../../stores/data/product';


   const store = useProductStore()
   const title = ref('Ma`lumot')

   onMounted(() => {
      store.get_all_products()
   })
</script>
<style lang="">
   
</style>