import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MRU from './MRU';

// Mock the saveResult service
vi.mock('../../services/api', () => ({
  default: vi.fn(() => Promise.resolve({ ok: true }))
}));

describe('MRU Component', () => {
  it('should calculate Distance correctly (v * t)', async () => {
    render(<MRU />);
    
    const vInput = screen.getByLabelText(/Velocidad/i);
    const tInput = screen.getByLabelText(/Tiempo/i);
    const button = screen.getByRole('button', { name: /Calcular/i });

    fireEvent.change(vInput, { target: { value: '10' } });
    fireEvent.change(tInput, { target: { value: '5' } });
    fireEvent.click(button);

    expect(await screen.findByText(/Distancia \(d\) = 50 m/i)).toBeInTheDocument();
  });

  it('should calculate Velocity correctly (d / t)', async () => {
    render(<MRU />);
    
    const dInput = screen.getByLabelText(/Distancia/i);
    const tInput = screen.getByLabelText(/Tiempo/i);
    const button = screen.getByRole('button', { name: /Calcular/i });

    fireEvent.change(dInput, { target: { value: '100' } });
    fireEvent.change(tInput, { target: { value: '10' } });
    fireEvent.click(button);

    expect(await screen.findByText(/Velocidad \(v\) = 10 m\/s/i)).toBeInTheDocument();
  });

  it('should show error when not enough values are provided', async () => {
    render(<MRU />);
    
    const button = screen.getByRole('button', { name: /Calcular/i });
    fireEvent.click(button);

    expect(await screen.findByText(/Por favor, ingresa al menos dos valores/i)).toBeInTheDocument();
  });
});
