import angular from 'angular';
import 'angular-ui-router';

angular.module('olympics', ['ui.router'])

  .config(($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise('/sports');

    $stateProvider
      .state('sports', {
        url: '/sports',
        templateUrl: 'sports/sports-nav.html',
        resolve: {
          sportsService: function ($http) {
            return $http.get('/sports');
          }
        },
        controller: 'sportsController',
        controllerAs: 'vm'
      })

      .state('sports.medals', {
        url: '/:sportName',
        templateUrl: 'sports/sports-medals.html',
        resolve: {

          sportService: function ($http, $stateParams) {
            return $http.get(`/sports/${$stateParams.sportName}`);
          }

          // 發展期間適用的 Hard Code 作法：
          // sportService: function ($q) {
          //   return $q((resolve, reject) => {
          //
          //     let sport = {
          //       name: 'Cycling',
          //       goldMedals: [
          //         {
          //           division: 'Men\'s Sprint',
          //           country: 'UK',
          //           year: 2012
          //         },
          //         {
          //           division: 'Women\'s Sprint',
          //           country: 'Australia',
          //           year: 2012
          //         }
          //       ]
          //     };
          //
          //     resolve({data: sport});
          //   });
          // }
        },
        controller: 'sportController',
        controllerAs: 'vm'
      })

      .state('sports.new', {
        url: '/:sportName/medal/new',
        templateUrl: 'sports/new-medal.html',
        controller: 'NewMedalController',
        controllerAs: 'vm'
      })
  })

  .controller('sportsController', ['sportsService', '$location',
    function (sportsService, $location) {

    this.sports = sportsService.data;

    this.isActive = (sport) => {
      let pathRegExp = /sports\/(\w+)/;
      let match = pathRegExp.exec($location.path());
      if (match === null || match.length === 0) return false;

      let selectedSportName = match[1];
      return sport === selectedSportName;
    };

  }])

  .controller('sportController', ['sportService', function (sportService) {

    this.sport = sportService.data;

  }])

  .controller('NewMedalController', ['$stateParams', '$state', '$http',
    function ($stateParams, $state, $http) {

    this.sportName = $stateParams.sportName;

    this.saveMedal = (medal) => {
      // console.log('medal=', medal);

      $http({
        method: 'POST',
        url: `/sports/${$stateParams.sportName}/medals`,
        data: {medal}
      })
        .then((response) => {
          $state.go('sports.medals', {
            sportName: $stateParams.sportName
          });
        });
    };
  }])
  ;
