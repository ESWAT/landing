

app.controller 'MainController', ($rootScope, $scope, $animate) ->
    $scope.isDemoFlow = false

    $rootScope.$on '$stateChangeSuccess', (event, state) ->
        $scope.isDemoFlow = state.name.indexOf('root.demo') is 0
        $scope.isHome     = state.name.indexOf('root.home') is 0


app.controller 'DemoController', ->
