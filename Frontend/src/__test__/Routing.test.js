import { render } from "@testing-library/react";
import Routing from "../../src/routing/Routing";
import { AllTheProviders } from './test-utils';

let component = null;

beforeEach(() => {
    component = render(<Routing />, { wrapper: AllTheProviders })
});

test('Renderizado del routing', () => {
    expect(component.container).toBeInTheDocument();
});