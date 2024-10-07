import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMovieGenres } from '../Services/movieService'; // Fungsi untuk fetch genres dari API

const Genres = () => {
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate(); // Hook untuk navigasi

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await getMovieGenres();
        setGenres(response.data.genres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, []);

  // Fungsi untuk handle klik genre dan navigasi ke halaman movie berdasarkan genre ID
  const handleGenreClick = (genreId, genreName) => {
    navigate(`/genre/${genreId}`, { state: { genreName } }); // Navigasi ke route genre dengan nama genre
  };

  return (
    <div className="mt-16">
      <div className='border-l-4 border-red-500 ml-10'>
        <h2 className="text-xl font-bold mb-4 text-white ml-2">Genres</h2>
      </div>
      <div className="p-6 flex justify-center mt-8">
        <ul className="flex flex-wrap gap-4 max-w-7xl justify-center mx-auto">
          {genres.map((genre) => (
            <li
              key={genre.id}
              onClick={() => handleGenreClick(genre.id, genre.name)} // Navigasi ketika genre diklik dengan nama genre
              className="text-xl text-white w-1/4 cursor-pointer bg-gray-700 p-3 text-center shadow-lg hover:bg-gray-600"
            >
              {genre.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Genres;
