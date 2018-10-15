module.exports = function(grunt) { 
    // Do grunt-related things in here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
    
        env : {
          dev : {
            NODE_ENV : 'development'
          },
          production: {
            NODE_ENV : 'production'
          }
        }, 
        nodemon: {
            dev: { script: 'index.js' }
        }
        
    });


    grunt.loadNpmTasks('grunt-contrib-nodemon');
    grunt.loadNpmTasks('grunt-env');

    grunt.registerTask('default',  [
      'env:dev',
      'nodemon'
    ]);
     grunt.registerTask('production',  [
      'env:production',
      'nodemon'
    ]);
};