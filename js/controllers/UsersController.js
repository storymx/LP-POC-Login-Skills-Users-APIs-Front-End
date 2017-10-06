var POCQuickenLoans = angular.module('POCQuickenLoans');

POCQuickenLoans.controller('UsersController',['$scope','$rootScope','$http','$window','$stateParams','$timeout',
    function($scope,$rootScope,$http,$window,$stateParams,$timeout){

    var baseURL = "http://localhost/liveperson/quickenloans/pocapi/public/";

    $scope.auth = $rootScope.auth;
    $scope.options = [{"value":0,"description":"Get Users"},{"value":1,"description":"Get User by ID"},{"value":2,"description":"Create Users"},{"value":3,"description":"Update User"}];
    $scope.skills = [];
    $scope.skillsForUser = [];
    $scope.selectedSkill = {};
    $scope.user = {};
    // $scope.profiles = [{id:00120293,name: "profile 3"},{id:1083091,name: "profile 3"},{id:0280012,name: "profile 3"}];
    $scope.selectedProfile = {};
    $scope.permissionGroups = [];
    $scope.selectedPermission = {};
    $scope.userUpdate = {
        "skills": [],
       "managerOf": [],
       "employeeId": "",
       "memberOf": {
          "agentGroupId": -1
       },
       "managedAgentGroups": [],
       "changePwdNextLogin": false,
       "permissionGroups": [
          0
       ],
       "isApiUser": false,
       "lobs": [],
       "maxChats": 1,
       "loginName": "sindymgw",
       "skillIds": [],
       "nickname": "sindymgw",
       "allowedAppKeys": "",
       "userTypeId": 1,
       "deleted": false,
       "isEnabled": true,
       "isActive": true,
       "profileIds": [
          58376214,
          58375914,
          58376114,
          58376014
       ],
       "email": "sindyluevano@gmail.com",
       "profiles": [
          {
             "id": 58375914,
             "roleTypeId": 4,
             "name": "Campaign Manager"
          },
          {
             "id": 58376014,
             "roleTypeId": 3,
             "name": "Agent Manager"
          },
          {
             "id": 58376114,
             "roleTypeId": 1,
             "name": "Administrator"
          },
          {
             "id": 58376214,
             "roleTypeId": 2,
             "name": "Agent"
          }
       ],
       "fullName": "sindy lizbeth",
       "passwordSh": "Password1!"
    };
    $scope.users = [];
    $scope.user_id = '';
    $scope.agentgroups = [];
    //--change and reset password
    $scope.changePassword = false;
    $scope.resetPassword = false;


    $scope.getUsers = function(){
        $http({
            method:'POST',
            url: baseURL+"getusers",
            data: {"bearer":$rootScope.auth.bearer,"account":$rootScope.auth.account}
        }).success(function(response){
            console.log('Response: ',response);
            $scope.users = response.data;
            $scope.header = response.header;
            console.log('etag: ',response.header.ETag);
            $rootScope.auth.ETag = response.header.ETag;
        }).error(function(err){
            console.log('err: ',err);
        });
    };

    $scope.getUserById = function(id){
        $scope.user_id = id;
        $http({
            method: 'POST',
            url: baseURL+'getuserbyid',
            data: {"user_id":id,"account":$rootScope.auth.account,"bearer":$rootScope.auth.bearer}
        }).success(function(response){
            $scope.user = response.data;
            $rootScope.auth.ETag = response.header.ETag;
            $scope.auth = $rootScope.auth;
            console.log("getUserbyId",response.data);
            //Poping up elements included in $scope.user from $scope.profiles
            for(var i=0; i<$scope.user.profiles.length; i++){
                for(var j=0; j<$scope.profiles.length; j++){
                    if($scope.user.profiles[i].id == $scope.profiles[j].id){
                        $scope.profiles.splice(j,1);
                    }
                }
            }
            //Poping up elements included in $scope.user.skill from $scope.skill
            for(var i=0; i<$scope.user.skills.length; i++){
                for(var j=0; j<$scope.skills.length; j++){
                    if($scope.user.skills[i].id == $scope.skills[j].id){
                        $scope.skills.splice(j,1);
                    }
                }
            }

        }).error(function(err){
            console.log(err);
        });
    };

    $scope.createUser = function(user){
        console.log(user);
        $http({
            method: 'POST',
            url: baseURL+'createUser',
            data: {'user':$scope.user,'bearer':$rootScope.auth.bearer,'account':$rootScope.auth.account}
        }).success(function(response){
            console.log('Response: ',response);
        }).error(function(err){
            console.log('err: ',err);
        });
    };

    $scope.updateUser = function(){
        console.log('updating user...');
        $scope.user.permissionGroups = [0];
        $http({
            url: baseURL+"updateuser",
            method: "POST",
            data: {"account":$scope.auth.account,"bearer":$scope.auth.bearer, "ETag":$scope.auth.ETag, "userUpdate":$scope.user}
        }).success(function(response){
            console.log(response);
        }).error(function(err){
            console.log('Error updating User. Error Description: ',err);
        });
    };

    $scope.deleteUser = function(user_id){
        $http({
            method: "POST",
            url: baseURL+"deleteUser",
            data: {
                "account":$rootScope.auth.account,
                "bearer":$rootScope.auth.bearer,
                "user_id":user_id,
                "ETag":$rootScope.auth.ETag
            }
        }).success(function(response){
            console.log(response);
            $scope.users = [];
            $scope.getUsers();
        }).error(function(err){
            console.log('Error deleting User, Error Description: ',err);
        });
    };

    $scope.changeUserPassword = function(){
        $http({
            url: baseURL+"changeuserpassword",
            method: "POST",
            data: {
                "account":$rootScope.auth.account,
                "bearer":$rootScope.auth.bearer,
                "user_id":$scope.user_id,
                "passwords":{
                    "newPassword":$scope.user.passwordSh,
                    "confirmPassword":$scope.user.confirmPassword,
                    "oldPassword":$scope.user.oldPassword
                }
            }
        }).success(function(response){
            console.log(response);
        }).error(function(err){
            console.log('Error Changing User password. Error Description: ',err);
        });
    };

    $scope.resetUserPassword = function(){
        $http({
            url: baseURL+"resetuserpassword",
            method: "POST",
            data: {
                "account":$rootScope.auth.account,
                "bearer":$rootScope.auth.bearer,
                "user_id":$scope.user_id,
                "newPassword":$scope.user.newPassword,
                "ETag":$rootScope.auth.ETag
            }
        }).success(function(response){
            console.log(response);
        }).error(function(err){
            console.log('Error trying to Reset User password. Error Description: ',err)
        });
    };

    //*******TESTING FUNCTIONS*********************************************************************************************

    $scope.showChangePassword = function(){
        if($scope.changePassword == false){
            $scope.changePassword = true;
            $scope.resetPassword = false;
        }else {
            $scope.changePasswprd = false;
            $scope.resetPassword = true
        }
    }
    $scope.showResetPassword = function(){
        if($scope.resetPassword == false){
            $scope.resetPassword = true;
            $scope.changePassword = false;
        }else{
            $scope.resetPassword = false;
            $scope.changePassword = true;
        }
    }

    //works
    $scope.checkOption  = function(selectedOption){
        if(selectedOption == 2 || selectedOption == 1){
            $scope.user = {};
        }
    }
    //works
    $scope.addSkill = function(value){
        $scope.user.skillIds.push(value.id);
        $scope.user.skills.push(value);
        for(var i= 0; i<$scope.skills.length; i++){
            if(value.id == $scope.skills[i].id){
                $scope.skills.splice(i,1);
                break;
            }
        }
        //this line remove last element
        // $scope.skills.pop();
    };
    //works
    $scope.removeSkill = function(value){
        $scope.skills.push(value);
        for(var i=0; i<$scope.user.skills.length; i++){
            if(value.id == $scope.user.skills[i].id){
                $scope.user.skills.splice(i,1);
                $scope.user.skillIds.splice(i,1);
                break
            }
        }
    };

    //works
    $scope.addProfile = function(value){
        console.log("adding: ",value);
        // var tempProfile = value;
        $scope.user.profileIds.push(value.id);
        $scope.user.profiles.push(value);
        for(var i= 0; i<$scope.profiles.length; i++){
             if($scope.profiles[i].id == value.id){
                 $scope.profiles.splice(i,1);
                break;
            }
        }

    };

    //works
    $scope.removeProfile = function(value){
        console.log("removing: ",value);
        $scope.profiles.push(value);
        for(var i=0; i<$scope.user.profiles.length;  i++){
            if(value.id == $scope.user.profiles[i].id){
                $scope.user.profiles.splice(i,1);
                $scope.user.profileIds.splice(i,1);
                break;
            }
        }
    }

    //*******NETWORKIONG HELPERS**************************************************************************************

    $scope.getSkills = function(){
        console.log('getting Skills...');
        $http({
            method:"POST",
            url: baseURL+'getskills',
            data: {"account":$rootScope.auth.account, "bearer":$rootScope.auth.bearer}
        }).success(function(response){
            $scope.skills = response.data;
            console.log('skills: ',response);
        }).error(function(err){
            console.log(err);
        });
    }

    $scope.getProfiles = function(){
        console.log('getting Profiles...');
        $http({
            method: 'POST',
            url: baseURL+'getprofiles',
            data: {"account":$rootScope.auth.account, "bearer":$rootScope.auth.bearer}
        }).success(function(response){
            console.log(response);
            $scope.profiles = response.data;
        }).error(function(err){
            console.log(err);
        });
    };

    // $scope.autoUser = function(){
    //     console.log($scope.userUpdate);
    //     $http({
    //         method: 'POST',
    //         url: baseURL+'createUser',
    //         data: {'userUpdate':$scope.userUpdate,'bearer':$rootScope.auth.bearer,'account':$rootScope.auth.account}
    //     }).success(function(response){
    //         console.log('Response: ',response);
    //     }).error(function(err){
    //         console.log('err: ',err);
    //     });
    // }
    //*******EXECUTABLES*********************************************************************************************
    $scope.getSkills();
    $scope.getProfiles();

}]);
