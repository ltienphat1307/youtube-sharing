export const catchGraphqlError = (e: any) => {
  if (e.graphQLErrors && e.graphQLErrors.length) {
    const graphQLError = e.graphQLErrors[0];

    return graphQLError.message;
  }

  return e.message;
};
