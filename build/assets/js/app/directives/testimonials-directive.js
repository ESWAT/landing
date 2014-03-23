(function() {
  app.service('Testimonials', function() {
    return [
      {
        name: "Uri Minkoff",
        title: "CEO, Rebecca Minkoff",
        quote: "One of the most disruptive things on the front-end that we’ve seen in a while.",
        href: "http://rebeccaminkoff.com",
        image: "/assets/images/heads/quotes/uri.jpg"
      }, {
        name: "Dino Ha",
        title: "CEO, memebox",
        href: "http://us.memebox.com",
        quote: "We wouldn’t be able to live without 42. When you have a lot of numbers it’s hard to know where to focus, with 42 you can find out in just a few clicks.",
        image: "/assets/images/heads/quotes/dino-memebox.png"
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
              return scope.$apply();
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
