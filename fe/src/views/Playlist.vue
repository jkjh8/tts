<template>
  <v-container>
    <v-row rows="2" class="mx-2">
      <div class="mt-2">
        <h3>Playlist</h3>
      </div>
    </v-row>
    <v-divider />
    <v-row rows="10">
      <v-col cols="4">
        <PlaylistNames></PlaylistNames>
      </v-col>

      <v-col cols="8">
        <PlaylistItems></PlaylistItems>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { playlist } from '../mixins/playlist'
import PlaylistNames from '../components/Playlist/PlaylistNames'
import PlaylistItems from '../components/Playlist/PlaylistItems'

export default {
  mixins: [playlist],
  components: { PlaylistNames, PlaylistItems },
  data () {
    return {
      //
    }
  },
  mounted () {
    this.$axios.get('/api/playlist/getplaylistname').then(async (res) => {
      await this.$store.dispatch('playlist/updatePlaylistNames', res.data)
      this.getPlaylistItems(this.currentPlaylist)
    })
  },
  methods: {
    //
  }
}
</script>

<style>
.cardtitle {
  font-size: 1.1rem;
}
.textfield {
  max-width: 300px;
  margin-top: 30px;
  margin-bottom: 10px;
}
.border {
  border: 2px dashed orange;
}
</style>
