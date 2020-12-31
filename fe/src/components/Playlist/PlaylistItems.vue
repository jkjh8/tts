<template>
  <v-container>
    <v-card>
      <v-card-title
        class="cardtitle"
        dense
      >
        <div>
          Playlist Items
        </div>
        <v-spacer />
        <div>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="blue-grey darken-4"
                icon
                v-bind="attrs"
                v-on="on"
                @click="dialog=!dialog"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <span>Add Playlist items</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="red darken-4"
                icon
                v-bind="attrs"
                v-on="on"
                @click="delAllPlaylistItems"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
            <span>Delete All Playlist items</span>
          </v-tooltip>
        </div>
      </v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item
            v-for="(item, i) in playlistitems"
            :key="i"
          >
            <v-list-item-avatar>
              <v-icon v-if="item.isplay" color="red darken-4" @click="preview(i)">mdi-pause</v-icon>
              <v-icon v-else color="green darken-4" @click="preview(i)">mdi-play</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="text-left" v-text="item.name"></v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-icon
                color="red darken-4"
                @click="delPlaylistItems(i)"
              >
                mdi-delete
              </v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
    <v-dialog v-model="dialog" max-width="800px">
      <AddPlaylistItem
        @closeAddItemDialog="closeAddItemDialog"
      ></AddPlaylistItem>
    </v-dialog>
    <audio ref="audio" v-on:ended="audioend">
      <source v-bind:src="source">
    </audio>
  </v-container>
</template>

<script>
import { playlist } from '../../mixins/playlist'
import AddPlaylistItem from './AddPlaylistItem'

export default {
  components: { AddPlaylistItem },
  mixins: [playlist],
  data () {
    return {
      source: '',
      dialog: false
    }
  },
  methods: {
    closeAddItemDialog () {
      this.dialog = false
    },
    preview (idx) {
      if (this.playlistitems[idx].isplay === false) {
        for (let i = 0; i < this.playlistitems.length; i++) {
          if (this.playlistitems[i].isplay) {
            this.playlistitems[i].isplay = false
          }
        }
        this.source = `http://${window.location.hostname}:3000/static/${this.playlistitems[idx].name}`
        this.$refs.audio.load()
        this.$refs.audio.play()
        this.playlistitems[idx].isplay = true
      } else {
        this.$refs.audio.pause()
        this.playlistitems[idx].isplay = false
      }
    },
    audioend () {
      for (let i = 0; i < this.playlistitems.length; i++) {
        if (this.playlistitems[i].isplay) {
          this.playlistitems[i].isplay = false
        }
      }
    }
  }
}
</script>

<style>
.cardtitle {
  font-size: 1.1rem;
}
</style>
