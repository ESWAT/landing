
@app = app = angular.module '42.landing', [
    'ui'
    'ngRoute'
    'ngAnimate'
    'ngSanitize'
]


# Angular UI configuration
app.value 'ui.config', {}


# Allows CORS
app.config ($httpProvider) ->
    $httpProvider.defaults.useXDomain = true
    delete $httpProvider.defaults.headers.common['X-Requested-With']
