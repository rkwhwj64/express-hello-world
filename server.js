const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Tesla OAuth info
const clientId = '3d28e98a-a85d-4ed8-8d49-1f6b48c86e55';
const redirectUri = 'https://henry-magic-mirror.onrender.com/callback';
const scope = 'openid%20offline_access';

app.get('/', (req, res) => {
  const authUrl = 'https://auth.tesla.com/oauth2/v3/authorize' +
    '?client_id=3d28e98a-a85d-4ed8-8d49-1f6b48c86e55' +
    '&response_type=code' +
    '&redirect_uri=https%3A%2F%2Fhenry-magic-mirror.onrender.com%2Fcallback' +
    '&scope=openid%20offline_access' +
    '&state=magicmirror';

  console.log("🚀 Redirecting to Tesla:", authUrl);
  res.redirect(authUrl);
});


app.get('/callback', (req, res) => {
  const { code, state } = req.query;

  if (!code) {
    return res.status(400).send('No auth code received');
  }

  // For now, just show the code
  res.send(`<h2>Authorization code received:</h2><p>${code}</p><p>Use this to request tokens.</p>`);
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
