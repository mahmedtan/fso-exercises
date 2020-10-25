import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import React from "react";
import CreateBlog from "./CreateBlog";

describe("<CreateBlog/>", () => {
  let newBlog = jest.fn();
  let component;

  beforeEach(() => {
    component = render(<CreateBlog createNewBlog={newBlog} />);
  });

  test("should call the event handler when form is submitted", () => {
    const form = component.container.querySelector("#form");
    const title = component.container.querySelector("#title");
    const author = component.container.querySelector("#author");
    const url = component.container.querySelector("#url");

    fireEvent.change(title, { target: { value: "Heyoo it's me" } });
    fireEvent.change(author, { target: { value: "Arthuro" } });
    fireEvent.change(url, { target: { value: "www.doggo.com" } });
    fireEvent.submit(form);
    expect(newBlog.mock.calls[0][0]).toEqual({
      title: "Heyoo it's me",
      author: "Arthuro",
      url: "www.doggo.com",
    });
  });
});
