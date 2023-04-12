import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const getPokemonById = async (url) => {
  try {
    const res = await axios.get(url);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

const PokemonCard = ({ pokemonData }) => {
  const [pokemon, setPokemon] = useState(null);
  const navigate = useNavigate();

  const handleClickNavigate = () => {
    navigate(`/pokedex/${pokemon.id}`, { state: { pokemon } });
  };

  useEffect(() => {
    const loadPokemon = async () => {
      const pokemonInfo = await getPokemonById(pokemonData.url);

      setPokemon(pokemonInfo);
    };
    loadPokemon();
  }, []);

  return (
    <>
      {pokemon && (
        <article
          onClick={handleClickNavigate}
          className="card hover:cursor-pointer bg-yellow-100 m-3 p-5 flex flex-col items-center justify-center text-center sm:w-96 border-4 border-red-500 border-dashed shadow-lg"
          style={{ width: 420 }}
        >
          <header className="flex flex-row border border-white grid-item">
            <div className=" flex flex-col " style={{ width: 180 }}>
              <img
                className=""
                src={pokemon?.sprites.other['official-artwork'].front_default}
                alt={pokemon.name}
              />
            </div>
          </header>

          <section className="grid-item">
            <section className="bg-red-500">
              <h2 className="text-2xl font-semibold">{pokemon.name}</h2>

              <p>{pokemon.types[0].type.name}</p>

              <p>Tipo</p>
            </section>

            <section className="flex flex-col sm:flex-row gap-5 border border-black">
            <p><b>Speed: </b>{pokemon?.stats[5].base_stat}</p>
            </section>
          </section>
        </article>
      )}
    </>
  );
};

export default PokemonCard;
