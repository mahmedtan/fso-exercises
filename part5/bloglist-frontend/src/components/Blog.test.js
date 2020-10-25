import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import React from "react";
import Blog from "./Blog";

describe("<Blog/>", () => {
  let component;
  beforeEach(() => {
    component = render(
      <Blog
        blog={{
          title: "lorem ipsum",
          author: "John Doe",
          url: "www.example.com",
          likes: 7,
        }}
      />
    );
  });

  test("must render title and author", () => {
    const text = component.container.querySelector(".blogContainer");
    expect(text).toHaveTextContent("lorem ipsum John Doe");
    expect(text).not.toHaveTextContent("www.example.com");
    expect(text).not.toHaveTextContent("7");
  });
});
