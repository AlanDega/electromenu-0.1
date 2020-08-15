<template>
  <div>
    <v-app-bar app color="black" dark>
      <v-toolbar-title>Comidas</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <template v-for="(item, index) in foods">
      <v-row justify="center" :key="index">

        <h4 class="mt-6" :key="index">{{item.header}}</h4>
      </v-row>
      <v-row  justify="center" :key="index">
        <v-card v-for="(item2, index) in item.items"  class="mt-3" width="80%" :key="index">
          <div class="d-flex flex-no-wrap justify-space-between">
            <div  >
              <v-card-title class="headline" v-text="item2.title"></v-card-title>

              <v-card-subtitle v-text="item2.description"></v-card-subtitle>
            </div>
            <v-avatar class="ma-3" size="125" tile>
              <v-img :src="item2.src"></v-img>
            </v-avatar>
          </div>
        </v-card>
      </v-row>
    </template>

    <v-bottom-navigation app v-model="bottomNav" background-color="black">
      <v-btn value="recent" @click="$router.push('foods')">
        <span class="tab1">comidas</span>
        <v-icon color="blue">mdi-silverware-fork-knife</v-icon>
      </v-btn>

      <v-btn value="favorites" @click="$router.push('drinks')">
        <span class="tab2">bebidas</span>
        <v-icon color="white">mdi-cup-water</v-icon>
      </v-btn>

      <!-- <v-btn value="nearby">
        <span class="tab1">promos</span>
        <v-icon color="white">mdi-bullhorn</v-icon>
      </v-btn>-->
      <!-- <v-btn value="order" @click="$router.push('order')">
        <span class="tab1">orden</span>
        <v-badge color="green" content="6"> 
        <v-icon color="white">mdi-receipt</v-icon> 
         </v-badge>
      </v-btn> 
      -->
    </v-bottom-navigation>
  </div>
</template>

<script>
import { db } from "../db";
export default {
  data() {
    return {
      quantity: 0,
      snackbar: false,
      text: "Producto agregado exitosamente",
      dialog: false,
      tab: null,
      foods: [
        {
          header: "Botanas",
          items: [
            {
              title: "Nachos",
              description: "Nachos con queso para 2 personas",
              src: "https://okdiario.com/img/2018/02/27/nachos-con-queso.jpg"
            },
            {
              title: "Palomitas",
              description: "Palomitas recien hechas para 2 personas",
              src: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTSQgHH2PefK7mD2GJcViNGoS7C-xeF97Z1yA&usqp=CAU"
            },
            {
              title: "Papas",
              description: "Combinación de papas para 4 personas",
              src: "https://okdiario.com/img/recetas/2016/11/09/aperitivos-de-manzana-o-apple-chips.jpg"
            },
          ]
        },

        {
          header: "Alitas",
          items: [
            {
              title: "BBQ",
              description: "Alitas para 3 personas (10 piezas)",
              src: "https://i.imgur.com/9ibjeXO.jpg"
            },
            {
              title: "Mango",
              description: "Alitas para 3 personas (10 piezas)",
              src: "https://tastesbetterfromscratch.com/wp-content/uploads/2014/09/Baked-Chicken-Wings-3.jpg"
            },
            {
              title: "Tamarindo",
              description: "Alitas para 3 personas (10 piezas)",
              src: "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2012/3/30/0/0182146_hot-wings_s4x3.jpg.rend.hgtvcom.826.620.suffix/1382543453894.jpeg"
            },
          ]
        },
        {
          header: "Hamburguesas",
          items: [
            {
              title: "Arrachera",
              description: "Doble carne",
              src: "https://thedeliciousspoon.com/wp-content/uploads/2019/04/Best-Burger-Blog-Post-2-of-4.jpg"
            },
            {
              title: "Pollo Crunch",
              description: "Con piña y queso",
              src: "https://www.thespruceeats.com/thmb/m1EWqDVo7niZKWg29eEjcuhmIuA=/2000x2000/smart/filters:no_upscale()/Hamburger-Hot-Dog-58add5f03df78c345bdef6ff.jpg"
            },
            {
              title: "Especial",
              description: "Con champiñones",
              src: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRUJjG9iobWApfN02kKoIWsh7svjKpi_qfZXw&usqp=CAU"
            },
          ]
        },
      ]
    };
  },

  created() {
    // eslint-disable-next-line no-console
  },

  watch: {
    quantity() {
      // eslint-disable-next-line no-console
      console.log("quan", this.quantity);
    }
  },
  methods: {
    addItem(item) {
      db.collection("MESA-1")
        .add({
          item: item,
          quantity: this.quantity
        })
        .then(() => {
          this.dialog = false;
          this.snackbar = true;
        });
    }
  }
};
</script>

<style  scoped>
.tab2 {
  color: white;
}
.tab1 {
  color: blue;
}

.basil--text {
  color: #356859 !important;
}

.item-details-title {
  color: "black";
}
</style>