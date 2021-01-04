import { mapState } from 'vuex'

export const playlist = {
  computed: {
    ...mapState({
      playlistnames: state => state.playlist.playlistnames,
      playlistitems: state => state.playlist.playlistitems,
      currentPlaylist: state => state.playlist.currentPlaylist,
      currentDir: state => state.files.currentFolder
    }),
    dir: function () {
      return this.currentDir.join('/')
    }
  },
  methods: {
    getPlaylistNames () {
      this.$axios.get('/api/playlist/getplaylistname').then((res) => {
        return this.$store.dispatch('playlist/updatePlaylistNames', res.data)
      }).catch(err => { this.$dialog.message.error(`${err}`, { position: 'top' }) })
    },
    addPlaylistNames (item) {
      this.$axios.post('/api/playlist/addplaylistname', { name: item }).then(() => {
        this.getPlaylistNames()
      }).catch(err => { this.$dialog.message.error(`${err}`, { position: 'top' }) })
    },
    async delPlaylistNames (item) {
      const result = await this.$dialog.warning({ text: 'Do you really want to delete?', title: 'Delete' })
      if (result) {
        this.$axios.post('/api/playlist/delplaylistname', this.playlistnames[item]).then((res) => {
          console.log(res)
          this.getPlaylistNames()
          if (this.currentPlaylist + 1 < this.playlistnames.length) {
            this.getPlaylistItems(this.currentPlaylist + 1)
          } else {
            this.getPlaylistItems(this.currentPlaylist - 1)
          }
        }).catch(err => { this.$dialog.message.error(`${err}`, { position: 'top' }) })
      }
    },
    getPlaylistItems (current) {
      const currentPlaylistName = this.playlistnames[current].name
      if (currentPlaylistName) {
        this.$axios.get(`/api/playlist/getplaylistitems/${currentPlaylistName}`).then((res) => {
          this.$store.dispatch('playlist/updatePlaylistItems', res.data)
        })
      } else {
        this.$store.dispatch('playlist/updatePlaylistItems', [])
      }
    },
    addPlaylistItems (list) {
      for (let i = 0; i < list.length; i++) {
        list[i].dir = this.dir
        list[i].listname = this.playlistnames[this.currentPlaylist].name
      }
      this.$axios.post('/api/playlist/addplaylistitems', list).then((res) => {
        console.log(res)
        this.getPlaylistItems(this.currentPlaylist)
      })
    },
    async delPlaylistItems (idx) {
      const result = await this.$dialog.warning({ text: 'Do you really want to delete?', title: 'Delete' })
      if (result) {
        this.$axios.post('/api/playlist/delplaylistitem', this.playlistitems[idx]).then((res) => {
          console.log(res)
          this.getPlaylistItems(this.currentPlaylist)
        }).catch(err => { this.$dialog.message.error(`${err}`, { position: 'top' }) })
      }
    },
    async delAllPlaylistItems () {
      const result = await this.$dialog.warning({ text: 'Do you really want to delete?', title: 'Delete' })
      if (result) {
        this.$axios.post('/api/playlist/delallplaylistitem', this.playlistnames[this.currentPlaylist]).then((res) => {
          console.log(res)
          this.getPlaylistItems(this.currentPlaylist)
        }).catch(err => { this.$dialog.message.error(`${err}`, { position: 'top' }) })
      }
    },
    async selPlaylist (idx) {
      await this.$store.dispatch('playlist/updateCurrentPlaylist', idx)
      console.log(idx)
      this.getPlaylistItems(idx)
    }
  }
}
