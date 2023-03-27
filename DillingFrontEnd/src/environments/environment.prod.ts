declare var require: any;
export const environment = {
  appVersion: require('../../package.json').version + '-prod',
  production: true,
  qa: false,
  environmentName :'Production',
  URL : '',
  nSwagUrl : '',

};
