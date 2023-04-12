import React, { useContext, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import { Navigate, useNavigate } from 'react-router-dom';

const Home = () => {
  const [nameValue, setNameValue] = useState('');
  const [nameError, setNameError] = useState(null);
  const { user, saveUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const newNameValue = e.target.value;

    setNameValue(newNameValue);
    if (newNameValue === '') setNameError('Name is required');
    else if (!/^[A-Z][a-z]{3,}$/i.test(newNameValue))
      setNameError('Only letters and blanks are allowed the minimum must be 5 letters. ');
    else setNameError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nameError) {
      saveUser(nameValue);
    }
  };

  return (
    <div className=" w-screen h-screen bg-yellow-100 flex flex-col justify-center  ">
      <div className="flex flex-row justify-center">
        <img src="/public/Pokedex_img.png" alt="Pokedex" />
      </div>
      <div className="text-center">
        <h1 className="text-red-500  text-6xl font-bold ">Hello trainer</h1>
        <p>Type your name to start</p>
      </div>
      <form
        className="flex flex-row justify-center items-center mt-8 "
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="shadow-md border border-black py-2.5 m-2 "
          value={nameValue}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="btext-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center mr-5 mb-0 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900 "
        >
          Start
        </button>
      </form>
      {nameError && <p className="text-red-500 text-center">{nameError}</p>}
      {user && <Navigate to="/pokedex" replace />}
    </div>
  );
};

export default Home;
