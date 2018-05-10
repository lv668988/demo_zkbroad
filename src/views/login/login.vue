<template>
  <div class="content has-text-centered">
    <h2 class="is-title is-bold">考勤管理系统</h2>

    <div class="columns is-vcentered">
      <div class="column is-6 is-offset-3">
        <div class="box">
          <div v-show="error" style="color:red; word-wrap:break-word;">{{ error }}</div>
          <form v-on:submit.prevent="login">           
            <p class="control">
              <label class="label">用户</label>
              <input v-model="data.body.username" class="input" type="text" placeholder="email@example.org">
            </p>           
            <p class="control">
              <label class="label">密码</label>
              <input v-model="data.body.password" class="input" type="password" placeholder="password">
            </p>

            <p class="control">
              <el-checkbox v-model="data.rememberMe" @change="onChangeRememberMe">记住我</el-checkbox>

            </p>

            <hr>
            <p class="control">
              <button type="submit" class="button is-primary">登录</button>
              <button class="button is-default">取消</button>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {

    data () {
      return {
        data: {
          body: {
            username: 'admin',
            password: 'admin'
          },
          rememberMe: false
        },
        error: null
      }
    },
    mounted () {
      if (localStorage.getItem('rememberMe') === 'true') {
        this.$set(this.data, 'rememberMe', true)
      }

      // Can set query parameter here for auth redirect or just do it silently in login redirect.
    },
    methods: {
      login () {
          this.$message('成功登录');
          this.$router.push({
            path: '/attendance/home'
            
          })
      },
      onChangeRememberMe(rememberMe){
        console.log(this.data.rememberMe);
      }
    }


  }
</script>

<style lang="less" scoped>
  .content {
    height: 300px;
    width: 500px;
    margin: 0 auto;
    margin-top:10%;
    background: gray
  }
  form {
    text-align: center
  }
  .is-title {
    text-transform: capitalize;
    height: 80px;
    line-height: 80px;
    padding-left: 20px
  }
</style>
