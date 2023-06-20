const apiUrl = process.env.GATSBY_API_SERVER_URL || "http://localhost:3000";

export const constants = {
  API_SERVER_URL: apiUrl,
  SOCKET_SERVER_URL:
    process.env.GATSBY_SOCKET_SERVER_URL || "http://localhost:3001",
  GRAPHQL_SERVER_URL: `${apiUrl}/graphql`,
};
