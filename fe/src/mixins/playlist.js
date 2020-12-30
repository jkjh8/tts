import { mapState } from 'vuex'

export const playlist = {
  computed: {
    ...mapState({
      playlistnames: state => state.playlist.playlistnames,
      playlistitems: state => state.playlist.playlistitems,
      currentPlaylist: state => state.playlist.currentPlaylist
    })
  },
  methods: {
    getPlaylistItems () {
      this.$axios.get(`/api/playlist/getplaylistitems/${this.playlistnames[this.currentPlaylist].name}`).then((res) => {
        this.$store.dispatch('playlist/updatePlaylistItems', res.data)
      })
    },
    addPlaylistItems (list) {
      for (let i = 0; i < list.length; i++) {
        list[i].listname = this.playlistnames[this.currentPlaylist].name
      }
      console.log(list)
      this.$axios.post('/api/playlist/addplaylistitems', list).then((res) => {
        console.log(res)
        this.getPlaylistItems()
      })
    }
  }
}
