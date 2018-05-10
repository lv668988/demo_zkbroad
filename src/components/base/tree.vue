<template>
  <div class="deptTree" 
    v-loading="isLoading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(172, 181, 185, 0.5)">
   
    <!-- <el-input placeholder="输入查询条件" v-model="searchStr" > -->
      <!-- <el-button slot="append" icon="el-icon-search"></el-button> -->
    <!-- </el-input>    -->
    
    <el-tree 
        ref="deptTree"
        default-expand-all
        :highlight-current="isHighLight"
        :empty-text="option.emptyText"
        :data="treeData" 
        :title="titleMsg(treeData)"
        :show-checkbox="option.showCheckbox" 
        :node-key="option.nodeKey" 
        :default-checked-keys="option.checkedKeys"  
        :props="option.defaultProps"
        :check-strictly="option.checkStrictly" 
        :default-expanded-keys="option.expandedKeys"
        :filter-node-method="filterNode"
        @node-click="handleNodeClick"
        @check-change="handleCheckClick"
    >
    </el-tree>
  </div>
</template>
<script>
export default {
  name: 'tree',         // 组件的唯一名称 
  props: ['myList'],       // 引用组件传递的对象{}
  data() {
    return {
      searchStr:'',           //刷选查询条件
      option:{                 // 树的配置项
        apiUrl:'' ,              // 默认的树请求地址
        showCheckbox:false,      // 默认显示 勾选框
        checkedKeys:[],     //  已经选择的树 key list
        expandedKeys:[],       // 展开的 节点（父 code）
        emptyText:'暂无数据',
        nodeKey:"deptCode",    // 唯一的 
        checkStrictly:false ,   //false  父子关联 true 不关联
        defaultProps: {         //配置项 
          children: 'children',   //管理子
          label:'deptName'        //显示名称
        }
      },
      isLoading:true,
      isHighLight:true,
      treeData:[]
    }
  },
  watch: {
    searchStr(val) {
      this.$refs.deptTree.filter(val);     
    }
  },
  methods: {
    titleMsg (data) {
      return data[0].deptName
      
    },
    filterNode(value, data) {
        if (!value) return true;

        return data.deptCode.indexOf(value) !== -1 || data.deptName.indexOf(value) !== -1 || data.xmjc.indexOf(value) !==-1;
    },
    handleNodeClick(treeObj,Node,component) {
      // console.log(this.$refs.deptTree.getCurrentNode())
      if(treeObj.$treeNodeId == 1) {
        this.$emit('getUserData',treeObj.$treeNodeId)
      } else if( !treeObj.children ) {      
        // console.log(tableData)
        this.$emit('getUserData',0)
      }
      console.log(treeObj.$treeNodeId)
    },
    handleCheckClick(data,isCheck,cischeck){
      //console.log(data.deptName,isCheck,cischeck);
  
     // console.log("dw",this.option.checkedKeys);
      let list = this.$refs.deptTree.getCheckedKeys()
      //console.log(list)
      this.emitEvent({eventType:'checkClick',data:this.getTreeCheckList()});
    } , 
    emitEvent(msg){
      //发送事件到父亲组件
      this.$emit('cTreeEvent',msg)
    },
    getTreeCheckList(){
        // array [key]
       return this.$refs.deptTree.getCheckedKeys()
      
    },
    getTreeCheckListName(){
      //返回 list [{}对象]
       return this.$refs.deptTree.getCheckedNodes()
      
    },
    getDeptListData(){
      //获取最新的部门列表
      // console.log("重新获取数据");
     
      this.treeData = this.myList.slice(0)
      
      //采用异步请求数据方式 刷新部门树
      this.isLoading=false;
      // 
      // that.treeData=[];
      // that.option.expandedKeys=[]
      // that.option.emptyText='正在加载中....'

      //http://10.108.60.85/cbhs/Ashx/zdcx.ashx?action=getAllYxb


      // this.$axios.get('deptList').then(function(response){  //接口返回数据  
      //         console.log("相应数据");
      //         console.log(response.data)

      //           // 模拟显示 ，最后还加1个class
      //          setTimeout(function(){
      //          // that.option.emptyText='暂无数据'
      //           that.isLoading=false
      //          that.treeData=response.data;
      //          that.option.expandedKeys=[]
      //         that.option.expandedKeys.push(that.treeData[0]["deptCode"]);

      //         },2000)
      //        //  that.option.emptyText='暂无数据'

      //        //   that.treeData=response.data;
      //        //   that.option.expandedKeys=[]
      //        // that.option.expandedKeys.push(that.treeData[0]["deptCode"]);

      // })

      //console.log("dw",this.option.checkedKeys);
      //默认展开2级
      
     // console.log( this.option.expandedKeys);
    } 

  }, 
  created () {
    // console.log(this.myList)
  },
  mounted () {
   // console.log('zkdeptTree 合并 内部配置项及外部定义项')
    // console.log(this.myOption);
    // this.option=Object.assign(this.option,this.myOption)
   // console.log( JSON.stringify( this.option))
    this.getDeptListData();
    // this.option.expandedKeys = ["领导班子"]
  }
  // ,updated(){
  //   console.log('adlkwahdlka--updated')
  //   this.option.checkedKeys=this.checkList
  // }

}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import './tree.css';

</style>
