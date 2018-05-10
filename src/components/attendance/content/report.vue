<template>
  <div class="people">
    <el-col :span="12" class="treeBox">
      <!-- <span>标准的部门树组件</span> -->
      <Tree ref="zkDeptTree" 
         
        :myList="deptlist"
        @getUserData="getUserData"
        @cTreeEvent="pTreeEvent">
      </Tree>
    </el-col>
    <div class="comment">
        <el-row class="rowDone">
            <el-col :span="12">
              <el-button-group >
                <el-button v-for="(butn,index) in buttons"  :key="index"  type="primary" @click="open(butn.btnCode)" >
                  {{butn.btnName}}
                </el-button>
              </el-button-group>
            </el-col>
            <el-col :span="12" class="searchBtn">
              <el-input placeholder="请输入内容" v-model="searchStr"                
                class="input-with-select">
                  <!-- @keyup.enter.native="refreshTable" -->
                <el-button slot="append" 
                  type="info"
                  icon="el-icon-search">
                  <!-- @click="refreshTable" -->
                </el-button>
              </el-input>
            </el-col>
        </el-row>
        <el-row>         
            <Table :newOption="newOption" :tableData="tableData" @childEvent="fEevent"></Table>
        </el-row> 
    </div>
    <Form ref="form"></Form>
  </div>
</template>

<script>
var  deptlist2=[{
    "deptCode":"10010020",
    "deptName":"金陵石化",
    "xmjc":"jlsh",
    "children":[{
        "deptCode":"10010100",
        "deptName":"领导班子",
        "xmjc":'ldbz'
      },{
        "deptCode":"10010200",
        "deptName":"经理办",
        "xmjc":'jlb'
      },{
        "deptCode":"10012300",
        "deptName":"信息与计量中心大叔大婶大奥所大所大所",
        "xmjc":'xxyjlzx',
        "children":[{
            "deptCode":"10012301",
            "deptName":"领导班子",
            "xmjc":'ldbz'
          },{
            "deptCode":"10012302",
            "deptName":"综合部",
            "xmjc":'zhb'
          },{
            "deptCode":"10012303",
            "deptName":"检定部",
            "xmjc":'jdb'
          },{
            "deptCode":"10012304",
            "deptName":"仪表部",
            "xmjc":'ybb'
          }]
      },{
        "deptCode":"10012400",
        "deptName":"运行一部",
        "xmjc":'yxyb',
        "children":[{
            "deptCode":"10012401",
            "deptName":"领导班子",
            "xmjc":'ldbz'
          },{
            "deptCode":"10012402",
            "deptName":"综合部",
            "xmjc":'zhb'
          },{
            "deptCode":"10012403",
            "deptName":"一工区",
            "xmjc":'ygq'
          },{
            "deptCode":"10012404",
            "deptName":"二工区",
            "xmjc":'rgq'
          },{
            "deptCode":"10012405",
            "deptName":"领导班子5",
            "xmjc":'ldbz5'
          },{
            "deptCode":"10012406",
            "deptName":"综合部6",
            "xmjc":'zhb6'
          },{
            "deptCode":"10012407",
            "deptName":"一工区7",
            "xmjc":'ygq7'
          },{
            "deptCode":"10012408",
            "deptName":"二工区8",
            "xmjc":"egq8"
          }]
      },{
        "deptCode":"10012300",
        "deptName":"信息与计量中心大叔大婶大奥所大所大所",
        "xmjc":'xxyjlzx',
        "children":[{
            "deptCode":"10012301",
            "deptName":"领导班子",
            "xmjc":'ldbz'
          },{
            "deptCode":"10012302",
            "deptName":"综合部",
            "xmjc":'zhb'
          },{
            "deptCode":"10012303",
            "deptName":"检定部",
            "xmjc":'jdb'
          },{
            "deptCode":"10012304",
            "deptName":"仪表部",
            "xmjc":'ybb'
          }]
      },{
        "deptCode":"10012400",
        "deptName":"运行一部",
        "xmjc":'yxyb',
        "children":[{
            "deptCode":"10012401",
            "deptName":"领导班子",
            "xmjc":'ldbz'
          },{
            "deptCode":"10012402",
            "deptName":"综合部",
            "xmjc":'zhb'
          },{
            "deptCode":"10012403",
            "deptName":"一工区",
            "xmjc":'ygq'
          },{
            "deptCode":"10012404",
            "deptName":"二工区",
            "xmjc":'rgq'
          },{
            "deptCode":"10012405",
            "deptName":"领导班子5",
            "xmjc":'ldbz5'
          },{
            "deptCode":"10012406",
            "deptName":"综合部6",
            "xmjc":'zhb6'
          },{
            "deptCode":"10012407",
            "deptName":"一工区7",
            "xmjc":'ygq7'
          },{
            "deptCode":"10012408",
            "deptName":"二工区8",
            "xmjc":"egq8"
          }]
      }
    ]
  }]
