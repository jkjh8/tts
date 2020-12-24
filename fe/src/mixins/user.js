import { mapState } from 'vuex'

export const user = {
  computed: {
    ...mapState({
      user: state => state.users.user
    })
  },
  methods: {
    getUser () {
      this.$axios.get('api/users/login').then((res) => {
        if (res.data.user) {
          this.$store.dispatch('users/updateUser', res.data.user)
        } else {
          this.$store.dispatch('users/updateUser', null)
        }
      }).catch((err) => {
        this.$store.dispatch('user/updateUser', null)
        console.log(err.response)
      })
    },
    login (userInfo) {
      this.$axios.post('/api/users/login', userInfo).then((res) => {
        console.log(res)
        this.$store.dispatch('users/updateUser', res.data.user)
        this.$router.push('/')
      }).catch((err) => {
        this.$dialog.error({
          text: err.response.data.message,
          title: 'Error'
        })
      })
    },
    logout () {
      this.$axios.get('/api/users/logout').then((res) => {
        this.$store.dispatch('users/updateUser', res.data.user)
        this.$router.push('/')
        this.$dialog.notify.info('You are logged out')
      })
    }
  }
}
