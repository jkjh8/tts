<template>
  <v-container>
    <v-row rows="2">
      <div class="ml-3">
        <v-btn text @click="account = true">
          <h3>Account</h3>
        </v-btn>
      </div>
      <div>
        <v-btn v-if="user.admin" text @click="account = false">
          <h3>Users</h3>
        </v-btn>
      </div>
    </v-row>
    <v-divider />
    <v-row v-if="account" rows="10">
      <Card />
    </v-row>
    <v-row v-if="!account" rows="10">
      <Users />
    </v-row>
  </v-container>
</template>

<script>
import { user } from '../../mixins/user'
import Users from '../../components/Users/UserList'
import Card from '../../components/Users/AccountCard'

export default {
  mixins: [user],
  components: { Users, Card },
  wacth: {
    user () {
      if (user === null) {
        this.$router.push('/')
      }
    }
  },
  data () {
    return {
      account: true
    }
  }
}
</script>
