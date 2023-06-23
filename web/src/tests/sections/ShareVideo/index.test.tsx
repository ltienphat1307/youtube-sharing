import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { GraphQLError } from "graphql";

import ApolloProvider from "../../../apollo/ApolloProvider";
import { SHARE_MOVIE } from "../../../apollo/graphql/useMovie";
import { ShareVideo } from "../../../sections/ShareVideo";
import { toast } from "../../../components/Toast";

const mockedMovie = {
  id: 1,
};
const youtubeURl = "https://www.youtube.com/watch?v=ZFXeJanDURU";

function createMockData(error?: string) {
  let result;

  if (error) {
    result = { errors: [new GraphQLError(error)] };
  } else {
    result = {
      data: { shareMovie: mockedMovie },
    };
  }

  return [
    {
      request: {
        query: SHARE_MOVIE,
        variables: {
          data: { url: youtubeURl },
        },
      },
      result,
    },
  ];
}

describe("Share Video Page", () => {
  it("Should validate input fields", async () => {
    render(
      <ApolloProvider>
        <ShareVideo />
      </ApolloProvider>
    );

    const urlInput = screen.getByRole("textbox");
    const btnSubmit = screen.getByRole("button");

    await waitFor(() => fireEvent.submit(btnSubmit));
    let errorText = await screen.findAllByText("This field is required");
    expect(errorText).toHaveLength(1);

    fireEvent.input(urlInput, {
      target: {
        value: "http://localhost:8000/share/",
      },
    });

    await waitFor(() => fireEvent.submit(btnSubmit));
    errorText = await screen.findAllByText("Please enter valid Youtube URL");
    expect(errorText).toHaveLength(1);
  });

  it("Should render error from server", async () => {
    const mockedError = "Please enter valid Youtube URL";
    const mocks = createMockData(mockedError);

    render(
      <ApolloProvider>
        <MockedProvider mocks={mocks} addTypename={false}>
          <ShareVideo />
        </MockedProvider>
      </ApolloProvider>
    );

    const urlInput = screen.getByRole("textbox");
    const btnSubmit = screen.getByRole("button");

    fireEvent.input(urlInput, {
      target: {
        value: youtubeURl,
      },
    });

    await waitFor(() => fireEvent.submit(btnSubmit));
    expect(await screen.findByLabelText("server-error")).toBeInTheDocument();
  });

  it("Should create", async () => {
    jest.spyOn(toast, "success");

    const mocks = createMockData();

    render(
      <ApolloProvider>
        <MockedProvider mocks={mocks} addTypename={false}>
          <ShareVideo />
        </MockedProvider>
      </ApolloProvider>
    );

    const urlInput = screen.getByRole("textbox");
    const btnSubmit = screen.getByRole("button");

    fireEvent.input(urlInput, {
      target: {
        value: youtubeURl,
      },
    });

    await waitFor(() => fireEvent.submit(btnSubmit));
    await waitFor(() => expect(toast.success).toHaveBeenCalledTimes(1));
  });
});
