<template>
  <div>
    <video
      width="100%"
      src="https://res.cloudinary.com/dalnnaod7/video/upload/v1591040888/landingpage_yanfia.mov"
      autoplay
      mute
    />
    <v-row justify="center">
        <h2 class="mt-2">¡Bienvenidx!</h2>
    </v-row>
    <v-row justify="center">
        <p class="mt-2">¿Qué te gustaría ordenar?</p>
    </v-row>
    <v-row justify="center" >
      <v-menu transition="slide-x-transition" bottom right>
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="black mt-12 mb-12" color="black" dark v-bind="attrs" v-on="on">Ver Bebidas</v-btn>
        </template>

        <v-list>
          <v-list-item @click="$router.push('drinks')" v-for="(bebida, i) in bebidas" :key="i">
            <v-list-item-title >{{ bebida.title }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-row>
    <v-row justify="center">
      <v-menu transition="slide-x-transition" bottom right>
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="black mt-9 mb-9" color="black" dark v-bind="attrs" v-on="on">Ver Comidas</v-btn>
        </template>

        <v-list>
          <v-list-item v-for="(comida, i) in comidas" :key="i">
            <v-list-item-title>{{ comida.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-row>
    <!-- <v-row justify="center">
        <v-btn dark class="black mt-12">Ver promociones</v-btn>
    </v-row> -->
   
  </div>
</template>

<script>
export default {
  data: () => ({
    comidas: [{ title: "Menú principal" }, { title: "Postres" }],
    bebidas: [{ title: "Alcoholicas" }, { title: "No Alcoholicas" }]
  })
};
</script>

<style lang="scss" scoped>
</style>