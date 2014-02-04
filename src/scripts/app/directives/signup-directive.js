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

app.directive('viewDemoSignup', function(Utils) {
    return {
        restrict: 'C',
        link: function(scope, element) {

            var $body = $('body')
              , $element = $(element)
              , $parallaxElements = {
                    mountains: $element.find('.image-mountains'),
                    lines:     $element.find('.image-lines'),
                    form:      $element.find('.signup-form')
                };

            var dampen = function(position, sauce) {
                return {
                    x: -Utils.erf(position.x) / 30 * sauce,
                    y: -Utils.erf(position.y) / 60 * sauce
                };
            };

            var stringify = function(position) {
                return {
                    x: (position.x * 100) + "%",
                    y: (position.y * 100) + "%"
                };
            };

            var parallax = function(sauce, $element) {
                return function (position) {
                    position = dampen(position, sauce);
                    position = stringify(position);
                    $element.css({
                        "transform":"translate("+ position.x +","+ position.y +")"
                    });
                }
            };

            var normalize = function(event) {
                var offset = $element.offset()
                  , width  = $element.width()
                  , height = $element.height();
                return {
                    x: ((event.clientX - offset.left) / width) - 0.5,
                    y: ((event.clientY - offset.top) / height) - 0.5
                };
            };

            $body.on('mousemove', function(event) {
                var position = normalize(event);
                [   parallax(2.25, $parallaxElements.mountains)
                ,   parallax(1.5, $parallaxElements.lines)
                ,   parallax(1, $parallaxElements.form)
                ]
                .forEach(function(fn) { fn(position) });
            });
        }
    }
});