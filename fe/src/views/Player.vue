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
      <v-col>
        <v-card class="mx-auto" min-width="200" max-width="400">
          <v-card-title class="cardtitle">
            Player
          </v-card-title>
          <v-divider />
          <v-card-text>
            <!-- mode seletor -->
            <div class="itemWidth">
              <v-select
                v-model="mode"
                :items="playMode"
                label="Play Mode"
              ></v-select>
            </div>
            <div v-if="mode === 'File'">
              <div>
                <v-btn
                  @click="fileDialog=!fileDialog"
                >
                  Select File
                </v-btn>
              </div>
              <!-- file selet dialog -->
              <v-dialog
                v-model="fileDialog"
                max-width="600px"
              >
                <v-card>
                  <v-card-title>
                    Select File
                  </v-card-title>
                  <v-card-text>
                    <Files ref="files" :popup="true" :singleSelect="true" @getFile="getFile"></Files>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer />
                    <v-btn @click="ok" text>OK</v-btn>
                    <v-btn @click="fileDialog=!fileDialog" text>Cancel</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <!-- file selet dialog -->
              <v-dialog
                v-model="statusDialog"
              >
                <v-card>
                  <v-card-title>
                    Select Zones
                  </v-card-title>
                  <v-card-text>
                    <Status ref="files" :singleSelect="true" @getFile="getFile"></Status>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer />
                    <div class="d-flex justify-end">
                      <v-btn @click="ok" text>OK</v-btn>
                      <v-btn @click="statusDialog=!statusDialog" text>Cancel</v-btn>
                    </div>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <!-- file data -->
              <FilePlay></FilePlay>
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
import FilePlay from '../components/player/FilePlay'
import { player, mediainfo } from '../mixins/player'
import { dir } from '../mixins/files'

export default {
  mixins: [player, mediainfo, dir],
  components: { Status, Files, FilePlay },
  data () {
    return {
      tabs: null,
      stateWindow: true,
      fileDialog: false,
      statusDialog: false,
      mode: 'File',
      playMode: ['File', 'Playlist'],
      seletedFile: '',
      duration: '0'
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
    async getFile (files) {
      await this.$store.dispatch('player/updatePlayFile', files[0])
      const result = await this.getMediaInfo(this.curFile)
      console.log(result)
      this.$store.dispatch('player/updatePlayFileInfo', result)
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

.filename {
  font-size: 1.2rem;
  color: black;
}
</style>
