const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const auth0BaseUrl = process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL

// This function is used to fetch an access token from Auth0 machine-to-machine API authenticator.
async function getAccessToken() {
  const data = new URLSearchParams();
  data.append('client_id', process.env.NEXT_PUBLIC_API_CLIENT_ID);
  data.append('client_secret', process.env.NEXT_PUBLIC_API_CLIENT_SECRET);
  data.append('audience', process.env.NEXT_PUBLIC_API_AUDIENCE);
  data.append('grant_type', 'client_credentials');

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: data.toString(),
  };

  try {
    const response = await fetch(`${auth0BaseUrl}/oauth/token`, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    return data.access_token;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// This function is used to fetch data from backend APIs. Must to have access token issued from Auth0 in authorization header.
export async function fetcher([url, userId]) {
  const accessToken = await getAccessToken();

  if (accessToken) {
    const response = userId ?
      await fetch(`${apiUrl}${url}`, {
        headers: {
          'Authorization': `bearer ${accessToken}`,
          'x-user-info': userId, // Convert userInfo to a JSON string
        },
      }) :
      await fetch(`${apiUrl}${url}`, {
        headers: {
          'Authorization': `bearer ${accessToken}`,
        },
      })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } else {
    throw new Error('Failed to fetch data: ' + error.message);
  }
}
