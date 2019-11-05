const extractAccessTokenFromResponse = refreshResponse => {
  if (
    !refreshResponse ||
    !refreshResponse.data ||
    !refreshResponse.data.refreshTokens ||
    !refreshResponse.data.refreshTokens.accessToken
  ) {
    return undefined;
  }

  return refreshResponse.data.refreshTokens.accessToken;
};

export const fetchNewAccessToken = refreshToken => {
  const url = "http://localhost:3000/graphql";

  return (
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
        mutation {
          refreshTokens(input: {
            refreshToken: "${refreshToken}"
          }) {
            accessToken
            refreshToken
            errors {
              field
              message
            }
          }
        }
      `
      })
    })
      .then(response => {
        console.log("got refreshtoken");
        return response.json();
      })
      // convert to json
      .then(extractAccessTokenFromResponse) // extract accessToken if available
      .catch(e => console.log(e))
  );
};
