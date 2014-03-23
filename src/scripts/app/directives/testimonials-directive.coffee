
app.service 'Testimonials', -> [
    {
        name:  "Uri Minkoff"
        title: "CEO, Rebecca Minkoff"
        quote: "One of the most disruptive things on the front-end that we’ve seen in a while."
        href: "http://rebeccaminkoff.com"
        image: "/assets/images/heads/quotes/uri.jpg"
    }

    {
        name:  "Dino Ha"
        title: "CEO, memebox"
        href: "http://us.memebox.com"
        quote: "We wouldn’t be able to live without 42. When you have a lot of numbers it’s hard to know where to focus, with 42 you can find out in just a few clicks."
        image: "/assets/images/heads/quotes/dino-memebox.png"
    }

    # {
    #     name:  "Jamie Laycock"
    #     title: "VP Marketing & Creative<br>Jimlar / LF USA"
    #     href: "http://www.jimlar.com"
    #     quote: "42’s advantage over other tools is that it’s visual and very intuitive. Being able to look at data sets in a day instead of weeks, means we can react and affect change more rapidly."
    #     image: "/assets/images/heads/quotes/bruce.jpg"
    # }
]


app.directive 'testimonials', (Testimonials) ->
    restrict: 'C'
    link: (scope) ->
        scope.selected = null

        scope.carousel =
            timer: []
            state: index: 0
            start: ->
                console.log 'starting carousel'
                @stop()
                @timer = setInterval (=>
                    @state.index += 1
                    scope.$apply()
                ), 3000
            stop: ->
                clearInterval(@timer)
                @timer = null

        scope.select = (index) ->
            scope.carousel.stop()
            scope.carousel.state.index = index

        scope.$watch 'carousel.state.index', (index) ->
            return if _.isUndefined(index)
            scope.carousel.state.index = index = index % scope.testimonials.length
            scope.selected = scope.testimonials[index]

        scope.testimonials = Testimonials
        scope.carousel.start()
