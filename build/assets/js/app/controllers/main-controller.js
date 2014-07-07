(function() {
  app.controller('MainController', function($rootScope, $scope, $animate) {
    $scope.isDemoFlow = false;
    return $rootScope.$on('$stateChangeSuccess', function(event, state) {
      $scope.isDemoFlow = state.name.indexOf('root.demo') === 0;
      return $scope.isHome = state.name.indexOf('root.home') === 0;
    });
  });

  app.factory('LandingAPI', function($http, config) {
    return function(_arg) {
      var url;
      url = (_arg != null ? _arg : {}).url;
      if (url == null) {
        url = config.services.landing.url;
      }
      return {
        sendDemoRequest: function(request) {
          var endpoint;
          endpoint = '/demo/request';
          return $http.post("" + url + endpoint, request);
        }
      };
    };
  });

  app.controller('SignupController', function($scope, segmentio, LandingAPI) {
    var landingAPI;
    landingAPI = new LandingAPI();
    $scope.view = 'signup';
    $scope.request = {};
    return $scope.submit = function() {
      var request;
      request = $scope.request;
      console.log("Sending demo request:");
      console.log(request);
      segmentio.track("Demo Request", request);
      landingAPI.sendDemoRequest(request).then((function() {
        return console.log("Demo request sent successfully.");
      }), (function() {
        return console.error('could not send demo request..');
      }));
      return $scope.view = 'thanks';
    };
  });

}).call(this);
