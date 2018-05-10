<template>
  <div class="artic">
      <!-- <p>{{artic}}</p> -->
    <Form></Form>
  </div>
</template>

<script>
import Form from '../../base/form'
export default {
  name: 'article',
  data () {
    return {
      artic: '文章管理'
    }
  },
  components: {
    Form
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>