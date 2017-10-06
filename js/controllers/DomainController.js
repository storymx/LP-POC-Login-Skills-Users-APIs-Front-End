var POCQuickenLoans = angular.module('POCQuickenLoans');

POCQuickenLoans.controller('DomainController',['$scope','$rootScope','$http','$stateParams','$window','$timeout',function($scope,$rootScope,$http,$stateParams,$window,$timeout){

    // var domainURL = 'http://api.liveperson.net/api/account/'+$scope.account+'/service/'+$scope.service+'/baseURI.json?version=1.0';
    $scope.domain = {};
    // $scope.serviceName = '';
    var __baseURL = "http://localhost/liveperson/quickenloans/pocapi/public/domain";

    $scope.getDomain = function(){
        var dom = $scope.domain;
        $http({
            method: "POST",
            url: __baseURL,
            data: dom
        })
        .success(function(response){
            console.log('success: ',response.data);
            $scope.domain = response.data;
        })
        .error(function(err){
            console.log('error: ',err);
        });
    };
    console.log('rootscope: ',$rootScope.mainFunc);
}]);
