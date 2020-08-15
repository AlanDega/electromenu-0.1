<template>
  <div>
    <v-app-bar app color="black" dark>
      <v-toolbar-title>Bebidas</v-toolbar-title>
      <v-spacer></v-spacer>

      <!-- <v-btn icon>
        <v-icon>mdi-bell-ring</v-icon>
      </v-btn>-->
    </v-app-bar>
    <v-tabs v-model="tab" color="black" background-color="transparent" fixed-tabs>
      <v-tab color="black" v-for="item in items" :key="item.tab">{{ item.tab }}</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in items" :key="item.tab">
        <!-- <v-card max-width="80%" class="mx-auto mt-9 mb-9">
          <v-list>
            <template v-for="(drink, index) in item.drinks">
              <v-divider v-if="drink.divider" :key="index"></v-divider>
              <v-list-item v-else :key="drink.title">
                <v-list-item-content>
                  <v-list-item-title v-html="drink.title"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </v-card>-->
        <!-- ---------------- cervezAS ----------------------- -->

        <template v-for="(drink, index) in item.drinks">
          <v-row justify="center" :key="index">
            <h3 class="mt-6 mb-4">{{drink.title}}</h3>
          </v-row>
          <v-row justify="center" :key="index">
            <template v-for="(item, index) in drink.items">
              <v-dialog v-model="dialog" width="500" :key="index">
                <template v-slot:activator="{ on, attrs }">
                  <v-card class="mt-4" width="80%" v-bind="attrs" v-on="on" :key="index">
                    <div class="d-flex flex-no-wrap justify-space-between">
                      <div>
                        <v-card-title class="headline" v-text="item.title"></v-card-title>

                        <v-card-subtitle v-text="item.description"></v-card-subtitle>
                        <v-card-subtitle v-text="'$' + item.price"></v-card-subtitle>
                      </div>
                      <v-avatar class="ma-3" size="125" tile>
                        <v-img :src="item.src"></v-img>
                      </v-avatar>
                    </div>
                  </v-card>
                </template>
                <v-card>
                  <v-img class="white--text align-end" height="200px" :src="item.src"></v-img>
                  <v-divider></v-divider>
                  <v-card-title v-text="item.title"></v-card-title>
                  <v-card-subtitle v-text="item.description"></v-card-subtitle>
                  <v-card-subtitle v-text="'$' + item.price"></v-card-subtitle>
                  <v-row justify="center" align="center">
                    <v-btn class="mr-8 mb-8" fab dark medium color="black" @click="quantity ++">
                      <v-icon dark>mdi-plus</v-icon>
                    </v-btn>
                    <h2 class="mb-8">{{quantity}}</h2>
                    <v-btn class="ml-8 mb-8" fab dark medium color="black" @click="quantity --">
                      <v-icon dark>mdi-minus</v-icon>
                    </v-btn>
                  </v-row>
                  <v-row justify="center" class="pb-3">
                    <v-btn class="mr-4" color="green" outlined @click="addItem(item)">
                      Agregar
                      <v-icon right dark>mdi-check-circle-outline</v-icon>
                    </v-btn>

                    <v-btn class="ml-4" color="red" outlined @click="dialog = false">
                      Cancelar
                      <v-icon right dark>mdi-close-circle-outline</v-icon>
                    </v-btn>
                  </v-row>
                </v-card>
              </v-dialog>
            </template>
          </v-row>
        </template>
      </v-tab-item>
    </v-tabs-items>
    <v-snackbar app rounded color="black" v-model="snackbar">
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
    <v-bottom-navigation app v-model="bottomNav" background-color="black">
      <v-btn value="recent" @click="$router.push('foods')">
        <span class="tab1">comidas</span>
        <v-icon color="white">mdi-silverware-fork-knife</v-icon>
      </v-btn>

      <v-btn value="favorites">
        <span class="tab2">bebidas</span>
        <v-icon color="blue">mdi-cup-water</v-icon>
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
      items: [
        {
          tab: "Alcoholicas",
          drinks: [
            {
              title: "Cervezas",
              items: [
                {
                  title: "Heineken",
                  description: "Super fria (355ml)",
                  price: 20,
                  src:
                    "https://res.cloudinary.com/walmart-labs/image/upload/w_960,dpr_auto,f_auto,q_auto:best/gr/images/product-images/img_large/00750104999936L.jpg"
                },
                {
                  title: "XXLager",
                  description:
                    "355 ml",
                  price: 20,
                  src:
                    "https://res.cloudinary.com/walmart-labs/image/upload/w_960,dpr_auto,f_auto,q_auto:best/gr/images/product-images/img_large/00750104991228L.jpg"
                },
                {
                  title: "Indio",
                  description:
                    "355 ml",
                  price: 20,
                  src:
                    "https://res.cloudinary.com/walmart-labs/image/upload/w_960,dpr_auto,f_auto,q_auto:best/gr/images/product-images/img_large/00750106169698L.jpg"
                },

              ]
            },
            { divider: true, inset: true },
            {
              title: "Cocteles",
              subtitle:
                "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.",
              items: [
                {
                  title: "Mojito",
                  description:
                    "Refrescante mojito",
                  price: 80,
                  src:
                    "https://t1.rg.ltmcdn.com/es/images/8/7/3/img_mojito_como_hacer_mojito_casero_en_10_minutos_59378_orig.jpg"
                },
                {
                  title: "Alisios",
                  description:
                    "Con frutas",
                  price: 80,
                  src:
                    "https://www.ecestaticos.com/image/clipping/4eb8656ff0afe661bfc8301b80bb3af5/los-nuevos-cocteles-que-deberias-probar-la-proxima-vez-que-salgas.jpg"
                },
                {
                  title: "Martini",
                  description:
                    "Apple martini",
                  price: 80,
                  src:
                    "https://www.superama.com.mx/views/micrositio/recetas/images/diadelasmadres/martini/Web_fotoreceta.jpg"
                },
              ]
            },
            { divider: true, inset: true },

           
          ]
        },
        {
          tab: "No alcoholicas",
          drinks: [
            {
              title: "Refrescos",
             items:[
             {
                  title: "Coca-cola",
                  description:
                    "De lata (355 ml)",
                  price: 30,
                  src:
                    "https://res.cloudinary.com/walmart-labs/image/upload/w_960,dpr_auto,f_auto,q_auto:best/gr/images/product-images/img_large/00750105532062L.jpg"
                },
             {
                  title: "Seven up",
                  description:
                    "500 ml",
                  price: 30,
                  src:
                    "https://res.cloudinary.com/walmart-labs/image/upload/w_960,dpr_auto,f_auto,q_auto:best/gr/images/product-images/img_large/00750103130508L.jpg"
                },
             {
                  title: "Peñafiel",
                  description:
                    "De naranja (355 ml)",
                  price: 30,
                  src:
                    "https://res.cloudinary.com/walmart-labs/image/upload/w_960,dpr_auto,f_auto,q_auto:best/gr/images/product-images/img_large/00750107383976L.jpg"
                },
             {
                  title: "Peñafiel",
                  description:
                    "Toronjada (355 ml)",
                  price: 30,
                  src:
                    "https://res.cloudinary.com/walmart-labs/image/upload/w_960,dpr_auto,f_auto,q_auto:best/gr/images/product-images/img_large/00750107384117L.jpg"
                },
             {
                  title: "Peñafiel",
                  description:
                    "Limonada (355 ml)",
                  price: 30,
                  src:
                    "https://res.cloudinary.com/walmart-labs/image/upload/w_960,dpr_auto,f_auto,q_auto:best/gr/images/product-images/img_large/00750107384033L.jpg"
                },
             ]
            },
            
          ]
        }
      ]
    };
  },

  created() {
    // eslint-disable-next-line no-console
    console.log(this.items[0].drinks[0]);
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
.tab1 {
  color: white;
}
.tab2 {
  color: blue;
}

.basil--text {
  color: #356859 !important;
}

.item-details-title {
  color: "black";
}
</style>