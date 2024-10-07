import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import MovieListComponent from './pages/MovieComponent'; 
import TvSeries from './pages/TvSeries'; 
import YearComponent from './pages/Year'; 
import Genres from './pages/Genre';
import MovieDetail from './pages/MovieDetail';
import MoviesByGenre from './pages/MoviesByGenre'; 
import TvDetail from './pages/TvDetail';
import YearVideos from './pages/YearVideos';
import Footer from './components/Footer';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <Router>
      <Navbar onSearch={handleSearch} />
      <div className='py-8'>
        <Routes>
          <Route path="/" element={<MovieListComponent searchQuery={searchQuery} />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/tv-series" element={<TvSeries />} />
          <Route path="/genre" element={<Genres />} />
          <Route path="/year" element={<YearComponent />} />
          <Route path="/genre/:id" element={<MoviesByGenre />} />
          <Route path="/year/:year" element={<YearVideos />} />
          <Route path="/tv-detail/:id" element={<TvDetail />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
