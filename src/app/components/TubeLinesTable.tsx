import React from 'react';
import { TubeLine } from '../api/api';

interface TubeLinesTableProps {
  tubeLines: TubeLine[] | undefined;
  onLineClick: (line: TubeLine) => void;
  selectedLine: TubeLine | null; 
}

const TubeLinesTable: React.FC<TubeLinesTableProps> = ({ tubeLines, onLineClick, selectedLine }) => {
  // Function to handle line click and set the selectedLine state
  const handleLineClick = (line: TubeLine) => {
    onLineClick(line);
  };

  return (
    <div className="tube-lines-table">
      {tubeLines?.map((line) => (
        <div key={line.id} className={`tube-line ${line.id}`} onClick={() => handleLineClick(line)}>
          <div className="line-details">
            <p className="line-name">{line.name}</p>
            <p className="status">{line.statusSeverityDescription}</p>
          </div>
        </div>
      ))}

      {/* Display additional details component when a line is selected */}
      {selectedLine && (
        <div className="additional-details">
          <h2>{selectedLine.name} Details</h2>
          <p>Status: {selectedLine.statusSeverityDescription}</p>
        </div>
      )}
    </div>
  );
};

export default TubeLinesTable;
