import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faTv, faFolderOpen, faSearch } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearchInputChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <nav className="bg-gray-800 p-4 fixed top-0 w-full z-50 opacity-90 shadow-gray-900 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <div className="text-red-600 text-3xl font-bold">
            <Link to="/">ISGOOD</Link>
          </div>
          <div className="flex space-x-6">
            <Link to="/" className="text-gray-300 hover:text-red-500 flex items-center space-x-2">
              <FontAwesomeIcon icon={faFilm} />
              <span>Movies</span>
            </Link>
            <Link to="/tv-series" className="text-gray-300 hover:text-red-500 flex items-center space-x-2">
              <FontAwesomeIcon icon={faTv} />
              <span>TV Series</span>
            </Link>
            <Link to="/genre" className="text-gray-300 hover:text-red-500 flex items-center space-x-2">
              <FontAwesomeIcon icon={faFolderOpen} />
              <span>Genre</span>
            </Link>
            <Link to="/year" className="text-gray-300 hover:text-red-500 flex items-center space-x-2">
              <FontAwesomeIcon icon={faFolderOpen} />
              <span>Year</span>
            </Link>
          </div>
        </div>
        <div className="flex items-center bg-gray-700 px-3 py-2 rounded-md">
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={handleSearchInputChange}
            className="bg-gray-700 text-white focus:outline-none"
          />
          <FontAwesomeIcon icon={faSearch} className="text-white ml-2" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
