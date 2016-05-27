/*globals angular, Prism */

(function init () {
    'use strict';
    angular.module('twerkSASS')
       .config(['$stateProvider', '$urlRouterProvider', 'BASE_PATH', configRoutes])
       .run(['$rootScope', '$state', '$stateParams', run]);

    function run ($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }

    function viewController () {
        Prism.highlightAll();
    }

    function configRoutes ($stateProvider, $urlRouterProvider, BASE_PATH) {
        $urlRouterProvider
            .otherwise('/');

        $stateProvider
            .state('home', {
                url         : '/',
                templateUrl : BASE_PATH + '/index/index.html',
                controller  : viewController
            })

            .state('goals', {
                url         : '/goals',
                templateUrl : BASE_PATH + '/goals/goals.html',
                controller  : viewController
            })

            .state('dotnet', {
                url         : '/dotnet',
                templateUrl : BASE_PATH + '/dotnet/dotnet.html',
                controller  : viewController
            })

            .state('drupal', {
                url         : '/drupal',
                templateUrl : BASE_PATH + '/drupal/drupal.html',
                controller  : viewController
            })

            .state('php', {
                url         : '/php',
                templateUrl : BASE_PATH + '/php/php.html',
                controller  : viewController
            })

            .state('nodejs', {
                url         : '/nodejs',
                templateUrl : BASE_PATH + '/nodejs/nodejs.html',
                controller  : viewController
            });
    }
}());
