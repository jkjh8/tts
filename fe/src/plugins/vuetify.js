import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import { Ripple } from 'vuetify/lib/directives'

Vue.use(Vuetify)

export default new Vuetify({
  breakpoint: {
    mobileBreakpoint: 'xs'
  },
  directives: {
    Ripple
  }
})
