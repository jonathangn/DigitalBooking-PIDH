import Product from "../pages/Product/Product";
import { screen, act, fireEvent } from '@testing-library/react';
import renderWithProviders from './test-utils';

let component = null;

beforeEach(() => {
    component = renderWithProviders(<Product />)
    expect(component.container).toBeInTheDocument();
});


test('Product renderiza correctamente', () => {
    expect(component.container).toBeInTheDocument();
});


test('Renderizado de imagen al hacer click', () => {
    const img = screen.getByRole('img');
    act(() => {
        fireEvent.click(img);
    });
    expect(img).toBeInTheDocument();
});