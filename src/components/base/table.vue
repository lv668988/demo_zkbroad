<!-- 表格组件  -->
<template>
    <el-row v-loading="isLoading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(172, 181, 185, 0.5)">
        <el-col :span="24">
            <el-table 
                :data="tableData" 
                stripe 
                ref="table1" 
                border 
                :height="option.tableHeight" 
                style="width: 100%" 
                @sort-change="sortChange">
                <el-table-column
                    v-for="column in option.columns" 
                    :key="column['props']" 
                    :label="column['label']" 
                    :prop="column['prop']" 
                    :type="column['type']?column['type']:''" 
                    :width="column['width']?column['width']:false" 
                    :fixed="column['fixed']?true:false"
                    :sortable="column['sortable']?true:false">
                    <!-- 
                    :filters="column['filters']?column['filters']:''"
                    :filter-method="column['filters']?filterHandler:false"
                    filter-placement="bottom-end" -->
                </el-table-column>
                <el-table-column v-if="option.buttons.length>0" label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button v-for="(butn,index) in option.buttons" :key="index"
                            @click.native.prevent="handlerRowClick(butn.btnCode,scope.row)" type="text" size="small">
                            {{butn.btnName}}
                        </el-button>           
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <div class="block">        
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" @prev-click="prevClick" @next-click="nextClick" :current-page="option.currentPage" :page-sizes="option.pageSizes" :page-size="option.pageSize" :layout="option.layout" :total="option.totalNum" :prev-text="option.prevText" :next-text="option.nextText">
                </el-pagination>
            </div>
        </el-col>
    </el-row>
</template>
<script>
import { arraySort } from '@/libs/myArray'

