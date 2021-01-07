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
              <span v-if="item.isplay">
                <v-progress-circular
                  :rotate="-90"
                  :size="30"
                  :width="3"
                  :value="currentTime"
                  color="blue-grey"
                >
                  <v-icon  color="red darken-4" @click="preview(item)">mdi-pause</v-icon>
                </v-progress-circular>
              </span>
              <span v-else>
                <v-icon color="green darken-4" @click="preview(item)">mdi-play</v-icon>
              </span>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="text-left">
                <span>{{ item.name }}</span>
                <span style="color: gray; font-size: 0.7rem; margin-left: 10px;">
                  path/{{ item.dir }}
                </span>
              </v-list-item-title>
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
      <AddPlaylistItem @close="dialog=false"></AddPlaylistItem>
    </v-dialog>
    <Player ref="player"></Player>
  </v-container>
</template>

<script>
import { playlist } from '../../mixins/playlist'
import AddPlaylistItem from './AddPlaylistItem'
import Player from '../localPlayer'

export default {
  components: { AddPlaylistItem, Player },
  mixins: [playlist],
  data () {
    return {
      source: '',
      dialog: false
    }
  },
  methods: {
    preview (file) {
      this.$refs.player.onSheet(file)
    }
  }
}
</script>

<style>
.cardtitle {
  font-size: 1.1rem;
}
</style>
