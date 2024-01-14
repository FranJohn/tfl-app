'use client'
import React, { useEffect, useState } from 'react';
import TubeLinesTable from './components/TubeLinesTable';
import AdditionalDetails from './components/AdditionalDetails';
import FilterPanel from './components/FilterPanel';
import { TubeLine, getTubeLines } from './api/api';

const Home: React.FC = () => {
  const [tubeLines, setTubeLines] = useState<TubeLine[] | undefined>([]);
  const [additionalData, setAdditionalData] = useState<TubeLine | null>(null);
  const [selectedLine, setSelectedLine] = useState<TubeLine | null>(null);
  const [isDetailsVisible, setDetailsVisible] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>('');
  const [hiddenStations, setHiddenStations] = useState<string[]>([]); 
  const [filterVisible, setFilterVisible] = useState<boolean>(false); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTubeLines();
        setTubeLines(data);
      } catch (error) {
        console.error('Error fetching tube lines data', error);
      } 
    };
  
    fetchData(); 
  
    const intervalId = setInterval(() => {
      fetchData(); // Fetch data every 10 seconds
    }, 10000);
  
    return () => {
      clearInterval(intervalId); 
    };
  }, []); 

  const handleLineClick = (line: TubeLine) => {
    setAdditionalData(line);
    setSelectedLine(line);
    setDetailsVisible(true);
  };

  const handleCloseDetails = () => {
    setSelectedLine(null);
    setDetailsVisible(false);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const toggleFilterVisibility = () => {
    setFilterVisible(!filterVisible);
  };

  const toggleStationVisibility = (stationId: string) => {
    setHiddenStations(prevStations => 
      prevStations.includes(stationId)
        ? prevStations.filter(id => id !== stationId)
        : [...prevStations, stationId]
    );
  };

  const filteredTubeLines = tubeLines?.filter(line =>
      line.name.toLowerCase().includes(filter.toLowerCase())
    ).filter(line => !hiddenStations.includes(line.id));

  return (
    <main>
      <div className="tube-app-content">
        <div className="filter-icon" onClick={toggleFilterVisibility}>
          Filter
        </div>

        {filterVisible && (
          <FilterPanel
            filter={filter}
            hiddenStations={hiddenStations}
            onFilterChange={handleFilterChange}
            onToggleStationVisibility={toggleStationVisibility}
            tubeLines={tubeLines} 
            onClose={toggleFilterVisibility}
          />
        )}

        <TubeLinesTable
          tubeLines={filteredTubeLines}
          selectedLine={selectedLine}
          onLineClick={handleLineClick}
        />
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
