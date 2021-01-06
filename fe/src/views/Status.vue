<template>
  <v-container>
    <v-row rows="2" class="mx-2 mb-2">
      <div class="mt-2">
        <h3>Player</h3>
      </div>
      <v-spacer />
      <div>
        <v-btn icon @click="$refs.status.getZones()">
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
      </div>
    </v-row>
    <v-divider />
    <v-row rows="10">
      <v-col>
        <Status ref="status" :mode="true"></Status>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Status from '../components/Zones/Status'

export default {
  components: { Status },
  data () {
    return {
      stateWindow: true,
      mode: 'File',
      playMode: ['File', 'Playlist']
    }
  },
  mounted () {
    //
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
.statusWindow {
  font-size: 0.9vw;
  padding: 0 0 0 0;
  text-align: center;
}

</style>
