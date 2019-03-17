<template>


<div  class="main" >

  <el-button type="primary" @click="enterLogin">登录页面</el-button>

  <el-button type="primary" @click="enterHome" >进入系统</el-button>

  </div>



</template>

<script>
    export default {
        name: "firstVue",
      data(){
          return{
            queryContent:'',


          }

      },

      methods:{

        enterHome(){

          this.$axios.post("link/enterHome").then((result) => {

            console.log("result===>"+result.data);
            if(result.data){
              this.$router.push({
                path: "/Home"
              });
            }else {
              this.$router.push({
                path: "/Login",

              });

            }
          })


        },
        enterLogin(){

          this.$router.push({

            path: "/Login",

          });

        }
      }
    }
</script>

<style scoped>

 /* .main{
    margin-top: 200px;
    margin-left: 800px;

  }*/

</style>
