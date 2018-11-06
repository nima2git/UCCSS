module.exports = function(grunt) { 
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
        },
        //WE ARE GOING TO REMOVE THE GRUNT jshint, SINCE WE ARE ONLY CONFIGURING grunt-env
        //AND grunt-contrib-nodemon
        // jshint: {
        //   options: {
        //     reporter: require('jshint-stylish'),
        //     esversion: 6
        //   },
        //    all: ['Grunfile.js', 'config/*.js']
        //  },
     
      
    
    });
  //grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodemon');
  grunt.loadNpmTasks('grunt-env');

  grunt.registerTask('default',  [
     'env:dev',
   //   'jshint',
      'nodemon'
    ]);
   grunt.registerTask('production',  [
     'env:production',
      'nodemon'
    ]);

  
};
