import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders jeju healing title and day tabs', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /jeju healing/i })).toBeInTheDocument();
  expect(screen.getByRole('tab', { name: /day-1/i })).toBeInTheDocument();
  expect(screen.getByRole('tab', { name: /day-2/i })).toBeInTheDocument();
  expect(screen.getByRole('tab', { name: /day-3/i })).toBeInTheDocument();
  expect(screen.getByRole('tab', { name: /total/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /네이버 검색/i })).toBeInTheDocument();
});
