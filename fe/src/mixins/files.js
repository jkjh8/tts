import { mapState } from 'vuex'

export const files = {
  computed: {
    ...mapState({
      currentFolder: state => state.files.currentFolder
    })
  },
  methods: {
    //
  }
}
