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
        'coffee'
        'jade'
        'copy'
        'sass:dev'
        'banner'
    ]

    grunt.registerTask 'build:prod', [
        'clean:build'
        'coffee'
        'jade'
        'copy'
        'imagemin'
        'sass:prod'
    ]

    grunt.registerTask 'heroku:production', [
        'build'
    ]

    grunt.registerTask 'web', [
        'connect'
        'watch'
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


        imagemin:
          release:
            files: [
                expand: true
                cwd:  '<%= dirs.src %>/images'
                src:  '**/*.{png,jpg,gif}'
                dest: '<%= dirs.build %>/assets/images'
            ]


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
            font:
                expand: true
                cwd:  '<%= dirs.src %>/fonts'
                src:  '**/*'
                dest: '<%= dirs.build %>/assets/fonts'
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


        sass:
            dev:
                options:
                    includePaths:   require('node-bourbon').includePaths
                    sassDir:        '<%= dirs.src %>/styles'
                    cssDir:         '<%= dirs.build %>/assets/css'
                    outputStyle:    'nested'
                files: [{
                    cwd:    '<%= dirs.src %>/styles'
                    src:    '**/*.scss'
                    dest:   '<%= dirs.build %>/assets/css'
                    ext:    '.css'
                    expand: true
                }]
            prod:
                options:
                    includePaths:   require('node-bourbon').includePaths
                    sassDir:        '<%= dirs.src %>/styles'
                    cssDir:         '<%= dirs.build %>/assets/css'
                    outputStyle:    'compressed'
                files: [{
                    cwd:    '<%= dirs.src %>/styles'
                    src:    '**/*.scss'
                    dest:   '<%= dirs.build %>/assets/css'
                    ext:    '.css'
                    expand: true
                }]


        connect: build: options:
            port: process.env.PORT or 3000
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
                    'jade:partials'
                    'jade:widgets'
                ]
                options: nospawn: true
            scripts:
                files: ['<%= dirs.src %>/scripts/**/*']
                tasks: [
                    'coffee'
                    'copy'
                ]
                options: nospawn: true
            sass:
                files: ['<%= dirs.src %>/styles/**/*']
                tasks: ['sass']

            images:
                files: ['<%= dirs.src %>/images/**/*']
                tasks: [
                    'copy:images'
                ]
            options:
                spawn: false
                livereload: true


    grunt.task.registerTask 'banner', 'prints the banner', ->
        grunt.log.write grunt.file.read('./banner.txt')


    [
        'grunt-contrib-clean'
        'grunt-contrib-coffee'
        'grunt-contrib-copy'
        'grunt-contrib-connect'
        'grunt-contrib-imagemin'
        'grunt-contrib-jade'
        'grunt-contrib-watch'
        'grunt-sass'
    ]
    .forEach grunt.loadNpmTasks
