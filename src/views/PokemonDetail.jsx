import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const getPokemonById = async (id) => {
  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

const PokemonDetail = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const [pokemon, setPokemon] = useState(null);
  useEffect(() => {
    const loadData = async () => {
      const pokemon = await getPokemonById(id);
      setPokemon(pokemon);
    };

    if (!state?.pokemon) loadData();
    else setPokemon(state.pokemon);
  }, []);
  return (
    <div className="bg-gray-100 items-center  border border-black " style={{}}>
      {pokemon && (
        <>
          <h1 className=" text-4xl font-bold text-center uppercase ">{pokemon.name} </h1>
          <div className="flex flex-row justify-center">
            <img
              className=""
              src={pokemon?.sprites.other['official-artwork'].front_default}
              alt={pokemon.name}
            />
          </div>
          <div className="text-center  text-4xl">
            <p className="">{pokemon.types[0]?.type.name}</p>
          </div>
          <div className="abilities flex flex-col justify-center items-center">
            <h2 className="text-red-500 uppercase p-5 ">Abilities</h2>
            <hr />
            <div className="flex flex-row gap-5 border border-green-400 text-2xl">
              <p>{pokemon?.abilities[0]?.ability.name}</p>
              <p>{pokemon?.abilities[1]?.ability.name}</p>
            </div>
          </div>
          <div className="flex justify-center">
            <ul className="flex-col text-2xl">
              {pokemon.stats.map((stat) => (
                <li key={stat.stat.name} className="flex flex-col">
                  <span className="text-red-500 uppercase">{stat.stat.name}</span>
                  <div className="flex items-center mt-1">
                    <div className="h-4 bg-gray-300 rounded-full flex-1">
                      <div
                        className={`h-full rounded-full ${
                          stat.base_stat >= 100 ? 'bg-green-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${stat.base_stat}%` }}
                      ></div>
                    </div>
                    <span className="ml-2">{stat.base_stat}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default PokemonDetail;
