import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PredictionForm from './PredictionForm';
import { render as rtlRender } from '@testing-library/react';
import Index from '../pages/Index';

describe('PredictionForm', () => {
  it('renders all form fields', () => {
    render(<PredictionForm />);
    expect(screen.getByLabelText(/Latitude/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Longitude/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Magnitude/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Depth/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Generate Prediction/i })).toBeInTheDocument();
  });

  it('shows validation errors for empty fields', async () => {
    render(<PredictionForm />);
    fireEvent.click(screen.getByRole('button', { name: /Generate Prediction/i }));
    await waitFor(() => {
      expect(screen.getByText(/Latitude must be between -90 and 90/i)).toBeInTheDocument();
      expect(screen.getByText(/Longitude must be between -180 and 180/i)).toBeInTheDocument();
      expect(screen.getByText(/Magnitude must be between 4.0 and 9.5/i)).toBeInTheDocument();
      expect(screen.getByText(/Depth must be between 0 and 700 km/i)).toBeInTheDocument();
    });
  });

  it('accepts coordinates and submits', async () => {
    render(<PredictionForm />);
    fireEvent.change(screen.getByLabelText(/Latitude/i), { target: { value: '20' } });
    fireEvent.change(screen.getByLabelText(/Longitude/i), { target: { value: '80' } });
    fireEvent.change(screen.getByLabelText(/Magnitude/i), { target: { value: '7' } });
    fireEvent.change(screen.getByLabelText(/Depth/i), { target: { value: '10' } });
    fireEvent.click(screen.getByRole('button', { name: /Generate Prediction/i }));
    expect(screen.getByText(/Analyzing Seismic Data/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(/Tsunami risk analysis completed/i)).toBeInTheDocument();
    });
  });

  it('is accessible via keyboard navigation', () => {
    render(<PredictionForm />);
    const latInput = screen.getByLabelText(/Latitude/i);
    latInput.focus();
    expect(latInput).toHaveFocus();
    fireEvent.keyDown(latInput, { key: 'Tab' });
    const lngInput = screen.getByLabelText(/Longitude/i);
    expect(lngInput).toBeInTheDocument();
  });

  it('has proper ARIA labels', () => {
    render(<PredictionForm />);
    expect(screen.getByLabelText(/Latitude/i)).toHaveAttribute('aria-label');
    expect(screen.getByLabelText(/Longitude/i)).toHaveAttribute('aria-label');
    expect(screen.getByLabelText(/Magnitude/i)).toHaveAttribute('aria-label');
    expect(screen.getByLabelText(/Depth/i)).toHaveAttribute('aria-label');
  });
});

describe('FAQ Section', () => {
  it('renders FAQ section on the main page', () => {
    rtlRender(<Index />);
    expect(screen.getByText(/FAQ/i)).toBeInTheDocument();
    expect(screen.getByText(/How accurate is DeepWave/i)).toBeInTheDocument();
    expect(screen.getByText(/Where does the data come from/i)).toBeInTheDocument();
  });
}); 