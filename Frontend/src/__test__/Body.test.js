import Body from '../components/Body/Body';
import renderWithProviders from './test-utils';

let component = null;

beforeEach(() => {
  component = renderWithProviders(<Body />);
  expect(component.container).toBeInTheDocument();
});

test('Renderizado mensaje de bienvenida', () => {
  expect(component.getByText('Busca ofertas en hoteles, casas y mucho más')).toBeInTheDocument();
});

test('Renderizado de botón de búsqueda', () => {
  expect(component.getByText('Buscar')).toBeInTheDocument();
});
