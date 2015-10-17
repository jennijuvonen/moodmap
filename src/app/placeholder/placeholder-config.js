angular
  .module('application.placeholder', ['ui.router'])
  .config(PlaceholderConfig);

PlaceholderConfig.$inject = ['$stateProvider'];

function PlaceholderConfig($stateProvider) {
  $stateProvider.state( 'placeholder', {
    url: '/placeholder',
    views: {
      "main": {
        controller: 'PlaceholderController',
        templateUrl: 'placeholder/placeholder.tpl.html'
      }
    }
  });
}
