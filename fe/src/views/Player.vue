<template>
  <v-container>
    <v-row rows="2" class="mx-2 mb-2">
      <div class="mt-2">
        <h3>Player</h3>
      </div>
    </v-row>
    <v-divider />
    <v-row align="center" rows="10">
      <v-col>
        <v-item-group multiple>
          <v-card>
            <v-card-title>
              Local Status
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col
                  v-for="n in 3"
                  :key="n"
                  cols="12"
                  md="4"
                >
                  <v-item v-slot="{ active, toggle }">
                    <v-card
                      :color="active ? 'primary' : ''"
                      class="d-flex align-center"
                      dark
                      height="100"
                      @click="toggle"
                    >
                      <v-scroll-y-transition>
                        <div
                          v-if="active"
                          class="display-3 flex-grow-1 text-center"
                        >
                          Active
                        </div>
                      </v-scroll-y-transition>
                    </v-card>
                  </v-item>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-item-group>
      </v-col>
      <v-col>
        <v-card>
          <v-card-title class="cardtitle">
            Player
          </v-card-title>
          <v-divider />
          <v-card-text>
            <div class="itemWidth">
              <v-select
                v-model="mode"
                :items="playMode"
                label="Play Mode"
              ></v-select>
            </div>
            <div v-if="mode === 'File'">
              File
            </div>
            <div v-else-if="mode === 'Playlist'">
              Playlist
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  data () {
    return {
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
.border {
  border: 2px dashed orange;
}
.itemWidth {
  max-width: 400px;
  margin: auto;
}
</style>
