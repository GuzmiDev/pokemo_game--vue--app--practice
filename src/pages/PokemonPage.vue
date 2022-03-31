<template>
  <h1>¿Quién es este pokémon?</h1>
  <PokemonPicture :pokemonId="386" :showPokemon="true" />
  <PokemonOptions :pokemons="pokmeonArr" />
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
    };
  },
  methods: {
    async mixPokemonArray() {
      this.pokmeonArr = await getPokemonOptions();
    },
  },
  mounted() {
    this.mixPokemonArray();
  },
};
</script>
