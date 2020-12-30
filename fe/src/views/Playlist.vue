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
import PlaylistNames from '../components/Playlist/PlaylistNames'
import PlaylistItems from '../components/Playlist/PlaylistItems'

export default {
  components: { PlaylistNames, PlaylistItems },
  data () {
    return {
      //
    }
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
