declare var require: any;
export const environment = {
  appVersion: require('../../package.json').version + '-qa',
  production: false,
  qa: true,
  apiBaseUrl: '',
  nSwagUrl : ""
};
