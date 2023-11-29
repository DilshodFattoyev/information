<template >
   <header class="header">
      <div class="logo">
         <div class="demo-image">
            <div v-for="fit in fits" :key="fit" class="block">
               <el-image style="width: 50px; height: 50px; border-radius:50px;"  :src="url" :fit="fit" />
            </div>
         </div>
      </div>
      
      <div class="person1">
         <div class="person">
            <p>Alimov Mardon</p>
               <el-icon class="block user_img">
                  <User />
               </el-icon>
       
         </div>
         <el-button class="block switch" type="danger">
         <el-icon class="block ">
            <SwitchButton/>
         </el-icon>
      </el-button>
      </div>
   </header>
</template>
<script setup>

const fits = ['cover' ]
const url =
  'https://iiv.uz/media/links/213169e67954a9df9f2cd9f9265d69bb.jpg'
</script>
<style lang="scss">
   @import '@/styles/components/header.scss';
   .header{
      padding: 5px;
      .person1{
         display: flex;
         gap: 10px;
         .switch{
            width: 30px;
            height: 30px;
         }
         .person{
            display: flex;
            color:white;
            align-items:flex-end;
            gap:10px;
            .user_img{
               background-color: white;
               color:black;
               width: 30px;
               height: 30px;
               border-radius: 50px;
            }
         }
      }
      h2{
         color:white
      }
      .logo{
         margin-left: 20px;
      }
   }
</style>