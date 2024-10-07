import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { getPopularTVShows, getAiringTodayTVShows, getTopRatedTVShows, getOnTheAirTVShows } from '../Services/movieService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStar } from '@fortawesome/free-solid-svg-icons';

const TvSeries = () => {
  const [tvShows, setTvShows] = useState([]);
  const [airingTodayShows, setAiringTodayShows] = useState([]);
  const [topRatedShows, setTopRatedShows] = useState([]);
  const [onTheAirShows, setOnTheAirShows] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTvShows = async () => {
      try {
        const popularResponse = await getPopularTVShows();
        const airingTodayResponse = await getAiringTodayTVShows();
        const topRatedResponse = await getTopRatedTVShows();
        const onTheAirResponse = await getOnTheAirTVShows();

        setTvShows(popularResponse.data.results);
        setAiringTodayShows(airingTodayResponse.data.results);
        setTopRatedShows(topRatedResponse.data.results);
        setOnTheAirShows(onTheAirResponse.data.results);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchTvShows();
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }

  const handleClick = (id) => {
    navigate(`/tv-detail/${id}`);
  };

  const renderTvShows = (tvShowsToRender, title) => (
    <div className="mt-8 px-2">
      <div className='border-l-4 border-red-500'>
        <h2 className="text-xl font-bold mb-4 text-white ml-2">{title}</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
        {tvShowsToRender.map((show) => (
          <div 
            key={show.id} 
            onClick={() => handleClick(show.id)} 
            className="movie-item relative rounded-xl overflow-hidden cursor-pointer">
            <div className="flex justify-center items-center">
              <img
                src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                alt={show.name}
                className="object-cover h-[272px] w-full rounded-xl"
              />
              <div className="absolute inset-0 flex justify-center items-center h-[272px] rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-70">
                <div className="border-4 border-white rounded-full h-12 w-12 flex justify-center items-center transform transition-transform duration-300 hover:scale-110">
                  <FontAwesomeIcon icon={faPlay} className="text-white ml-1 text-xl" />
                </div>
                <div className="absolute bottom-0 right-0 text-white text-sm font-semibold bg-gray-100 rounded-br-xl bg-opacity-20 px-2 py-[2px] flex items-center space-x-1">
                  <FontAwesomeIcon icon={faStar} className="text-xs text-yellow-500" />
                  <span>{show.vote_average.toFixed(1)}</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-md font-semibold text-white hover:text-red-600">{show.name}</h3>
              <p className="text-gray-400 text-sm">{new Date(show.first_air_date).getFullYear()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="tv-series-container p-8 min-h-screen">
      {renderTvShows(airingTodayShows, 'Airing Today')}
      {renderTvShows(onTheAirShows, 'On The Air')}
      {renderTvShows(tvShows, 'Popular TV Shows')}
      {renderTvShows(topRatedShows, 'Top Rated TV Shows')}
    </div>
  );
};

export default TvSeries;