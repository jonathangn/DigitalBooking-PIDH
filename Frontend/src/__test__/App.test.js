import { render } from '@testing-library/react';
import App from '../App';
import { AllTheProviders } from './test-utils';

test('Correcto renderizado de App', () => {
    const app = render(<App />, { wrapper: AllTheProviders })
    expect(app.container).toBeInTheDocument();
});
