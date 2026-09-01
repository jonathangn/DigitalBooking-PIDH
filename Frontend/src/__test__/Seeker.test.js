import Seeker from '../components/Body/BodySeeker';
import renderWithProviders from './test-utils';

test('Correcto renderizado de Seeker', async () => {
    const seeker =  renderWithProviders(<Seeker />)
     expect(seeker.container).toBeInTheDocument();
});