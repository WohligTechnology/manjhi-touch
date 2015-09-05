angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'

      }
    }
  })

  .state('app.artists', {
    url: '/artists',
    views: {
      'menuContent': {
        templateUrl: 'templates/artists.html',
        controller: 'AppCtrl'

      }
    }
  })

  .state('app.paintings', {
    url: '/paintings',
    views: {
      'menuContent': {
        templateUrl: 'templates/paintings.html',
        controller: 'AppCtrl'

      }
    }
  })

  .state('app.cart', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/cart.html',
        controller: 'AppCtrl'

      }
    }
  })

  .state('app.profile', {
    url: '/profile',
    views: {
      'menuContent': {
        templateUrl: 'templates/profile.html',
        controller: 'AppCtrl'

      }
    }
  })

  ;

  $urlRouterProvider.otherwise('/app/home');
});
