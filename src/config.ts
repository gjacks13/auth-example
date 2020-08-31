let config = {
  clientId: 'UD3t6vqbvUDFmMEc0fJCt7IBI6iRs93p',
  domain: 'unctechtalk2020.us.auth0.com',
  resource: 'unctechtalk2020-audience',
  apiUrl: '/',
};

if (window.location.host.includes('localhost')) {
  config = {
    ...config,
    apiUrl: '', // requests will be proxied locally
  };
}

export default config;
