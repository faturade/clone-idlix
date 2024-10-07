import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Year = () => {
  const [year, setYear] = useState(new Date().getFullYear())
  const navigate = useNavigate();
  const handleYearClick = (yearOption) => {  
    navigate(`/year/${yearOption}`);
  };

  return (
    <div className='mt-16'>
      <div className='border-l-4 border-red-500 ml-10'>
        <h2 className="text-xl font-bold mb-4 text-white ml-2">Year</h2>
      </div>
      <div className="year-navigation p-6 flex justify-center mt-8">
        <div className='flex flex-wrap gap-4 max-w-7xl justify-center mx-auto'>
          {Array.from(new Array(50), (v, i) => new Date().getFullYear() - i).map((yearOption) => (
            <button key={yearOption} onClick={() => handleYearClick(yearOption)} className='text-xl text-white w-1/4 cursor-pointer bg-gray-700 p-3 text-center shadow-lg hover:bg-gray-600'>
              {yearOption}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Year;
