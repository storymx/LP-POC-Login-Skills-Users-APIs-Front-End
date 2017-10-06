var POCQuickenLoans = angular.module('POCQuickenLoans');

POCQuickenLoans.service('OptionsService',function($rootScope){
    $this.options = [];
});

POCQuickenLoans.service('NetworkService',function($http){
    //Users
    this.user = {};
    this.userUpdate = {
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
          58376214
       ],
       "email": "sindyluevano@gmail.com",
       "profiles": [
          {
             "id": 58376214,
             "roleTypeId": 2,
             "name": "Agent"
          }
       ],
       "fullName": "sindy lizbeth",
       "passwordSh": "Password1!"
    };
    this.users = [];
});
