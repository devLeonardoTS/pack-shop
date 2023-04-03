import React from "react";
import { BaseTemplateProps } from ".";

// "*.mocks" are sample data for your component's properties.

const base: BaseTemplateProps = {
  sampleTextProp: "Hello",
  children: React.createElement("h2", null, "World!"),
};

const mockBaseTemplateProps = {
  base,
};

export default mockBaseTemplateProps;
