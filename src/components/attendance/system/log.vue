<template>
  <div class="role">
      <p>{{roleMsg}}</p>
   
  </div>
</template>

<script>
export default {
  name: 'log',
  data () {
    return {
      roleMsg: '日志管理'
    }
  }, mounted () {
      alert("日志管理")
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
