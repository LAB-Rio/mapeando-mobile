angular.module("mapeando").factory('demandFactory', function($resource, API) {
  return $resource(API.url + "/demands/:id", { id: "@id", format: 'json' },
    {
      'index':   { method: 'GET', isArray: false },
      'show':    { method: 'GET', isArray: false }
    }
  );
});

