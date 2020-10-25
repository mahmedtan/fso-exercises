import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import React from "react";
import Blog from "./Blog";

describe("<Blog/>", () => {
  let component;
  let mockFN = jest.fn();

  beforeEach(() => {
    component = render(
      <Blog
        blog={{
          title: "lorem ipsum",
          author: "John Doe",
          url: "www.example.com",
          likes: 7,
          user: { name: "Ahmed", username: "mahmedtan" },
        }}
        user={{ username: "Ahmed" }}
        handleLikes={mockFN}
      />
    );
  });

  test("must render title and author", () => {
    const text = component.container.querySelector(".blogContainer");
    expect(text).toHaveTextContent("lorem ipsum John Doe");
    expect(text).not.toHaveTextContent("www.example.com");
    expect(text).not.toHaveTextContent("7");
  });
  test("must render url and likes when show button clicked", () => {
    const button = component.container.querySelector(".show");
    fireEvent.click(button);
    const text = component.container.querySelector(".blogContainer");
    expect(text).toHaveTextContent("www.example.com");
    expect(text).toHaveTextContent("7");
  });
  test("must support multiple click on likes button", () => {
    const button = component.container.querySelector(".show");
    fireEvent.click(button);
    const likesButton = component.container.querySelector(".likes");
    fireEvent.click(likesButton);
    fireEvent.click(likesButton);
    expect(mockFN.mock.calls).toHaveLength(2);
  });
});
