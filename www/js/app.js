// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('mapeando', ['ionic', 'ionic-material', 'leaflet-directive', 'ngCordova', 'ngResource'])

.run(function($ionicPlatform, $cordovaStatusbar) {

  $ionicPlatform.ready(function() {

    $cordovaStatusbar.styleHex('#444');

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar && window.cordova.platform == 'android') {
  		window.StatusBar.backgroundColorByHexString('#555');
    }
  });

}).config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  $ionicConfigProvider.scrolling.jsScrolling(false);

  
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'templates/home.html',
      controller: 'HomeCtrl'
    })
    .state('demands', {
      url: '/demands',
      templateUrl: 'templates/demands.html'
    });

}).constant('API', {
  "url": "https://lab-map.herokuapp.com"
});
