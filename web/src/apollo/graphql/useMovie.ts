import gql from "graphql-tag";

export const SHARE_MOVIE = gql`
  mutation ShareMovie($data: ShareMovieInput!) {
    shareMovie(data: $data) {
      id
    }
  }
`;

export const GET_MOVIES = gql`
  query GetMovies {
    getMovies {
      id
      title
      videoId
      description
      sharedByUser {
        id
        email
      }
    }
  }
`;
