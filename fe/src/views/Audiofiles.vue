<template>
  <v-container>
    <v-row rows="2" class="mx-2">
      <div class="pt-2">
        <h3>Audio Files</h3>
      </div>
      <div color="gray" class="ml-3">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              class="icon"
              color="gray"
              v-bind="attrs"
              v-on="on"
              @click="dialog=!dialog"
            >
              mdi-upload
            </v-icon>
          </template>
          <span>Upload Files</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              class="icon"
              color="gray"
              v-bind="attrs"
              v-on="on"
              @click="deleteFiles"
            >
              mdi-delete
            </v-icon>
          </template>
          <span>Delete Files</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              class="icon"
              color="gray"
              v-bind="attrs"
              v-on="on"
              @click="refrashList"
            >
              mdi-reload
            </v-icon>
          </template>
          <span>Refrash file list</span>
        </v-tooltip>
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
    </v-row>
    <v-divider />
    <v-row rows="10">
      <Table :search="search" ref="fileList"></Table>
    </v-row>

    <v-dialog v-model="dialog" max-width="600px" persistent>
      <Upload ref="fileUpload" @close="dialog=false" />
    </v-dialog>
  </v-container>
</template>

<script>
import Table from '../components/AudioFilesTable'
import Upload from '../components/upload.vue'

export default {
  components: { Table, Upload },
  data () {
    return {
      search: '',
      dialog: false
    }
  },
  watch: {
    dialog: function (newVal) {
      if (this.dialog === false) {
        this.$refs.fileUpload.clearFile()
      }
    }
  },
  methods: {
    refrashList () {
      this.$refs.fileList.getList()
      this.$dialog.message.info('Audio file list refrashed!', {
        position: 'bottom'
      })
    },
    async deleteFiles () {
      const result = await this.$dialog.warning({
        text: 'Do you really want to delete files?',
        title: 'Delete Files'
      })
      if (result) {
        this.$refs.fileList.delete()
      }
    }
  }
}
</script>

<style>
.icon {
  padding-top: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
</style>
