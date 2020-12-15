<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      clipped
      fixed
      app
    >
      <v-list subheader class="text-left">
        <v-subheader class="nav-font">MONITORING</v-subheader>
        <v-list-item @click="updateTime">
          <v-list-item-avatar>
            <v-icon>mdi-file-chart</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Status</v-list-item-title>
            <v-list-item-subtitle>play server status</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="updateTime">
          <v-list-item-avatar>
            <v-icon>mdi-format-list-bulleted-type</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Event Log</v-list-item-title>
            <v-list-item-subtitle>event log viewer</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-subheader>MANAGEMENT</v-subheader>

        <v-list-item @click="updateTime">
          <v-list-item-avatar>
            <v-icon>mdi-file</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Audio Files</v-list-item-title>
            <v-list-item-subtitle>audio files and playlist</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="updateTime">
          <v-list-item-avatar>
            <v-icon>mdi-play</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Text To Speech</v-list-item-title>
            <v-list-item-subtitle>text to speech player</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="updateTime">
          <v-list-item-avatar>
            <v-icon>mdi-calendar-month</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Scheduler</v-list-item-title>
            <v-list-item-subtitle>Scheduler for player</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-subheader>MANAGEMENT</v-subheader>

        <v-list-item @click="updateTime">
          <v-list-item-avatar>
            <v-icon>mdi-tools</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Utilities</v-list-item-title>
            <v-list-item-subtitle>utilities for player</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <v-row>
          <v-col class="ml-6 text-left" style="font-size: 0.7rem;">
            <div>
              Version 0.1.0
            </div>
            <div>
              Copyright @2020
            </div>
          </v-col>
          <v-col class="mx-0 px-0">
            <v-btn icon  @click="drawer=false">
              <v-icon>mdi-chevron-double-left</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </template>
    </v-navigation-drawer>

    <v-app-bar
      color="white"
      clipped-left
      dense
      app
    >
      <v-app-bar-nav-icon
        @click="drawer=!drawer"
      />
      <v-toolbar-title><h3>TTS</h3></v-toolbar-title>
      <v-spacer />
      <div id="clock">
        {{ date }}
      </div>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import moment from 'moment'
export default {
  name: 'app',
  data () {
    return {
      drawer: true,
      date: ''
    }
  },
  mounted () {
    moment.locale('ko')
    setInterval(this.updateTime, 1000)
  },
  methods: {
    updateTime () {
      this.date = moment(new Date()).format('YYYY MMMM Do, dddd, h:mm:ss a')
    }
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: normal;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#clock {
  font-size: 0.8rem;
}
</style>
