import gql from "graphql-tag";

export const LOGIN = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      id
    }
  }
`;

export const SIGN_UP = gql`
  mutation SignUp($data: LoginInput!) {
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
