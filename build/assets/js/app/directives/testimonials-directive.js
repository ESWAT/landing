(function() {
  app.service('Testimonials', function($rootScope) {
    $rootScope.showMainTestimonial = false;
    return {
      open: function() {
        return $rootScope.showMainTestimonial = true;
      }
    };
  });

  app.directive('readMore', function(Testimonials) {
    return {
      restrict: 'C',
      scope: true,
      link: function(scope, element) {
        return scope.showMain = function() {
          return Testimonials.open();
        };
      }
    };
  });

}).call(this);
