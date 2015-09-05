angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
})

.controller('HomeCtrl', function($scope, $stateParams) {
$scope.searchbar = false;
        $scope.toggleSearchbar = function () {
            $scope.searchbar = $scope.searchbar === false ? true : false;
        };
    
});
