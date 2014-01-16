
@app = app = angular.module '42.landing', [
    'ui'
    'ui.router'
    'ngAnimate'
]


# Angular UI configuration
app.value 'ui.config', {}


# Allows CORS
app.config ($httpProvider) ->
    $httpProvider.defaults.useXDomain = true
    delete $httpProvider.defaults.headers.common['X-Requested-With']
