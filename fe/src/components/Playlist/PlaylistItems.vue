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
        <div color="gray">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="gray"
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
        </div>
      </v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item
            v-for="(item, i) in playlistitems"
            :key="i"
          >
            <v-list-item-avatar>
              <v-icon color="red">mdi-play</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="text-left" v-text="item.name"></v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-icon>mdi-delete</v-icon>
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
      playlistItem: [],
      dialog: false,
      addPlaylistDialog: false
    }
  },
  created () {
    this.getPlaylistItems()
  },
  methods: {
    closeAddItemDialog () {
      this.dialog = false
    }
  }
}
</script>

<style>
.cardtitle {
  font-size: 1.1rem;
}
</style>
