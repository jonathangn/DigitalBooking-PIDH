import Picker_ from '../pages/Product/PickerP';
import renderWithProviders from './test-utils';

test('Correcto renderizado de Picker_', () => {
  const picker2 = renderWithProviders(<Picker_ />);
  expect(picker2.container).toBeInTheDocument();
});
