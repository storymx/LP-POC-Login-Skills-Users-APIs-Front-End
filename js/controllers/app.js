var POCQuickenLoans = angular.module('POCQuickenLoans',['ui.router','ngAnimate']);
//ASK WHATS THE NAME FOR THE TOKEN.
//ASK IF SERVER ALLOWS CROSS ORIGIN.
POCQuickenLoans.config(['$stateProvider','$urlRouterProvider','$httpProvider',function($stateProvider,$urlRouterProvider,$httpProvider){
    // $httpProvider.defaults.headers.common['Authorization'] = 'OAuth aa429943c1aab6152c0ded6acf85f1c1cc94813c00703c1c4a2d188cf6313063';
    $stateProvider.state('home',{
        url: '/',
        views:{
            'home-content':{
                templateUrl: 'views/body/home/home.html'
            }
        }
    })
    .state('domain',{
        url: '/domain',
        views: {
            // 'navbar':{
            //     templateUrl: 'views/header/navbar.html',
            //     controller: 'NavbarController'
            // },
            'domain-content':{
                templateUrl:'views/body/home/domain.html',
                controller: 'DomainController'
            }
        }
    })
    .state('authentication',{
        url: '/authentication',
        views: {
            // 'navbar':{
            //     templateUrl: 'views/header/navbar.html',
            //     controller: 'NavbarController'
            // },
            'authentication-content':{
                templateUrl: 'views/body/home/authentication.html',
                controller: 'AuthenticationController'
            }
        }
    })
    .state('skills',{
        url:'/skills/:bearer',
        views: {
            // 'navbar':{
            //     templateUrl: 'views/header/navbar.html',
            //     controller:'NavbarController'
            // },
            'skills-content':{
                templateUrl:'views/body/home/skills.html',
                controller: 'SkillsController'
            }
        }
    })
    .state('users',{
        url: '/users/:bearer',
        views: {
            // 'navbar':{
            //     templateUrl: 'views/header/navbar.html',
            //     controller: 'NavbarController'
            // },
            'users-content': {
                templateUrl: 'views/body/home/users.html',
                controller: 'UsersController'
            }
        }
    })
    .state('404',{
        url: '/404',
        views: {
            // 'navbar':{
            //     templateUrl: 'views/header/navbar.html',
            //     controller: 'NavbarController'
            // },
            '404-content': {
                templateUrl: 'views/notfound/404.html'
            }
        }
    });

    $urlRouterProvider.otherwise('/');

}]);
