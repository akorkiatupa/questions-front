import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";

test("renders learn react link", () => {
  const { getByText } = render(<App />);
  const askButton = getByText("Ask a question");
  expect(askButton).toBeTruthy();
});
