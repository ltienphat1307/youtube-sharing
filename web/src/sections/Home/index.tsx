import React from "react";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";

import { GET_MOVIES } from "../../apollo/graphql/useMovie";
import { MovieItem } from "./MovieItem";
import { IMovie } from "../../types/IMovie";
import { NewMovieComing } from "./NewMovieComing";

const Wrapper = styled.div`
  margin: 56px auto 0;
  max-width: 960px;
`;

export const Home = () => {
  const { data, called, loading, refetch } = useQuery(GET_MOVIES);

  if (!called || loading) {
    return null;
  }

  const movies: IMovie[] = data && data.getMovies;

  return (
    <Wrapper>
      <NewMovieComing refetchMovie={refetch} />
      {movies &&
        movies.map((movie) => <MovieItem key={movie.id} movie={movie} />)}
    </Wrapper>
  );
};
