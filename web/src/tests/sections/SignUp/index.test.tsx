import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { GraphQLError } from "graphql";
import { navigate } from "gatsby";

import ApolloProvider from "../../../apollo/ApolloProvider";
import { SIGN_UP } from "../../../apollo/graphql/useAuth";
import { IUser } from "../../../types/IUser";
import { SignUp } from "../../../sections/SignUp";

const mockedUser: IUser = {
  id: 1,
  email: "john@example.com",
};

function createMockData(error?: string) {
  let result;

  if (error) {
    result = { errors: [new GraphQLError(error)] };
  } else {
    result = {
      data: { signUp: mockedUser },
    };
  }

  return [
    {
      request: {
        query: SIGN_UP,
        variables: {
          data: { email: "phat@gmail.com", password: "123456" },
        },
      },
      result,
    },
  ];
}

describe("Sign Up Page", () => {
  it("Should validate input fields", async () => {
    render(
      <ApolloProvider>
        <SignUp />
      </ApolloProvider>
    );

    const passwordInput = screen.getByLabelText(/^password/i);
    const confirmInput = screen.getByLabelText(/confirmPassword/i);
    const btnSubmit = screen.getByRole("button");

    await waitFor(() => fireEvent.submit(btnSubmit));
    const errorText = await screen.findAllByText("This field is required");
    expect(errorText).toHaveLength(3);

    fireEvent.input(passwordInput, {
      target: {
        value: "test",
      },
    });

    fireEvent.input(confirmInput, {
      target: {
        value: "1",
      },
    });

    await waitFor(() => fireEvent.submit(btnSubmit));
    expect(
      await screen.findByText("Password must be at least 6 characters")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Passwords do not match! Try again…")
    ).toBeInTheDocument();
  });

  it("Should render error", async () => {
    const mockedError = "Email phat@gmail.com already registered.";
    const mocks = createMockData(mockedError);

    render(
      <ApolloProvider>
        <MockedProvider mocks={mocks} addTypename={false}>
          <SignUp />
        </MockedProvider>
      </ApolloProvider>
    );

    const emailInput = screen.getByRole("textbox", { name: /email/i });
    const confirmInput = screen.getByLabelText(/confirmPassword/i);
    const passwordInput = screen.getByLabelText(/^password/i);
    const btnSubmit = screen.getByRole("button");

    fireEvent.input(passwordInput, {
      target: {
        value: "123456",
      },
    });

    fireEvent.input(confirmInput, {
      target: {
        value: "123456",
      },
    });

    fireEvent.input(emailInput, {
      target: {
        value: "phat@gmail.com",
      },
    });

    await waitFor(() => fireEvent.submit(btnSubmit));
    expect(await screen.findByLabelText("server-error")).toBeInTheDocument();
  });

  it("Should redirect to login if registering successfully", async () => {
    const mocks = createMockData();

    render(
      <ApolloProvider>
        <MockedProvider mocks={mocks} addTypename={false}>
          <SignUp />
        </MockedProvider>
      </ApolloProvider>
    );

    const emailInput = screen.getByRole("textbox", { name: /email/i });
    const confirmInput = screen.getByLabelText(/confirmPassword/i);
    const passwordInput = screen.getByLabelText(/^password/i);
    const btnSubmit = screen.getByRole("button");

    fireEvent.input(passwordInput, {
      target: {
        value: "123456",
      },
    });

    fireEvent.input(confirmInput, {
      target: {
        value: "123456",
      },
    });

    fireEvent.input(emailInput, {
      target: {
        value: "phat@gmail.com",
      },
    });

    await waitFor(() => fireEvent.submit(btnSubmit));
    await waitFor(() => expect(navigate).toHaveBeenCalledTimes(1));
  });
});
