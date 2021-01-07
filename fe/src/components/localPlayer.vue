<template>
  <div class="text-center">
    <v-bottom-sheet
      v-model="sheet"
      inset
    >
      <v-card tile>
        <v-btn
          color="grey darken-4"
          class="v-btn-floating my-0"
          fab
          dark
          x-small
          absolute
          top
          right
          @click="close"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-slider
          :value="current"
          class="my-0 mx-0"
          :min="0"
          :max="max"
          height="3"
          thumb-label
          @change="changeTime"
          @mousedown="pause"
          @mouseup="play"
        >
          <template v-slot:thumb-label="{ value }">
            {{ times(value) }}
          </template>
        </v-slider>
          <v-list>
            <v-list-item v-if="fileInfo">
              <v-list-item-content class="d-flex d-inline">
                <v-list-item-title class="text-left ml-6">
                  <div v-if=fileInfo.Title>
                    {{ fileInfo.Title }}
                  </div>
                  <div v-else>
                    {{ file.name }}
                  </div>
                </v-list-item-title>
                <v-list-item-subtitle class="text-left ml-6">
                  {{ fileInfo.Director }}
                </v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-icon class="mr-6">
                <v-btn icon @click="playBtn">
                  <v-icon
                    v-if="status"
                    color="green darken-4"
                  >
                    mdi-pause
                  </v-icon>
                  <v-icon
                    v-else
                    color="primary"
                  >
                    mdi-play
                  </v-icon>
                </v-btn>
              </v-list-item-icon>
            </v-list-item>
          </v-list>
      </v-card>
    </v-bottom-sheet>
    <audio
      ref="audio"
      v-on:ended="ended()"
      @timeupdate="onTimeUpdate"
    >
      <source v-bind:src="source">
    </audio>
  </div>
</template>

<script>
import { dataFormat } from '../mixins/format'
import { mediainfo } from '../mixins/player'

export default {
  mixins: [dataFormat, mediainfo],
  data () {
    return {
      sheet: false,
      file: undefined,
      fileInfo: undefined,
      current: 0,
      max: '',
      source: '',
      status: false
    }
  },
  watch: {
    sheet: function (newVal) {
      if (!newVal) {
        this.$refs.audio.pause()
        this.status = false
      }
    }
  },
  methods: {
    async onSheet (file) {
      this.file = file
      this.fileInfo = await this.getMediaInfo(file)
      this.sheet = !this.sheet
      this.source = `http://${window.location.hostname}:3000/static/${file.relativepath}`
      await this.$refs.audio.load()
      this.max = this.fileInfo.Duration
      console.log(this.fileInfo)
    },
    playBtn () {
      if (this.status) {
        this.status = false
        this.$refs.audio.pause()
      } else {
        this.status = true
        this.$refs.audio.play()
      }
    },
    play () {
      if (this.status) {
        this.$refs.audio.play()
      }
    },
    pause () {
      this.$refs.audio.pause()
    },
    ended () {
      this.current = '0'
      this.status = false
    },
    onTimeUpdate () {
      this.current = this.$refs.audio.currentTime
    },
    close () {
      if (this.status) {
        this.status = false
        this.$refs.audio.pause()
      }
      this.sheet = false
    },
    changeTime (time) {
      this.$refs.audio.currentTime = time
    }
  }
}
</script>

<style>
.v-btn-floating {
  opacity: .6;
}
</style>
