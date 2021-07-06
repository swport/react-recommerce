const purgecss = require('@fullhuman/postcss-purgecss');

// craco.config.js
module.exports = {
    style: {
        postcss: {
            plugins: [
                purgecss({
                    content: [
                        './src/**/*.html',
                        './src/**/*.tsx',
                        './src/**/*.ts',
                        './src/**/*.js',
                        './src/**/*.jsx'
                    ],
                }),
            ],
        },
    },
}