<template>
  <v-container class="pa-0">
    <v-card>
      <v-card-title v-if="simple">
        <h3>File Upload</h3>
        <v-spacer />
        <file-upload
          class="icon"
          v-model="files"
          :post-action="postAction"
          extensions="webp,wav,mp3,flac,mp4"
          accept="audio/wav,audio/mp3,audio/flac"
          :multiple="true"
          :data="uploadDir"
          :size="1024 * 1024 * 1024"
          :drop="true"
          :drop-directory="true"
          @input-filter="inputFilter"
          @input-file="inputFile"
          ref="upload"
        >
          <v-icon>mdi-upload</v-icon>
        </file-upload>
        <v-icon
          class="icon"
          color="gray"
          @click="clearFile"
        >
          mdi-reload
        </v-icon>
        <v-icon
          class="icon"
          color="gray"
          @click="$emit('close')"
        >
          mdi-window-close
        </v-icon>
      </v-card-title>
      <v-card-text>
        <v-simple-table v-if="simple" class="upload">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Name</th>
                <th class="text-left" width="100px">Size</th>
                <th>Status</th>
                <th class="text-center" width="50px">Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="!files.length">
                <td colspan="7">
                  <div class="text-center p-5">
                    <h4>Drop files anywhere to upload</h4>
                  </div>
                </td>
              </tr>
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
      </v-card-text>
      <v-card-actions>
        <v-btn class="primary mx-auto" v-if="!$refs.upload || !$refs.upload.active && !$refs.upload.uploaded" @click.prevent="$refs.upload.active = true">
          Start Upload
        </v-btn>
        <v-btn class="secondary mx-auto" v-else-if="$refs.upload || $refs.upload.uploaded" @click="$emit('close')">
          Close
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
  props: {
    simple: {
      type: Boolean,
      default: true
    }
  },
  mixins: [dataFormat, files],
  components: { FileUpload },
  computed: {
    uploadDir: function () {
      return { folder: this.getDir }
    }
  },
  watch: {
    uploaded: (newVal) => {
      console.log(newVal)
    }
  },
  data () {
    return {
      postAction: `http://${window.location.hostname}:3000/api/uploadfiles`,
      files: [],
      uploaded: false
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
      if (newFile && oldFile) {
        // update
        console.log('update', newFile)
        if (newFile.success !== oldFile.success) {
          this.getFilelist()
        }
        console.log('uploaded', this.$refs.upload.uploaded)
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
