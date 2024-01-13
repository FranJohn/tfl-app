import React from 'react';
import { TubeLine } from '../api/api';

interface FilterPanelProps {
    filter: string;
    hiddenStations: string[];
    onFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onToggleStationVisibility: (stationId: string) => void;
    tubeLines: TubeLine[];
    onClose: () => void; 
}

const FilterPanel: React.FC<FilterPanelProps> = ({
    filter,
    hiddenStations,
    onFilterChange,
    onToggleStationVisibility,
    tubeLines,
    onClose, 
    }) => {
        const handleApplyClick = () => {
        onClose();
    };

    return (
        <div className="filter-panel">
            <div className="filter-header">
                <h3>Filter Stations</h3>
                <button onClick={handleApplyClick}>Close</button>
            </div>
            <input
                type="text"
                placeholder="Search tube stations..."
                value={filter}
                onChange={onFilterChange}
            />

            <div className="station-list">
                {tubeLines.map((line) => (
                <label key={line.id} className="station-label">
                    <input
                        type="checkbox"
                        checked={!hiddenStations.includes(line.id)}
                        onChange={() => onToggleStationVisibility(line.id)}
                    />
                    {line.name}
                </label>
                ))}
            </div>
        </div>
    );
};

export default FilterPanel;
