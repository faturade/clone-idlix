import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTVDetails, getTVCredits, getSimilarTVShows, getTVEpisodes, getTVVideos } from '../Services/movieService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faPlay } from '@fortawesome/free-solid-svg-icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { faFacebook, faTwitter, faWhatsapp, faTelegram, faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';

const TVDetail = () => {
  const { id } = useParams();
  const [tvShow, setTVShow] = useState(null);
  const [error, setError] = useState(null);
  const [similarTVShows, setSimilarTVShows] = useState([]);
  const [cast, setCast] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [activeTab, setActiveTab] = useState('info');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [details, credits, similarShows, videos] = await Promise.all([
          getTVDetails(id),
          getTVCredits(id),
          getSimilarTVShows(id),
          getTVVideos(id),
        ]);

        setTVShow(details.data);
        setCast(credits.data.cast.slice(0, 5));
        setSimilarTVShows(similarShows.data.results);
        
        const trailerData = videos.data.results.find(video => video.type === 'Trailer');
        setTrailer(trailerData || null);
      } catch (error) {
        setError('Failed to fetch data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchEpisodes = async () => {
      if (tvShow) {
        try {
          const episodesData = await getTVEpisodes(tvShow.id, 1);
          setEpisodes(episodesData.episodes);
        } catch (error) {
          setError('Failed to fetch episodes.');
        }
      }
    };

    fetchEpisodes();
  }, [tvShow]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!tvShow) {
    return <p>TV Show not found.</p>;
  }

  const formattedFirstAirDate = new Date(tvShow.first_air_date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const genreList = tvShow.genres.map((genre) => genre.name).join(', ');
  const filledStars = Math.round(tvShow.vote_average / 2);
  const totalStars = 5; 

  const handleClick = (id) => {
    navigate(`/tv-detail/${id}`);
  };

  return (
    <div className="mt-8 p-8 bg-gray-800 rounded-lg">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/6">
          <img
            src={`https://image.tmdb.org/t/p/w300${tvShow.poster_path}`}
            alt={tvShow.name}
            className="rounded-lg"
          />
        </div>
        <div className="w-full md:w-3/4 flex flex-col justify-start mt-auto">
          <h1 className="text-3xl font-bold text-white">{tvShow.name}</h1>
          <div className="flex text-gray-200 text-md border-b-2 border-gray-600 mb-2">
            <p className="mr-2 text-xs">{formattedFirstAirDate}</p>
            <p className="text-xs">{genreList}</p>
          </div>
          <div className="flex items-center">
            <span className="bg-gray-300 p-2 text-2xl font-bold rounded-md text-gray-800 mr-2">
              {tvShow.vote_average.toFixed(1)}
            </span>
            {Array.from({ length: totalStars }, (_, index) => (
              <FontAwesomeIcon
                key={index}
                icon={faStar}
                className={`ml-1 cursor-pointer ${index < filledStars ? 'text-yellow-500' : 'text-gray-400'}`}
              />
            ))}
          </div>
          <div className="mt-2 border-t-2 border-gray-600">
            <p className="text-gray-200 text-md">{tvShow.overview}</p>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <div className='border-b-2 border-gray-600 border-t-2'>
          <div className="flex gap-4 py-3">
            {['info', 'cast', 'episodes', 'trailer'].map(tab => (
              <button
                key={tab}
                className={`px-4 py-1 font-semibold rounded-lg ${activeTab === tab ? 'bg-red-600 text-white' : 'bg-gray-600 text-gray-300'}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className='mt-4'>
          {activeTab === 'info' && (
            <div className="text-gray-200">
              <h2 className="text-xl font-semibold border-l-4 border-red-600 pl-2">Info</h2>
              <div className="mt-20 flex flex-col items-center justify-center">
                <h3 className="text-2xl font-semibold">What's your reaction?</h3>
                <div className="flex gap-2 mt-6">
                  {['😊', '😍', '😭', '😠', '😎', '😮', '😴'].map(emoji => (
                    <span key={emoji} className="text-4xl">{emoji}</span>
                  ))}
                </div>
                <div className="mt-6 flex flex-col items-center justify-center">
                    <div className="flex gap-2 mt-2">
                        <span className='border-2 px-3 py-1 cursor-pointer rounded-sm border-white'><FontAwesomeIcon icon={faFacebook} /> Facebook </span>
                        <span className='border-2 px-3 py-1 cursor-pointer rounded-sm border-white'><FontAwesomeIcon icon={faTwitter} /> Twitter </span>
                        <span className='border-2 px-3 py-1 cursor-pointer rounded-sm border-white'><FontAwesomeIcon icon={faWhatsapp} /> </span>
                        <span className='border-2 px-3 py-1 cursor-pointer rounded-sm border-white'><FontAwesomeIcon icon={faTelegram} /> </span>
                        <span className='border-2 px-3 py-1 cursor-pointer rounded-sm border-white'><FontAwesomeIcon icon={faFacebookMessenger} /> </span>
                    </div>
                  </div>
              </div>
            </div>
          )}

          {activeTab === 'cast' && (
            <div className="text-gray-200 mt-6">
              <h2 className="text-xl font-semibold border-l-4 border-red-600 pl-2">Cast</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-8">
                {cast.map(member => (
                  <div key={member.id} className="flex flex-col">
                    {member.profile_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w200${member.profile_path}`}
                        alt={member.name}
                        className="w-full h-auto object-cover rounded-lg mb-2"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-500 flex items-center justify-center rounded-lg mb-2">
                        <span className="text-gray-300">No Image</span>
                      </div>
                    )}
                    <h3 className="text-lg font-semibold">{member.name}</h3>
                    <p className="text-sm text-gray-400">{member.character}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'episodes' && (
            <div className="grid grid-cols-1 gap-4 mt-4">
              {episodes.map(episode => (
                <div key={episode.id} className="bg-gray-700 p-4 rounded-lg flex justify-between cursor-pointer hover:bg-gray-600">
                  <h4 className="text-gray-200 font-bold">{episode.name}</h4>
                  <span className="text-gray-300">{episode.air_date}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'trailer' && (
            <div className="mt-6">
              {trailer ? (
                <iframe
                  width="100%"
                  height="400"
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title={trailer.name}
                  frameBorder="0"
                  allowFullScreen
                />
              ) : (
                <p className="text-gray-400">No trailer available.</p>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="mt-8 border-t-2 border-gray-600">
        <div className="mt-8 border-l-4 border-red-600">
          <h2 className="text-xl font-semibold ml-2 text-gray-200">TV Show Terkait</h2>
        </div>
        <Swiper
            spaceBetween={14} 
            slidesPerView={8} 
            grabCursor={true}
            breakpoints={{
            640: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            },
            1024: {
                slidesPerView: 4,
            },
            1280: {
                slidesPerView: 6,
            },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 mt-8"
        >
            {similarTVShows.map((show) => (
            <SwiperSlide
                key={show.id}
                onClick={() => handleClick(show.id)}
                className="movie-item relative rounded-xl overflow-hidden cursor-pointer"
            >
                <div className='flex justify-center items-center'>
                  <img
                  src={`https://image.tmdb.org/t/p/w300${show.poster_path}`}
                  alt={show.name}
                  className="object-cover h-[260px] w-full rounded-xl"
                  />
                  <div className="absolute inset-0 flex justify-center items-center h-[260px] rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-70">
                    <div className="border-4 border-white rounded-full h-12 w-12 flex justify-center items-center">
                      <FontAwesomeIcon icon={faPlay} className="text-white text-lg" />
                    </div>
                    <div className="absolute bottom-0 right-0 text-white text-sm font-semibold bg-gray-100 rounded-br-xl bg-opacity-20 px-2 py-[2px] flex items-center space-x-1">
                      <FontAwesomeIcon icon={faStar} className="text-xs text-yellow-500" />
                      <span>{show.vote_average.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-md font-semibold text-white hover:text-red-600 mt-2">{show.name}</h3>
                </div>
            </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TVDetail;
