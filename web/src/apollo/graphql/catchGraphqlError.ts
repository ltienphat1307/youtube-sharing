export const catchGraphqlError = (e: any) => {
  if (e.graphQLErrors && e.graphQLErrors.length) {
    return e.graphQLErrors[0].message;
  }

  return e.message;
};
