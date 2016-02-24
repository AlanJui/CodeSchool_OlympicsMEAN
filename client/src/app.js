import angular from 'angular';

angular.module('olympics', [])
  .controller('sportsController', ['$http', function ($http) {

    $http.get('/sports')
      .then( (response) => {
        this.sports = response.data;
      });
  }]);
