module.exports = (grunt) ->

    grunt.registerTask 'default', [
        'build'
    ]

    grunt.registerTask 'run', [
        'default'
        'connect'
        'watch'
    ]

    grunt.registerTask 'build', [
        'clean:build'
        'newer:coffee'
        'newer:jade'
        'newer:copy'
        'compass'
        'banner'
    ]

    grunt.registerTask 'build:prod', [
        'clean:build'
        'coffee'
        'jade'
        'copy'
        'compass'
    ]


    # Project configuration.
    grunt.initConfig

        pkg: grunt.file.readJSON('package.json')


        dirs:
            src:    'src'
            build:  'build' # if you change this, update the `symlink` task
            config: 'config'
            data:   'data'


        clean:
            build:     '<%= dirs.build %>'
            sasscache: '.sass-cache'


        coffee:
            app:
                cwd:    '<%= dirs.src %>/scripts/app'
                src:    '**/*.coffee'
                expand: true
                rename: (src, dest) ->
                    '<%= dirs.build %>/assets/js/app/' + dest.replace('.coffee', '.js')
                options:
                    sourceMap: false
            libs:
                cwd:    '<%= dirs.src %>/scripts/libs'
                src:    '**/*.coffee'
                expand: true
                rename: (src, dest) ->
                    '<%= dirs.build %>/assets/js/libs/' + dest.replace('.coffee', '.js')


        jade:
            index:
                src:  'src/jade/index.jade'
                dest: '<%= dirs.build %>/index.html'
                options:
                    client: false
                    pretty: true
                    compileDebug: true
            partials:
                cwd:  '<%= dirs.src %>/jade/partials'
                src:  '**/*.jade'
                dest: '<%= dirs.build %>/partials/'
                expand: true
                ext: '.html'
                options:
                    client: false
                    pretty: true
                    compileDebug: true
            widgets:
                cwd:  '<%= dirs.src %>/jade/widgets'
                src:  '**/*.jade'
                dest: '<%= dirs.build %>/widgets'
                expand: true
                ext: '.html'
                options:
                    client: false
                    pretty: true
                    compileDebug: true


        copy:
            images:
                expand: true
                cwd:  '<%= dirs.src %>/images'
                src:  '**/*'
                dest: '<%= dirs.build %>/assets/images'
            favicon:
                src:  '<%= dirs.src %>/images/42logo-black.png'
                dest: '<%= dirs.build %>/favicon.ico'
            js_libs:
                src:     '<%= dirs.src %>/scripts/libs/**/*.js'
                dest:    '<%= dirs.build %>/assets/js/libs/'
                expand:  true
                flatten: true
            js_src:
                cwd:    '<%= dirs.src %>/scripts/app'
                src:    '**/*.js'
                expand: true
                rename: (src, dest) ->
                    '<%= dirs.build %>/assets/js/app/' + dest


        compass: dev:
            options:
                sassDir:   '<%= dirs.src %>/styles'
                cssDir:    '<%= dirs.build %>/assets/css'
                imagesDir: '<%= dirs.src %>/images'
                fontsDir:  '<%= dirs.src %>/fonts'
                relativeAssets: true
                debugInfo: true
                outputStyle: 'nested'


        connect: build: options:
            port: 9000
            base: '<%= dirs.build %>'
            middleware: (connect, options) -> [
                # Allows CORS to all domains (don't use this in production!)
                (request, response, next) ->
                    response.setHeader 'Access-Control-Allow-Origin',  '*'
                    response.setHeader 'Access-Control-Allow-Headers', 'Accept,Accept-Version,Content-Length,Content-MD5,Content-Type,Date,X-Api-Version,Origin,X-Requested-With'
                    response.setHeader 'Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS'
                    next()
                connect.static(options.base)
            ]


        watch:
            index:
                files: [
                    '<%= dirs.src %>/jade/index.jade'
                    '<%= dirs.src %>/jade/mixins/**/*'
                    '<%= dirs.src %>/jade/includes/**/*'
                ]
                tasks: ['jade:index']
            jade:
                files: [
                    '<%= dirs.src %>/jade/partials/**/*'
                    '<%= dirs.src %>/jade/widgets/**/*'
                ]
                tasks: [
                    'newer:jade:partials'
                    'newer:jade:widgets'
                ]
                options: nospawn: true
            scripts:
                files: ['<%= dirs.src %>/scripts/**/*']
                tasks: [
                    'newer:coffee'
                    'newer:copy'
                ]
                options: nospawn: true
            compass:
                files: ['<%= dirs.src %>/styles/**/*']
                tasks: ['compass']


    grunt.task.registerTask 'banner', 'prints the banner', ->
        grunt.log.write grunt.file.read('./banner.txt')


    [
        'grunt-contrib-clean'
        'grunt-contrib-coffee'
        'grunt-contrib-copy'
        'grunt-contrib-compass'
        'grunt-contrib-connect'
        'grunt-contrib-jade'
        'grunt-contrib-watch'
        'grunt-newer'
    ]
    .forEach grunt.loadNpmTasks
