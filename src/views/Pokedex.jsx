import React, { useContext, useEffect, useState } from 'react';

import { UserContext } from '../contexts/UserContext';

import PokemonCard from '../components/PokemonCard';

import { usePagination } from '../hooks/usePagination';

import { Form, useLoaderData } from 'react-router-dom';

const Pokedex = () => {
  const { user } = useContext(UserContext);
  const { pokemons, types, name, type } = useLoaderData();
  const [pokemonName, setPokemonName] = useState(name ?? '');
  const [pokemonType, setPokemonType] = useState(type ?? '');

  const pokemonsPagination = usePagination(pokemons, 55);

  const handleNameChange = (e) => {
    setPokemonName(e.target.value);
  };
  const handleTypeChange = (e) => {
    setPokemonType(e.target.value);
  };
  useEffect(() => {
    setPokemonName(name);
  }, [name]);
  useEffect(() => {
    setPokemonType(type);
  }, [type]);

  return (
    <div className="w-full p-2 ">
      <p>
        <span className="text-red-500 font-semibold ">Bienvenido {user}, </span>
        here you can find your favorite pokemon
      </p>

      <div className="flex flex-wrap  gap-2">
        {pokemonsPagination.pages.map((page) => (
          <button
            key={page}
            onClick={() => pokemonsPagination.changePageTo(page)}
            className={pokemonsPagination.currentPage === page ? 'text-red-500' : ''}
          >
            {page}
          </button>
        ))}
      </div>
      <div>
        <Form className=" flex gap-3">
          <h3 className="text-red-500">Filter for search</h3>
          <div className="flex flex-row justify-between ">
            <div className="flex flex-row gap-3">
              <input
                type="text"
                name="pokemon_name"
                className="shadow-md border border-black"
                value={pokemonName}
                onChange={handleNameChange}
              />
              <select
                className="bg-blue-300"
                name="pokemon_type"
                value={pokemonType}
                onChange={handleTypeChange}
              >
                <option value="">All</option>
                {types.map((type) => (
                  <option key={type.url} value={type.name}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="bg-red-500 txt-white p-2 hover:bg-red-400 rounded"
            >
              Search
            </button>
          </div>
        </Form>
      </div>

      <section className="flex flex-row flex-wrap justify-between gap-5">
        {pokemonsPagination.listSlice.map((pokemon) => (
          <PokemonCard key={pokemon.url} pokemonData={pokemon} />
        ))}
      </section>
    </div>
  );
};

export default Pokedex;
