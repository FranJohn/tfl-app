import React from 'react';
import { getLineColor } from '../utils/tableUtils';

interface TubeLinesTableProps {
  tubeLines: Array<{
    id: string;
    name: string;
    lineStatuses: Array<{ statusSeverityDescription: string }>;
  }>;
}

const TubeLinesTable: React.FC<TubeLinesTableProps> = ({ tubeLines }) => {
  return (
    <div className="tube-lines-table">
      {tubeLines.map((line) => (
        <div key={line.id} className="tube-line" style={{ borderColor: getLineColor(line.name) }}>
          <div className="line-details">
            <p className="line-name">{line.name}</p>
            <p className="status">{line.lineStatuses[0].statusSeverityDescription}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TubeLinesTable;
