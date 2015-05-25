module.exports = function(grunt) {

  // Project configuration. 

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bwr: grunt.file.readJSON('bower.json'),
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'src/scss',
          src: ['*.scss'],
          dest: 'dist/css',
          ext: '.css'
        }]
      },
      test: {
        files: [{
          expand: true,
          cwd: 'src/scss',
          src: ['*.scss'],
          dest: 'test/css',
          ext: '.css'
        }]
      }
    },
    watch: {
      all: {
        files: ['src/**/*.**'],
        tasks: ['copy:testcore','copy:testvendor','sass:test'],
        options: {
          livereload: true,
          keepAlive:true
        }
      },
    },
    bump: {
      options: {
        files: ['package.json','bower.json'],
        updateConfigs: ['bwr'],
        commit: true,
        commitMessage: 'Release %VERSION%',
        commitFiles: ['-a'],
        createTag: true,
        tagName: '%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: true,
        pushTo: '<%= pkg.repository.url %>',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
        globalReplace: false
      }
    },
    changelog: {
      options: {
        version: '<%= bwr.version %>',
        repository: '<%= bwr.homepage %>',
        commitLink: function(commitHash){
          return grunt.file.readJSON('bower.json').homepage + '/commit/' + commitHash;
        },
        issueLink: function(issueId){
          return 'http://genome.klick.com/tickets/#/details/' + issueId;
        }
      }
    },
    jshint: {
      all: ['src/**/*.js']
    },
    copy: {
      dist: {
        expand: true,
        cwd: 'src/',
        src: '**',
        dest: 'dist/',
      },
      testcore: {
        expand: true,
        cwd: 'src/scripts/',
        src: '**',
        dest: 'test/scripts/',
      },
      testvendor: {
        expand: true,
        cwd: 'bower_components/',
        src: '**',
        dest: 'test/scripts/vendor/',
      }
    },
    gitadd: {
      dist: {
        files: {
          src: ['dist/**']
        }
      }
    },
    gitcommit: {
      dist: {
        options: {
          message: 'chore(production): push production files into dist folder',
          allowEmpty: true
        }
      }
    },
    gitpush: {
      dist: {
        options: {
          remote: 'origin'
        }
      }
    },
    usebanner: {
      dist: {
        options: {
          position: 'top',
          process: function (){
            var bowerInfo = grunt.file.readJSON('bower.json');
            var dependenciesList = bowerInfo.dependencies;

            var bannerText = '/*\n'+
              '* name:'+ bowerInfo.name +'\n'+
              '* version: '+ bowerInfo.version +' ('+ grunt.template.today("mmmm-dd, yyyy") +')\n\n'+
              '* dependencies:\n';

            for (var key in dependenciesList) {
              bannerText += '  - '+ key + '-' + dependenciesList[key]+ '\n';
            }

            bannerText += '\n'+ 
              '* description: ' + bowerInfo.description + '\n' +
              '*/\n\n';

            return bannerText;
          },
          linebreak: true
        },
        files: {
          src: ['dist/**/*.{js,scss,css}']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass'); //css pre-compiler
  grunt.loadNpmTasks('grunt-bump'); //automate semver
  grunt.loadNpmTasks('grunt-conventional-changelog'); //automate changelog updates
  grunt.loadNpmTasks('grunt-contrib-jshint'); //validates files with JSHint
  grunt.loadNpmTasks('grunt-contrib-copy'); //copy files from a directory to an other directory
  grunt.loadNpmTasks('grunt-git'); //allow to run git command with grunt
  grunt.loadNpmTasks('grunt-banner'); //add comment on top of files with the current library version

  // Default task(s)./watch 
  grunt.registerTask('test', ['jshint:all']); //run all test tasks
  grunt.registerTask('server',['copy:testcore','copy:testvendor','sass:test', 'watch'])


  // Release task 
  /*    
    release:patch: will release a new patch version of the project (x.y.Z)
    release:minor: will release a new minor version of the project (x.Y.z)
    release:major: will release a new major version of the project (X.y.z)

    A full test is done and has to be successful before a release is pushed

  */
  grunt.registerTask('release', 'Release a new version of the project', function(type) {
    var taskList = new Array();

    if(arguments.length !== 0) {
      taskList.push('jshint:all');

      switch(type){
        case 'patch':
          taskList.push('bump-only:patch');
          break;
        case 'minor':
          taskList.push('bump-only:minor');
          break;
        case 'major':
          taskList.push('bump-only:major');
          break;
        default:
          throw new TypeError('This type of release dos not exist');
          break;
      };

      taskList.push('changelog');
      taskList.push('copy:dist');
      taskList.push('copy:testcore');
      taskList.push('copy:testvendor');
      taskList.push('sass:dist');
      taskList.push('sass:test');
      taskList.push('usebanner:dist');
      taskList.push('gitadd:dist');
      taskList.push('gitcommit:dist');
      taskList.push('gitpush:dist');
      taskList.push('bump-commit');

      grunt.task.run(taskList);
    
    }else{
      throw new TypeError('You need to specify a type of release');
    }
    
  });
};


'copy:testcore','copy:testvendor','sass:test'
