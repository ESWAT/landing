app.directive('signupForm', function() {
    return {
        restrict: 'C',
        link: function(scope, element) {
            var $element = $(element);
            var $inputs = $element.find('input');

            var setLabelFocus = (function (focusedClass) {
                return function() {
                    var $input = $(this);
                    var $label = $input.parent();
                    var method = $input.is(":focus")? 'addClass' : 'removeClass';
                    $label[method](focusedClass);
                }                
            })('focus');

            $inputs.on('focus', setLabelFocus);
            $inputs.on('blur',  setLabelFocus);
        }
    }
});


app.directive('viewDemoSignup', function($window) {
    return {
        restrict: 'C',
        link: function(scope, element) {
            var $element = $('body');

            function erf(x) {
                // constants
                var a1 =  0.254829592;
                var a2 = -0.284496736;
                var a3 =  1.421413741;
                var a4 = -1.453152027;
                var a5 =  1.061405429;
                var p  =  0.3275911;

                // Save the sign of x
                var sign = x < 0 ? -1 : 1;
                x = Math.abs(x);

                // A&S formula 7.1.26
                var t = 1.0/(1.0 + p*x);
                var y = 1.0 - (((((a5*t + a4)*t) + a3)*t + a2)*t + a1)*t*Math.exp(-x*x);

                return sign*y;
            }

            var dampen = function(position) {
                var fn = function(a) {
                    return erf(a);
                } 
                return {
                    x: fn(position.x),
                    y: fn(position.y)
                };
            };

            var parallaxElement = function($el, dampeningFactor) {
                return function (position) {
                    position = {
                        x: position.x - 0.5,
                        y: position.y - 0.5
                    }
                    position = dampen(position);
                    position = {
                        x: -(position.x / 30 * 100 * dampeningFactor) + "%",
                        y: -(position.y / 30 * 100 * dampeningFactor) + "%"
                    }
                    var transform = "translate(" + position.x + "," + position.y + ")";
                    $el.css({
                        "-webkit-transform": transform
                    });
                }
            };

            var normalizeMousePosition = function(event) {
                var offset = $element.offset()
                  , width  = $element.width()
                  , height = $element.height();
                return {
                    x: (event.clientX - offset.left) / width,
                    y: (event.clientY - offset.top) / height
                };
            };

            var $els = {
                mountains: $element.find('.image-mountains'),
                lines:     $element.find('.image-lines'),
                form:      $element.find('.signup-form')
            };

            $element.on('mousemove', function(event) {
                var position = normalizeMousePosition(event);
                parallaxElement($els.mountains, 3)(position);
                parallaxElement($els.lines, 1.5)(position);
                parallaxElement($els.form, 1)(position); 
            });
        }
    }
});