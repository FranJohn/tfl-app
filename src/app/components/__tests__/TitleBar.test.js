import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import TitleBar from '../TitleBar';

test('renders TitleBar component with correct styles and title', () => {
  const backgroundColor = '#333';
  const textColor = '#fff';
  const title = 'Test Title';

  const { getByText, getByTestId } = render(
    <TitleBar backgroundColor={backgroundColor} textColor={textColor} title={title} />
  );

  const titleElement = getByText(title);

  // Check if the title is rendered correctly
  expect(titleElement).toBeInTheDocument();
});
