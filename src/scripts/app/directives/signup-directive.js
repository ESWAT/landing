
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


app.directive('viewHeader', function($window, $rootScope) {
    return {
        restrict: 'C',
        link: function (scope, element) {
            var $element = $(element);

            $rootScope.contactUs = {}
            $rootScope.contactUs.isVisible = false;

            $rootScope.contactUs.show = function () {
                $rootScope.contactUs.isVisible = true;
            }

            $rootScope.contactUs.hide = function() {
                $rootScope.contactUs.isVisible = false;
            }

            $rootScope.contactUs.toggle = function() {
                $rootScope.contactUs.isVisible = !$rootScope.contactUs.isVisible;
            }

            $rootScope.$on('$stateChangeSuccess', function() {
                $rootScope.contactUs.hide();
            });
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

                    $('#menu-toggle').css('position', 'fixed');

                    $('.main li a').on('click', function () {
                        $('.view-header nav ul.main').hide();
                        $('.hamburger').removeClass('toggled');
                        toggled = false;

                        $('#menu-toggle').css('position', 'absolute');
                    });

                } else {
                    this.className = this.className.replace(/\b\stoggled\b/,'');
                    toggled = false;

                    $('#menu-toggle').css('position', 'absolute');
                }
            }, false);
        }
    }
});


app.directive('heroImgContain', function($window, isMobile) {

    var $window = $($window);

    var scrollFade = function ($element, friction, offset) {
        friction  = (friction  === undefined)? 0.5 : friction;
        offset = (offset === undefined)? 0 : offset;

        var parentHeight = $element.parent().outerHeight() * 0.5;

        $window.scroll(function() {
            var scrollTop = Math.max(0, $window.scrollTop())
              , yOffset   = scrollTop * friction;
              // , opacity   = 1 - (scrollTop / parentHeight - (parentHeight * offset))

            // if (opacity < 0 && previousOpacity < 0) return;

            $element.css({
                transform: 'translate3d(0px,'+ yOffset +'px, 0)',
                // opacity: opacity
            });

        });
    }

    return {
        restrict: 'C',
        link: function(scope, element) {
            if (isMobile) return;

            var $element = $(element);
            scrollFade($element
                , 0.3  // Friction (0 ~ 1): lower = none
                , 0    // Fade duration (0 ~ 1): lower = longer
            );
        }
    };
});


app.directive('homeHeroImage', function($window, isMobile) {

    var $window = $($window);

    var scrollFade = function ($element, friction, offset) {
        friction  = (friction  === undefined)? 0.5 : friction;
        offset = (offset === undefined)? 0 : offset;

        var parentHeight = $element.parent().outerHeight() * 0.5;

        $window.scroll(function() {
            var scrollTop = Math.max(0, $window.scrollTop())
              , yOffset   = -scrollTop * friction;
              // , opacity   = 1 - (scrollTop / parentHeight - (parentHeight * offset))

            // if (opacity < 0 && previousOpacity < 0) return;

            $element.css({
                transform: 'translate3d(0px,'+ yOffset +'px, 0)',
                // opacity: opacity
            });

        });
    }

    return {
        restrict: 'C',
        link: function(scope, element) {
            if (isMobile) return;

            var $element = $(element);
            scrollFade($element
                , 0.1  // Friction (0 ~ 1): lower = none
                , 0    // Fade duration (0 ~ 1): lower = longer
            );
        }
    };
});



app.directive('heroPoints', function($window, isMobile) {

    var $window = $($window);

    var scrollFade = function ($element, friction, offset) {
        friction  = (friction  === undefined)? 0.5 : friction;
        offset = (offset === undefined)? 0 : offset;

        var parentHeight = $element.parent().outerHeight() * 0.5;
        var previousOpacity = Infinity;

        $window.scroll(function() {
            var scrollTop = Math.max(0, $window.scrollTop())
              , yOffset   = ($element.outerHeight() * -0.5) + scrollTop * friction
              , opacity   = 1 - (scrollTop / parentHeight - (parentHeight * offset))

            if (opacity < 0 && previousOpacity < 0) return;

            $element.css({
                transform: 'translate3d(0px,'+ yOffset +'px, 0)',
                opacity: opacity
            });

            previousOpacity = opacity;
        });
    }

    return {
        restrict: 'C',
        link: function(scope, element) {
            if (isMobile) return;

            var $element = $(element);
            scrollFade($element
                , 0.5  // Friction (0 ~ 1): lower = none
                , 0    // Fade duration (0 ~ 1): lower = longer
            );
        }
    };
});


