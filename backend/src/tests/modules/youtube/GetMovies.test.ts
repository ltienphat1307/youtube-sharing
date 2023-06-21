import "reflect-metadata";
import {
  getCustomRepository,
  useContainer,
  createConnection,
  getConnection,
} from "typeorm";
import { Container } from "typedi";

import { MovieRepository } from "../../../repositories/MovieRepository";
import { GetMovies } from "../../../modules/youtube/GetMovies";

describe("Youtube - Get movies", () => {
  let movieRepository: MovieRepository;
  let module;

  beforeAll(async () => {
    useContainer(Container);
    await createConnection();
    movieRepository = getCustomRepository(MovieRepository);

    jest.spyOn(movieRepository, "find").mockResolvedValue([
      {
        id: 1,
        videoId: "2xdsa",
        title: "Title",
        description: "Description",
        createdAt: new Date(),
        updatedAt: new Date(),
        sharedByUser: {
          id: 1,
          email: "john@example.com",
          password: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
    ]);

    module = new GetMovies(movieRepository);
  });

  afterAll(async () => {
    await getConnection().close();
  });

  it("should return if user does not log in", async () => {
    const ctx: any = { req: { cookies: {} } };
    const data = await module.getMovies(ctx);

    expect(data[0].videoId).toBe("2xdsa");
  });
});
