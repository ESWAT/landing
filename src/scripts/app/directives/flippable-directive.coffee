
app.directive 'flippable', ->
    restrict: 'C'
    link: (scope, element) ->
        $element = $(element)
        $element.hover ->
            console.log "flipped"
            $element.find('.card').toggleClass 'flipped'