(function() {
  app.factory('Modal', function() {
    return function() {
      var visible;
      visible = false;
      return {
        show: function() {
          return visible = true;
        },
        hide: function() {
          return visible = false;
        },
        isVisible: function() {
          return visible;
        }
      };
    };
  });

  app.directive('modal', function(Modal) {
    return {
      restrict: 'E',
      scope: {
        model: '='
      },
      transclude: true,
      replace: true,
      template: "<article class=\"modal animation-fade\" ng-show=\"model.isVisible()\">\n    <article class=\"modal-overlay\" ng-click=\"model.hide()\"></article>\n    <section class=\"modal-content\" ng-transclude></section>\n</article>",
      link: function(scope, element) {
        return scope.model = new Modal();
      }
    };
  });

}).call(this);
