import gql from "graphql-tag";

export const LOGIN = gql`
  mutation Login($data: UserInput!) {
    login(data: $data) {
      id
    }
  }
`;

export const SIGN_UP = gql`
  mutation SignUp($data: UserInput!) {
    signUp(data: $data) {
      id
    }
  }
`;

export const ME = gql`
  query ME {
    me {
      id
      email
    }
  }
`;

export const LOG_OUT = gql`
  mutation Logout {
    logout
  }
`;
