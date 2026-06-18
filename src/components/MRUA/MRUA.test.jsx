import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MRUA from './MRUA';

// Mock the saveResult service
vi.mock('../../services/api', () => ({
  default: vi.fn(() => Promise.resolve({ ok: true }))
}));

describe('MRUA Component', () => {
  it('should calculate final velocity and distance correctly', async () => {
    render(<MRUA />);
    
    const viInput = screen.getByLabelText(/Vel. Inicial/i);
    const aInput = screen.getByLabelText(/Aceleración/i);
    const tInput = screen.getByLabelText(/Tiempo/i);
    const button = screen.getByRole('button', { name: /Calcular/i });

    fireEvent.change(viInput, { target: { value: '0' } });
    fireEvent.change(aInput, { target: { value: '2' } });
    fireEvent.change(tInput, { target: { value: '10' } });
    fireEvent.click(button);

    // vf = 0 + 2 * 10 = 20
    // d = 0 * 10 + 0.5 * 2 * 100 = 100
    expect(await screen.findByText(/Velocidad Final \(vf\) = 20 m\/s/i)).toBeInTheDocument();
    expect(await screen.findByText(/Distancia \(d\) = 100 m/i)).toBeInTheDocument();
  });

  it('should show error when required values are missing', async () => {
    render(<MRUA />);
    
    const button = screen.getByRole('button', { name: /Calcular/i });
    fireEvent.click(button);

    expect(await screen.findByText(/Ingresa vi, a y t para cálculos básicos/i)).toBeInTheDocument();
  });
});
