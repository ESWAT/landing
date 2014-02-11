

app.controller 'MainController', ($rootScope, $scope, $animate) ->
    $scope.isDemoFlow = false

    $rootScope.$on '$stateChangeSuccess', (event, state) ->
        $scope.isDemoFlow = state.name.indexOf('root.demo') is 0
        $scope.isHome     = state.name.indexOf('root.home') is 0


app.service 'LandingAPI', ($http, config) ->
    url = config.services.landing.url
    sendDemoRequest: (request) ->
        endpoint = '/demo/request'
        return $http.post("#{url}#{endpoint}", request)


app.controller 'SignupController', ($scope, LandingAPI) ->
    landingAPI = new LandingAPI()
    $scope.request = {}
    $scope.sendDemoRequest = (request) ->
        console.log "Sending demo request:", request
        landingAPI.sendDemoRequest(request).then ->
            console.log "Demo request sent successfully."
