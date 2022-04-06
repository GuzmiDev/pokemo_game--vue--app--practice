import { shallowMount } from "@vue/test-utils";
import PokemonOptions from "@/components/PokemonOptions";
import { pokemons } from "../mocks/pokoemons.mock";

describe("Pruebas en PokemonOptions", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(PokemonOptions, {
      props: {
        pokemons,
      },
    });
  });

  test("debe mostrarse correctamente", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("debe de mostrar las 4 opciones correctamente", () => {
    expect(wrapper.findAll("li").length).toBe(4);
    expect(wrapper.findAll("li").at(0).text()).toBe(pokemons[0].name);
    expect(wrapper.findAll("li").at(1).text()).toBe(pokemons[1].name);
    expect(wrapper.findAll("li").at(2).text()).toBe(pokemons[2].name);
    expect(wrapper.findAll("li").at(3).text()).toBe(pokemons[3].name);
  });

  test('debe de emitir "selection-pokemon" con sus respectivos parámetros al hacer click', () => {
    const [li1, li2, li3, li4] = wrapper.findAll("li");

    li1.trigger("click");
    li2.trigger("click");
    li3.trigger("click");
    li4.trigger("click");

    expect(wrapper.emitted("selection-pokemon").length).toBe(4);
    expect(wrapper.emitted("selection-pokemon").at(0)).toEqual([
      pokemons[0].id,
    ]);
    expect(wrapper.emitted("selection-pokemon").at(1)).toEqual([
      pokemons[1].id,
    ]);
    expect(wrapper.emitted("selection-pokemon").at(2)).toEqual([
      pokemons[2].id,
    ]);
    expect(wrapper.emitted("selection-pokemon").at(3)).toEqual([
      pokemons[3].id,
    ]);
  });
});
