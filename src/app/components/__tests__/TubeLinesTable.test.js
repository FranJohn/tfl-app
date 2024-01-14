import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TubeLinesTable from '../TubeLinesTable';

describe('TubeLinesTable', () => {
    const mockLines = [
        { id: 'line1', name: 'Line 1', statusSeverityDescription: 'Good' },
        { id: 'line2', name: 'Line 2', statusSeverityDescription: 'Minor delays' },
    ];

    const mockSelectedLine = { id: 'line1', name: 'Line 1', statusSeverityDescription: 'Good' };

    const mockOnLineClick = jest.fn();

    it('renders TubeLinesTable component with provided data', () => {
        const { getByText } = render(
        <TubeLinesTable tubeLines={mockLines} onLineClick={mockOnLineClick} selectedLine={null} />
        );

        // Check if the rendered content includes the line names and statuses
        mockLines.forEach((line) => {
        expect(getByText(line.name)).toBeInTheDocument();
        expect(getByText(line.statusSeverityDescription)).toBeInTheDocument();
        });
    });

    it('calls onLineClick function when a line is clicked', () => {
        const { getByText } = render(
        <TubeLinesTable tubeLines={mockLines} onLineClick={mockOnLineClick} selectedLine={null} />
        );

        // Click the first line
        fireEvent.click(getByText('Line 1'));

        // Check if the onLineClick function is called with the correct line
        expect(mockOnLineClick).toHaveBeenCalledWith(mockLines[0]);
    });

    it('renders additional details when a line is selected', () => {
        const { getByText } = render(
        <TubeLinesTable tubeLines={mockLines} onLineClick={mockOnLineClick} selectedLine={mockSelectedLine} />
        );

        // Check if the additional details are rendered
        expect(getByText('Line 1 Details')).toBeInTheDocument();
        expect(getByText('Status: Good')).toBeInTheDocument();
    });
});
