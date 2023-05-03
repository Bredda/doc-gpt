(function (window) {
  window['env'] = window['env'] || {};

  // Environment variables
  window['env']['API_URL'] = '${BACKEND_BASE_URL}';
})(this);
