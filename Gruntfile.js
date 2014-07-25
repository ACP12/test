module.exports = function (grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        assemble: {
            options: {
                //layout: 'src/layouts/default.hbs',
                layoutdir: 'src/layouts/',
                layoutext: '.hbs',
                partials: ['src/partials/**/*.hbs'],
                data: ['data/*.{json,yml}'],
                flatten: true
            },
            pages: {
                files: {
                    'dist/': ['src/pages/**/*.hbs']
                }
            }
        },

        clean: {
            all: ['dist/*.html', 'dist/*.css']
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
                        email: 'ben.warren@bookatable.com',
                        name: 'yuppysoul'
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
                    'dist/email.html': ['dist/index.html']
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
    grunt.loadNpmTasks('grunt-uncss');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['clean', 'assemble', 'sass', 'connect:dev', 'watch']);
    grunt.registerTask('premail', ['premailer']);
    grunt.registerTask('small', ['uncss']);
    grunt.registerTask('email', ['uncss', 'premailer', 'nodemailer']);
    grunt.registerTask('email2', ['premailer', 'nodemailer']);

};


