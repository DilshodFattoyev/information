import {defineStore} from 'pinia'
import {ref} from 'vue'
import {useApiStore} from '../helpers/api'
import { ElMessage } from 'element-plus'

export const useProductStore = defineStore('product',()=>{
   const products = ref([])
   const productsCount = ref(0)
   const  api = useApiStore()

   // barcha shaxslarni olish

   const get_all_products = async() =>{
      await api.getAxios({
         url:'product'
      }).then(res =>{
         products.value = [...res.data.products]
         productsCount.value = res.data.count
      })
   }

   // yangi mahsulot qoshish

   const new_product = async(data)=>{
      await api.postAxios({
         url:'product',
         data
      }).then(res =>{
         products.value = [res.data,...products.value]
         productsCount.value +=1
      })
      ElMessage ({
         type:'success',
         message:'Yangi shaxs qo`shildi'
      })
   }

   // Bitta shaxsni ma'lumotini olish

   const get_product = async(_id) =>{
      return await api.getAxios({
         url:`product/${id}`
      })
   }

   // ma'lumotni yangilash

   const save_product = async(_id) =>{
      await api.putAxios({
         url:`product/${id}`
      }).then(res =>{
         products.value = products.value.map(product =>{
            if(product._id == res.data._id) return res.data
            return product
         })
         ElMessage({
            type:'success',
            message:'ma`lumot yangilandi'
         })
      })
   }


   // ma'lumotni o'chirish

   const delete_product = async(_id) =>{
      await api.deleteAxios({
         url:`product/${id}`
      }).then(()=>{
         products.value = products.value.filter(product =>{
            if(product._id == _id) return false
            return product
         })
         productsCount.value -= 1
         ElMessage({
            type:'success',
            message:'Ma`lumotni o`chirdingiz'
         })
      })
   }

   //mahsulot holatini o'zgartirish

   const status_product = async(_id)=>{
      await api.getAxios({
         url:`product/change/${id}`
      })
      .then(()=>{
         products.value = products.value.map(product =>{
            if(product._id == _id) return {
               ...product,
               status: product.status  == 0 ? 1 : 0
            }
            return product
         })
      })
   }

   return {
      products,
      productsCount,
      get_all_products,
      get_product,
      save_product,
      status_product,
      delete_product,
      new_product
   }





})