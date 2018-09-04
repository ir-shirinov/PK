module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    less: {
      style: {
        files: {
          "build/css/style.css": "less/style.less"
        }
      }
    },

    postcss: {
        style: {
          options: {
            processors: [
              require("autoprefixer")()
            ]
          },
          src: "build/css/*.css"
        }
      },

    browserSync: {
      server: {
        bsFiles: {
          src: [
            "build/*.html",
            "build/css/*.css"
          ]
        },
        options: {
          server: "build",
          watchTask: true,
          notify: false,
          open: true,
          cors: true,
          browser: "firefox",
          ui: false
        }
      }
    },

    watch: {
      style: {
        files: ["less/**/*.less"],
        tasks: ["less", "postcss", "csso"]
      },
      sprite: {
        files: ["img/sprite/*.svg"],
        tasks: ["svgstore"]
      },
      js: {
        files: ["js/*.js"],
        tasks: ["uglify"]
      }

    },

    imagemin: {
      images: {
        options: {
          optimizationLevel: 3,
          progressive: true
        },
        files: [{
          expand: true,
          src: ["img/*.{png,jpg,svg}"],
          dest: 'build/'
        }]
      }
    },

    csso: {
      compress: {
        expand: true,
        cwd: 'build/css/',
        src: ['*.css', '!*.min.css'],
        dest: 'build/css/',
        ext: '.min.css'
      }
    },

    cwebp: {
      images: {
        options: {
          q:90
        },
        files: [{
          expand: true,
          src: ["img/*.{png,jpg}"],
          dest: 'build/'
          }]
      }
    },

    svgstore: {
      options: {
        includeTitleElement: false,
        cleanup: ["fill"]
      },
      sprite: {
        files: {
          "build/img/sprite.svg": ["img/sprite/icon-*.svg"]
        }
      }
    },

    posthtml: {
      options: {
        use: [
          require("posthtml-include")()
        ]
      },
      html: {
        files: [{
          expand: true,
          src: ['*.html'],
          dest: 'build'
          }]
      }
    },

    copy: {
      build: {
        files: [{
          expand: true,
          src: [
            "css/normalize.css",
            "img/*.{png,jpg,webp}",
            "fonts/**/*.{woff,woff2}",
            "js/**/*.js",
          ],
          dest: "build"
          }]
      }
    },

    clean: {
      build: ["build"]
      },

    htmlmin: {
      style: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'build/index.html': 'build/index.html',
          'build/form.html': 'build/form.html',
          'build/photo.html': 'build/photo.html'
        }
      }
    },

    uglify: {
      my_target: {
        files: {
          'build/js/script.min.js': ['build/js/script.js']
        }
      }
    }


  });

  grunt.registerTask("build", [
    "clean",
    "copy",
    "less",
    "postcss",
    "csso",
    "svgstore",
    "posthtml",
    "htmlmin",
    "uglify"

    ]);

  grunt.registerTask("image", ["imagemin", "cwebp"]);
  grunt.registerTask("serve", ["browserSync", "watch"]);



};
