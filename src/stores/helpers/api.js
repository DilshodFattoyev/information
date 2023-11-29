import axios from 'axios'
import {defineStore,storeToRefs} from "pinia"
import { useHelperStore } from '.'
import { useTokenStore } from '../user/token'

import { ElMessage } from 'element-plus'
import router from '../../router'

export const useApiStore = defineStore('api',()=>{

   const helperStore = useHelperStore()
   const {url} = helperStore

   const tokenStore = useTokenStore()
   const {header} = storeToRefs(tokenStore)

   // bazadagi ma'lumotlarni olib beradi
   const getAxios = (payload)=>{
      console.log(payload);
      return axios.get(`${url}/${payload.url}`,
      {
         ...header.value,
      }).catch(e =>{
         if(e.response.status == 401){
            ElMessage({
               type:'error',
               message:'Sizga kirishga ruhsat yoq'
            })
            router.push({name:'login'})
            return false
         }
         ElMessage({
            type:'error',
            message:e.response.data
         })
      })
   }

   // user yoki shunday narsa paydo qiladi
   const postAxios = (payload)=>{
      console.log(payload);
      return axios.post(`${url}/${payload.url}`,payload.data,{
         ...header.value,
      }).catch(e =>{
         ElMessage({
            type:'error',
            message:e.response.data?.message
         })
      })

   }

   // ma'lumotlarni edit qiladi
   const putAxios = ()=>{
      return axios.put(`${url}/${payload.url}`,payload.data,{
         ...header.value,
      }).catch(e =>{
         ElMessage({
            type:'error',
            message:e.response.data?.message
         })
      })
   }

   // ma'lumotlarni o'chiradi
   const deleteAxios = (payload)=>{
      return axios.delete(`${url}/${payload.url}`,{
         ...header.value,
      }).catch(e =>{
         ElMessage({
            type:'error',
            message:e.response.data
         })
      })
   }



   return{
      getAxios,
      postAxios,
      putAxios,
      deleteAxios
   }
})