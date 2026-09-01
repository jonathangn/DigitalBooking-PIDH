import Booking from '../pages/Booking/Booking';
import renderWithProviders from './test-utils';

let component = null;

beforeEach(() => {
  component = renderWithProviders(<Booking />);
  expect(component.container).toBeInTheDocument();
});

test('Booking renderiza correctamente', () => {
  expect(component.container).toBeInTheDocument();
});
