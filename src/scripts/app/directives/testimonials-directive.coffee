
app.service 'Testimonials', -> [
    {
        name:  "Uri Minkoff"
        title: "CEO, Rebecca Minkoff"
        quote: "One of the most disruptive things on <br> the front-end that we’ve seen in a while."
        image: "http://placekitten.com/100/100"
    }

    {
        name:  "Phoebe Yu"
        title: "INVESTMENT BANKING ANALYST, MERRILL LYNCH"
        quote: "I love that it’s personalized and not generic. <br> It will bring me into stores and make me feel closer to the brand."
        image: "http://placekitten.com/100/100"
    }   
]


app.directive 'testimonials', (Testimonials) ->
    restrict: 'C'
    link: (scope) ->
        scope.selected = null

        scope.carousel =
            timers: []
            state: index: 0
            start: ->
                console.log 'starting carousel'
                @timers.push setInterval (=>
                    @state.index += 1
                    scope.$apply()
                    console.log 'updating index', @state.index
                ), 3000
            stop: ->
                @timers.forEach (x) -> clearInterval(x)
                @timers = []

        scope.select = (index) ->
            scope.carousel.stop()
            scope.carousel.state.index = index

        scope.$watch 'carousel.state.index', (index) ->
            return if _.isUndefined(index)
            scope.carousel.state.index = index = index % scope.testimonials.length
            scope.selected = scope.testimonials[index]

        scope.testimonials = Testimonials
        scope.carousel.start()
