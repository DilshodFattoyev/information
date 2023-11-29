<template >
   <div>
      <el-table :data="stateStorage.filter((el)=> el.type == 'jinoiy')"  stripe >
         <el-table-column type="index" width="50" label="№"  />
         <el-table-column prop="brought_n" label="OKSh Ism" width="150" />
         <el-table-column prop="brought_l" label="OKSh Familya"  width="150"  />
         <el-table-column prop="brought_f" label="OKSh Otasi Ism"  width="150" />
         <el-table-column prop="brought_p" label="OKSh Passport"  width="150" />
         

         <el-table-column prop="employee_n" label="Hodim Ism"  width="150" />
         <el-table-column prop="employee_l" label="Hodim Familya"  width="150" />
         <el-table-column prop="employee_f" label="Hodim Otasi Ism"  width="150" />
         <el-table-column prop="confirmation" label="Guvohnoma"  width="150" />

         <el-table-column prop="onDuty_n" label="Navbatchi Ism"  width="150" />
         <el-table-column prop="onDuty_l" label="Navbatchi Familya"  width="150" />
         <el-table-column prop="onDuty_f" label="Navbatchi Otasi Ism"  width="150" />

         <el-table-column prop="type" label="Hujjat turi"  width="150" />
         <el-table-column prop="count" label="Qaysi modda"  width="150" />

         <el-table-column width="150px" label="Soat">
            <template #default="scope">
               <span>{{ formatDate_UTIL(scope.row.date2,false ) }} </span>
            </template>
         </el-table-column>

         <el-table-column prop="desc" label="Izoh"  width="250" />

         <!-- <el-table-column  label="Udastriniy muddat"  width="200">
            <template #default="scope">
               <span>{{ formatDate_UTIL(scope.row.lifeTime), true }} </span>
            </template>
         </el-table-column> -->

         <!-- <el-table-column  label="Tug`ilgan kun"  width="200">
            <template #default="scope">
               <span>{{ formatDate_UTIL(scope.row.brithday), true }} </span>
            </template>
         </el-table-column> -->

         <!-- <el-table-column width="160px" label="Yil">
            <template #default="scope">
               <span>{{ formatDate_UTIL(scope.row.date1), true }} </span>
            </template>
         </el-table-column> -->

         

      </el-table>
      <div class="countT">
         <el-button style="margin: 20px;" type="primary" @click="excel(stateStorage.filter((el)=> el.type == 'jinoiy'))">excel</el-button>
         <el-button style="margin: 20px;" type="primary">{{ stateStorage.filter((el)=> el.type == 'jinoiy').length }}</el-button>
      </div>


      <el-table :data="stateStorage.filter((el)=> el.type != 'jinoiy')"  stripe >
         <el-table-column type="index" width="50" label="№"  />

         <el-table-column prop="brought_n" label="OKSh Ism" width="150" />
         <el-table-column prop="brought_l" label="OKSh Familya"  width="150"  />
         <el-table-column prop="brought_f" label="OKSh Otasi Ism"  width="150" />
         <el-table-column prop="brought_p" label="OKSh Passport"  width="150" />
         

         <el-table-column prop="employee_n" label="Hodim Ism"  width="150" />
         <el-table-column prop="employee_l" label="Hodim Familya"  width="150" />
         <el-table-column prop="employee_f" label="Hodim Otasi Ism"  width="150" />
         <el-table-column prop="confirmation" label="Guvohnoma"  width="150" />

         <el-table-column prop="onDuty_n" label="Navbatchi Ism"  width="150" />
         <el-table-column prop="onDuty_l" label="Navbatchi Familya"  width="150" />
         <el-table-column prop="onDuty_f" label="Navbatchi Otasi Ism"  width="150" />

         <el-table-column prop="type" label="Hujjat turi"  width="150" />
         <el-table-column prop="count" label="Qaysi modda"  width="120" />

         <el-table-column width="150px" label="Soat">
            <template #default="scope">
               <span>{{ formatDate_UTIL(scope.row.date2,false ) }} </span>
            </template>
         </el-table-column>

         <el-table-column prop="desc" label="Izoh"  width="250" />

         <!-- <el-table-column  label="Udastriniy muddat"  width="200">
            <template #default="scope">
               <span>{{ formatDate_UTIL(scope.row.lifeTime), true }} </span>
            </template>
         </el-table-column>

         <el-table-column  label="Tug`ilgan kun"  width="200">
            <template #default="scope">
               <span>{{ formatDate_UTIL(scope.row.brithday), true }} </span>
            </template>
         </el-table-column> -->

     

         <!-- <el-table-column width="160px" label="Yil">
            <template #default="scope">
               <span>{{ formatDate_UTIL(scope.row.date1), true }} </span>
            </template>
         </el-table-column> -->

         
      </el-table>

      <div class="countT">
         <el-button style="margin: 20px;" type="primary" @click="excel(stateStorage.filter((el)=> el.type != 'jinoiy'))">excel</el-button>
         <el-button style="margin: 20px;" type="primary">{{ stateStorage.filter((el)=> el.type != 'jinoiy').length }}</el-button>
      </div>

   </div>
</template>
<script setup>
   import {useProductStore} from '../../stores/data/product'
   import { storeToRefs } from 'pinia';
   import { now, useStorage } from '@vueuse/core'
   import { ref, onMounted, toRefs} from 'vue'
   import { stateStorage } from '../../stores/stor';
   import {formatDate_UTIL} from '../../utils'
   import * as XLSX from 'xlsx'

   

   function excel(item) {
   const workbook = XLSX.utils.book_new();
   let content = item.map((el) => {
      return {
         'Olib kelingan shaxs ismi': el.brought_n,
         'Olib kelingan shaxs familya': el.brought_l,
         'Olib kelingan shaxs Otasi ism': el.brought_f,
         'Olib kelingan shaxs Passport': el.brought_p,
         
         'Hodim Ism':el.employee_n,
         'Hodim Familya':el.employee_l,
         'Hodim Otasi Ism':el.employee_f,
         'Hodim Guvohnomasi':el.confirmation,

         'Navbatchi Ism':el.onDuty_n,
         'Navbatchi Familya':el.onDuty_l,
         'Navbatchi Otasi Ism':el.onDuty_f,

         'Hujjat': el.type,
         'Modda': el.count,
         'Izoh': el.desc,
         'Kirish vaqti': el.date2,
         

      }
   })
   const worksheet = XLSX.utils.json_to_sheet(content);
   XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

   const outputFilePath = "output.xlsx";
   XLSX.writeFile(workbook, outputFilePath);
}

   

</script>
<style lang="">
   
</style>