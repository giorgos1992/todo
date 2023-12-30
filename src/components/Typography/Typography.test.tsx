import { render } from "test-utils";
import Typography from "./Typography";
import React from "react";
import { ITypography } from "./Typography.types";

describe("Typography", () => {
  it("renders children correctly when variant is body", () => {
    const { getByText } = render(
      <Typography variant={ITypography.body}>Hello, World!</Typography>
    );
    const textElement = getByText("Hello, World!");
    expect(textElement).toHaveStyle({ fontSize: 37.5 });
  });
  it("renders children correctly when variant is h1", () => {
    const { getByText } = render(
      <Typography variant={ITypography.H1}>Hello, World!</Typography>
    );
    const textElement = getByText("Hello, World!");
    expect(textElement).toHaveStyle({ fontSize: 52.5 });
  });
  it("renders children correctly when variant is p", () => {
    const { getByText } = render(
      <Typography variant={ITypography.body}>Hello, World!</Typography>
    );
    const textElement = getByText("Hello, World!");
    expect(textElement).toBeTruthy();
  });

  it("applies custom style correctly", () => {
    const customStyle = { color: "red" };
    const { getByText } = render(
      <Typography variant={ITypography.body} style={customStyle}>
        Custom Style
      </Typography>
    );
    const textElement = getByText("Custom Style");
    expect(textElement).toHaveStyle({ color: "red" });
  });
});
