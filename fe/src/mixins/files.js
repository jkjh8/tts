import { mapState } from 'vuex'

export const dir = {
  computed: {
    ...mapState({
      currentFolder: state => state.files.currentFolder
    }),
    getDir: function () {
      if (this.currentFolder.length < 1) {
        return '/'
      }
      return this.currentFolder.join('/')
    }
  }
}

export const files = {
  computed: {
    ...mapState({
      currentFolder: state => state.files.currentFolder,
      filelist: state => state.files.filelist,
      loading: state => state.files.loading
    }),
    getDir: function () {
      return this.currentFolder.join('/')
    }
  },
  methods: {
    getFilelist () {
      this.$axios.post('/api/audiofiles', { folder: this.getDir }).then((res) => {
        const files = [
          ...res.data.folders,
          ...res.data.files
        ]
        this.$store.dispatch('files/updateFiles', files)
        this.$store.dispatch('files/changeLoadState', false)
        console.log(files)
      }).catch((err) => {
        this.$dialog.message.error('Do not get file list! ' + err, {
          position: 'top'
        })
      })
    },
    deleteFiles (seleted) {
      this.$axios.post('/api/delfiles', { files: seleted }).then((res) => {
        console.log(res)
        this.getFilelist()
      }).catch((err) => {
        this.$dialog.message.error('Do not delete files! ' + err, {
          position: 'top'
        })
      })
    }
  }
}
