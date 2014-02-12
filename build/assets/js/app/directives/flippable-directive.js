(function() {
  app.directive('flippable', function() {
    return {
      restrict: 'C',
      link: function(scope, element) {
        var $element;
        $element = $(element);
        return $element.hover(function() {
          return $element.find('.card').toggleClass('flipped');
        });
      }
    };
  });

}).call(this);
