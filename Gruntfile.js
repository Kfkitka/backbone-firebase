module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-requirejs');

    grunt.registerTask("default", ["server"]);
    grunt.registerTask("server", ["connect"]);
    grunt.registerTask("liveload", ["watch"]);
    grunt.registerTask("release", ["clean", "requirejs", "concat", "copy"]);

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
                    mainConfigFile: "config/config.js",
                    name: "config",
                    wrap: false
                }
            }
        }
    });
};