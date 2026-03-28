export const environment = {
  production: false,
  apiBaseUrl: 'https://api.example.com/pbm',
  okta: {
    issuer: 'https://tenant.okta.com/oauth2/default',
    clientId: 'OKTA_CLIENT_ID',
    redirectUri: 'http://localhost:4200/auth/callback'
  }
};
