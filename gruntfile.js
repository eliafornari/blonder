module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // sass: {
        //   dist{
        //     files{
        //       'css/style.css': 'sass/style.scss'
        //
        //     }
        //   }
        // }
        concat: {

            js: {
                src: [
                     'bower_components/modernizer/modernizr.js',
                     'bower_components/soundcloud.min.js',
                     'https://connect.soundcloud.com/sdk/sdk-3.0.0.js',
                    'app.js',
                    'routes.js',
                    'services.js',
                   'components/**/*.js',
                    'home/home.js',
                    'contact/contact.js'
                    ],
                dest: 'concat.js'
            }
        },

        watch: {
                js: {
                  files: [
                    'bower_components/angular/angular.min.js',
                     'bower_components/modernizer/modernizr.js',
                     'bower_components/jquery/jquery.js',
                     'bower_components/soundcloud.min.js',
                     'https://connect.soundcloud.com/sdk/sdk-3.0.0.js',

                    'app.js',
                    'routes.js',
                    'services.js',
                   'components/**/*.js',
                   'home/home.js',
                   'contact/contact.js'

                  ],
                  // tasks: ['concat', 'uglify']
                tasks: ['concat']
                }
        }
        // compress: {
        //     dist: {
        //       options: {
        //         archive: 'dist/<%= pkg.name %>-<%= pkg.version %>.zip'
        //       },
        //       files: [{
        //         src: [ 'index.html' ],
        //         dest: '/'
        //       }, {
        //         src: [ 'js/**' ],
        //         dest: 'js/'
        //       }, {
        //         src: [ 'data/**' ],
        //         dest: 'data/'
        //       }, {
        //         src: [ 'app.min.js' ],
        //         dest: '/'
        //       }]
        //     }
        //   }

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    // grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.registerTask('default', ['concat:js']);

        // grunt.registerTask('default', ['concat:js', 'uglify:js']);
};
// , 'compress:js'
