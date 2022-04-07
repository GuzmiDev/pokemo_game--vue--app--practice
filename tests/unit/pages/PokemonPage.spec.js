import { shallowMount, mount } from "@vue/test-utils";
import PokemonPage from "@/pages/PokemonPage";
import { pokemons } from "../mocks/pokoemons.mock";

describe("Pruebas en PokemonPage", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(PokemonPage);
  });

  test("debe mostrarse correctamente", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("debe de llamar mixPokemonArray al montar", () => {
    const mixPokemonArraySpy = jest.spyOn(
      PokemonPage.methods,
      "mixPokemonArray"
    );

    shallowMount(PokemonPage);

    expect(mixPokemonArraySpy).toHaveBeenCalled();
  });

  test("debe de mostrarse correctamente cuando cargan los pokemons", () => {
    const wrapper = shallowMount(PokemonPage, {
      data() {
        return {
          pokmeonArr: pokemons,
          pokemon: pokemons[0],
          showPokemon: false,
          showAnswer: false,
          message: null,
        };
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  test("debe de mostrar los componentes de PokemonPicture y PokemonOptions", () => {
    const wrapper = shallowMount(PokemonPage, {
      data() {
        return {
          pokmeonArr: pokemons,
          pokemon: pokemons[0],
          showPokemon: false,
          showAnswer: false,
          message: null,
        };
      },
    });

    const picture = wrapper.find("pokemon-picture-stub");
    const options = wrapper.find("pokemon-options-stub");

    expect(picture.exists()).toBeTruthy();
    expect(options.exists()).toBeTruthy();

    expect(picture.attributes("pokemonid")).toBe(pokemons[0].id.toString());
    expect(options.attributes("pokemons")).toBeTruthy();
  });

  test("pruebas con checkAnswer", async () => {
    const wrapper = shallowMount(PokemonPage, {
      data() {
        return {
          pokmeonArr: pokemons,
          pokemon: pokemons[0],
          showPokemon: false,
          showAnswer: false,
          message: null,
        };
      },
    });

    await wrapper.vm.checkAnswer(1);

    expect(wrapper.find("h2").exists()).toBeTruthy();
    expect(wrapper.vm.showPokemon).toBeTruthy();
    expect(wrapper.find("h2").text()).toBe(`Correcto, ${pokemons[0].name}`);

    await wrapper.vm.checkAnswer(4);
    expect(wrapper.find("h2").text()).toBe(`Oops, era ${pokemons[0].name}`);
  });
});
