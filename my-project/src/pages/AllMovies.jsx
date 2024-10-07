import { useState, useEffect } from 'react';
import { getMovieGenres, getMoviesByGenre } from '../Services/movieService';

const AllMovies = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchGenres = async () => {
    try {
      const response = await getMovieGenres();
      setGenres(response.data.genres);
    } catch (err) {
      setError('Failed to load genres');
    }
  };

  const fetchMoviesByGenre = async (genreId) => {
    try {
      setLoading(true);
      const response = await getMoviesByGenre(genreId);
      setMovies(response.data.results);
      setLoading(false);
    } catch (err) {
      setError('Failed to load movies');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);
  const handleGenreChange = (e) => {
    const genreId = e.target.value;
    setSelectedGenre(genreId);
    fetchMoviesByGenre(genreId);
  };

  return (
    <div className='mt-16'>
      <h1>Movies by Genre</h1>
      {error && <p>{error}</p>}
      <select onChange={handleGenreChange} value={selectedGenre}>
        <option value="">Select Genre</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
      {loading ? (
        <p>Loading movies...</p>
      ) : (
        <div className="grid grid-cols-4 gap-4 mt-8">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="rounded-lg"/>
              <h2>{movie.title}</h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllMovies;
