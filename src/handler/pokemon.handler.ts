import axios from 'axios';

interface Ability {
  name: string;
  url: string;
};

interface Pokemon {
  id: number;
  name: string;
  baseExperience: number;
  abilities: [Ability];
};

class PokemonDto implements Pokemon {
  id: number;
  name: string;
  baseExperience: number;
  abilities: [Ability];
};

class PokemonApp {
  constructor() { };

  public async listAll() {

    const { data } = await axios.get<PokemonDto[]>(`https://pokeapi.co/api/v2/pokemon/`);

    return data;
  };

  public async get(id: number) {
    const pokemon = await axios.get<PokemonDto>(`https://pokeapi.co/api/v2/pokemon/${id}`);

    const pokeInfo: PokemonDto = {
      id: pokemon.data.id,
      name: pokemon.data.name,
      baseExperience: pokemon.data.baseExperience,
      abilities: pokemon.data.abilities
    };

    return pokeInfo
  };
};

export default PokemonApp;