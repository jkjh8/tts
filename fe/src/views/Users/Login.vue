<template>
  <v-container fill-height fluid>
    <div class="d-flex justify-center mx-auto">
      <v-card
        class="mx-auto"
        elevation="4"
        min-width="350px"
        min-height="300px"
      >
        <v-card-title class="title">
          Login
        </v-card-title>
        <v-card-text>
          <v-form
            class="mx-3"
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-row>
              <v-text-field
                label="E-Mail"
                v-model="email"
                :rules="emailRules"
                required
              />
            </v-row>
            <v-row>
              <v-text-field
                label="Password"
                v-model="password"
                :rules="passwordRules"
                :append-icon="isPwd ? 'mdi-eye-off' : 'mdi-eye'"
                :type="isPwd ? 'password' : 'text'"
                @click:append="isPwd = !isPwd"
              />
            </v-row>
            <v-row class="mt-3">
              <v-btn
                block
                :disabled="!valid"
                color="success"
                @click="submit"
              >
                Login
              </v-btn>
            </v-row>
            <v-row>
              <v-spacer />
              <v-btn text to="/register">
                Register
              </v-btn>
              <v-btn
                text
                to="/"
              >
                Cancel
              </v-btn>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </div>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      valid: false,
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 8) || 'more then 8 digit'
      ],
      isPwd: true
    }
  },
  methods: {
    async submit () {
      const confirm = await this.$refs.form.validate()
      if (confirm) {
        console.log(this.email, this.password)
      }
    }
  }
}
</script>

<style>
div {
  text-align: left;
}
.title {
  background: rgb(207, 207, 207);
}
</style>
