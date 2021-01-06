<template>
  <v-container>
    <v-item-group
      v-model="seleted"
      active-class="border"
      @change="btnClick"
      multiple
    >
      <v-card min-width="400">
        <v-card-title>
          Local Status
          <v-spacer />
          <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              class="icon"
              color="gray"
              v-bind="attrs"
              v-on="on"
              @click="seleted=[]"
            >
              mdi-refresh
            </v-icon>
          </template>
          <span>Reset selet zone</span>
        </v-tooltip>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col
              v-for="(zone, n) in zones"
              :key="n"
              class="pa-1 sw"
              width="100px"
              cols="3"
            >
              <v-item v-slot="{ active, toggle }">
                <v-card
                  :color="active ? 'blue-grey lighten-2' : 'white'"
                  @click="toggle"
                >
                  <v-card-title class="d-flex d-block sw">
                    <div class="mx-auto">
                      <span v-if="zone.status">
                        <v-icon color="red" size="16">mdi-cancel</v-icon>
                      </span>
                      <span>
                        {{ zone.name }}
                      </span>
                    </div>
                  </v-card-title>
                  <v-divider v-if="mode"/>
                  <v-card-text
                    class="d-flex d-block sw"
                    v-if="mode"
                  >
                    <div class="mx-auto">
                      <div v-if="zone.status === 0">
                        대기중
                      </div>
                    </div>
                  </v-card-text>
                </v-card>
              </v-item>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-item-group>
  </v-container>
</template>

<script>
export default {
  props: {
    mode: {
      type: Boolean,
      defalut: false
    }
  },
  data () {
    return {
      seleted: [],
      zones: []
    }
  },
  mounted () {
    this.getZones()
  },
  methods: {
    getZones () {
      this.$axios.get('/api/zones/getzones').then((res) => {
        console.log(res)
        this.zones = res.data
      })
    },
    btnClick (item) {
      console.log(this.seleted)
    }
  }
}
</script>

<style>
.sw {
  font-size: 0.9vw;
  padding: 0 0 0 0;
  text-align: center;
}
.border {
  border: 2px dashed orange;
}
</style>
