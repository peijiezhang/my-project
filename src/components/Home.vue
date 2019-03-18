<template>

  <div >

    <span>欢迎进入系统</span>

    <el-row >
      <el-col :span="4" :offset="1" style="margin-top: 3vh">
        <el-input v-model="fileRouter" placeholder="请输入路径" >

        </el-input>


      </el-col>
      <el-col :span="2" :offset="1" style="margin-top: 3vh">
        <el-button type="primary" :loading="queryLoading" @click="query()"><i class="el-icon-search"></i>查询</el-button>

      </el-col>

    </el-row>
    <el-row>

      <el-col :span="15" class="panel_content" style="overflow-y: auto;height: 69vh">
        <el-tree :data="fileTree" ref="fileTree" node-key="id"
                 :expand-on-click-node="false"
                 :default-expanded-keys="defaultExpandedKeys"
                 highlight-current
                 @node-expand="addExpendedKeys"
                 @node-collapse="removeExpendedKeys">
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
            fileRouter:'',
            queryLoading:false,
            // 树控件默认展开 key
            defaultExpandedKeys: [],
            fileTree:[],
          }
      },
      method:{

          query(){
            this.queryLoading = true;

            this.$axios.post("fileTree/getList", this.fileRouter).then((result) => {

              if (result.data.children== 0 &&result.data.children != null&& result.data.length!=0) {
                this.fileTree = result.data.children;

              } else {
                this.$message.error(result.data.msg)
              }
              this.queryLoading = false;

            })


          },


        addExpendedKeys(data, node, tree) {
          this.defaultExpandedKeys.push(data.id);
          //.log("data==text====>"+ data.text);
        },
        removeExpendedKeys(data, node, tree) {
          let list = [];
          this.getTreeNodeChild(list, node);
          this.defaultExpandedKeys = this.defaultExpandedKeys.filter(item => {
            return !list.indexOf(item);
          });
        },

        getTreeNodeChild(list, node) {
          let childList = node.childNodes;
          for(let i in childList) {
            this.getTreeNodeChild(list, childList[i])
            list.push(childList[i].data.id);
          }
        },



      }
    }
</script>

<style scoped>


</style>
