<template>
   <div >
      <el-dialog
         v-model="toggle"
         :title="`Yangi ${title}`"
         width="1100px"
         :before-close="handleClose"
      >

      <el-form
         ref="productForm"
         :model="product"
         :rules="rules"
         label-position="top"
         @submit.prevent = "add(productForm)"
       >

       <div class="malumot">

            <div class="left">
               <h4>Olib kelingan shaxs ma'lumotlari</h4>

               <el-form-item label="Ism" prop="brought_n">
                  <el-input v-model="product.brought_n" />
               </el-form-item>

               <el-form-item label="Familya" prop="brought_l">
                  <el-input v-model="product.brought_l" />
               </el-form-item>

               <el-form-item label="Otasi Ismi" prop="brought_f">
                  <el-input v-model="product.brought_f" />
               </el-form-item>

               <el-form-item label="Passport ma'lumotlari" prop="brought_p">
                  <el-input v-model="product.brought_p" />
               </el-form-item>

              
            </div>

            <div class="hodim_1">

               <h4>Olib kelgan hodim ma'lumotlari</h4>

               <el-form-item label="Ism" prop="employee_n">
                  <el-input v-model="product.employee_n" />
               </el-form-item>

               <el-form-item label="Familya" prop="employee_l">
                  <el-input v-model="product.employee_l" />
               </el-form-item>

               <el-form-item label="Otasi Ismi" prop="employee_f">
                  <el-input v-model="product.employee_f" />
               </el-form-item>

               <el-form-item label="Guvohnoma" prop="confirmation" class="el_form">
                  <el-input v-model="product.confirmation" type="password" show-password/>
               </el-form-item>

               <!-- <el-form-item label="Hodim udastrina muddati" prop="lifeTime">
                     <el-date-picker
                     v-model="product.lifeTime"
                     type="date"
                     format="YYYY/MM/DD"
                     placeholder="YYYY/MM/DD"
                     clearable
                     />
               </el-form-item> -->

            </div>

            <div class="onduty_1">
              <div class="onduty_2">

               <div class="hodim_2">

                  <h4>Navbatchi ma'lumotlari</h4>
                  
                  <el-form-item label="Ism" prop="onDuty_n">
                     <el-input v-model="product.onDuty_n" />
                  </el-form-item>

                  <el-form-item label="Familya" prop="onDuty_l">
                     <el-input v-model="product.onDuty_l" />
                  </el-form-item>

                  <el-form-item label="Otasi Ismi" prop="onDuty_f">
                     <el-input v-model="product.onDuty_f" />
                  </el-form-item>

               </div>

               <div class="right">
                  <h4>Olib kelingan shaxsga ayblov</h4>
                  <!-- <el-form-item label="Tug`ilgan kun kiriting" prop="brithday">
                        <el-date-picker
                        v-model="product.brithday"
                        type="date"
                        placeholder="YYYY-MM-DD"
                        clearable
                        />
                  </el-form-item> -->

                  <el-form-item label="Hujjat turi"  prop="type">
                     <el-select class="select1" v-model="product.type" placeholder="Hujjat turi">
                     <el-option label="Ma'muriy" value="mamuriy" />
                     <el-option label="Jinoiy" value="jinoiy" />
                     </el-select>
                  </el-form-item>

                  <el-form-item  label="Qaysi modda"  prop="count">
                     <el-select-v2
                     multiple
                     filterable
                     class="select1"
                     v-model="product.count"
                     placeholder="Kerakli modda tanlang"
                     :options="options"
                     />
                  </el-form-item>

                  <el-form-item label="Izoh" prop="desc" >
                     <el-input v-model="product.desc" rows="1"  type="textarea" />
                  </el-form-item>

               </div>
              </div>

            <el-form-item label="Real vaqt" required>
            <el-col :span="11">
            <el-form-item prop="date1">
               <el-date-picker
                  v-model="product.date1"
                  type="date"
                  label="Pick a date"
                  placeholder="YYYY-MM-DD"
                  style="width: 100%"
               />
            </el-form-item>
            </el-col>
            <el-col class="text-center" :span="2">
            <span class="text-gray-500"></span>
            </el-col>
            <el-col :span="11">
            <el-form-item prop="date2">
               <el-time-picker
                  v-model="product.date2"
                  label="Pick a time"
                  placeholder="h/m/s"
                  style="width: 100%"
               />
            </el-form-item>
            </el-col>
            </el-form-item>
            </div>


       </div>
     
         
         
      </el-form>

         <template #footer>
            <span class="dialog-footer">
            <el-button 
               @click="handleClose">
               Bekor qilish
            </el-button>
            <el-button @click = add(productForm) type="primary">
               Saqlash
            </el-button>
            </span>
         </template>


  </el-dialog>
   </div>
