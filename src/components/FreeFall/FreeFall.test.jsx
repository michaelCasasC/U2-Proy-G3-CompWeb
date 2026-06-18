import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FreeFall from './FreeFall';

// Mock the saveResult service
vi.mock('../../services/api', () => ({
  default: vi.fn(() => Promise.resolve({ ok: true }))
}));

describe('FreeFall Component', () => {
  it('should calculate time and velocity correctly for height = 10m', async () => {
    render(<FreeFall />);
    
    const input = screen.getByLabelText(/Altura de caída/i);
    const button = screen.getByRole('button', { name: /Calcular/i });

    fireEvent.change(input, { target: { value: '10' } });
    fireEvent.click(button);

    // Results for h=10: 
    // t = sqrt(20/9.81) ≈ 1.43
    // vf = 9.81 * 1.43 ≈ 14.01
    
    expect(await screen.findByText(/1.43 s/i)).toBeInTheDocument();
    expect(await screen.findByText(/14.01 m\/s/i)).toBeInTheDocument();
  });

  it('should show an error for invalid input', async () => {
    render(<FreeFall />);
    
    const input = screen.getByLabelText(/Altura de caída/i);
    const button = screen.getByRole('button', { name: /Calcular/i });

    fireEvent.change(input, { target: { value: '-5' } });
    fireEvent.click(button);

    expect(await screen.findByText(/Por favor, ingresa una altura válida/i)).toBeInTheDocument();
  });
});
