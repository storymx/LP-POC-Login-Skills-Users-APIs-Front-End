var POCQuickenLoans = angular.module('POCQuickenLoans');

POCQuickenLoans.controller('SkillsController',['$scope','$rootScope','$stateParams','$http','$window','$timeout',function($scope,$rootScope,$stateParams,$http,$window,$timeout){

    $scope.auth = $rootScope.auth;
    $scope.skill_id = '';
    $scope.selectedSkill = {};
    $scope.skills = [];
    $scope.options = [
        {"value":0,"description":"Get Skills"},
        {"value":1,"description":"Get Skill by ID"},
        {"value":2,"description":"Create Skills"},
        {"value":3,"description":"Update Skill"}
        // {"value":4,"description":"Delete Skills"},
        // {"value":3,"description":"Delete Skill"}
    ];
    $scope.skill = {
        "name":""
    };
    $scope.skillForUpdate = {
        "id":0,
        "deleted":false,
        "name":"",
        "description":"",
        "skillOrder":"",
        "maxWaitTime":"",
        "defaultPostChatSurveyId":"",
        "defaultOnlineSurveyId":"",
        "defaultAgentSurveyId":"",
        "dateUpdated":"",
        "skillRoutingConfiguration":"",
        "agentGroupId":"",
        "priority":"",
        "splitPercentage":"",
        "wrapUpTime":"",
        "slaDefaultResponseTime":"",
        "slaUrgentResponseTime":"",
        "slaFirstTimeResponseTime":"",
        "lobsIds":""
    };

    //*******TESTING FUNCTIONS*********************************************************************************************
    $scope.chekOption = function(selectedOption){
        if(selectedOption == 2){
            $scope.skill = {};
        }
    }


    //*******NETWORKING FUNCTIONS*********************************************************************************************
    var baseURL = "http://localhost/liveperson/quickenloans/pocapi/public/";
    $scope.getSkills = function(){
        $http({
            url: baseURL+'getskills',
            method: 'POST',
            data: {"bearer":$scope.auth.bearer,"account":$scope.auth.account}
        }).success(function(response){
            console.log(response);
            $scope.skills = response.data;
            $rootScope.auth.ETag = response.header.ETag;
            console.log(response.data);
        }).error(function(err){
            console.log(err);
        });
    };

    $scope.getSkillById = function(id){
        console.log('firing getskillbyId with ID:',id);
        $http({
            url: baseURL+'getskillbyid',
            method: 'POST',
            data: {"bearer":$scope.auth.bearer,"account":$scope.auth.account,"skill_id":id}
        }).success(function(response){
            console.log(response);
            $scope.skill = response.data;
            $rootScope.auth.ETag = response.header.ETag;
            console.log(response.data);
        }).error(function(err){
            console.log(err);
        });
    };

    $scope.createSkill = function(){
        $http({
            url: baseURL+'createskill',
            method: 'POST',
            data: {"bearer":$scope.auth.bearer,"account":$scope.auth.account,"skill":$scope.skill}
        }).success(function(response){
            console.log(response);
            $scope.skills = response.data;
            console.log(response.data);
        }).error(function(err){
            console.log(err);
        });
    };

    $scope.updateSkill = function(){
        $http({
            url: baseURL+'updateskill',
            method: 'POST',
            data: {"bearer":$scope.auth.bearer,"account":$scope.auth.account,"skill":$scope.skill,"skill_id":$scope.skill.id,"ETag":$rootScope.auth.ETag}
        }).success(function(response){
            console.log(response);
            $scope.skills = response.data;
            console.log(response.data);
        }).error(function(err){
            console.log(err);
        });
    };

    $scope.deleteSkill = function(id){
        $http({
            url: baseURL+'deleteskill',
            method: 'POST',
            data: {"bearer":$scope.auth.bearer,"account":$scope.auth.account,"skill_id":id,"ETag":$rootScope.auth.ETag}
        }).success(function(response){
            console.log(response);
            $scope.skills = response.data;
            console.log(response.data);
        }).error(function(err){
            console.log(err);
        });
    };


}]);
