<template>
  <div class="panel_content">
    <div class="main">
      <el-row >
        <el-col :span="10" :offset="1" style="margin-top: 1vh">


          <el-form :model="queryContent" ref="queryContent" :rules="rules2" label-width="100px" :inline="true" >

          <!--  <el-form-item prop="username">
              <el-input type="username" v-model="queryContent.username" auto-complete="off" placeholder="用户名">
              </el-input>
            </el-form-item>

            <el-form-item prop="password">
              <el-input type="password" v-model="queryContent.password" auto-complete="off" placeholder="密码">
              </el-input>
            </el-form-item>-->


            <el-form-item label=" ">
              <el-button type="primary" :loading="queryLoading" @click="query()"><i class="el-icon-search"></i>查看订单</el-button>

            </el-form-item>
          </el-form>

        </el-col>

      </el-row>

    </div>

    <div class="mainTable">
      <el-row  style="margin-top: 25vh"  border stripe>
        <el-table
          :data="tableData"
          height="250"
          border
          style="width: 100%">
          <el-table-column prop="oId" label="订单号" width="180">
          </el-table-column>
          <!--<el-table-column prop="itemList" label="订单" width="180" v-for="item in items">
            {{item.productName}}
          </el-table-column>-->
         <!-- <el-table-column prop="productName" label="商品名称" width="180" v-for="item in items" :key="item.productName">
            <span v-html="detailProduct(item.productName)"></span>
          </el-table-column>
          <el-table-column prop="counts" label="商品数量" width="180" v-for="item in items">
            <span >{{item.counts}}</span>
            &lt;!&ndash;<el-tooltip  v-if="item.counts>=2"><el-button type='success' size="small" icon='el-icon-check' circle></el-button></el-tooltip >&ndash;&gt;
          </el-table-column>
          <el-table-column prop="price" label="商品单价" width="180" v-for="item in items" >
            {{item.price}}
          </el-table-column>-->
          <el-table-column prop="createTime" label="创建时间">
          </el-table-column>
          <el-table-column prop="isPayMoney" label="是否付款">
            <template slot-scope="scope">
              <span v-html="findLabelByName(scope.row.isPayMoney, 'isPayMoney')"></span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button  type="text" @click="showProductList(scope.row.oId)"> 商品详情</el-button>
            </template>
          </el-table-column>
        </el-table>

      </el-row>

    </div>


    <div>
      <el-dialog
        title="订单详情"
        :visible.sync="viewDialogVisible"
        width="40%">
        <el-row>
          <el-col>
            <el-table  :data="productData">
              <el-table-column
                prop="productName"
                label="商品名称"
                width="180" >
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
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button  type="text" @click="deleteProduct(scope.row)"> 删除商品</el-button>

                </template>

              </el-table-column>

            </el-table>
          </el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">
                <el-button @click="viewDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="viewDialogVisible = false">确 定</el-button>

            </span>
      </el-dialog>

    </div>

  </div>


</template>

<script>
    export default {
        name: "Orders",

      data(){
          return{
            counts:'',
            productName:[],
            items:[],
            orderId:'',
            viewDialogVisible: false,
            queryContent:{
              username:'',
              password:''

            },
            tableData: [],
            productData:[],
            rules2: {
              username: [
                { required: true, message: "用户名不能为空", trigger: "change"}
              ],
              password: [
                { required: true, message: "密码不能为空", trigger: "change"}
              ]
            },
            queryLoading:false,

            isPayMoney:'',
            isPayMoneyList:[
              {
                value: 0,
                label: '未付款'
              }, {
                value: 1,
                label: '已付款'
              }
            ]

          }


      },methods:{

        query(){
          this.queryLoading = true;


              this.$axios.post("order/getOrderList").then((result) => {

                if(result.data != null&&result.data.length != 0 ){
                 /* this.tableData = result.data;
                  /!*result.data.forEach(item=>{
                    this.items = item.itemList;
                    console.log("item.itemList==>"+item.itemList);
                  });*!/*/

                }

                this.queryLoading = false;
              });
              this.queryLoading = false;



        },
        showProductList(param){

          this.viewDialogVisible =true;
          this.orderId = param;
          this.$axios.post("order/getProductList", {oId:param}).then((result) => {
            this.productData = result.data;
          })

        },
        findLabelByName(val, rowName) {
          var label = '';
          this[rowName+'List'].forEach((e)=> {
            if(e.value == val) {
              label =  e.label;
            }
          });
          return label;
        },
        deleteProduct(row){
          this.showConfirm('是否确认删除？', 'info', ()=> {

            this.$axios.post('order/deletedProduct', {iId:row.iId,oId: this.orderId}).then((response)=> {
              if(response.data) {
                this.showNotification('success', '成功', "删除成功！" );
               // console.log("this.orderId====>"+this.orderId);
                this.showProductList(this.orderId);
                //this.viewDialogVisible = false;
              } else {
                this.showNotification('waring', "失败", "删除失败," + response.data.msg);
              }
            });
          })


        },
        showConfirm(msg, type, successback, failback) {
          this.$confirm(msg, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: type
          }).then(() => {
            successback();
          }).catch(() => {
            failback();
          });
        },
        showNotification (type,title, msg) {
          this.$notify({
            type: type,
            title: title,
            message: msg
          })
        },
        detailProduct(param){
          console.log("param====>"+param);

          return param+"<br/>"


        }



      }
    }
</script>

<style scoped>

</style>
