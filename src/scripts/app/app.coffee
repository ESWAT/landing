
@app = app = angular.module '42.landing', [
    'ui'
    'ui.router'
    'ngAnimate'
    'ngSanitize'
]


# Angular UI configuration
app.value 'ui.config', {}


app.value 'isMobile', do ->
    return typeof window.ontouchstart isnt 'undefined'


# Allows CORS
app.config ($httpProvider) ->
    $httpProvider.defaults.useXDomain = true
    delete $httpProvider.defaults.headers.common['X-Requested-With']


app.config ($sceProvider) ->
    $sceProvider.enabled false


app.value 'config',
    services:
        landing:
            url: 'http://landing.42debut.com'
