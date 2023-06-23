import React from "react";
import { render, screen } from "@testing-library/react";
import "jest-styled-components";
import "@testing-library/jest-dom";
import { MockedProvider } from "@apollo/client/testing";

import ApolloProvider from "../../../apollo/ApolloProvider";
import { GET_MOVIES } from "../../../apollo/graphql/useMovie";
import { IMovie } from "../../../types/IMovie";
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
];

describe("Home Page", () => {
  it("Should render the list of movie items", async () => {
    render(
      <ApolloProvider>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Home />
        </MockedProvider>
      </ApolloProvider>
    );

    const result = await screen.findByText(mockedData[0].title);
    expect(result).toBeInTheDocument();
  });

  it("Should render nothing", async () => {
    render(
      <ApolloProvider>
        <Home />
      </ApolloProvider>
    );

    const result = screen.queryByText(mockedData[0].title);
    expect(result).toBeNull();
  });
});
