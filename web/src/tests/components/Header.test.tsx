import React from "react";
import { render, screen } from "@testing-library/react";
import "jest-styled-components";
import "@testing-library/jest-dom";
import { MockedProvider } from "@apollo/client/testing";

import ApolloProvider from "../../apollo/ApolloProvider";
import { ME } from "../../apollo/graphql/useAuth";
import { IUser } from "../../types/IUser";

import { Header } from "../../components/Header";

const mockedUser: IUser = {
  id: 1,
  email: "phat@gmail.com",
};

const mocks = [
  {
    request: {
      query: ME,
      variables: {},
    },
    result: {
      data: {
        me: mockedUser,
      },
    },
  },
];

describe("Header", () => {
  it("Should see user info", async () => {
    render(
      <ApolloProvider>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Header />
        </MockedProvider>
      </ApolloProvider>
    );

    const result = await screen.findByText(`Welcome ${mockedUser.email}`);
    expect(result).toBeInTheDocument();
  });

  it("Should not see user info", async () => {
    render(
      <ApolloProvider>
        <Header />
      </ApolloProvider>
    );

    const result = await screen.findByText("Sign up");
    expect(result).toBeInTheDocument();
  });
});
