<template>

  <div  class="main">

    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px"
             class="demo-ruleForm login-container">

      <h3 class="title">系统登录</h3>

      <el-form-item prop="account">
        <el-input type="text" v-model="ruleForm2.username" auto-complete="off" placeholder="账号">
        </el-input>
      </el-form-item>

      <el-form-item prop="checkPass">
        <el-input type="password" v-model="ruleForm2.password" auto-complete="off" placeholder="密码">
        </el-input>
      </el-form-item>

      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click="handleSubmit2" >登录 </el-button>
      </el-form-item>


    </el-form>

  </div>


</template>

<script>
  export default {
    name: "login",
    data() {
      var checkAccount = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入账号'));
        } else if (value.length < 4 || value.length>12) {
          return callback(new Error('账号名必须在4~12位'));
        } else {
          callback();
        }
      };
      var checkPass = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('请输入密码'));
        } else if (value.length < 2) {
          return callback(new Error('密码不能小于两位'));
        } else {
          return callback();
        }
      };
      return {
        ruleForm2: {
          username: '',
          password: ''
        },
        rules2: {
          username: [
            {validator: checkAccount, trigger: 'blur'},
          ],
          password: [
            {validator: checkPass, trigger: 'blur'},
          ]
        }
      };
    },
    methods: {


      initRoutForm(){
        this.$router.push({
          query: {
            username: this.username,
            password: this.password,
          }
        });


      },


      handleSubmit2(ruleForm2) {
        this.initRoutForm();

        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            this.$axios.post("link/login", this.ruleForm2).then((result) => {

              //console.log("result"+result.data);
              if(result.data){
                this.$router.push({
                  path: "/Home"
                });
              }else {
                this.$message.error("用户名或密码错误");

              }

              });

          } else {
            alert('登陆失败！');
            console.log('error submit!!');
            return false;
          }
        });

      }
    }
  }
</script>
<style lang="scss" scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }

/*  .main{

    margin-left: 800px;

  }*/
</style>
