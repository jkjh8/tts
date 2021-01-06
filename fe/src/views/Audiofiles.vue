<template>
  <v-container>
    <v-row rows="2" class="mx-2">
      <div class="px-2">
        <h3>Audio Files</h3>
      </div>
      <v-spacer />
      <div color="gray" class="ml-3">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              class="icon"
              color="gray"
              v-bind="attrs"
              v-on="on"
              @click="createFolder"            >
              mdi-folder-plus
            </v-icon>
          </template>
          <span>Create Folder</span>
        </v-tooltip>
        <span>|</span>
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
    </v-row>
    <v-divider />
    <v-row rows="10">
      <Table ref="fileList" :singleSelect="false"></Table>
    </v-row>

    <v-dialog v-model="dialog" max-width="600px" persistent>
      <Upload ref="fileUpload" @close="closeUploadDialog" />
    </v-dialog>
  </v-container>
</template>

<script>
import { files } from '../mixins/files'
import Table from '../components/Files/AudioFilesTable'
import Upload from '../components/upload.vue'

export default {
  mixins: [files],
  components: { Table, Upload },
  data () {
    return {
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
      this.$store.dispatch('files/changeLoadState', true)
      this.getFilelist()
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
    },
    closeUploadDialog () {
      this.dialog = false
      this.$refs.fileList.getList()
    },
    async createFolder () {
      const res = await this.$dialog.prompt({
        title: 'Add Folder',
        text: 'new folder name',
        textField: {
          type: 'input'
        }
      })
      if (res) {
        const dir = `${this.getDir}/${res}`
        this.$axios.post('/api/createdir', { dir: dir }).then((res) => {
          console.log(res)
          this.getFilelist()
        }).catch((err) => {
          this.$dialog.message.error('Do not add folder! ' + err, {
            position: 'top'
          })
        })
      }
    }
  }
}
</script>

<style>
.icon {
  /* padding-top: 2px; */
  padding-bottom: 6px;
  padding-left: 5px;
  padding-right: 5px;
}
</style>
