<template>
  <v-container>
    <div class="d-flex flex-colume">
      <div class="px-6 pt-2 text-left">
        <span class="textsmall">
          Current Folder :
        </span>
        <span>
          <a class="underline pr-1" @click="folderHome">Home</a>
        </span>
        <span>
          <span v-for="(folderLink, i) in currentFolder" :key="i">
            <a @click="changeFolderLink(i)"> / <span class="underline">{{ folderLink }}</span></a>
          </span>
        </span>
      </div>
      <v-spacer />
      <div>
        <v-text-field
          class="pt-0 pb-3 pr-3 mt-0"
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          dense
        />
      </div>
    </div>
    <div>
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="filelist"
        :search="search"
        :loading="loading"
        :single-select="singleSelect"
        loading-text="Loading... Please wait"
        item-key="name"
        show-select
      >
        <template v-slot:item.name="{ item }">
          <div v-if="!item.isdir">
            <span v-if="item.isplay">
              <v-progress-circular
                :rotate="-90"
                :size="30"
                :width="3"
                :value="currentTime"
                color="blue-grey"
              >
                <v-icon  color="red darken-4" @click="preview(item.name, filelist)">mdi-pause</v-icon>
              </v-progress-circular>
            </span>
            <span v-else>
              <v-icon color="green darken-4" @click="preview(item.name, filelist)">mdi-play</v-icon>
            </span>
            <span>
              {{ item.name }}
            </span>
          </div>
          <div v-else>
            <v-btn class="pl-0" text  @click="changeFolder(item)">
              <v-icon class="pr-1" color="primary">mdi-folder</v-icon>
              <span class="underline">{{ item.name }}</span>
            </v-btn>
          </div>
        </template>
        <template v-slot:item.size="{ item }">
          {{ bytes(item.size) }}
        </template>
      </v-data-table>
    </div>
    <audio ref="audio" v-on:ended="audioend(filelist)" @timeupdate="onTimeUpdate">
      <source v-bind:src="source">
    </audio>
    <video-preview ref="video"></video-preview>
  </v-container>
</template>

<script>
import { audioMonitor } from '../../mixins/audioMonitor'
import { dataFormat } from '../../mixins/format'
import { playlist } from '../../mixins/playlist'
import { files } from '../../mixins/files'
import VideoPreview from '../VideoPreview'
import path from 'path'

export default {
  components: { VideoPreview },
  mixins: [audioMonitor, dataFormat, playlist, files, audioMonitor],
  props: {
    singleSelect: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      search: '',
      selected: [],
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Type', value: 'type' },
        { text: 'Size', value: 'size' }
      ],
      items: [],
      source: ''
    }
  },
  created () {
    this.getFilelist()
  },
  methods: {
    preview (idx, list) {
      if (typeof idx !== 'number') {
        idx = list.findIndex(i => i.name === idx)
      }
      if (list[idx].type === 'mp3' || list[idx].type === 'wav') {
        this.audioMon(idx, list)
      } else {
        this.$refs.video.play(path.join(this.dir, list[idx].name))
      }
    },
    async delete () {
      await this.deleteFiles(this.selected)
      this.resetSel()
    },
    resetSel () {
      this.selected = []
    },
    addPlaylist () {
      this.addPlaylistItems(this.selected)
    },
    changeFolder (folder) {
      const current = this.currentFolder
      current.push(folder.name)
      this.$store.dispatch('files/changeFolder', current)
      this.getFilelist()
    },
    changeFolderLink (idx) {
      let current = this.currentFolder
      current = current.slice(0, idx + 1)
      this.$store.dispatch('files/changeFolder', current)
      this.getFilelist()
    },
    folderHome () {
      this.$store.dispatch('files/changeFolder', [])
      this.getFilelist()
    },
    getFile () {
      this.$emit('getFile', this.selected)
    }
  }
}
</script>

<style scoped>
.underline {
  text-decoration: underline;
}
.textsmall {
  font-size: 0.8rem;
}
</style>
