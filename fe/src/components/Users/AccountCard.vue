<template>
  <v-container>
    <v-card
      class="mx-auto"
      max-width="400"
    >
      <v-card-title>
        <h3>My Account</h3>
      </v-card-title>
      <v-card-text>
        <div class="mx-auto">
          <h2>{{ this.user.name }}</h2>
        </div>
        <div class="my-3">
          <strong>{{ this.user.email }}</strong>
        </div>
        <div v-if="user.admin" class="my-3">
          <strong>관리자</strong>
        </div>
        <div style="text-align: right;">
          <v-btn
            class="mx-1"
          >
            Change Password
          </v-btn>
          <v-btn
            class="mx-1"
            @click='logout'
          >
            LOGOUT
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { user } from '../../mixins/user'

export default {
  mixins: [user]
}
</script>

<style>
div {
  text-align: center;
}
</style>
