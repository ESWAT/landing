app.service 'Testimonials', ($rootScope) ->
    $rootScope.showMainTestimonial = false
    scope.open = ->
        $rootScope.showMainTestimonial = true

app.directive 'readMore', (Testimonials) ->
    restrict: 'C'
    scope: true
    link: (scope, element) ->
        scope.showMain = -> Testimonials.open()
