import React from "react";
import App from "../src/App"
import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";


describe("<App/>", () => {
 

  test("should add elements and remove them", async () => {
    const user = userEvent.setup();
    render(<App />);

    // looking for an input
    const input = screen.getByRole("textbox");
    expect(input).toBeDefined();
    // looking for a form
    const form = screen.getByRole("form");
    expect(form).toBeDefined();
    // selecting the form button
    const button = form.querySelector("button");
    expect(button).toBeDefined();
    // The user is typing "Testing" inside the input
    const randomText = crypto.randomUUID();
    await user.type(input, randomText);
    //The user is clicking to add the new element
    await user.click(button!);

    //Try to secure that the element was added to the List
    const list = screen.getByRole("list");
    expect(list).toBeDefined();

    expect(list.childNodes.length).toBe(4);
    // screen.debug();

    //Try to secure that the element could be deleted
    const item = screen.getByText(randomText);
    const deleteButton = item.querySelector("button");
    expect(deleteButton).toBeDefined();
    await user.click(deleteButton!);

    expect(list.childNodes.length).toBe(3);
  });
});
