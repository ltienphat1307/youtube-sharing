import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { GraphQLError } from "graphql";
import { navigate } from "gatsby";

import ApolloProvider from "../../../apollo/ApolloProvider";
import { LOGIN, ME } from "../../../apollo/graphql/useAuth";
import { IUser } from "../../../types/IUser";
import { Login } from "../../../sections/Login";

const loggedInUser: IUser = {
  id: 1,
  email: "test@gmail.com",
};

function createMockData(error?: boolean) {
  let loginResult;

  if (error) {
    loginResult = {
      errors: [new GraphQLError("Wrong credentials")],
    };
  } else {
    loginResult = { data: { login: loggedInUser } };
  }

  return [
    {
      request: {
        query: LOGIN,
        variables: {
          data: { email: "test@gmail.com", password: "123456" },
        },
      },
      result: loginResult,
    },
    {
      request: {
        query: ME,
      },
      result: {
        data: {
          me: loggedInUser,
        },
      },
    },
  ];
}

describe("Login Page", () => {
  it("Should redirect to home after logging in successfully", async () => {
    const mocks = createMockData();

    render(
      <ApolloProvider>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Login />
        </MockedProvider>
      </ApolloProvider>
    );

    const btnSubmit = screen.getByRole("button");
    const emailInput = screen.getByRole("textbox", { name: /email/i });
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.input(passwordInput, {
      target: {
        value: "123456",
      },
    });

    fireEvent.input(emailInput, {
      target: {
        value: "test@gmail.com",
      },
    });

    await waitFor(() => fireEvent.submit(btnSubmit));
    await waitFor(() => expect(navigate).toHaveBeenCalledTimes(1));
  });

  it("Should render error", async () => {
    const mocks = [
      {
        request: {
          query: LOGIN,
          variables: {
            data: { email: "test@gmail.com", password: "123456" },
          },
        },
        result: {
          errors: [new GraphQLError("Wrong credentials")],
        },
      },
    ];

    render(
      <ApolloProvider>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Login />
        </MockedProvider>
      </ApolloProvider>
    );

    const btnSubmit = screen.getByRole("button");
    const emailInput = screen.getByRole("textbox", { name: /email/i });
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.input(passwordInput, {
      target: {
        value: "123456",
      },
    });

    fireEvent.input(emailInput, {
      target: {
        value: "test@gmail.com",
      },
    });

    await waitFor(() => fireEvent.submit(btnSubmit));
    expect(await screen.findByLabelText("server-error")).toBeInTheDocument();
  });
});
