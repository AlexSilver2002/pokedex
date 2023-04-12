import { createBrowserRouter } from 'react-router-dom';
import Home from '../views/Home';
import Pokedex from '../views/Pokedex';
import PokemonDetail from '../views/PokemonDetail';
import PokedexLayout from '../components/PokedexLayout';
import ProtectedRoute from '../components/ProtectedRoute';
import { pokedexLoader } from './loaders/pokedexLoader';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/pokedex',
    element: (
      <ProtectedRoute>
        <PokedexLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: ':id',
        element: <PokemonDetail />,
      },
      {
        index: true,
        element: <Pokedex />,
        loader: pokedexLoader,
      },
    ],
  },
]);
