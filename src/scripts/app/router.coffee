
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

    .state 'root.features',
        url: '^/features'
        views:
            '@':templateUrl:'partials/features.html'

    .state 'root.about',
        url: '^/about'
        views:
            '@':templateUrl:'partials/about.html'

    .state 'root.demo',
        abstract: true
        url: '^/'
        views:
            'offscreen@':        templateUrl:'partials/demo.html'
            'progress@root.demo':templateUrl:'partials/demo/progress.html'

    .state 'root.demo.signup',
        url: '^/demo/signup'
        templateUrl: 'partials/demo/signup.html'

    .state 'root.demo.thanks',
        url: '^/demo/thanks'
        templateUrl: 'partials/demo/thanks.html'

    .state 'root.demo.upload',
        url: '^/demo/upload'
        templateUrl:'partials/demo/upload.html'

    .state 'root.demo.upload-choice',
        url: '^/demo/upload/choice'
        templateUrl:'partials/demo/upload-choice.html'

    .state 'root.demo.upload-files',
        url: '^/demo/upload/files'
        templateUrl:'partials/demo/upload-files.html'

    .state 'root.demo.upload-sucess',
        url: '^/demo/upload/sucess'
        templateUrl:'partials/demo/upload-success.html'

    .state 'root.privacy',
        url: '^/privacy'
        views:
            '@':templateUrl:'partials/privacy.html'
