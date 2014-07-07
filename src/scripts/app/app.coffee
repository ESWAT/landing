
@app = app = angular.module '42.landing', [
    'ui'
    'ui.router'
    'ngAnimate'
    'ngSanitize'
    'segmentio'
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
    segmentio:
        key: 'wqrh71hl3d'
    services:
        landing:
            url: 'http://landing.42debut.com'


app.run (config, segmentio) ->
    console.log "Host:", window.location.host
    if window.location.host in ['www.42debut.com', '42debut.com']
        console.log "production host; installing segmentio"
        segmentio.load(config.segmentio.key)
