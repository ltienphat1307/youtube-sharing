import "reflect-metadata";
import {
  getCustomRepository,
  useContainer,
  createConnection,
  getConnection,
} from "typeorm";
import { Container } from "typedi";
import http from "http";

import { initSocket } from "../../../socket";
import { MovieRepository } from "../../../repositories/MovieRepository";
import { ShareMovie } from "../../../modules/youtube/ShareMovie";

describe("Auth Module - Share a movie", () => {
  let movieRepository: MovieRepository;
  let module;
  const mockedUser = {
    id: 1,
    email: "phat@gmail",
    password: "123456",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockedMovie = {
    id: 1,
    videoId: "2xdsa",
    title: "Title",
    description: "Description",
    createdAt: new Date(),
    updatedAt: new Date(),
    sharedByUser: mockedUser,
  };

  beforeAll(async () => {
    // fetchMock.enableMocks();
    useContainer(Container);
    await createConnection();
    movieRepository = getCustomRepository(MovieRepository);

    jest
      .spyOn(movieRepository, "create")
      .mockResolvedValue(mockedMovie as never);
    jest.spyOn(movieRepository, "save").mockResolvedValue(mockedMovie as never);

    const mockedFetchData = {
      items: [
        {
          snippet: {
            title: "Song list",
            description: "2023",
          },
        },
      ],
    };
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockedFetchData),
      })
    ) as jest.Mock;

    const httpServer = http.createServer();
    initSocket(httpServer);

    module = new ShareMovie(movieRepository);
  });

  afterAll(async () => {
    await getConnection().close();
  });

  it("should throw error if url is not Youtube", async () => {
    const ctx: any = {
      req: { cookies: {} },
      res: { locals: { user: mockedUser } },
    };
    const inputData = { url: "https://example.com" };

    try {
      const result = await module.shareMovie(ctx, inputData);
      expect(result).toBeNull();
    } catch (ex) {
      expect(ex.message).toEqual(`Please enter valid Youtube URL`);
    }
  });

  it("should share a movie", async () => {
    const ctx: any = {
      req: { cookies: {} },
      res: { locals: { user: mockedUser } },
    };
    const inputData = { url: "https://www.youtube.com/watch?v=wGBaE9dvf8I" };
    const result = await module.shareMovie(ctx, inputData);

    expect(result).toEqual(mockedMovie);
  });
});
