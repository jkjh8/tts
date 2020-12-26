<template>
  <v-container>
    <v-row rows="2" justify="center">
      <div class="ml-3 mt-1">
        <h3>Event Log</h3>
      </div>
      <v-spacer />
      <div>
        <v-text-field
          class="pb-3 pr-3"
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          dense
        />
      </div>
      <div class="mx-3 mt-1" v-if="user">
        <v-icon v-if="user.admin" @click="deleteLogs">mdi-delete</v-icon>
      </div>
    </v-row>
    <v-divider />
    <v-row rows="10">
      <Logs :search="search" />
    </v-row>
  </v-container>
</template>

<script>
import Logs from '../components/Logs'
import { logs } from '../mixins/logs'

export default {
  mixins: [logs],
  components: { Logs },
  data () {
    return {
      search: ''
    }
  },
  methods: {
    async deleteLogs () {
      const res = await this.$dialog.warning({
        text: 'Do you really want to delete?',
        title: 'Warning'
      })
      if (res) {
        console.log('delete logs')
      }
    }
  }
}
</script>

<style scoped>
div {
  justify-content: center;
}
v-row {
  max-width: 200px;
}
</style>
