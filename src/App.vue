<template>
  <div id="app">

      <div class="home-top">
        <el-row >
          <el-col  >
            <div class="home-top-nav-select">
              <el-menu
                :default-active="activeIndex2"
                class="el-menu-demo"
                mode="horizontal"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">

                <el-menu-item  style="text-align: left;font-size: 20px">
                  Home 系统
                </el-menu-item>
                <el-menu-item index="1">处理中心</el-menu-item>
                <el-submenu index="2">
                  <template slot="title">我的工作台</template>
                  <el-menu-item index="2-1">选项1</el-menu-item>
                  <el-menu-item index="2-2">选项2</el-menu-item>
                  <el-menu-item index="2-3">选项3</el-menu-item>
                  <el-submenu index="2-4">
                    <template slot="title">选项4</template>
                    <el-menu-item index="2-4-1">选项1</el-menu-item>
                    <el-menu-item index="2-4-2">选项2</el-menu-item>
                    <el-menu-item index="2-4-3">选项3</el-menu-item>
                  </el-submenu>
                </el-submenu>
                <el-menu-item index="3" >消息中心</el-menu-item>

                <el-menu-item  style="text-align:right ">

                  <el-dropdown>
                    <i class="el-icon-setting" style="color: darksalmon"></i>
                    <el-dropdown-menu  slot="dropdown">
                      <el-dropdown-item>用户</el-dropdown-item>
                      <el-dropdown-item>退出</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>

                </el-menu-item>

              </el-menu>
            </div>
          </el-col>

        </el-row>

      </div>
    <div class="home-middle">
      <div class="home-middle-nav">
        <el-menu default-active="2" class="el-menu-vertical-demo"
                 router
                 style="border-right: none"  background-color="#545c64"
                 text-color="#fff"
                 active-text-color="#ffd04b"
        >
          <a class="collapse-btn"></a>
          <el-submenu :index="index + 1 + ''" :key="item.id" v-for="(item, index) in menuList" v-if="menuList.length > 0">
            <template slot="title">
              <i :class="item.styleUrl"></i>
              <span slot="title">{{item.name}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item v-for="childItem in item.children" :key="childItem.id" :index="childItem.url">{{childItem.name}}
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>

      </div>
      <div class="home-middle-content">
        <router-view/>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: 'App',
  data(){

    return{
      activeIndex2: '1',

      menuList:[

        {
          url: '/',
          name: '操作页面',
          styleUrl: 'el-icon-menu',
          children: [
            {
              url: '/Login',
              name: '登录页面',
            },

            {
              url: '/Orders',
              name: '订单服务',
            },
            {
              url: '/Home',
              name: '查询磁盘目录结构',
            },
          ],
        }
      ],

    }
  },method:{


  }

}
</script>

<style>



  html, body {
    width: 100%;
    height: 100%;
    margin: 0;
    overflow: hidden;
  }

  body {
    min-width: 1200px;
    background-color: #eee;
  }

  a {
    cursor: pointer !important;
  }
/*#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}*/






.home-top {
  position: relative;
  width: 100vw;
  height: 70px;
  background-color: #909399;
  font-size: 14px;
  min-width: 1200px;
  line-height: 70px;
}

.home-top-nav-select{
  position: relative;


}

.home-middle-nav {
  position: absolute;
  display: inline-block;
  width: 199px;
  height: 100%;
  float: left;
  background-color: darkgrey;
}


.home-middle {
 position: absolute;
  width: 100%;
  top: 60px;
  bottom: 0px;
  min-width: 1200px;

  height: 100%;
  /*background-color: #2e323f;*/
}



.home-middle-content {
  position: relative;
  margin-top: 8vh;
  margin-right: 5vh;
  margin-left: 1.5vw;
  left: 200px;
  height: 90vh;
  width: 85vw;
  display: inline-block;
  overflow: auto;
}



</style>
