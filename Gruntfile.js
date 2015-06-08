module.exports = function(grunt) {

  // Project configuration. 

  grunt.initConfig({
    sass: {
      ghpages: {
        files: [{
          expand: true,
          cwd: 'scss/',
          src: ['*.scss'],
          dest: 'css',
          ext: '.css'
        }]

      }
    },
    watch: {
      all: {
        files: ['scss/**/*.**'],
        tasks: ['sass:ghpages'],
        options: {
          keepAlive:true
        }
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass'); //css pre-compiler

  grunt.registerTask('server',['sass:ghpages','watch']) 


};
