'use client'
import React, { useEffect, useState } from 'react';
import TubeLinesTable from './components/TubeLinesTable';
import { getTubeLines, getDetailedTubeLine, TubeLine, DetailedTubeLine } from './api/api';
import AdditionalDetails from './components/AdditionalDetails';
import FilterPanel from './components/FilterPanel';

const Home: React.FC = () => {
  const [tubeLines, setTubeLines] = useState<TubeLine[]>([]);
  const [additionalData, setAdditionalData] = useState<DetailedTubeLine | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLine, setSelectedLine] = useState<TubeLine | null>(null);
  const [isDetailsVisible, setDetailsVisible] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>('');
  const [hiddenStations, setHiddenStations] = useState<string[]>([]); 
  const [filterVisible, setFilterVisible] = useState<boolean>(false); 

  // Function to toggle filter panel visibility
  const toggleFilterVisibility = () => {
    setFilterVisible(!filterVisible);
  };

  // Function to toggle the visibility of a station
  const toggleStationVisibility = (stationId: string) => {
    if (hiddenStations.includes(stationId)) {
      setHiddenStations(hiddenStations.filter(id => id !== stationId));
    } else {
      setHiddenStations([...hiddenStations, stationId]);
    }
  };

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
  
    const intervalId = setInterval(() => {
      fetchData(); // Fetch data every 10 seconds
    }, 10000);
  
    return () => {
      clearInterval(intervalId); 
    };
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

  // Function to handle input change and update the filter state
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  // Filter the tube lines based on the filter input
  const filteredTubeLines = tubeLines
    .filter(line =>
      line.name.toLowerCase().includes(filter.toLowerCase())
    )
    .filter(line => !hiddenStations.includes(line.id));

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
