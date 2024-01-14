import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import FilterPanel from '../FilterPanel';

const mockTubeLines = [
    { id: 'line1', name: 'Line 1' },
    { id: 'line2', name: 'Line 2' },
];

describe('FilterPanel', () => {
    const mockProps = {
        filter: '',
        hiddenStations: [],
        onFilterChange: jest.fn(),
        onToggleStationVisibility: jest.fn(),
        tubeLines: mockTubeLines,
        onClose: jest.fn(),
    };

    it('renders FilterPanel component with provided data', () => {
        render(<FilterPanel {...mockProps} />);

        // Check if the rendered content includes the filter header
        expect(screen.getByText('Filter Stations')).toBeInTheDocument();

        // Check if the tube stations are rendered
        mockTubeLines.forEach((line) => {
        expect(screen.getByLabelText(line.name)).toBeInTheDocument();
        });
    });

    it('calls onClose function when the Close button is clicked', () => {
        render(<FilterPanel {...mockProps} />);

        // Click the Close button
        fireEvent.click(screen.getByText('Close'));

        // Check if the onClose function is called
        expect(mockProps.onClose).toHaveBeenCalled();
    }); 

    it('calls onToggleStationVisibility function when a checkbox is clicked', () => {
        render(<FilterPanel {...mockProps} />);

        // Click a checkbox
        fireEvent.click(screen.getByLabelText(mockTubeLines[0].name));

        // Check if the onToggleStationVisibility function is called with the correct stationId
        expect(mockProps.onToggleStationVisibility).toHaveBeenCalledWith(mockTubeLines[0].id);
    });
});
