import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { 
  getNowPlayingMovies, 
  getPopularMovies, 
  getTopRatedMovies, 
  getUpcomingMovies, 
  getTrendingMovies, 
  searchMovies 
} from '../Services/movieService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStar } from '@fortawesome/free-solid-svg-icons';

const MovieListComponent = ({ searchQuery }) => {
  const [movies, setMovies] = useState({
    nowPlaying: [],
    popular: [],
    topRated: [],
    upcoming: [],
    trending: [],
  });
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Tambahkan useNavigate

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const nowPlayingResponse = await getNowPlayingMovies();
        const popularResponse = await getPopularMovies();
        const topRatedResponse = await getTopRatedMovies();
        const upcomingResponse = await getUpcomingMovies();
        const trendingResponse = await getTrendingMovies();

        setMovies({
          nowPlaying: nowPlayingResponse.data.results,
          popular: popularResponse.data.results,
          topRated: topRatedResponse.data.results,
          upcoming: upcomingResponse.data.results,
          trending: trendingResponse.data.results,
        });
      } catch (error) {
        setError(error.message);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const allMovies = [
        ...movies.nowPlaying,
        ...movies.popular,
        ...movies.topRated,
        ...movies.upcoming,
        ...movies.trending,
      ];
      const filtered = allMovies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );

      if (filtered.length === 0) {
        const searchFromAPI = async () => {
          try {
            const searchResponse = await searchMovies(searchQuery);
            setFilteredMovies(searchResponse.data.results);
          } catch (error) {
            setError('Failed to fetch movies from API.');
          }
        };
        searchFromAPI();
      } else {
        setFilteredMovies(filtered);
      }
    } else {
      setFilteredMovies([]);
    }
  }, [searchQuery, movies]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  const renderMovies = (moviesToRender, title) => (
    <div className="mt-8 px-2">
      <div className='border-l-4 border-red-500'>
        <h2 className="text-xl font-bold mb-4 text-white ml-2">{title}</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
        {moviesToRender.map((movie) => (
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

  return (
    <div className="movie-list-container p-8 min-h-screen">
      {searchQuery && filteredMovies.length > 0 ? (
        renderMovies(filteredMovies, 'Search Results')
      ) : (
        <>
          {renderMovies(movies.trending, 'Trending Movies')}
          {renderMovies(movies.nowPlaying, 'Now Playing')}
          {renderMovies(movies.popular, 'Popular Movies')}
          {renderMovies(movies.topRated, 'Top Rated Movies')}
          {renderMovies(movies.upcoming, 'Upcoming Movies')}
        </>
      )}
    </div>
  );
};

export default MovieListComponent;
