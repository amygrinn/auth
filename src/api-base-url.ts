declare global {
  // eslint-disable-next-line no-var, no-inner-declarations
  var AUTH_API_BASE_URL: string | undefined;
}

export default global.AUTH_API_BASE_URL || '';
