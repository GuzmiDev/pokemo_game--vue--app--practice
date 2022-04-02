<template>
  <h1 v-if="!pokemon">Espere por favor...</h1>
  <div v-else>
    <h1>¿Quién es este pokémon?</h1>
    <PokemonPicture :pokemonId="pokemon.id" :showPokemon="showPokemon" />
    <PokemonOptions :pokemons="pokmeonArr" @selection-pokemon="checkAnswer" />
  </div>
  <template v-if="showAnswer">
    <h2 class="fade-in">{{ message }}</h2>
    <button @click="newGame">Nuevo Juego</button>
  </template>
</template>

<script>
import PokemonPicture from "@/components/PokemonPicture.vue";
import PokemonOptions from "@/components/PokemonOptions.vue";

import getPokemonOptions from "@/helpers/getPokemonOptions";

export default {
  name: "PokemonPage",
  components: {
    PokemonPicture,
    PokemonOptions,
  },
  data() {
    return {
      pokmeonArr: [],
      pokemon: null,
      showPokemon: false,
      message: null,
      showAnswer: false,
    };
  },
  methods: {
    async mixPokemonArray() {
      this.pokmeonArr = await getPokemonOptions();
      const rndInt = Math.floor(Math.random() * 4);
      this.pokemon = this.pokmeonArr[rndInt];
    },
    checkAnswer(selectedId) {
      this.showPokemon = true;
      if (selectedId === this.pokemon.id) {
        this.message = `Correcto, ${this.pokemon.name}`;
      } else {
        this.message = `Oops, era ${this.pokemon.name}`;
      }
      this.showAnswer = true;
    },
    async newGame() {
      this.pokemon = null;
      this.showAnswer = false;
      (this.pokmeonArr = []), (this.showPokemon = false);
      await this.mixPokemonArray();
    },
  },
  mounted() {
    this.mixPokemonArray();
  },
};
</script>
