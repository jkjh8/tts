import { mapState } from 'vuex'

export const logs = {
  data () {
    return {
      itemsPerPage: 10
    }
  },
  computed: {
    ...mapState({
      user: state => state.users.user
    })
  },
  methods: {
    changePage (page) {
      this.$axios.get(`/api/log/logs/${page}/${this.itemsPerPage}`).then((res) => {
        this.items = res.data.docs
        this.length = res.data.totalPages
      })
    },
    deleteLogs () {
      this.$axios.get('/api/log/deletelogs').then((res) => {
        this.items = res.data.docs
        this.length = res.data.totalPages
      })
    }
  }
}
