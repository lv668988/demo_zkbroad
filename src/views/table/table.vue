<template>
  <div>
    <div class="formBtns">
      <el-button-group class="btnGroup">
        <el-button type="primary" v-for="item in btns1" :key="item.btnCode" v-html="item.btnName" :class="item.btnCode" @click="btnFn" :ref="item.btnCode"></el-button>
      </el-button-group>
      <el-input placeholder="请输入内容" class="input-with-select search">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <div class="formData">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column v-for="(item,index) in tableColumns2" :key="index" :label="item.name" width="150">
            <template slot-scope="scope">{{ scope.row.pin }}</template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" v-for="item in btns2" :key="item.btnCode" v-html="item.btnName" :class="item.btnCode"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div> 
    <!-- 新增人员信息 -->
    <div class="dialogForm">
      <!--<div class="shade"></div>-->
      <el-dialog title="添加企业人员" :visible.sync="dialogFormVisible">
        <el-form>
          <el-form-item v-for="item in formData" :key="item.name" :label="item.title" :prop="item.name">
            <el-input></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">立即创建</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div> 
  </div>
</template>

<style>
  .formBtns {
    width: 100%;
    overflow: hidden;
    padding-top:20px;
    padding-bottom: 20px;
  }
  /* 按钮组 */
  .btnGroup {
    float: left;
  }
  /* 搜索框 */
  .input-with-select {
    float: right;
    width: 190px;
    background-color: #fff;
  }
  /* 表格 */
  .el-table {
    border: 1px solid gray
  }
  .el-table__header-wrapper {
    width: auto;
  }
  .el-table__body-wrapper {
    width: auto
  }
</style>

<script>
  export default {
    data() {
      return {
        btns1: [],
        btns2: [],
        tableData: [],
        tableColumns1: [],
        tableColumns2: [],
        pageSizes: [1,2],           //每页显示个数选择器的选项设置
        pageSize: 1,                //每页显示条目数
        currentPage: 1,             //当前页数
        total: 2,                   //总条目数
        isCollapse: false,          
        dialogFormVisible: false,
        formData: []
      }
    },
    methods: {
      handleSizeChange(val) {
        
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      btnFn (e) {
        var arr = e.target.className.replace('el-button el-button--primary ', '')
        // console.log(arr)
        if (arr === 'new') {
          this.dialogFormVisible = true
        }
      },
      submitForm () {
        alert('submit')
      },
      resetForm () {
        console.log('reset')
      }
    },
    props: {
      btns1: {
        type: Array,
        require: true
      },
      btns2: {
        type: Array,
        require: true
      },
      tableData: {
        type: Array,
        require: true
      },
      tableColumns1: {
        type: Array,
        require: true
      },
      tableColumns2: {
        type: Array,
        require: true
      },
      formData: {
        type: Array,
        require: true
      },
      pageSizes: {
        type: Array,
        require: true
      },
      pageSize: {
        type: Number,
        require: true
      },
      currentPage: {
        type: Number,
        require: true
      },
      total: {
        type: Number,
        require: true
      }
    }
  }
</script>
