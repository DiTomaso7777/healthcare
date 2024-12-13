import React, { useEffect, useState } from 'react';
import './loader.css';

const Loader: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="preloader">
      <div className="loading">
        <svg 
          version="1.2" 
          height="300" 
          width="600" 
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 600 300"
        >
          <path 
            id="pulsar" 
            stroke="rgba(59, 130, 246, 1)" 
            fill="none" 
            strokeWidth="2"
            strokeLinejoin="round" 
            d="M0,90L250,90Q257,60 262,87T267,95 270,88 273,92t6,35 7,-60T290,127 297,107s2,-11 10,-10 1,1 8,-10T319,95c6,4 8,-6 10,-17s2,10 9,11h210"
          />
        </svg>
      </div>
    </div>
  );
};

export default Loader;