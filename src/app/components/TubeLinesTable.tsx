import React from 'react';
import { getLineColor } from '../utils/tableUtils';
import { TubeLine } from '../api/api';

interface TubeLinesTableProps {
  tubeLines: TubeLine[];
}

const TubeLinesTable: React.FC<TubeLinesTableProps> = ({ tubeLines }) => {
  return (
    <div className="tube-lines-table">
      {tubeLines.map((line) => (
        <div key={line.id} className={line.id}>
          <div className="line-details">
            <p className="line-name">{line.name}</p>
            <p className="status">{line.statusSeverityDescription}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TubeLinesTable;
