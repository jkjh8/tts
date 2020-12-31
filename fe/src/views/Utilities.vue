<template>
  <v-container>
    <v-row rows="2" class="mx-2 mb-2">
      <div class="mt-2">
        <h3>Utilities</h3>
      </div>
      <v-spacer />
      <div>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              class="icon"
              color="gray"
              v-bind="attrs"
              v-on="on"
              @click="refresh"
            >
              mdi-refresh
            </v-icon>
          </template>
          <span>Refresh Data</span>
        </v-tooltip>
      </div>
    </v-row>
    <v-divider />
    <v-row rows="10">
      <v-col cols="6">
        <v-card>
          <v-card-title>
            Disk Space
          </v-card-title>
          <v-card-text>
            <v-progress-circular
              :rotate="360"
              :size="120"
              :width="15"
              :value="value"
            >
              <div>
                {{ value }} %
              </div>
            </v-progress-circular>
            <div class="mt-6">
              Disk Size : {{ bytes(size) }}
            </div>
            <div>
              Disk Free : {{ bytes(free) }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card>
          <v-card-title>
            Server Reboot
          </v-card-title>
          <v-card-text>
            <v-btn>Reboot</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { dataFormat } from '../mixins/format'

export default {
  mixins: [dataFormat],
  data () {
    return {
      free: '',
      size: ''
    }
  },
  computed: {
    value: function () {
      return Math.round(this.free / this.size * 100)
    }
  },
  methods: {
    refresh () {
      this.$axios.get('/api/status/checkdiskusage').then((res) => {
        this.free = res.data.diskSpace.free
        this.size = res.data.diskSpace.size
      })
    }
  },
  created () {
    this.refresh()
  }
}
</script>

<style>
div {
  padding: 10px, 5px, 10px, 5px;
}
.fontSmall {
  max-width: 80px;
  font-size: 0.7rem;
}
</style>
