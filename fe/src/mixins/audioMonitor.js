import path from 'path'

export const audioMonitor = {
  data () {
    return {
      currentTime: 0
    }
  },
  methods: {
    audioMon (idx, list) {
      let file
      if (list[idx].dir) {
        file = path.join(list[idx].dir, list[idx].name)
      } else {
        file = path.join(this.dir, list[idx].name)
      }
      if (list[idx].isplay === false) {
        for (let i = 0; i < list.length; i++) {
          if (list[i].isplay) {
            list[i].isplay = false
          }
        }
        this.source = `http://${window.location.hostname}:3000/static/${file}`
        this.$refs.audio.load()
        this.$refs.audio.play()
        list[idx].isplay = true
      } else {
        this.$refs.audio.pause()
        this.audioend(list)
      }
    },
    audioend (list) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].isplay) {
          list[i].isplay = false
        }
      }
    },
    onTimeUpdate () {
      this.currentTime = Math.round(this.$refs.audio.currentTime / this.$refs.audio.duration * 100)
    }
  }
}
