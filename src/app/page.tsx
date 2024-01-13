'use client'
import React, { useEffect, useState } from 'react';
import TubeLinesTable from './components/TubeLinesTable';
import { getTubeLines, getDetailedTubeLine, TubeLine, DetailedTubeLine } from './api/api';
import AdditionalDetails from './components/AdditionalDetails';

const Home: React.FC = () => {
  const [tubeLines, setTubeLines] = useState<TubeLine[]>([]);
  const [additionalData, setAdditionalData] = useState<DetailedTubeLine | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLine, setSelectedLine] = useState<TubeLine | null>(null);
  const [isDetailsVisible, setDetailsVisible] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTubeLines();
        setTubeLines(data);
      } catch (error) {
        setError('Error fetching tube lines data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to handle line click and set the selectedLine state
  const handleLineClick = async (line: TubeLine) => {
    const addData = await getDetailedTubeLine(line.id);
    setAdditionalData(addData);
    setSelectedLine(line);
    setDetailsVisible(true);
  };

  // Function to close additional details
  const handleCloseDetails = () => {
    setSelectedLine(null);
    setDetailsVisible(false);
  };

  return (
    <main>
      <div className="tube-app-content">
        <TubeLinesTable tubeLines={tubeLines} selectedLine={selectedLine} onLineClick={handleLineClick} />
        <div className={`additional-information ${isDetailsVisible ? '' : 'hidden'}`}>
          {selectedLine && additionalData && (
            <AdditionalDetails
              line={additionalData}
              onClose={handleCloseDetails} 
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;