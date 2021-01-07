<template>
  <div v-if="curFile">
    <div
      v-if="curFileInfo"
    >
      <div class="py-3 filename">
        <div v-if="curFileInfo.Title">
          {{ curFileInfo.Title }}
        </div>
        <div v-else>
          {{ curFile.name }}
        </div>
      </div>
      <div>
        Path : {{ curFile.dir }}
      </div>
    </div>
    <div>
      <span>
        <v-btn icon>
          <v-icon>mdi-play</v-icon>
        </v-btn>
      </span>
      <span>
        <v-progress-linear
          color="teal"
          buffer-value="0"
          value="20"
        >
        </v-progress-linear>
      </span>
    </div>
  </div>
</template>

<script>
import { player } from '../../mixins/player'

export default {
  mixins: [player]
}
</script>
