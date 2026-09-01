import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Body from '../components/Body/Body';
import { DataContext } from '../components/Context/DataContext';

const readyContext = {
  dataReady: true,
  products: [],
  categories: [],
  cities: [],
  setFilter: () => {},
  dateRange: [null, null],
  startDate: null,
  endDate: null,
  startDates: [],
  endDates: [],
  categoriesError: null,
  productsError: null,
  retry: () => {},
};

const renderBody = (context = readyContext) =>
  render(
    <BrowserRouter>
      <DataContext.Provider value={context}>
        <Body />
      </DataContext.Provider>
    </BrowserRouter>
  );

let component = null;

beforeEach(() => {
  component = renderBody();
  expect(component.container).toBeInTheDocument();
});

test('Renderizado mensaje de bienvenida', () => {
  expect(component.getByText('Busca ofertas en hoteles, casas y mucho más')).toBeInTheDocument();
});

test('Renderizado de botón de búsqueda', () => {
  expect(component.getByText('Buscar')).toBeInTheDocument();
});

test('Renderizado de un único loader mientras carga', () => {
  const loading = renderBody({ ...readyContext, dataReady: false });
  expect(loading.getAllByText('Cargando datos...')).toHaveLength(1);
});
