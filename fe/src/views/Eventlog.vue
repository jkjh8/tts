<template>
  <v-container>
    <v-row rows="2" class="mx-2">
      <div class="mt-2">
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
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              v-if="user.admin"
              class="icon"
              color="gray"
              v-bind="attrs"
              v-on="on"
              @click="deleteLogs"
            >
              mdi-delete
            </v-icon>
          </template>
          <span>Delete all logs</span>
        </v-tooltip>
      </div>
    </v-row>
    <v-divider />
    <v-row rows="10">
      <Logs :search="search" ref="logTable" />
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
    deleteLogs () {
      this.$refs.logTable.deleteLogs()
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
