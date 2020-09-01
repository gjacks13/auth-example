let config = {
  clientId: 'UD3t6vqbvUDFmMEc0fJCt7IBI6iRs93p',
  domain: 'unctechtalk2020.us.auth0.com',
  resource: 'unctechtalk2020-audience',
  apiUrl: 'https://unctechtalk2020.herokuapp.com',
};

if (window.location.host.includes('localhost')) {
  config = {
    ...config,
  };
}

export default config;
