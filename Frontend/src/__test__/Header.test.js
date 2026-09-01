import Header from '../components/Header/Header';
import { screen, act, fireEvent } from '@testing-library/react';
import getRouteForAction from '../utils/navigation';
import { create } from 'react-test-renderer';
import renderWithProviders, { AllTheProvidersWithRouter } from './test-utils';

let component = null;
beforeEach(() => {
  component = renderWithProviders(<Header />);
  expect(component.container).toBeInTheDocument();
});

test('Renderizado del logotipo', () => {
  expect(screen.getAllByText('Sentite como en tu hogar'));
});

test('Funcionamiento de menu lateral', async () => {
  const icono = component.container.getElementsByClassName('hamburger-menu')[0];

  act(() => {
    fireEvent.click(icono);
  });

  expect(component.container.getElementsByClassName('nav-menu active')).toBeTruthy();
});

describe('Redirección por función manejadorBotones', () => {
  test('Redireccion a /signup', async () => {
    const button = screen.getByRole('button', { name: /Crear cuenta/ });
    const route = getRouteForAction(true);

    act(() => {
      fireEvent.click(button);
    });

    expect(route).toBe('/signup');
  });

  test('Redirección a /login', async () => {
    const button = screen.getByRole('button', { name: /Iniciar sesión/ });
    const route = getRouteForAction(false);

    act(() => {
      fireEvent.click(button);
    });

    expect(route).toBe('/login');
  });

  test('Redireccion a /', async () => {
    const logo = screen.getByAltText('logo');
    const route = getRouteForAction();

    act(() => {
      fireEvent.click(logo);
    });

    expect(route).toBe('/');
  });

  test('Redireccion a / cuando cierra sesión', async () => {
    const close = screen.getByText('X');
    const route = getRouteForAction();

    act(() => {
      fireEvent.click(close);
    });

    expect(route).toBe('/');
  });
});

test('Comprobar manejador de botones', async () => {
  const buttonCrear = screen.getByRole('button', { name: /Crear Cuenta/i });

  act(() => {
    fireEvent.click(buttonCrear);
  });

  expect(component.container).not.toHaveTextContent('Crear cuenta');
  expect(component.container).toHaveTextContent('Iniciar sesión');

  const buttonIniciar = screen.getByRole('button', { name: /Iniciar Sesión/i });
  act(() => {
    fireEvent.click(buttonIniciar);
  });

  expect(component.container).not.toHaveTextContent('Iniciar sesión');
  expect(component.container).toHaveTextContent('Crear cuenta');

  const logo = screen.getByAltText('logo');

  act(() => {
    fireEvent.click(logo);
  });

  expect(component.container).toHaveTextContent('Iniciar sesión');
  expect(component.container).toHaveTextContent('Crear cuenta');

  const buttonIniciar2 = screen.getByRole('button', { name: /Iniciar Sesión/i });
  act(() => {
    fireEvent.click(buttonIniciar2);
  });

  expect(component.container).not.toHaveTextContent('Iniciar sesión');
  expect(component.container).toHaveTextContent('Crear cuenta');

  const buttonCrear2 = screen.getByRole('button', { name: /Crear Cuenta/i });

  act(() => {
    fireEvent.click(buttonCrear2);
  });

  expect(component.container).not.toHaveTextContent('Crear cuenta');
  expect(component.container).toHaveTextContent('Iniciar sesión');

  const logo2 = screen.getByAltText('logo');

  act(() => {
    fireEvent.click(logo2);
  });

  expect(component.container).toHaveTextContent('Iniciar sesión');
  expect(component.container).toHaveTextContent('Crear cuenta');
});

test('Snapshot de header', () => {
  const tree = create(
    <AllTheProvidersWithRouter>
      <Header />
    </AllTheProvidersWithRouter>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
