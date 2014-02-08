
app.directive 'flippable', ->
    restrict: 'C'
    link: (scope, element) ->
        $element = $(element)
        $element.hover ->
            $element.find('.card').toggleClass 'flipped'