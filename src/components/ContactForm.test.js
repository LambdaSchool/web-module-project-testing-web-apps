import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ContactForm from "./ContactForm";

test("renders without errors", () => {
  render(<ContactForm />);
});

test("renders the contact form header", () => {
  //Arrange
  render(<ContactForm />);
  //Act
  const contactHeader = screen.getByText(/contact form/i);
  //Assert
  expect(contactHeader).toBeInTheDocument();
});

test("renders ONE error message if user enters less then 5 characters into firstname.", async () => {
  render(<ContactForm />);

  const firstNameInput = screen.getByLabelText(/first name/i);

  userEvent.type(firstNameInput, "kaz");

  const err = await screen.findByTestId(/error/i);
  expect(err).toBeInTheDocument();
});

test("renders THREE error messages if user enters no values into any fields.", async () => {
  //render
  render(<ContactForm />);
  //query for all inputs
  const submitButton = screen.getByRole("button");

  userEvent.click(submitButton);

  const err = await screen.findAllByTestId(/error/i);
  expect(err).toHaveLength(3);
});

test("renders ONE error message if user enters a valid first name and last name but no email.", async () => {
  render(<ContactForm />);

  const firstNameInput = screen.getByLabelText(/first name/i);
  const lastNameInput = screen.getByLabelText(/last name/i);
  const emailInput = screen.getByLabelText(/email/i);
  const submitButton = screen.getByRole("button");

  userEvent.type(firstNameInput, "kaseem");
  userEvent.type(lastNameInput, "bradley");
  userEvent.click(submitButton);

  const err = await screen.findByTestId(/error/i);
  expect(err).toBeInTheDocument();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
  render(<ContactForm />);

  const emailInput = screen.getByLabelText(/email/i);

  userEvent.type(emailInput, "kaseem");
  userEvent.type(emailInput, "kaseem.com");
  userEvent.type(emailInput, "kaseem@");

  const err = await screen.findByTestId(/error/i);
  expect(err).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {});

test("renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.", async () => {});

test("renders all fields text when all fields are submitted.", async () => {});