</template>
<script setup>

   defineProps([
      'title'
   ])
   import  {useDialogStore} from '../../stores/usefull/dialog'
   import {storeToRefs} from 'pinia'
   import {ref,defineExpose} from 'vue'
   import { useHelperStore } from '../../stores/helpers/index';
   import {ElMessage} from 'element-plus'
    import {useProductStore} from '../../stores/data/product'
   import { stateStorage } from '../../stores/stor';
  
   const helperStore = useHelperStore()
   const {url} = helperStore

   const store = useProductStore()

   const {products,productsCount} = storeToRefs(store)
   const {new_product} = store

   const dialogStore = useDialogStore()
   const {toggle} =storeToRefs(dialogStore)
   const {setToggle} = dialogStore
   
   const add = async(formEl)=>{
      if (!formEl) return
         await formEl.validate((valid) => {
            if (valid) {
               // new_product(product.value)
               stateStorage.value.push(product.value)
               product.value = {}
               setToggle(false)
               ElMessage({
                  type:'success',
                  message:'Ma`lumotlar yuvorildi'
               })
            } else {
              ElMessage.error('Barcha maydonlarni to`ldiring')
            }
         })
   }
   console.log(stateStorage.value);

   defineExpose({
      stateStorage
   })
   

      // const add = ()=>{
      //    product.value.id = +new Date()
      //    // tableArr.value.push(_items.value)
      //    stateStorage.value.push(product.value)
      // }

      
        



   const product = ref({
      brought_n:'',
      brought_l:'',
      brought_f:'',
      brought_p:'',
      employee_n:'',
      employee_l:'',
      employee_f:'',
      confirmation:'',
      onDuty_f:'',
      onDuty_l:'',
      onDuty_n:'',
      type:'',
      count:'',
      desc:'',
      date1:'',
   })

  

   const rules = ref({
      brought_n:[
         {
            required:true,
            message:'Maydon to`ldiring',
            trigger:'blur'
         }
      ],
      brought_l:[
         {
            required:true,
            message:'Maydon to`ldiring',
            trigger:'blur'
         }
      ],
      brought_f:[
         {
            required:true,
            message:'Maydon to`ldiring',
            trigger:'blur'
         }
      ],
      brought_p:[
         {
            required:true,
            message:'Maydon to`ldiring',
            trigger:'blur'
         }
      ],  
      employee_n:[
         {
            required:true,
            message:'Maydon to`ldiring',
            trigger:'blur'
         }
      ],
      employee_l:[
         {
            required:true,
            message:'Maydon to`ldiring',
            trigger:'blur'
         }
      ],
      employee_f:[
         {
            required:true,
            message:'Maydon to`ldiring',
            trigger:'blur'
         }
      ],
      confirmation:[
         {
            required:true,
            message:'Maydon to`ldiring',
            trigger:'blur'
         }
      ],
      onDuty_f:[
         {
            required:true,
            message:'Maydon to`ldiring',
            trigger:'blur'
         }
      ],
      onDuty_l:[
         {
            required:true,
            message:'Maydon to`ldiring',
            trigger:'blur'
         }
      ],
      onDuty_n:[
         {
            required:true,
            message:'Maydon to`ldiring',
            trigger:'blur'
         }
      ],
      type:[
         {
            required:true,
            message:'Maydon to`ldiring',
            trigger:'blur'
         }
      ],
      date1:[
         {
            required:true,
            message:'Maydon to`ldiring',
            trigger:'blur'
         }
      ],
      date2:[
         {
            required:true,
            message:'Maydon to`ldiring',
            trigger:'blur'
         }
      ],
      
      count:[
         {
            required:true,
            message:'Maydon to`ldiring',
            trigger:'blur'
         }
      ],
      desc:[
         {
            required:true,
            message:'Maydon to`ldiring',
            trigger:'blur'
         }
      ],

   })


   const productForm = ref()

   const handleClose = ()=>{
      setToggle(false)
   }

   const options = Array.from({ length: 500 }).map((_, idx) => ({
         value: `${idx + 1}`,
         label: `${idx + 1}`,
   }))

</script>


<style lang="scss">
   .malumot{
      display: flex;
      align-items:center;
      justify-content: center;
      gap: 60px;
      h4{
         margin-bottom: 10px;
      }
      .select1{
         width: 230px;
      }
      .hodim_1{
         .el_form{
               width: 200px;
               max-width: 100%;
      }
      }
      .onduty_1{    
         .onduty_2{
            display: flex;
            align-items:center;
            justify-content: center;
            gap: 60px;
         }
         
      }
   }
</style>