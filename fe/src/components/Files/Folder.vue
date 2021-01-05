<template>
  <v-container>
    <div class="containerbox">
      <v-col cols="8" class="d-flex justify-start">
        <span class="textsmall">
          Current Folder :
        </span>
        <span>
          <a class="underline pr-1" @click="folderHome">Home</a>
        </span>
        <span>
          <span v-for="(folderLink, i) in currentFolder" :key="i">
            <a @click="changeFolderLink(i)"> / <span class="underline">{{ folderLink }}</span></a>
          </span>
        </span>
      </v-col>
      <v-col class="d-flex justify-end" cols="4">
        <v-text-field
          class="pt-0 pb-3 pr-3 mt-0"
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          dense
        />
      </v-col>
    </div>
  </v-container>
</template>

<style>
.containerbox {
  height: 20px;
}
</style>
