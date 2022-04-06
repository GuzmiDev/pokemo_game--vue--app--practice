import { shallowMount } from "@vue/test-utils";
import PokemonPicture from "@/components/PokemonPicture";

describe("Pruebas en PokemonPicture", () => {
  test("debe mostrarse correctamente", () => {
    const wrapper = shallowMount(PokemonPicture, {
      props: {
        pokemonId: 1,
        showPokemon: false,
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  test("debe de mostrar la imagen oculta y el pokemon 100", () => {
    const expectedUrl =
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/100.svg";

    const wrapper = shallowMount(PokemonPicture, {
      props: {
        pokemonId: 100,
        showPokemon: false,
      },
    });

    const [img1, img2] = wrapper.findAll("img");
    const url = img1.attributes("src");

    expect(img1.exists()).toBeTruthy();
    expect(img2).toBeUndefined();
    expect(img1.classes("hidden-pokemon")).toBeTruthy();
    expect(url).toBe(expectedUrl);
  });

  test("debe de mostrar el pokemon si showPokemon:true", () => {
    const wrapper = shallowMount(PokemonPicture, {
      props: {
        pokemonId: 100,
        showPokemon: true,
      },
    });

    const img1 = wrapper.find("img");

    expect(img1.exists()).toBeTruthy();
    expect(img1.classes("hidden-pokemon")).toBeFalsy();
    expect(img1.classes("fade-in")).toBeTruthy();
  });
});
