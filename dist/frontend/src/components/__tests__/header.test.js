/* eslint-disable no-undef */
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import store from "../../state/store";
beforeEach(() => {
    render(store, { store } >
        />
        < /Router>
        < /Provider>);
});
test("should render header", () => {
    const headerElement = screen.getByTestId("header-1");
    expect(headerElement).toBeInTheDocument();
});
test("cart value should be 0", () => {
    const cartQuant = screen.getByTestId("cart-quant");
    expect(cartQuant).toHaveTextContent(0);
});
//# sourceMappingURL=header.test.js.map