<template>
  <v-container class="pa-0">
    <v-card>
      <v-card-title>
        <h3>Add Playlist</h3>
      </v-card-title>
      <v-card-text>
        <div class="textfield mx-auto">
          <v-text-field
            v-model="addListNameField"
            append-icon="mdi-pencil-plus"
            label="Add Playlist Name"
            hide-details
            dense
            @keyup.enter="addList"
          />
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="addList">OK</v-btn>
        <v-btn text @click="close">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      addListNameField: ''
    }
  },
  methods: {
    addList () {
      this.$emit('addList', this.addListNameField)
      this.addListNameField = ''
    },
    close () {
      this.addListNameField = ''
      this.$emit('close')
    }
  }
}
</script>

<style>
.textfield {
  max-width: 300px;
  margin-top: 30px;
  margin-bottom: 10px;
}
</style>
