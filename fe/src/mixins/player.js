import { mapState } from 'vuex'

export const player = {
  computed: {
    ...mapState({
      curFile: state => state.player.curFile,
      curFileInfo: state => state.player.curFileInfo,
      curDuration: state => state.player.curDuration,
      curPlayTime: state => state.player.curPlayTime
    })
  }
}

export const mediainfo = {
  methods: {
    async getMediaInfo (file) {
      const result = await this.$axios.post('api/getmediainfo', {
        path: file.path
      })
      return result.data.file
    }
  }
}
