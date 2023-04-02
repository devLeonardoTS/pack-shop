import Home from "@/pages";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

// This is just a simple sample test, using Jest and React-Testing-Library.
describe("Home page", () => {
  it("Should display welcome message", () => {
    render(<Home />);

    const element = screen.getByTestId("msg-welcome");
    const innerHtml = "We are PackShop";

    expect(element.innerHTML).toEqual(innerHtml);
  });
});
