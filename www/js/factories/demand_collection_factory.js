angular.module("mapeando").factory('demandCollectionFactory', function($resource, API) {
  return {
    all: {},
    getCollection: function() {
     return this.all;
    },
    setCollection: function(demands) {
      this.all = demands;
    }

  }
});


