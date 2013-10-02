module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-requirejs');

    grunt.registerTask("default", ["server"]);
    grunt.registerTask("server", ["connect"]);
    grunt.registerTask("liveload", ["watch"]);

    grunt.initConfig({
        connect: {
            server: {
                options: {
                    hostname: 'localhost',
                    port: 8080,
                    base: './app',
                    keepalive: true
                }
            }
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: "./app/js",
                    mainConfigFile: "./app/js/main.js",
                    name: "main",
                    wrap: false
                }
            }
        }
    });
};