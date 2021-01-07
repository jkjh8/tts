<template>
  <v-card>
    <v-card-title>
      <h3>Audio File List</h3>
    </v-card-title>
    <v-card-text>
      <FileList class="pa-0" :search="search" :popup="false" ref="filelist"></FileList>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn text @click="addListItem">OK</v-btn>
      <v-btn text @click="cancelAdd">Cancel</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import FileList from '../Files/AudioFilesTable'

export default {
  components: { FileList },
  data () {
    return {
      search: ''
    }
  },
  methods: {
    addListItem () {
      this.$emit('close')
      this.$refs.filelist.addPlaylist()
      this.$refs.filelist.resetSel()
    },
    cancelAdd () {
      this.$emit('close')
      this.$refs.filelist.resetSel()
    }
  }
}
</script>
