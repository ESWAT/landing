(function() {
  app.service('Testimonials', function() {
    return [
      {
        name: "Uri Minkoff",
        title: "CEO, Rebecca Minkoff",
        quote: "One of the most disruptive things on <br> the front-end that we’ve seen in a while.",
        image: "http://placekitten.com/100/100"
      }, {
        name: "Phoebe Yu",
        title: "INVESTMENT BANKING ANALYST, MERRILL LYNCH",
        quote: "I love that it’s personalized and not generic. <br> It will bring me into stores and make me feel closer to the brand.",
        image: "http://placekitten.com/100/100"
      }
    ];
  });

  app.directive('testimonials', function(Testimonials) {
    return {
      restrict: 'C',
      link: function(scope) {
        scope.selected = null;
        scope.carousel = {
          timer: [],
          state: {
            index: 0
          },
          start: function() {
            var _this = this;
            console.log('starting carousel');
            this.stop();
            return this.timer = setInterval((function() {
              _this.state.index += 1;
              scope.$apply();
              return console.log('updating index', _this.state.index);
            }), 3000);
          },
          stop: function() {
            clearInterval(this.timer);
            return this.timer = null;
          }
        };
        scope.select = function(index) {
          scope.carousel.stop();
          return scope.carousel.state.index = index;
        };
        scope.$watch('carousel.state.index', function(index) {
          if (_.isUndefined(index)) {
            return;
          }
          scope.carousel.state.index = index = index % scope.testimonials.length;
          return scope.selected = scope.testimonials[index];
        });
        scope.testimonials = Testimonials;
        return scope.carousel.start();
      }
    };
  });

}).call(this);
