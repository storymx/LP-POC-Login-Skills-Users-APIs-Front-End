var POCQuickenLoans = angular.module('POCQuickenLoans');

POCQuickenLoans.controller('AuthenticationController',['$scope','$rootScope','$http','$stateParams','$window','$timeout',function($scope,$rootScope,$http,$stateParams,$window,$timeout){

    $scope.auth = {};
    $rootScope.auth = {};

    var __baseURL = "http://localhost/liveperson/quickenloans/pocapi/public/login";

    $scope.login = function(){
        $http({
            method:"POST",
            url: __baseURL,
            data: $scope.auth
        }).success(function(response){
            console.log('DATA: ',response.data.bearer);
            $rootScope.auth = $scope.auth;
            $rootScope.auth.bearer = response.data.bearer;
            console.log("rootscope: ",$rootScope.auth);
            console.log('DATA: ',response);
        }).error(function(err){
            console.log('ERROR: ',err);
        });

    };
    console.log("rootscope: ",$rootScope.auth);
}]);
