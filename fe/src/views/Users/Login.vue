<template>
  <div class="d-flex justify-center mx-auto">
    <v-card
      class="mx-auto"
      elevation="4"
      min-width="300px"
      min-height="300px"
    >
      <v-card-title class="title">
        Login
      </v-card-title>
      <v-card-text>
        <v-text-field
          label="E-Mail"
        ></v-text-field>
        <v-text-field
          label="Password"
        ></v-text-field>
        <v-btn block>Login</v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<style>
div {
  text-align: left;
}
.title {
  background: rgb(207, 207, 207);
}
</style>
