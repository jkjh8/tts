<template>
  <v-container>
    <v-row rows="2" class="mx-2 mb-2">
      <div class="mt-2">
        <h3>Player</h3>
      </div>
      <v-spacer />
      <div>
        <v-btn icon @click="stateWindow=!stateWindow">
          <v-icon>mdi-eye</v-icon>
        </v-btn>
        <v-btn icon @click="$refs.status.getZones()">
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
      </div>
    </v-row>
    <v-divider />
    <v-row rows="10">
      <v-col v-show="stateWindow">
        <Status ref="status"></Status>
      </v-col>
      <v-col>
        <v-card class="mx-auto" min-width="200" max-width="400">
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
              <div v-if="seletedFile.length > 0">
                {{ seletedFile[0].name }}
              </div>
              <v-tabs
                v-model="tabs"
                centered
                icons-and-text
              >
                <v-tab href="#tab-1">
                  Select File
                  <v-icon>mdi-file</v-icon>
                </v-tab>

                <v-tab href="#tab-2">
                  Select List
                  <v-icon>mdi-list-status</v-icon>
                </v-tab>
                <v-tabs-items v-model="tabs">
                  <v-tab-item value="tab-1">
                    <Upload :simple="false"></Upload>
                  </v-tab-item>
                  <v-tab-item value="tab-2">
                    <div>
                      <v-btn
                        @click="fileDialog=!fileDialog"
                      >
                        Select File
                      </v-btn>
                    </div>
                    <v-dialog
                      v-model="fileDialog"
                    >
                      <v-card>
                        <v-card-title>
                          Select File
                        </v-card-title>
                        <v-card-text>
                          <Files ref="files" :singleSelect="true" @getFile="getFile"></Files>
                        </v-card-text>
                        <v-card-actions>
                          <v-btn @click="ok" text>OK</v-btn>
                          <v-btn text>Cancel</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-tab-item>
                </v-tabs-items>
              </v-tabs>
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
import Status from '../components/Zones/Status'
import Files from '../components/Files/AudioFilesTable'
import Upload from '../components/upload'

export default {
  components: { Status, Files, Upload },
  data () {
    return {
      tabs: null,
      stateWindow: true,
      fileDialog: false,
      mode: 'File',
      playMode: ['File', 'Playlist'],
      seletedFile: ''
    }
  },
  mounted () {
    //
  },
  methods: {
    ok () {
      this.$refs.files.getFile()
      this.fileDialog = false
    },
    getFile (files) {
      console.log(files)
      this.seletedFile = files
    }
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

.border {
  border: 2px dashed orange;
}
.itemWidth {
  max-width: 300px;
  margin: auto;
}
</style>
