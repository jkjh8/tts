<template>
  <v-container>
    <div class="px-6 text-left">
      <span v-for="(folderLink, i) in currentFolder" :key="i">
        <a class="pa-1 underline" @click="changeFolderLink(i)">{{ folderLink }}</a>
      </span>
    </div>
    <v-data-table
      class="pa-0"
      v-model="selected"
      :headers="headers"
      :items="items"
      :search="search"
      item-key="name"
      show-select
    >
      <template v-slot:item.name="{ item }" scops="props">
        <div v-if="!item.isdir">
          <v-icon v-if="item.isplay" color="red darken-4" @click="preview(item)">mdi-pause</v-icon>
          <v-icon v-else color="green darken-4" @click="preview(item)">mdi-play</v-icon>
          {{ item.name }}
        </div>
        <div v-else>
          <v-btn class="pl-0" text  @click="changeFolder(item)">
            <v-icon class="pr-1" color="primary">mdi-folder</v-icon>
            {{ item.name }}
          </v-btn>
        </div>
      </template>
      <template v-slot:item.size="{ item }">
        {{ bytes(item.size) }}
      </template>
    </v-data-table>
    <audio ref="audio" v-on:ended="audioend">
      <source v-bind:src="source">
    </audio>
  </v-container>
</template>

<script>
import { dataFormat } from '../mixins/format'
import { playlist } from '../mixins/playlist'
import { files } from '../mixins/files'

export default {
  mixins: [dataFormat, playlist, files],
  props: ['search'],
  data () {
    return {
      selected: [],
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Type', value: 'type' },
        { text: 'Size', value: 'size' }
      ],
      items: [],
      source: '',
      type: ''
    }
  },
  created () {
    this.getList()
  },
  methods: {
    preview (item) {
      const index = this.items.indexOf(item)
      if (this.items[index].isplay === false) {
        for (let i = 0; i < this.items.length; i++) {
          if (this.items[i].isplay) {
            this.items[i].isplay = false
          }
        }
        this.source = `http://${window.location.hostname}:3000/static/${item.name}`
        this.$refs.audio.load()
        this.$refs.audio.play()
        this.items[index].isplay = true
      } else {
        this.$refs.audio.pause()
        this.items[index].isplay = false
      }
    },
    audioend () {
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].isplay) {
          this.items[i].isplay = false
        }
      }
    },
    getList () {
      this.$axios.get('/api/audiofiles').then((res) => {
        this.items = [
          ...res.data.folders,
          ...res.data.files
        ]
      })
    },
    delete () {
      this.$axios.post('/api/delfiles/', this.selected).then((res) => {
        this.$axios.get('/api/audiofiles').then((res) => {
          this.items = res.data
        })
      })
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
      console.log(this.currentFolder)
    },
    changeFolderLink (idx) {
      let current = this.currentFolder
      current = current.slice(0, idx + 1)
      this.$store.dispatch('files/changeFolder', current)
      console.log(this.currentFolder)
    }
  }
}
</script>

<style scoped>
.underline {
  text-decoration: underline;
}
</style>
