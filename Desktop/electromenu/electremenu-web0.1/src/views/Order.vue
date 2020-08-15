<template>
  <div>
    <v-app-bar app color="black" dark>
      <v-toolbar-title>Orden</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-bell-ring</v-icon>
      </v-btn>
    </v-app-bar>
    <v-list two-line>
      <template v-for="(item, index) in order">
        <v-divider :key="index"></v-divider>
        <v-list-item :key="index">
          <v-list-item-icon>
            <v-icon color="black">mdi-numeric-{{item.quantity}}-circle</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title v-html="item.item.title"></v-list-item-title>
                <v-btn small text color="red">eliminar</v-btn>
          </v-list-item-content>
          <v-list-item-icon>
              <v-icon :color="item.active ? 'deep-purple accent-4' : 'grey'">mdi-check-box-outline</v-icon>
            </v-list-item-icon>
        </v-list-item>
      </template>
    </v-list>
    <v-divider></v-divider>
    <v-snackbar timeout="90000" app rounded color="black" v-model="snackbar">
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" >
            <v-icon>mdi-bell-ring</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <v-bottom-navigation app v-model="bottomNav" background-color="black">
      <v-btn value="recent">
        <span class="tab1">comidas</span>
        <v-icon color="white">mdi-silverware-fork-knife</v-icon>
      </v-btn>

      <v-btn value="favorites">
        <span class="tab2">bebidas</span>
        <v-icon color="white">mdi-cup-water</v-icon>
      </v-btn>

      <v-btn value="order">
        <span class="tab1">orden</span>
        <!-- <v-badge color="green" content="6"> -->
        <v-icon color="light-green accent-3">mdi-receipt</v-icon>
        <!-- </v-badge> -->
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script>
import { db } from "../db";
export default {
  data() {
    return {
        snackbar:true,
        text:"Llamar al meser@",
      order: null
    };
  },
  mounted() {
    db.collection("MESA-1")
      .get()
      .then(querySnapshot => {
        const documents = querySnapshot.docs.map(doc => doc.data());
        // eslint-disable-next-line no-console
        console.log("docs", documents);
        this.order = documents;
      });
  }
};
</script>

<style scoped>


</style>