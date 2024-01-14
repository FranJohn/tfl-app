import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '../page';
import { getTubeLines } from '../api/api';

// Mocking the API function to return a predefined result
jest.mock('../api/api', () => ({
  getTubeLines: jest.fn(),
}));

describe('Home component', () => {
  // Mock data to be returned by getTubeLines
  const mockData = [
    { id: 'line1', name: 'Line 1', statusSeverityDescription: 'Good', reason: 'No issues' },
    { id: 'line2', name: 'Line 2', statusSeverityDescription: 'Minor delays', reason: 'Signal failure' },
  ];

  beforeEach(() => {
    // Mocking the API response
    getTubeLines.mockResolvedValue(mockData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the Home component with tube lines data', async () => {
    render(<Home />);

    // Wait for the API call to be resolved
    await waitFor(() => screen.getByText('Line 1'));

    // Check if the component renders the tube lines
    expect(screen.getByText('Line 1')).toBeInTheDocument();
    expect(screen.getByText('Line 2')).toBeInTheDocument();
  });

  it('handles line click and shows additional details', async () => {
    render(<Home />);

    // Wait for the API call to be resolved
    await waitFor(() => screen.getByText('Line 1'));

    // Click on a tube line
    fireEvent.click(screen.getByText('Line 1'));

    // Check if additional details are displayed
    expect(screen.getByText('Line 1 Details')).toBeInTheDocument();
    expect(screen.getByText('Status: Good')).toBeInTheDocument();

    // Close additional details
    fireEvent.click(screen.getByText('>'));
    expect(screen.queryByText('Line 1 Details')).not.toBeInTheDocument();
  });

  it('toggles filter visibility', async () => {
    render(<Home />);
    
    // Wait for the API call to be resolved
    await waitFor(() => screen.getByText('Line 1'));

    // Initially, FilterPanel should not be visible
    expect(screen.queryByTestId('filter-panel')).toBeNull();

    // Click on the filter icon to toggle filter visibility
    fireEvent.click(screen.getByText('Filter'));

    // After clicking, FilterPanel should be visible
    expect(screen.getByText('Filter Stations')).toBeInTheDocument();
  });

  it('filters tube lines based on input', async () => {
    render(<Home />);
    
    // Wait for the API call to be resolved
    await waitFor(() => screen.getByText('Line 1'));

    fireEvent.click(screen.getByText('Filter'));

    // Type a filter value in the input field
    fireEvent.change(screen.getByPlaceholderText('Search tube stations...'), { target: { value: 'Line 1' } });

    // Check if the filtered tube line is displayed
    expect(screen.getAllByText('Line 1').length).toBe(2);
    // Check if other tube lines are not displayed
    expect(screen.getAllByText('Line 2').length).toBe(1);
  });
});
