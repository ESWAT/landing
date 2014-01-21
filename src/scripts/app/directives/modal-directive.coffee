
app.factory 'Modal', -> 
    return ->
        visible = false
        show: -> visible = true
        hide: -> visible = false
        isVisible: ->
            return visible


app.directive 'modal', (Modal) ->
    restrict: 'E'
    scope:
        model: '='
    transclude: true
    replace: true
    template: """
    <article class="modal animation-fade" ng-show="model.isVisible()">
        <article class="modal-overlay" ng-click="model.hide()"></article>
        <section class="modal-content" ng-transclude></section>
    </article>
    """
    link: (scope, element) ->
        scope.model = new Modal()