/*globals angular, Prism */

(function init () {
    'use strict';
    angular.module('twerkSASS', [
        'ui.router',
        'ngAnimate'
    ])
       .run(['$rootScope', '$state', '$stateParams', run])
       .config(['$stateProvider', '$urlRouterProvider', configRoutes]);

    function run ($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }

    function viewController () {
        Prism.highlightAll();
    }

    function configRoutes ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider
            .otherwise('/');

        $stateProvider
            .state('home', {
                url         : '/',
                templateUrl : '/app/index/index.html',
                controller  : viewController
            })

            .state('goals', {
                url         : '/goals',
                templateUrl : '/app/goals/goals.html',
                controller  : viewController
            })

            .state('dotnet', {
                url         : '/dotnet',
                templateUrl : '/app/dotnet/dotnet.html',
                controller  : viewController
            })

            .state('drupal', {
                url         : '/drupal',
                templateUrl : '/app/drupal/drupal.html',
                controller  : viewController
            })

            .state('php', {
                url         : '/php',
                templateUrl : '/app/php/php.html',
                controller  : viewController
            })

            .state('nodejs', {
                url         : '/nodejs',
                templateUrl : '/app/nodejs/nodejs.html',
                controller  : viewController
            });
    }
}());
