<template>
  <div>
   <v-app-bar
      app
      color="primary"
      dark
    >
     
    </v-app-bar>
    <v-bottom-navigation app v-model="bottomNav">
      <v-btn value="recent">
        <span>Recent</span>
        <v-icon>mdi-history</v-icon>
      </v-btn>

      <v-btn value="favorites">
        <span>Favorites</span>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn value="nearby">
        <span>Nearby</span>
        <v-icon>mdi-map-marker</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script>
export default {
  name: "Home",

  components: {},
  data() {
    return {
      bottomNav: "recent"
    };
  }

};
</script>
