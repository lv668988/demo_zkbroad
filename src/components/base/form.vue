<template>
  <div>
    <!-- <el-button type="text" @click="open('new')">新增</el-button>
    <el-button type="text" @click="open('edit')">编辑</el-button> -->
    <div v-if="display" class="dialogBox">
        <el-form 
            :model="form.formData" class="formBox" 
            label-width="100px" 
            :count="count()" 
            :style="formBoxStyle"
            status-icon
            ref="formData"
            :rules="form.rules">
            <!-- ref="form" :model="formData" -->
            <i class="el-icon-close close" @click="close"></i> 
            <div class="title" v-html="form.title"></div>
            <div class="setForm">
                <el-form-item 
                    v-for="item in form.formList"  
                    :class="form.formList.length >= 16 ? 'floatItem': '' "            
                    :label="item.label" 
                    :key="item.prop" 
                    :rules="item.rules" 
                    :prop="item.prop">            
                    <!-- text类型 -->
                    <el-input 
                        v-if="item.type =='text'"
                        v-model="form.formData[item.prop]" 
                        :disabled="item.prop==form.keyProp&&form.type=='edit'?true:false" 
                        auto-complete="off"
                        @change="onInput(item.value)"                                             
                        :placeholder="item.placeholder">           
                    </el-input>
                    <!-- password类型 -->
                    <el-input
                        v-if="item.type =='password'"
                        type="password" 
                        auto-complete="off"
                        v-model="form.formData[item.prop]">
                    </el-input>
                    <!-- select类型 -->
                    <el-select
                        v-if="item.type == 'select'"
                        v-model="form.formData[item.prop]"
                        :placeholder="item.placeholder">
                        <el-option :label="ele" :value="ele" v-for="(ele,index) in item.selectValue" :key="index">
                        </el-option>
                    </el-select>
                    <!-- checkbox类型 -->
                    <el-switch
                        v-if="item.type == 'switch'"
                        v-model="form.formData[item.prop]">
                    </el-switch>
                    <!-- checkbox group类型 -->
                    <el-checkbox-group 
                        v-if="item.type == 'checkbox'"
                        v-model="form.formData[item.prop]">
                        <el-checkbox :label="ele" v-for="(ele,index) in item.selectValue" :key="index" name="type">                           
                        </el-checkbox>
                    </el-checkbox-group>
                    <!-- radio类型 -->
                    <el-radio-group                       
                        v-if="item.type == 'radio'"
                        v-model="form.formData[item.prop]">
                        <el-radio :label="ele" v-for="(ele,index) in item.selectValue" :key="index"></el-radio>
                    </el-radio-group>
                    <!-- date日期类型 -->
                    <el-date-picker
                        v-if="item.type == 'date'"
                        v-model="form.formData[item.prop]"
                        type="date"
                        :placeholder="item.placeholder">
                    </el-date-picker>
                    <!-- datetime具体时间类型 -->
                    <el-date-picker
                        v-if="item.type == 'datetime'"
                        v-model="form.formData[item.prop]"
                        type="datetime"
                        :placeholder="item.placeholder"
                        default-time="12:00:00">
                    </el-date-picker>
                    <!-- daterange时间范围类型 -->
                    <el-date-picker
                        v-if="item.type == 'daterange'"
                        v-model="form.formData[item.prop]"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                    <!-- textarea -->
                    <el-input 
                        v-if="item.type == 'textarea'"
                        type="textarea" 
                        v-model="form.formData[item.prop]">
                    </el-input>
                    <!-- 连级选择 -->
                    <!-- <el-cascader
                        expand-trigger="hover"
                        :options="options"
                        v-model="selectedOptions2"
                        @change="handleChange">
                    </el-cascader> action="https://jsonplaceholder.typicode.com/posts/" -->
                    <!-- 上传 -->
                    <el-upload
                        v-if="item.type == 'file'"
                        class="avatar-uploader"
                        action="http://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :on-error="handerror"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
            </div>             
                
            <div class="commitForm">
                <el-form-item>
                    <el-button type="primary" @click="commitForm">{{form.btn1}}</el-button>
                    <el-button type="primary" @click="resetForm">{{form.btn2}}</el-button>
                </el-form-item>
            </div>
            
        </el-form>
    </div>
  </div>
</template>

