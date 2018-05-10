<template>
  <div class="layout-ceiling">
    <div class="align-middle moduleDiv">
      <a v-for="item in items" :key="item.message"  @click="getModuleMenus(item.message)">
        {{ item.message }}
      </a>
    </div>
    <el-dropdown trigger="hover"  @command="handleCommand" style="float: right">
      <span class="el-dropdown-link avatar"><img src="https://i.loli.net/2017/08/21/599a521472424.jpg" /> </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item  command="myMsg" >我的消息</el-dropdown-item>
        <el-dropdown-item  command="setting">设置</el-dropdown-item>
        <el-dropdown-item divided  command="login">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="layout-ceiling-main align-middle">
     <el-badge :value="12" class="item">
        <a size="small">评论</a>
      </el-badge>
      <el-badge :value="3" class="item">
        <a size="small">回复</a>
      </el-badge>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ceiling',
  props: {
    itemList: Array
  },
  data() {
    return {
      items: [
        { message: '考勤' },
        { message: '车间' },
        { message: '供应链' }
      ],
      moduleList2: ["daw", "daw"],
      moduleList: [
        { code: "rs", name: "人事" },
        { code: "xt", name: "系统" }
      ]
    }
  },
  methods: {
    getModuleMenus: function(s) {
      console.log(s);

        this.$emit('showbox',s)
      
    },
     handleCommand(command) {
        this.$message('click on item ' + command);
        if(command=="login"){
          this.$router.push({
            name: 'login'
            
          })
        }

      }
    ,logout(){
       this.$router.push({
          name: 'login'
          
        })
    }
  },
  mounted () {
    
  }
}

</script>
<style scoped>
  .moduleDiv {
    color: #dbc9c9;
    font-size: 18px;
    font-weight: 300;
    margin: 0px 20px;
    float: left;
  }

  .layout-ceiling {
    background: #464c5b;
    /*padding: 10px 0;*/
    height: 40px;
    overflow: hidden;
  }

  .layout-ceiling-main {
    float: right;
  }

  .layout-ceiling-main a {
    border-left: 1px solid #cccccc;
    color: #9ba7b5;
    padding: 0 10px;
    margin: 10px 0;
    text-align: center;
    cursor: pointer;
    font-size: 14px;
    line-height: 14px;
    position: relative;
  }

  .layout-ceiling-main a:hover {
    color: #fff;
  }

  .layout-ceiling .avatar {
    float: right;
    margin-right: 1em
  }

  .layout-ceiling .avatar img {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    margin-left: 10px;
    float: right;
  }
  .moduleDiv {
    font-size: 16px;
  }
  .moduleDiv a {
    padding-right: 10px;
  }

</style>