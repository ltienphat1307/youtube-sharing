export const catchGraphqlError = (e: any) => {
  return e.graphQLErrors && e.graphQLErrors[0] && e.graphQLErrors[0].message;
};
