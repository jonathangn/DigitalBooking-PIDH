import { act, fireEvent, waitFor } from '@testing-library/react';
import Product from "../pages/Product/Product";
import renderWithProviders from './test-utils';
import axiosClient from '../Helpers/axiosClient';

vi.mock('../Helpers/axiosClient', () => ({
  __esModule: true,
  default: { get: vi.fn() },
  Api: "/api/",
}));

beforeEach(() => {
    axiosClient.get.mockResolvedValue({
        data: {
            id: 1,
            nombre: "Producto de prueba",
            categoria: { titulo: "hotel" },
            imagenes: [
                { id: 1, urlImg: "img1.jpg" },
                { id: 2, urlImg: "img2.jpg" },
            ],
            direccion: "Calle 123",
        },
    });
});

let component = null;

beforeEach(() => {
    component = renderWithProviders(<Product />)
    expect(component.container).toBeInTheDocument();
});


test('Product renderiza correctamente', () => {
    expect(component.container).toBeInTheDocument();
});


test('Renderizado de imagen al hacer click', async () => {
    let mainImg;
    await waitFor(() => {
        mainImg = component.container.querySelector('img.main-block');
        expect(mainImg).toBeInTheDocument();
    });
    act(() => {
        fireEvent.click(mainImg);
    });
    expect(mainImg).toBeInTheDocument();
});