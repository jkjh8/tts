<template>
  <v-container>
    <v-card class="pa-0">
      <v-card-title
        class="cardtitle"
        dense
      >
        <div>
          Playlist
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
            <span>Add Playlist</span>
          </v-tooltip>
        </div>
      </v-card-title>
      <v-card-text class="pa-0">
        <v-list >
          <v-list-item-group
            v-model="model"
            active-class="border"
            mandatory
            color="blue-grey darken-4"
          >
            <v-list-item
              v-for="(item, i) in playlistnames"
              :key="i"
              @click="selPlaylist(i)"
            >
              <v-list-item-content>
                <v-list-item-title class="text-left">
                  {{ i+1 }}. {{ item.name }}
                </v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                  <v-icon
                    color="red darken-4"
                    small
                    @click="deleteList(i)"
                  >
                    mdi-delete
                  </v-icon>
                </v-list-item-action>
            </v-list-item>

          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
    <v-dialog v-model="dialog" max-width="400px">
      <AddPlaylistName
        @addList="addList"
        @close="close"
      ></AddPlaylistName>
    </v-dialog>
  </v-container>
</template>

<script>
import { playlist } from '../../mixins/playlist'
import AddPlaylistName from './AddPlaylistName'

export default {
  mixins: [playlist],
  components: { AddPlaylistName },
  data () {
    return {
      model: 0,
      search: '',
      dialog: false
    }
  },
  methods: {
    getList () {
      this.getPlaylistNames()
    },
    addList (item) {
      this.addPlaylistNames(item)
      this.close()
    },
    close () {
      this.dialog = false
    },
    deleteList (item) {
      this.delPlaylistNames(item)
    }
  }
}
</script>

<style>
.cardtitle {
  font-size: 1.1rem;
}
.border {
  border: 2px dashed orange;
}
</style>
