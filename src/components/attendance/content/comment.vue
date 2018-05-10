<template>
  <div class="comment">
      <el-row>
            <el-col :span="12">
              <el-button-group >
                <el-button v-for="(butn,index) in buttons"  :key="index"  type="primary" @click="cRestTable(butn.btnCode)" >
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
</template>

<script>
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
          { label: "工号",  sortable: true, prop: "pin" },
          { label: "姓名", sortable: true, prop: "name" },
          { label: "性别", sortable: true, prop: "sex", 
            filters: [{text:'01',value:'01'},{text:'02',value:'02'}]
          },
          { label: "工时类型", sortable: true, prop: "dutyType" },
          { label: "企业自定义分类1", sortable: true, prop: "jlsh_qyzdyygfl1" }
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
// 模拟数据
var tableData = [];
for(let i=0;i<160;i++){
  tableData.push({"pin":i,"name":"张三"+ parseInt( Math.random()*100) })
}
// console.log(tableData)
import Table from '@/components/base/table'

export default {
  name: 'comment',
  data () {
    return {
      searchStr: '',
      buttons: [], // 在表格上渲染
      newOption: {},
      tableData: []
    }
  },
  components: {
    Table
  },
  methods: {
    cRestTable(type){
      console.log("操作表格数据",type);  
    },
    // refreshTable() {       
    //   if(this.option.serverSide == false){
    //     console.log('客服端')
    //     this.drawTable()
    //     // if(flag==true && this.lisData.length>0 ){
    //     // 	this.drawTable()
    //     // }else{
    //     // 	console.log('客服端获取数据')
    //     // 	this.listData = this.getClistData().data;

    //     // 	this.option.totalNum=this.lisData.length ;
    //     // 	this.drawTable()
    //     // }
    //     // 如果是客服端 总数就是 listData 的总数
              
    //   }else{
    //     //服务端
    //     //组装参数
    //     let tableParms=new Object();
    //     tableParms.startRow= (this.option.currentPage - 1) * this.option.pageSize;
    //     tableParms.rowNum= this.option.pageSize;
    //     tableParms.prop=this.option.defaultSort.prop;
    //     tableParms.order=this.option.defaultSort.order;
    //     console.log("查询条件",tableParms);
    //     let rData= this.getSlistData(tableParms);

    //     console.log("查询结果",rData);
    //     this.listData = rData.data;
    //     this.option.totalNum= rData.totalNums;
    //     this.drawTable();
    //     // Object.assign(this.option.urlParams,tableParms)
    //     // console.log(this.option.urlParams);
    //   }
    // },
    
    fEevent(parms){
      console.log("触发父组件事件");
      console.log(parms)
    },
  },
  created () {
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
  mounted () {
    console.log(this.tableData)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.searchBtn {
  float: right;
}
</style>