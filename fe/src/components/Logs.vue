<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="items"
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
export default {
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
      itemsPerPage: 10,
      items: [],
      length: 1,
      page: 1
    }
  },
  mounted () {
    this.changePage(this.page)
  },
  methods: {
    changePage (page) {
      this.$axios.get(`/api/log/logs?page=${page}&limit=${this.itemsPerPage}&search=${this.search}`).then((res) => {
        this.items = res.data.docs
        this.length = res.data.totalPages
      })
    },
    async deleteLogs () {
      const res = await this.$dialog.warning({
        text: 'Do you really want to delete?',
        title: 'Warning'
      })
      if (res) {
        this.$axios.get('/api/log/del').then((res) => {
          this.changePage(1)
        })
      }
    },
    searchLog () {
      console.log(this.search)
      this.$axios.get(`/api/log/logs?page=${this.page}&limit=${this.itemsPerPage}&search=${this.search}`).then((res) => {
        this.items = res.data.docs
        this.length = res.data.totalPages
      })
    }
  }
}
</script>
