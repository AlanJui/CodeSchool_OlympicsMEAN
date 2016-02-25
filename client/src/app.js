import angular from 'angular';

angular.module('olympics', [])
  .controller('sportsController', ['$http', function ($http) {

    $http.get('/sports')
      .then( (response) => {
        this.sports = response.data;
      });

    // let self = this;
    // $http.get('/sports')
    //   .then(function (response) {
    //     self.sports = response.data;
    //   });
  }]);
