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
        tasks: ['sass:test'],
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
    },
    connect: {
      site1: {
        options: {
          hostname: 'jambonbeurre.com',
          port: 8000,
          base: ['test/','bower_components/','src/']
        }
      }
    },
    uglify: {
      dist: {
        options: {
          preserveComments: false,
          sourceMap: true
        },
        files: [{
          expand: true,
          cwd: 'dist/scripts',
          src: ['*.js'],
          dest: 'dist/scripts',
          ext: '.min.js'
        }]
      }
    },
    cssmin: {
      dist: {
        options: {
          sourceMap: true
        },
        files: [{
          expand: true,
          cwd: 'dist/css',
          src: ['*.css', '!*.min.css'],
          dest: 'dist/css',
          ext: '.min.css'
        }]
      }
    },
    clean: {
      dist: ["dist/"]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-sass'); //css pre-compiler
  grunt.loadNpmTasks('grunt-bump'); //automate semver
  grunt.loadNpmTasks('grunt-conventional-changelog'); //automate changelog updates
  grunt.loadNpmTasks('grunt-contrib-jshint'); //validates files with JSHint
  grunt.loadNpmTasks('grunt-contrib-copy'); //copy files from a directory to an other directory
  grunt.loadNpmTasks('grunt-git'); //allow to run git command with grunt
  grunt.loadNpmTasks('grunt-banner'); //add comment on top of files with the current library version

  // Default task(s)./watch 
  grunt.registerTask('test', ['jshint:all']); //run all test tasks
  grunt.registerTask('server',['sass:test','connect','watch'])


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
      taskList.push('clean:dist');
      taskList.push('copy:dist');
      taskList.push('uglify:dist');
      taskList.push('sass:dist');
      taskList.push('sass:test');
      taskList.push('cssmin:dist');
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
