
app.config ($stateProvider, $urlRouterProvider) ->
    $urlRouterProvider.otherwise('/')
    $urlRouterProvider.when '/demo', '/demo/signup'

    $stateProvider

    .state 'root',
        abstract: true
        views:
            'header@':templateUrl:'partials/header.html'
            'footer@':templateUrl:'partials/footer.html'

    .state 'root.home',
        url: '^/'
        views:
            '@':templateUrl:'partials/home.html'

    .state 'root.team',
        url: '^/team'
        views:
            '@':templateUrl:'partials/team.html'

    .state 'root.demo',
        abstract: true
        url: '^/'
        views:
            'offscreen@':        templateUrl:'partials/demo.html'
            'progress@root.demo':templateUrl:'partials/demo/progress.html'

    .state 'root.demo.signup',
        url: '^/demo/signup'
        templateUrl: 'partials/demo/signup.html'

    .state 'root.demo.upload',
        url: '^/demo/upload'
        templateUrl:'partials/demo/upload.html'

    .state 'root.demo.upload-choice',
        url: '^/demo/upload/choice'
        templateUrl:'partials/demo/upload-choice.html'