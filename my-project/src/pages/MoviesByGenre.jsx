import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getMoviesByGenre } from '../Services/movieService'; // Import fungsi untuk mendapatkan film berdasarkan genre
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStar } from '@fortawesome/free-solid-svg-icons';

const MoviesByGenre = () => {
  const { id } = useParams(); // Ambil genre ID dari parameter URL
  const navigate = useNavigate(); // Navigasi ke halaman detail film
  const location = useLocation(); // Ambil state dari navigasi
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const genreName = location.state?.genreName || "Movies"; // Ambil nama genre atau gunakan default

  useEffect(() => {
    const fetchMoviesByGenre = async () => {
      try {
        const response = await getMoviesByGenre(id);
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching movies by genre:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMoviesByGenre();
  }, [id]);

  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  return (
    <div className="mt-20 px-10">
      <div className='border-l-4 border-red-500'>
        <h2 className="text-xl font-bold mb-4 text-white ml-2">{genreName}</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
        {movies.map((movie) => (
          <div 
            key={movie.id} 
            className="movie-item relative rounded-xl overflow-hidden cursor-pointer"
            onClick={() => navigate(`/movie/${movie.id}`)} // Navigasi saat film diklik
          >
            <div className="flex justify-center items-center">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="object-cover h-[291px] w-full rounded-xl"
              />
              <div className="absolute inset-0 flex justify-center items-center h-[291px] rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-70">
                <div className="border-4 border-white rounded-full h-12 w-12 flex justify-center items-center transform transition-transform duration-300 hover:scale-110">
                  <FontAwesomeIcon icon={faPlay} className="text-white ml-1 text-xl" />
                </div>
                <div className="absolute bottom-0 right-0 text-white text-sm font-semibold bg-gray-100 rounded-br-xl bg-opacity-20 px-2 py-[2px] flex items-center space-x-1">
                  <FontAwesomeIcon icon={faStar} className="text-xs text-yellow-500" />
                  <span>{movie.vote_average.toFixed(1)}</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-md font-semibold text-white hover:text-red-600">{movie.title}</h3>
              <p className="text-gray-400 text-sm">{new Date(movie.release_date).getFullYear()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviesByGenre;
