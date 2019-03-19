<template>

  <div >

    <el-row>
      <el-col :span="10" :offset="1" style="margin-top: 1vh">
       <!-- <span>欢迎进入系统</span>-->

        <el-form :model="queryContent" ref="queryContent" :rules="runRule" label-width="100px" :inline="true" >

          <el-form-item label="ZK路径" prop="soaZkNamespace">

            <el-input v-model="queryContent.fileRoute" placeholder="请输入路径" >

            </el-input>


          </el-form-item>

          <el-form-item label=" ">
            <el-button type="primary" :loading="queryLoading" @click="query()"><i class="el-icon-search"></i>查询</el-button>

          </el-form-item>

        </el-form>

      </el-col>

    </el-row>

    <el-row >
      <el-col :span="20" class="panel_content" style="overflow-y: auto;height: 69vh">
        <el-tree :data="fileTree" ref="fileTree" >
            <span slot-scope="{ node, data }" >
                <span >{{ data.text }}</span>

            </span>
        </el-tree>

      </el-col>

    </el-row>


  </div>






</template>

<script>
    export default {
        name: "home",
      data(){
          return{

            queryContent:{

              fileRoute :'',
            },

            queryLoading:false,
            // 树控件默认展开 key
            defaultExpandedKeys: [],
            fileTree:[],


            runRule: {
              fileRoute: [
                { required: true, message: "路径不能为空", trigger: "change"}
              ]

            },

          }
      },
      methods:{

          query(){
           // this.queryLoading = true;
            this.$refs.queryContent.validate((valid) => {
              if (valid) {

                try{
                  this.$axios.post("fileTree/getList", this.queryContent).then((result) => {

                    if (result.data[0].children!= 0 && result.data[0].children != null && result.data[0].length!=0) {
                      //console.log("=====>")
                      this.fileTree = result.data[0].children;
                      //console.log("result.data.children======>"+result.data.children);
                    } else {
                      console.log("result.data.children   空值")
                    }

                    this.queryLoading = false;
                  });

                }catch (Error) {
                  this.queryLoading = false;

                }

              }
            });


            this.queryLoading = false;

          },


      }
    }
</script>

<style scoped>

</style>