<style scoped>
    .dialogBox {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 100;
        background:rgba(0,0,0,.5);
        display: flex;
        align-items: center;
        justify-content: center
    }
    .formBox {       
        position: relative;
        background: floralwhite;
        padding: 30px;
        padding-bottom: 20px;
    }
    .setForm {
        max-height: 350px;
        overflow-y: auto;
        margin-bottom: 40px;
    }
    .el-form-item__content .el-input__inner {
        width: 200px;
    }
    .el-input {
        width: auto
    }
    .el-input__prefix {
        text-align: right;
    }
    .el-form-item__content>.el-date-editor {
        width: 200px;
    }
    .el-checkbox-group .el-checkbox {
        margin: 0;
        margin-right: 30px;
    }
    .close {
        position: absolute;
        top: 15px;
        right: 15px;
        cursor: pointer;
    }
    .title {
        height: 60px;
        text-align: center;
        font-size: 22px
    }
    .floatItem{
        float: left;
        width: 300px
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    /* .avatar {
        width: 178px;
        height: 178px;
        display: block;
    } */
</style>

<script>
var formList = [
    { "label": "工号", "type": "text", "prop": "pin", "placeholder":"请输入工号", "isKey": true },
    { "label": "姓名", "type": "text", "prop": "name", "placeholder":"请输入姓名" },
    { "label": "出生日期", "type": "date", "prop": "birth", "placeholder":"请输入出生日期" },//, "value": 12  初始值
    { "label": "性别", "type": "radio", "prop": "sex", "selectValue":["男","女"] },
    { "label": "多选", "type": "checkbox", "prop": "checkbox", "selectValue":["复选框A","复选框B","复选框C"] },
    { "label": "职务", "type": "select", "prop": "select1", "selectValue":[1,2,3], "placeholder":"请选择" },
    { "label": "具体时间", "type": "datetime", "prop": "day", "placeholder":"请选择时间" },
    { "label": "时间范围", "type": "daterange", "prop": "days" },
    { "label": "是否启用", "type": "switch", "prop": "switch", "selectValue": [0,1] },
    { "label": "考勤类型", "type": "select", "prop": "select2", "selectValue":["aaa","bbb","ccc"], "placeholder":"请选择" },
    { "label": "上传照片", "type": "file", "prop": "file" },
    { "label": "备注信息", "type": "textarea", "prop": "message" },
    { "label": "登录密码", "type": "password", "prop": "pass", "placeholder":"请设置密码" },
    { "label": "确认密码", "type": "password", "prop": "checkPass", "placeholder":"请设置密码" },
]
var rulesData = {
    pin: [
        { required: true, message: '不能输入空白', trigger: 'blur' },
        { min: 3, max: 5, message: '长度在3到5个数字', trigger: 'blur' }
    ],
    name: [
        { required: true, message: '不能输入空白', trigger: 'blur' },
        { min: 3, max: 5, message: '长度在3到5个字符', trigger: 'blur' }
    ],
    sex: [
        { required: true, message: '请选择性别', trigger: 'change' }
    ],
    select1: [
        { required: true, message: '请选择职务', trigger: 'change' }
    ],
    pass: [
        { required: true, message: '不能输入空白', trigger: 'blur' },
        { min: 3, max: 5, message: '长度在3到5个数字', trigger: 'blur' }
    ],
    checkPass: [
        { required: true, message: '不能输入空白', trigger: 'blur' },
        { min: 3, max: 5, message: '长度在3到5个数字', trigger: 'blur' }
    ],
}
var initFormData = {
        pin: '',
        name: '111',
        birth: '',
        sex: '男',
        checkbox: [],
        select1: 'qqq',
        day: '',
        days: '',
        switch: false,
        select2: 'www',
        file: '',
        message: '',
        pass: '',
        checkPass: ''
    }
var editFormData = {
        pin: '111',
        name: '张三',
        birth: '2018-04-12',
        sex: '男',
        checkbox: ['复选框A'],
        select1: 1,
        day: '2018-04-01 12:00:00',
        days: '',
        switch: true,
        select2: "aaa",
        file: '',
        message: '多久啊收款打款',
        pass: '11111111111'
    }

export default {
    
    data() {
      return {
        formBoxStyle: {
            width: "400px"
        },
        imageUrl: '',
        display: false,

        form: {
            title: '',
            type: '',
            postUrl: "提交的地址，，post..",
            keyProp: 'pin',
            formData: {},
            formList: [],
            rules:{},
            btn1: '',
            btn2: ''
        },
        initForm: {},
        editForm: {},
      }
    },
    watch: {
        
    },
    methods: {
        count() {
            var formL = this.form.formList.length
            if( formL >= 16 ) {
                this.formBoxStyle.width = "700px"
            }          
        },
        onInput(value) {
            // console.log(value)
            // value.
        },
        open(type) {
            if (type == "new") {
                this.initForm = Object.assign({}, initFormData)
                this.form.formData = Object.assign({}, this.initForm)
                this.form.title = "新增"
                this.form.type = "add"
                this.form.btn1 = "立即创建"
                this.form.btn2 = "重置"
            } else if (type == "edit") {
                this.editForm = Object.assign({}, editFormData)
                this.form.formData = Object.assign({}, this.editForm)
                this.form.title = "编辑"
                this.form.type = "edit"
                this.form.btn1 = "修改"
                this.form.btn2 = "取消"
            }  
            this.form.rules = Object.assign({}, rulesData)                      
            this.display = true
        },
        close() {
            this.display = false
        },
        commitForm () {           
            console.log(this.form.formData)
            // this.display = false         
        },
        resetForm () {
            this.form.formData = Object.assign({}, this.initForm) 
            console.log(this.form.formData)         
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
            console.log(res)
        },
        handerror(err, file, fileList) {
            // this.imageUrl = URL.createObjectURL(file.raw);
            console.log(this.imageUrl)
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        // 格式化时间
        format (time, format){
            var t = new Date(time);
            var tf = function(i){return (i < 10 ? '0' : '') + i};
            return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
                switch(a){
                    case 'yyyy':
                        return tf(t.getFullYear());
                        break;
                    case 'MM':
                        return tf(t.getMonth() + 1);
                        break;
                    case 'mm':
                        return tf(t.getMinutes());
                        break;
                    case 'dd':
                        return tf(t.getDate());
                        break;
                    case 'HH':
                        return tf(t.getHours());
                        break;
                    case 'ss':
                        return tf(t.getSeconds());
                        break;
                }
            })
        }
    },
    created () {
        //加载数据的时候
        for (let c of formList) {
            this.form.formList.push(c);
            if (c.isKey == true) {
                this.form.keyProp = c.prop
            }
            this.form.formData[c.prop] = ''      
            // console.log(this.form.formData)    
            this.initForm[c.prop] = c.value ? c.value : ''            
        }
    },
    mounted () {
        console.log(this.$refs)
    }
}
</script>

