import Listing from '../components/Body/BodyListing';
import renderWithProviders from './test-utils';

test('Correcto renderizado de Listing', () => {
    const component = renderWithProviders(<Listing />)
    expect(component.container).toBeInTheDocument();
});