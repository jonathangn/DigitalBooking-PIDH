import Body from '../components/Body/Body';
import { render} from '@testing-library/react';

let component = null;

beforeEach(() => {
    component = render(<Body />)
    expect(component.container).toBeInTheDocument();
});

test('Renderizado mensaje de bienvenida', () => {
    expect(component.getByText('Busca ofertas en hoteles, casas y mucho más')).toBeInTheDocument();
});

test('Renderizado de botón de búsqueda', () => {
    expect(component.getByText('Buscar')).toBeInTheDocument();
});