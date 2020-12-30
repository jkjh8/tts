<template>
  <v-card>
    <v-card-title>
      <h3>Audio File List</h3>
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
    </v-card-title>
    <v-card-text>
      <FileList class="pa-0" :search="search" ref="filelist"></FileList>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn @click="addListItem">OK</v-btn>
      <v-btn @click="cancelAdd">Cancel</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import FileList from '../AudioFilesTable'

export default {
  components: { FileList },
  data () {
    return {
      search: ''
    }
  },
  methods: {
    addListItem () {
      this.$emit('closeAddItemDialog')
      this.$refs.filelist.addPlaylist()
    },
    cancelAdd () {
      this.$emit('closeAddItemDialog')
      this.$refs.filelist.resetSel()
    }
  }
}
</script>
