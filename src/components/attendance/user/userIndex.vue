<template>
  <div>
    <router-view></router-view>
    
  </div>
</template>

<script>
export default {
  name: 'userIndex',
  data () {
    return {
      roleMsg: '用户管理'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
