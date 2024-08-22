module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-screeps');

    grunt.initConfig({
        screeps: {
            options: {
                email: 'how',
                token: 'about',
                branch: 'no?',
                //server: 'season'
            },
            dist: {
                src: ['activeBranch/*.js']
            }
        }
    });
}