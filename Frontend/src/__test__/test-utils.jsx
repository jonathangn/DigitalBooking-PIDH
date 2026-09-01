import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from '../context/Context';
import { DataProvider } from '../components/Context/DataContext';

export const AllTheProviders = ({ children }) => {
  return (
    <Provider>
      <DataProvider>{children}</DataProvider>
    </Provider>
  );
};

export const AllTheProvidersWithRouter = ({ children }) => {
  return (
    <AllTheProviders>
      <BrowserRouter>{children}</BrowserRouter>
    </AllTheProviders>
  );
};

const renderWithProviders = (ui, options) =>
  render(ui, { wrapper: AllTheProvidersWithRouter, ...options });

export default renderWithProviders;
