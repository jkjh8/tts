<template>
  <v-container class="pa-0">
    <v-card>
      <v-card-title>
        <h3>File Upload</h3>
        <v-spacer />
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              class="icon"
              color="gray"
              v-bind="attrs"
              v-on="on"
              @click="clearFile"
            >
              mdi-reload
            </v-icon>
          </template>
          <span>clear file list</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              class="icon"
              color="gray"
              v-bind="attrs"
              v-on="on"
              @click="$emit('close')"
            >
              mdi-window-close
            </v-icon>
          </template>
          <span>close dialog</span>
        </v-tooltip>
      </v-card-title>
      <v-card-text>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Name</th>
                <th class="text-left" width="100px">Size</th>
                <th>Status</th>
                <th class="text-center" width="50px">Delete</th>
              </tr>
            </thead>
            <tbody v-if="files.length > 0">
              <tr v-for="file in files" :key="file.id">
                <td class="text-left">{{ file.name }}</td>
                <td class="text-left">{{ bytes(file.size) }}</td>
                <td v-if="file.error">
                  <div>
                    <span style="color: red;">Error:</span>{{ file.error }}
                  </div>
                  <div>
                    <v-progress-linear
                      color="primary"
                      height="10"
                      :value="file.progress"
                      striped
                    />
                  </div>
                </td>
                <td v-else-if="file.success">
                  <div>
                    Success
                  </div>
                  <div>
                    <v-progress-linear
                      color="primary"
                      height="10"
                      :value="file.progress"
                      striped
                    />
                  </div>
                  </td>
                <td v-else-if="file.active">
                  <div>
                    Active
                  </div>
                  <div>
                    <v-progress-linear
                      color="primary"
                      height="10"
                      :value="file.progress"
                      striped
                    />
                  </div>
                </td>
                <td v-else-if="!!file.error">
                  <div>
                    <span style="color: red;">Error:</span>{{ file.error }}
                  </div>
                  <div>
                    <v-progress-linear
                      color="primary"
                      height="10"
                      :value="file.progress"
                      striped
                    />
                  </div>
                </td>
                <td v-else></td>
                <td><v-icon @click="deleteFile(file)">mdi-delete</v-icon></td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <file-upload
          v-model="files"
          :post-action="postAction"
          extensions="gif,jpg,jpeg,png,webp,wav,mp3,flac,mp4"
          accept="image/png,image/gif,image/jpeg,image/webp,audio/wav,audio/mp3,audio/flac,video/mp4"
          :multiple="true"
          :data="fileCustomData"
          :size="1024 * 1024 * 1024"
          :drop="true"
          :drop-directory="true"
          @input-filter="inputFilter"
          @input-file="inputFile"
          ref="upload"
        >
          <h1 v-if="files.length === 0" class="pa-6">Drag and drop or click</h1>
        </file-upload>
      </v-card-text>
      <v-card-actions>
        <v-btn class="primary mx-auto" v-if="!$refs.upload || !$refs.upload.active" @click.prevent="$refs.upload.active = true">
          Start Upload
        </v-btn>
        <v-btn class="danger mx-auto"  v-else @click.prevent="$refs.upload.active = false">
          Stop Upload
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import FileUpload from 'vue-upload-component'
import { dataFormat } from '../mixins/format'
import { files } from '../mixins/files'

export default {
  mixins: [dataFormat, files],
  components: { FileUpload },
  computed: {
    fileCustomData: function () {
      const curDir = this.currentFolder.join('/')
      return { folder: curDir }
    }
  },
  data () {
    return {
      postAction: `http://${window.location.hostname}:3000/api/uploadfiles`,
      files: []
    }
  },
  methods: {
    inputFilter (newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
          return prevent()
        }
        if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
          return prevent()
        }
      }
    },
    inputFile (newFile, oldFile) {
      if (newFile && !oldFile) {
        // add
        console.log('add', newFile)
      }
      if (newFile && oldFile) {
        // update
        console.log('update', newFile)
      }
      if (!newFile && oldFile) {
        // remove
        console.log('remove', oldFile)
      }
    },
    deleteFile (file) {
      this.$refs.upload.remove(file)
    },
    updateFile (files) {
      this.$refs.upload.add(files)
    },
    clearFile () {
      this.$refs.upload.clear()
    }
  }
}
</script>
