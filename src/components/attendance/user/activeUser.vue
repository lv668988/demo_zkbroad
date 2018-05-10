<template>
  <div class="role">
      <!-- <p>{{roleMsg}}</p> -->
      <Table
       :btns1 = 'btns1'
       :btns2 = 'btns2' 
       :tableData = 'tableData' 
       :tableColumns2 = 'tableColumns2'
       :formData = 'formData'
       :pageSizes = 'pageSizes'
       :pageSize = 'pageSize'
       :currentPage = 'currentPage'
       :total = 'total'>
      </Table>
      
  </div>
</template>

<script>
import { mapActions,mapGetters } from 'vuex'
import Table from '../../../views/table/table'

export default {
  name: 'activeUser',
  data () {
    return {
      // roleMsg: '活跃用户'
    }
  },
  components: {
    Table
  },
  computed: {
    ...mapGetters('tableData',[
      "btns1",
      "btns2",
      "tableData",
      "tableColumns1",
      "tableColumns2",
      "formData",
      "pageSizes",
      "pageSize",
      "currentPage",
      "total"
    ])
  },
  methods: {
    ...mapActions('tableData',[
      "getJsonData"
    ]),
  },
  mounted () {
    this.getJsonData()
    // console.log(this.btns1)
    // console.log(this.btns2)
    // console.log(this.tableColumns1)
    // console.log(this.tableColumns2)
    // console.log(this.formData)
    console.log(this.pageSizes)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>