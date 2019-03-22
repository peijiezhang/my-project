<template>
  <div>
    <el-row >
      <el-col :span="10" :offset="1" style="margin-top: 1vh">


        <el-form :model="queryContent" ref="queryContent" :rules="rules2" label-width="100px" :inline="true" >

          <el-form-item prop="username">
            <el-input type="username" v-model="queryContent.username" auto-complete="off" placeholder="用户名">
            </el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input type="password" v-model="queryContent.password" auto-complete="off" placeholder="密码">
            </el-input>
          </el-form-item>


          <el-form-item label=" ">
            <el-button type="primary" :loading="queryLoading" @click="query()"><i class="el-icon-search"></i>查询</el-button>

          </el-form-item>
        </el-form>

      </el-col>

    </el-row>
    <el-row  style="margin-top: 25vh"  border stripe>
      <el-table
        :data="tableData"
        height="250"
        border
        style="width: 100%">
        <el-table-column
          prop="productName"
          label="商品名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="price"
          label="商品价格"
          width="180">
        </el-table-column>
        <el-table-column
          prop="counts"
          label="商品数量">
        </el-table-column>
        <el-table-column
          prop="description"
          label="商品描述">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间">
        </el-table-column>
        <el-table-column
          prop="isPayMoney"
          label="是否付款">
        </el-table-column>
      </el-table>

    </el-row>

  </div>

    
</template>

<script>
    export default {
        name: "Orders",

      data(){
          return{


            queryContent:{
              username:'',
              password:''

            },
            tableData: [],
            rules2: {
              username: [
                { required: true, message: "用户名不能为空", trigger: "change"}
              ],
              password: [
                { required: true, message: "密码不能为空", trigger: "change"}
              ]
            },
            queryLoading:false,

          }


      },methods:{

        query(){
          this.queryLoading = true;
          this.$refs.queryContent.validate((valid) => {
            if (valid) {
              this.$axios.post("link/login", this.queryContent).then((result) => {

                //console.log("result"+result.data);
                if(result.data){
                  this.$axios.post("order/getProductList", this.queryContent).then((result) => {
                    this.tableData = result.data;
                    this.queryLoading = false;
                  });

                }else {
                  this.$message.error("用户名或密码错误");

                }

              });

            }
          });

        }


      }
    }
</script>

<style scoped>

</style>
