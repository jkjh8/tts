<template>
  <v-dialog v-model="dialog" class="pa-0" max-width="800">
    <div width="100%">
      <v-responsive :aspect-ratio="16/9">
        <v-btn
          color="grey darken-4"
          class="v-btn-floating"
          fab
          dark
          small
          absolute
          top
          right
          @click="dialog=false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <video-player
          ref="videoPlayer"
          v-click-outside="pause"
          class="mx-auto"
          :options="source"

          @play="isPlaying=true"
          @pause="isPlaying=false"
        />
      </v-responsive>
    </div>
  </v-dialog>
</template>

<script>
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'

export default {
  components: {
    videoPlayer
  },
  data () {
    return {
      dialog: false,
      isPlaying: false,
      source: {
        width: '700',
        language: 'ko'
      }
    }
  },
  mounted () {
    this.resize()
    window.addEventListener('resize', this.resize, { passive: true })
  },
  beforeDestroy () {
    if (typeof window === 'undefined') return
    window.removeEventListener('resize', this.resize, { passive: true })
  },
  computed: {
    player () {
      return this.$refs.videoPlayer.player
    },
    videoWidth () {
      if (window.innerWidth > 800) {
        return 800
      } else {
        return window.innerWidth
      }
    }
  },
  methods: {
    play (file) {
      this.source = {
        width: this.videoWidth,
        language: 'ko',
        sources: [{
          type: 'video/mp4',
          src: `http://${window.location.hostname}:3000/static/${file}`
        }]
      }
      this.dialog = true
      this.player.play()
    },
    pause () {
      if (this.isPlaying === true) {
        this.player.pause()
      }
    },
    resize () {
      if (window.window.innerWidth < 900) {
        this.source.width = window.innerWidth
      } else {
        this.source.width = 800
      }
    }
  }
}
</script>

<style>
.v-btn-floating {
  bottom: 0;
  margin: 36px 0 0 0;
  opacity: .7;
}

</style>
