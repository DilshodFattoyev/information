<template >
   <aside>
      <nav>
         <router-link to="/">
            <el-icon>
               <HomeFilled/>
            </el-icon>
            Bosh sahifa
         </router-link>
         <router-link to="/products">
            <el-icon>
               <Notebook />
            </el-icon>
            Forma - 3
         </router-link>
         
      </nav>
   </aside>
</template>
<script>

</script>
<style lang="scss">
   aside{
      width: 200px;
      height: 100%;
      background-color:#fff;
      padding: 15px;
      nav{
         display: flex;
         flex-direction: column;
         gap: 15px;
         a{
            background-color:#f2f2f2;
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 10px;
            border-radius: 10px;
            &.router-link-active{
               background-color:rgb(168, 168, 253);
               color: #fff;
            }
         }
      }
   }
</style>