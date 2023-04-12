import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const PokedexLayout = () => {
  const { removeUser } = useContext(UserContext);

  return (
    <div className="bg-gary-100 flex flex-col">
      <button className="bg-red-500 text-white " onClick={removeUser}>
        log out
      </button>
      <Outlet />
    </div>
  );
};

export default PokedexLayout;