var  buttons = [
    {"btnCode":"new","btnName":"新增", "btnIcon":"add","btnTitle":"新增一个XX","btnClass":"success ","btnStyle":1},
    {"btnCode":"export","btnName":"导出","btnIcon":"export","btnTitle":"导出数据","btnClass":"warning  ","btnStyle":1},
    {"btnCode":"edit","btnName":"编辑","btnIcon":"edit","btnTitle":"编辑","btnClass":"warning  ","btnStyle":2},
    {"btnCode":"delete","btnName":"删除","btnIcon":"delete","btnTitle":"删除","btnClass":"warning  ","btnStyle":2},
]
var newOption = {
        url: '', 
        urlParams: {}, 
        serverSide: false, 
        serverNums: 0,    
        columns: [      //封装的列
          { type: 'selection',fixed: true, label: "", prop: "", width: 50 },
          { label: "部门编号",  sortable: true, prop: "pin" },
          { label: "部门名称", sortable: true, prop: "name" },
          { label: "部门层级", sortable: true, prop: "sex" },
        ],     
        layout: 'total, sizes, prev, pager, next, jumper', // 
        prevText: '上一页',
        nextText: '下一页',
        pageSizes: [50, 100, 200, 300, 400],
        pageSize: 50,
        currentPage: 1,
        totalNum: 0,
        tableHeight: 450, // 表格的高度
        tableMinHeight: 300,
        defaultSort: {
            prop: '',
            order: ''
        },
        buttons:[]
    }

import Tree from "@/components/base/tree";
import Table from '@/components/base/table'
import Form from '@/components/base/form'
export default {
  name: 'userTree', 
  data () {
    return {
      // people: '人员管理'
      option: {},
      deptlist: [],
      searchStr: '',
      buttons: [], // 在表格上渲染
      newOption: {},
      tableData: []
    }
  },
  components: {
    Tree,Table,Form
  },
  methods: {
    open(type){
      // console.log("操作表格数据",type);  
      this.$refs.form.open(type)
    },
    getUserData(data) {
      if(data == 1) {
        this.tableData = []
        this.tableData = [].concat(deptlist2)
      }
      console.log(this.tableData)
      // else {
      //   var tableData1 = []
      //   for(let i=0;i<10;i++){
      //     tableData1.push({"pin":i,"name":"张三"+ parseInt( Math.random()*100) })
      //     console.log(this.tableData)
      //   }  
      //   this.tableData = []
      //   this.tableData = [].concat(tableData1)
      // }
        
    },
    pTreeEvent(parms){
      //接受子主键发射的事件
      console.log("zkDeptTreeUser 介绍事件",parms);
      console.log("触发 表格刷新");
      if(parms.eventType==="checkClick"){
        let slectDepts= this.$refs.zkDeptTree.getTreeCheckListName()     
        //采用es6 中的迭代 循环
        let iterator = slectDepts[ Symbol.iterator ]();
        let listName=[];
        let iteratorResult = iterator.next();
        while( !iteratorResult.done ) {
          //console.log( iteratorResult.value.deptName );
          listName.push(iteratorResult.value.deptName);
          iteratorResult = iterator.next();
        }
        console.log(listName)
        
        console.log("根据已选择部门查询人员",listName.join(','));
        this.$refs.zkUserTable.getListData(slectDepts);
      }

    },
     fEevent(parms){
      console.log("触发父组件事件");
      console.log(parms)
    },
    // getCheckUser(){

    //   return this.$refs.zkUserTable.getCheckUser()
    // },
    // exportUser(){

    //   this.$refs.zkUserTable.export2Excel();
    // }
  },
  created () {
    this.deptlist = [].concat(deptlist2)
    // console.log(deptlist2)
    Object.assign(this.newOption, newOption)
    // console.log(this.newOption.buttons)
    this.newOption.buttons = []
    for(let b of buttons){
        if(b.btnStyle === 1){
            this.buttons.push(b);
        }else{
            this.newOption.buttons.push(b)
        }
    }
    this.tableData = [].concat(tableData)
    console.log(this.newOption)
  },
  mounted() {

    console.log("部门树人员组件");
    this.option = Object.assign(this.option, this.myOption)

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.people {
  height: 100%;
  width: 100%;
  /* overflow-y: auto */
}
.treeBox{
  width: 15%;
  height: 100%
}
.comment{
  height: 100%;
  float: right;
  width: 83%;
  overflow-y: auto
}
.searchBtn {
  float: right;
  width: 162px
}
.rowDone {
  margin-bottom: 3px
}
</style>