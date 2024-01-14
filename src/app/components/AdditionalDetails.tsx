import React from 'react';
import { TubeLine } from '../api/api';

interface AdditionalDetailsProps {
  line: TubeLine;
  onClose: () => void;
}

const AdditionalDetails: React.FC<AdditionalDetailsProps> = ({ line, onClose }) => (
  <div className="additional-details">
    <button onClick={onClose}>&gt;</button>
    <div className="content">
      <h2>{line.name} Line:</h2>
      <h3>Status:</h3>
      <p>{line.reason}</p>
    </div>
  </div>
);

export default AdditionalDetails;
