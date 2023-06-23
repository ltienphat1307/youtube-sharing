import React from "react";
import { render, screen } from "@testing-library/react";
import "jest-styled-components";
import "@testing-library/jest-dom";
import { MockedProvider } from "@apollo/client/testing";

import { AppApolloProvider } from "../../../apollo/ApolloProvider";
import { GET_MOVIES } from "../../../apollo/graphql/useMovie";
import { ME } from "../../../apollo/graphql/useAuth";
import { IMovie } from "../../../types/IMovie";
import { IUser } from "../../../types/IUser";
import { Home } from "../../../sections/Home";

const mockedData: IMovie[] = [
  {
    id: 1,
    videoId: "2xdsa",
    title: "Title",
    description: "Description",
    url: "http://example.com",
    sharedByUser: {
      id: 1,
      email: "john@example.com",
    },
  },
];
const mockedUser: IUser = {
  id: 1,
  email: "phat@gmail.com",
};
const mocks = [
  {
    request: {
      query: GET_MOVIES,
      variables: {},
    },
    result: {
      data: {
        getMovies: mockedData,
      },
    },
  },
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

describe("Home Page", () => {
  it("Should render the list of movie items", async () => {
    render(
      <AppApolloProvider>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Home />
        </MockedProvider>
      </AppApolloProvider>
    );

    const result = await screen.findByText(mockedData[0].title);
    expect(result).toBeInTheDocument();
  });

  it("Should render nothing", async () => {
    render(
      <AppApolloProvider>
        <Home />
      </AppApolloProvider>
    );

    const result = screen.queryByText(mockedData[0].title);
    expect(result).toBeNull();
  });
});