export default {
    name: 'dataTable',
    props: ['newOption','tableData'],
    data() {
      return {       
        // dateTable 的配置选项
        option: {
            url: '', // 异步请求的地址
            urlParams: {}, // 请求数据的参数
            serverSide: false, // 是否为服务端分页 true ,前端分页 false
            serverNums: 0, //后台服务段返回
    
            columns: [],     //封装的列
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
        },
        tableData: [], //渲染的数据 当为服务端的时候 2者相等
        listData: [], //全部数据
        isLoading:false  // 是否显示加载中 动画效果 
      }
    },
    methods: { 
        // pagination 分页 内部事件
        handleSizeChange(val) {
            //pageSize 改变时会触发
            this.option.pageSize = val
            this.refreshTable();
        },
        handleCurrentChange(val) {
            // currentPage 改变时会触发
            this.option.currentPage=val;
            this.refreshTable();
        },
        prevClick: (val) => {
            this.option.currentPage=val;
            this.refreshTable();
        },
        nextClick:(val)=>{
            this.option.currentPage=val;
            this.refreshTable();
        },
        // 表格  内部时间
        sortChange(column){
            console.log("排序查询表");
            this.refreshTable();   
        },
        refreshTable(){
            //客服端
            if(this.option.serverSide == false){
                console.log('客服端')
                this.drawTable()
                // if(flag==true && this.lisData.length>0 ){
                // 	this.drawTable()
                // }else{
                // 	console.log('客服端获取数据')
                // 	this.listData = this.getClistData().data;

                // 	this.option.totalNum=this.lisData.length ;
                // 	this.drawTable()
                // }
                // 如果是客服端 总数就是 listData 的总数
                
            }else{
                //服务端
                //组装参数
                let tableParms=new Object();
                tableParms.startRow= (this.option.currentPage - 1) * this.option.pageSize;
                tableParms.rowNum= this.option.pageSize;
                tableParms.prop=this.option.defaultSort.prop;
                tableParms.order=this.option.defaultSort.order;
                console.log("查询条件",tableParms);
                let rData= this.getSlistData(tableParms);

                console.log("查询结果",rData);
                this.listData = rData.data;
                this.option.totalNum= rData.totalNums;
                this.drawTable();
                // Object.assign(this.option.urlParams,tableParms)
                // console.log(this.option.urlParams);
            }

        },
        drawTable(){
            // 等于当前 页码-1 * 每页显示 条数
            // console.log('画table')
            let startL= (this.option.currentPage - 1) * this.option.pageSize
            let endL= this.option.currentPage  * this.option.pageSize
            let  newList= this.listData 
            console.log(startL,endL,newList.length);
            if(this.option.serverSide==false){

                console.log("前端分页");
                this.tableData = arraySort(newList, this.option.defaultSort.prop, this.option.defaultSort.order).slice(startL,endL)
                console.log(this.tableData.length)
            }else{
                console.log("服务端分页");

                this.tableData=newList;
                console.log(this.tableData)
            }

        },
        getClistData(){
            //模拟 客服端获取数据
            let getList=[];
            let rObj=new Object();
            let nums=parseInt(Math.random()*10000)
            // console.log(nums);
            for (var i = 0; i <nums; i++) {
                getList.push({
                    date: '2016-05-02',
                    id: i + 1,
                    name: '王小虎'+i,
                    address: '上海市普陀区金沙江路 1518 弄'
                });
            }
            rObj.data=getList;
            return rObj;
        },
        initClistData(){
            //初始化数据
            this.listData = this.getClistData().data;
            this.option.totalNum=this.listData.length ;
            // console.log("this.listData.",this.listData.length);
        },
        initSlistData(){
            let tableParms=new Object();
            tableParms.startRow= (this.option.currentPage - 1) * this.option.pageSize;
            tableParms.rowNum= this.option.pageSize;
            tableParms.prop=this.option.defaultSort.prop;
            tableParms.order=this.option.defaultSort.order;
            var rData= this.getSlistData(tableParms);
            this.listData = rData.data;
            this.option.totalNum= rData.totalNums;
        },
        // 表格指定列刷新
        // filterHandler(value, row, column) {
        //     const property = column['property'];
        //     //如果是后端分页
        //     //console.log('自定义刷选',property); 
        //     //return true; 
        //     return row[property] === value;
        // },
        // handlerRowClick(type,data){
        //     console.log("表内操作 需要把对象发射到外部去处理逻辑");
        //     this.emitEvent({type:type,data:data})

        // },
        // 统一暴露外部的接口
        // getTableParms(){
            //获取表格的查询条件  返回对象
        //     let tableParms = new Object();
        //     tableParms.start = (this.option.currentPage - 1) * this.option.pageSize;
        //     tableParms.length = this.option.pageSize;
        //     if(this.option.defaultSort.prop!==""){
        //         tableParms.orderColumn = this.option.defaultSort.prop;
        //         tableParms.orderDir = this.option.defaultSort.order=="ascending"?"asc":"desc";
        //     }
        //     // {starRow: rowNum :prop  order}
            // 获取需要查询的列

        //     let columns=new Set()
        //     for(let c of  this.option.columns){
        //         if(c["prop"] ){
        //         columns.add(c["prop"] )
        //         }
        //     }
        //     tableParms.columns =[...columns];
        //     return tableParms;          
        // },
        // drawTable2(){
            //内部调用
        //     let inParms =this.getTableParms()
        //     let outParms =  this.option.urlParams;
        //     let parms=Object.assign(outParms, inParms)
        //     this.drawTable3(parms)
        // },
        
        // getURLParms(parms){
        //     let urlParms=new URLSearchParams();

        //     for(let t  in parms){
        //         urlParms.append(t,parms[t])
        //     }
        //     return urlParms
        // },
        // drawTable3(parms){
            // 最终查询条件

        //     var that=this;
        //     that.isLoading=true;
        //     console.log('参数',parms);
        //     //   let urlP=this.getURLParms(parms);
        //     this.$axios.post('cockpit/getUserPage.do',parms).then(function(response){  //接口返回数据  
        //         console.log("后端分页返回数据");
        //         console.log(response.data)                   
        //         that.listData = response.data.data;
        //         that.option.totalNum = response.data.recordsTotal;
        //         that.tableData = that.listData; 
        //         that.isLoading=false;
        //     }) 
        // },

        // 测试数据
        getSlistData(parms) {
            //请求数据 异步
            let getList=[];
            let rObj = new Object();
            //获取记录的开始数
            let startRow = parseInt(parms.startRow) + 1; //开始数
            let rowNum = parseInt(parms.rowNum); //总数
            let endRow = startRow + rowNum

            // for (var i = startRow; i <= endRow; i++){
            //     getList.push({
            //         pin: i,
            //         name: "李四"
            //     })
            // }
            // console.log(startRow,endRow)
            rObj.data = this.tableData;
            rObj.totalNums = this.tableData.length;   
            // console.log(rObj)
            return rObj
        },
        //发射时间
        // emitEvent(parms){
        //     //发送事件到父亲组件
        //     this.$emit('childEvent',parms)
        // },
    },
    // 在渲染dom 之前
    created() {
        Object.assign(this.option,this.newOption)
        // console.log( JSON.stringify(this.option));
        if(this.option.tableHeight<this.option.tableMinHeight){
                this.option.tableHeight=this.option.tableMinHeight
        }
        if(	this.option.serverSide==false){
            this.initClistData()
        }
        if(	this.option.serverSide==false){
            this.initSlistData()
        }
    },
    mounted() {
        // this.drawTable({})
        console.log(this.option)
        // console.log(this.tableData)
    }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.el-select .el-input {
  width: 130px;
}
.el-table {
    margin-bottom: 4px;
    min-width: 300px;
}
.demonstration {
  display: none;
}
.el-table td, .el-table th {
    padding: 0
}
.el-pagination {
  white-space: normal
}

.el-table--striped .el-table__body tr.el-table__row--striped td {
  background-color: #ccc;
}
.el-pagination>* {
    float: left;
}
.el-pagination .el-pagination__sizes {
    margin-right: 35%
}
.el-table__fixed {
    z-index: 0;
}
</style>
