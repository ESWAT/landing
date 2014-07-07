

app.controller 'MainController', ($rootScope, $scope, $animate) ->
    $scope.isDemoFlow = false

    $rootScope.$on '$stateChangeSuccess', (event, state) ->
        $scope.isDemoFlow = state.name.indexOf('root.demo') is 0
        $scope.isHome     = state.name.indexOf('root.home') is 0


app.factory 'LandingAPI', ($http, config) -> ({url} = {}) ->
    url ?= config.services.landing.url
    sendDemoRequest: (request) ->
        endpoint = '/demo/request'
        return $http.post("#{url}#{endpoint}", request)


app.controller 'SignupController', ($scope, segmentio, LandingAPI) ->
    landingAPI = new LandingAPI()

    $scope.view = 'signup'
    $scope.request = {}

    $scope.submit = ->
        request = $scope.request

        console.log "Sending demo request:"
        console.log request

        segmentio.track "Demo Request", request

        landingAPI.sendDemoRequest(request)
        .then (-> console.log "Demo request sent successfully.")
        ,     (-> console.error 'could not send demo request..')

        $scope.view = 'thanks'
