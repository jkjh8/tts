import { mapState } from 'vuex'

export const files = {
  computed: {
    ...mapState({
      currentFolder: state => state.files.currentFolder,
      filelist: state => state.files.filelist
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
      }).catch((err) => {
        this.$dialog.message.error('Do not get file list! ' + err, {
          position: 'top'
        })
      })
    },
    deleteFiles (seleted) {
      this.$axios.post('/api/delfiles', { folder: this.getDir, files: seleted }).then((res) => {
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
