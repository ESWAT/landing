
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



app.directive('viewDemoSignup', function(Utils, isMobile) {
    return {
        restrict: 'C',
        link: function(scope, element) {
            if (isMobile) return;

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


app.directive('viewHeader', function($window) {
    return {
        restrict: 'C',
        link: function (scope, element) {
            var $element = $(element);

            scope.contactUs = {}
            scope.contactUs.isVisible = false;
            scope.contactUs.show = function () {
                scope.contactUs.isVisible = true;
            }
            scope.contactUs.hide = function() {
                scope.contactUs.isVisible = false;
            }
            scope.contactUs.toggle = function() {
                scope.contactUs.isVisible = !scope.contactUs.isVisible;
            }
        }
    }
});


app.directive('hamburger', function($window) {
    return {
        restrict: 'C',
        link: function (scope, element) {

            var menu = document.getElementById('menu-toggle'),
                toggled = false;

            menu.addEventListener('click', function() {
                $('.view-header nav ul.main').toggle();

                if ( !toggled ) {
                    this.className = this.className + " toggled";
                    toggled = true;

                    $('.main li a').on('click', function () {
                        $('.view-header nav ul.main').hide();
                        $('.hamburger').removeClass('toggled');
                        toggled = false;
                    });

                } else {
                    this.className = this.className.replace(/\b\stoggled\b/,'');
                    toggled = false;
                }
            }, false);
        }
    }
});
