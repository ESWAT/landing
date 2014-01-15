

app.constant 'ROUTES',
    home:
        label: 'Home'
        # icon:  'bar-graph'
        url:   '/home'
        templateUrl: 'partials/home.html'
        controller:  'HomeController'
    product:
        label: 'Product'
        # icon:  'globe'
        url:   '/product'
        templateUrl: 'partials/product.html'
        controller:  'ProductController'
    news:
        label: 'News'
        # icon:  'users'
        url:   '/news'
        templateUrl: 'partials/news.html'
        controller:  'NewsController'
    team:
        label: 'Team'
        # icon:  'users'
        url:   '/team'
        templateUrl: 'partials/team.html'
        controller:  'TeamController'
    blog:
        label: 'Blog'
        # icon:  'cart'
        url:   '/blog'
        templateUrl: 'partials/blog.html'
        controller:  'BlogController'
    contact:
        label: 'Contact'
        # icon:  'archive'
        url:   '/contact'
        templateUrl: 'partials/contact.html'
        controller:  'ContactController'



app.config ($routeProvider, ROUTES) ->

    resolve = {}

    for id, route of ROUTES
        options = _.pick route, 'templateUrl', 'controller'
        options.resolve = resolve
        $routeProvider.when route.url, options

    $routeProvider.otherwise redirectTo:'/home'



app.directive 'route', ($rootScope, $location) ->
    restrict: 'A'
    scope:
        route: '='
    replace: true
    template: \
    """
    <a ng-href="/\#{{ route.url }}">
        <i ng-show="icon" class="icon-{{ route.icon }} icon-route-{{ route.id }}"></i>
        {{ route.label }}
    </a>
    """

    link: (scope, element, attributes) ->
        scope.route.id = scope.route.label.toLowerCase()
        scope.$on '$routeChangeSuccess', ->
            isActive = scope.route.url is $location.path()
            scope.route.active = isActive
            scope.$parent.activeRoute = scope.route if isActive
