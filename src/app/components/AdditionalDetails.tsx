import React from 'react';
import { DetailedTubeLine } from '../api/api';

interface AdditionalDetailsProps {
  line: DetailedTubeLine;
  onClose: () => void;
}

const AdditionalDetails: React.FC<AdditionalDetailsProps> = ({ line, onClose }) => {
  console.log("line");
  console.log(line);

  return (
    <div className="additional-details">
      <button onClick={onClose}>&gt;</button>
      <div className="content">
        <h2>{line.name} Line:</h2>
        <p>Status:</p>
        <p>{line.reason}</p>
      </div>
    </div>
  );
};

export default AdditionalDetails;
