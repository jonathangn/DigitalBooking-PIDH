import Grider from '../components/Body/BodyGrider';
import renderWithProviders from './test-utils';

test('Correcto renderizado de Grider', () => {
    const grider = renderWithProviders(<Grider />)
    expect(grider.container).toBeInTheDocument();
});