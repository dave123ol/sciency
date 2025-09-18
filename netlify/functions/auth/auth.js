const fetch = require("node-fetch");

exports.handler = async function (event) {
  const client_id = process.env.GITHUB_CLIENT_ID;
  const client_secret = process.env.GITHUB_CLIENT_SECRET;

  if (event.queryStringParameters.code) {
    const code = event.queryStringParameters.code;

    const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new URLSearchParams({
        client_id,
        client_secret,
        code,
      }),
    });

    const tokenData = await tokenResponse.json();

    return {
      statusCode: 200,
      body: JSON.stringify(tokenData),
    };
  }

  return {
    statusCode: 400,
    body: JSON.stringify({ error: "Missing code parameter" }),
  };
};
