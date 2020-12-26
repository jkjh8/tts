<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="items"
    >
      <template v-slot:item.admin="{ item }">
        <v-simple-checkbox
          v-model="item.admin"
          disabled
        />
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon small>mdi-pencil</v-icon>
        <v-icon small @click="delItem(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'E-Mail', value: 'email' },
        { text: 'Admin', value: 'admin' },
        { text: 'Action', value: 'action', sortable: false }
      ],
      items: []
    }
  },
  mounted () {
    this.$axios.get('/api/users/users').then((res) => {
      console.log(res.data)
      this.items = res.data
    })
  },
  methods: {
    delItem (id) {
      console.log(id)
    }
  }
}
</script>
