module.exports = function (grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        mail: {

            tgtpage: '',

            tgtacct: '',

            accounts: {
                jim: {
                    name:   'jim',
                    email:  'jim@bookatable.com'
                },
                outlook: {
                    name:   'YuppySoul',
                    email:  'yuppysoul@outlook.com'
                },
                lbtest: {
                    name:   'LB Test 08',
                    email:  'lbtest08@gmail.com'
                },
                default: {
                    name:   'Ben',
                    email:  'ben.warren@bookatable.com'
                }
            }

        },

        assemble: {

            options: {
                layoutdir: 'src/layouts/',
                layoutext: '.hbs',
                partials: ['src/partials/**/*.hbs'],
                data: ['data/*.{json,yml}'],
                flatten: true
            },
            pages: {
                files: {
                    'dist/': ['src/pages/*.hbs']
                }
            }
        },

        clean: {
            all: [
                'dist/*.html',
                'dist/*.css'
            ]
        },

        connect: {

            options: {
                open: true,
                hostname: 'localhost',
                port: 8000,
                livereload: 35729
            },

            dev: {
                options: {
                    base: 'dist'
                }
            },

            dist: {
                options: {
                    keepalive: true,
                    livereload: false,
                    base: 'dist'
                }
            }
        },

        nodemailer: {

            options: {
                transport: {
                    type: 'SMTP',
                    options: {
                        service: 'Gmail',
                        auth: {
                            user: 'lbtest08@gmail.com',
                            pass: 'lbtest01'
                        }
                    }
                },
                message: {
                    subject: 'A test e-mail'
                },
                recipients: [
                    {
                        email: '<%= mail.tgtacct.email %>',
                        name: '<%= mail.tgtacct.name %>'
                    }
                ]
            },
            external: {
                src: ['dist/email.html']
            }

        },

        premailer: {

            simple: {
                options: {},
                files: {
                    'dist/email.html': ['dist/<%= mail.tgtpage %>.html']
                }
            }
        },

        sass: {

            dist: {
                options: {
                    style: 'compact'
                },

                files: {
                    'dist/assets/css/style.css': 'src/assets/scss/style.scss',
                    'dist/assets/css/prototype.css': 'src/assets/scss/prototype.scss'
                }
            }

        },

        processhtml: {

            dist: {

                options: {
                    process: true,
                    customBlockTypes: ['src/custom-blocks/addGridSymbols.js']
                },

                files:
                    [{
                        expand: true,
                        cwd: 'dist',
                        src: ['*.html'],
                        dest: 'dist'
                    }]
            }
        },

        uncss: {

            dist: {

                options: {
                    ignore: [
                        '#backgroundTable',
                        '.body',
                        '.ExternalClass',
                        '.ExternalClass p',
                        '.ExternalClass span',
                        '.ExternalClass td',
                        '.ExternalClass div',
                        '#outlook a'

                    ]
                },

                files: {
                    'dist/assets/css/style.css': ['dist/index.html']
                }
            }
        },

        watch: {

            options: {
                livereload: true
            },

            css: {
                files: 'src/assets/scss/*.scss',
                tasks: 'sass'
            },

            template: {
                files: 'src/**/*.hbs',
                tasks: 'assemble'
            }

        }
    });

    grunt.loadNpmTasks('assemble');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-nodemailer');
    grunt.loadNpmTasks('grunt-premailer');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-uncss');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['clean', 'assemble', 'sass', 'connect:dev', 'watch']);
    grunt.registerTask('eems', ['clean', 'assemble', 'sass', 'processhtml', 'connect:dev', 'watch']);
    grunt.registerTask('premail', ['premailer']);
    grunt.registerTask('small', ['uncss']);
    grunt.registerTask('email', ['uncss', 'premailer', 'nodemailer']);
    grunt.registerTask('email2', ['premailer', 'nodemailer']);


    // Allow target page & recipient params to be
    // passed from terminal/command line

    // @param taskName: the grunt task to run
    // @param page: the name of the .hbs page template to send
    // @param acct: the account name of the recipient [optional]

    // E.g grunt send:taskname:pagename[:account]
    // Accounts are defined in the config.mail object
    // at the beginning of this Grunt file.
    // ----------------------------------------------

    grunt.registerTask('send', 'Send target page as email test', function (taskName, page, acct) {

        var to = grunt.config('mail').accounts[acct];

        grunt.config('mail', {
            'tgtpage': page,
            'tgtacct': to || (grunt.config('mail').accounts['default'])
        });

        grunt.task.run(taskName);

    });
};