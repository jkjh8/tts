<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="items"
      :search="search"
      hide-default-footer
    >
      <template v-slot:item.date="{ item }">
        {{ new Date(item.date).toLocaleString() }}
      </template>
    </v-data-table>
    <v-divider />
    <div class="text-center">
      <v-pagination
        v-model="page"
        :length="length"
        :total-visible="7"
        @input="changePage"
      />
    </div>
  </v-container>
</template>

<script>
import { logs } from '../mixins/logs'

export default {
  mixins: [logs],
  props: ['search'],
  data () {
    return {
      headers: [
        { text: 'Type', value: 'type' },
        { text: 'Priority', value: 'priority' },
        { text: 'Date', value: 'date' },
        { text: 'Source', value: 'source' },
        { text: 'E-Mail', value: 'email' },
        { text: 'Message', value: 'message' }
      ],
      items: [],
      length: 1,
      page: 1
    }
  },
  mounted () {
    this.changePage(this.page)
  }
}
</script>
