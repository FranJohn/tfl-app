import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import AdditionalDetails from '../AdditionalDetails';

describe('AdditionalDetails', () => {
  const mockLine = {
    name: 'Test Line',
    reason: 'Test Reason',
    id: 'test-line',
    statusSeverityDescription: 'Good'
  };

  it('renders AdditionalDetails component with provided data', () => {
    const onCloseMock = jest.fn();

    render(<AdditionalDetails line={mockLine} onClose={onCloseMock} />);

    // Check if the rendered content includes the line name and reason
    expect(screen.getByText(`${mockLine.name} Line:`)).toBeInTheDocument();
    expect(screen.getByText('Status:')).toBeInTheDocument();
    expect(screen.getByText(mockLine.reason)).toBeInTheDocument();
  });

  it('calls onClose function when the close button is clicked', () => {
    const onCloseMock = jest.fn();

    render(<AdditionalDetails line={mockLine} onClose={onCloseMock} />);

    // Click the close button
    fireEvent.click(screen.getByText('>'));
    
    // Check if the onClose function is called
    expect(onCloseMock).toHaveBeenCalled();
  });
});
