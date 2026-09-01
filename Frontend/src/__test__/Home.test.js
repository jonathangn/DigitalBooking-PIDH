import UserHome from '../pages/Home/UserHome';
import Home from '../pages/Home/Home';
import renderWithProviders from './test-utils';

test('Correcto renderizado de Home', () => {
  const userHome = renderWithProviders(<UserHome />);
  expect(userHome.container).toBeInTheDocument();
});

test('Correcto renderizado de UserHome', () => {
  const home = renderWithProviders(<Home />);
  expect(home.container).toBeInTheDocument();
});
