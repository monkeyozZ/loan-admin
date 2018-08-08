<template>
  <div>
    <el-breadcrumb class="path">
      <span style="float:left">当前位置：</span>
      <el-breadcrumb-item>公告通知</el-breadcrumb-item>
      <el-breadcrumb-item>公告列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="notice-container">
      <div class="table-container">
        <el-table
          :data="tableData"
          border
          v-loading="loading"
          style="width: 100%">
          <el-table-column
            label="ID"
            width="80">
            <template slot-scope="scope">
              <span>{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="公告标题"
            >
            <template slot-scope="scope">
              <span>{{scope.row.title}}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="状态"
            width="80" >
            <template slot-scope="scope">
              <el-tag :type="scope.row.status | statusFilter">{{scope.row.status|transtatustotop}}</el-tag>
            </template>
          </el-table-column>

          <el-table-column
            label="时间"
            width="200">
            <template slot-scope="scope">
              <span>{{scope.row.date|trantime}}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="操作"
            width="200">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                circle
                @click="handleEdit(scope.row._id)"></el-button>
                <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                circle
                @click="handleDelete(scope.row._id)"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination-container" v-show="total">
          <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30,40]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
    <el-dialog title="编辑" width="70%" :visible.sync="dialogFormVisible">
      <insert :update="'update'" :id="id" @closeMonel="closeMonel"></insert>
    </el-dialog>
  </div>
</template>

<script>
import { transtatustotop, trantime, statusFilter } from '@/filters'
import insert from '@/views/notice/insert'
import noticeApi from '@/api/notice'
export default {
  filters: {
    transtatustotop,
    trantime,
    statusFilter
  },
  components: {
    insert
  },
  data () {
    return {
      loading: false,
      tableData: [],
      listQuery: {
        page: 1,
        limit: 10
      },
      id: '',
      total: null,
      dialogFormVisible: false
    }
  },
  methods: {
    getlist () {
      this.loading = true
      noticeApi.getlist().then((result) => {
        this.tableData = result.data.loanlist
        this.total = result.data.total
        this.loading = false
      }).catch((err) => {
        console.log(err)
      })
    },
    handleSizeChange (val) {
      this.listQuery.limit = val
      this.getlist()
    },
    handleCurrentChange (val) {
      this.listQuery.page = val
      this.getlist()
    },
    handleEdit (id) {
      this.id = id
      this.dialogFormVisible = true
      console.log(id)
    },
    handleDelete (id) {
      // console.log(id)
      this.$confirm('确定删除该记录吗？', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        noticeApi.delcount(id).then((res) => {
          if (res.data.status === 200) {
            this.$notify({
              title: '成功',
              message: res.data.message,
              type: 'success'
            })
            this.getlist()
          } else {
            this.$notify.error({
              title: '失败',
              message: res.data.message
            })
          }
        })
      })
    },
    closeMonel () {
      this.dialogFormVisible = false
      this.getlist()
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getlist()
    })
  },
  watch: {
    'dialogFormVisible': {
      handler () {
        if (this.dialogFormVisible === false) {
          this.id = ''
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.notice-container
  padding 15px 10px
  .el-pagination
    margin-top 30px
    padding-right 100px
    box-sizing border-box
    text-align right
</style>
