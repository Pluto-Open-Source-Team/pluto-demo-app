const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DotenvPlugin = require('dotenv-webpack');
const dotenv = require('dotenv');

const paths = require('./paths');

module.exports = {
    // Where webpack looks to start building the bundle
    entry: [paths.src + '/index.js'],

    // Where webpack outputs the assets and bundles
    output: {
        path: paths.build,
        filename: '[name].bundle.js',
        publicPath: '/',
    },

    // Customize the webpack build process
    plugins: [
        // Interprets .env files and adds them to the build
        new DotenvPlugin({
            safe: true,
            systemvars: true,
            allowEmptyValues: false,
        }),

        // Removes/cleans build folders and unused assets when rebuilding
        new CleanWebpackPlugin(),

        // Copies files from target to destination folder
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: paths.public,
                    to: 'assets',
                    globOptions: {
                        ignore: ['*.DS_Store'],
                    },
                    noErrorOnMissing: true,
                },
            ],
        }),

        // Generates an HTML file from a template
        new HtmlWebpackPlugin({
            title: dotenv.config().parsed.APP_NAME || 'Pluto',
            favicon: paths.src + '/images/favicon.png',
            template: paths.src + '/template.html', // template file
            filename: 'app.html', // output file
        }),

        new HtmlWebpackPlugin({
            title: dotenv.config().parsed.APP_NAME || 'Pluto',
            favicon: paths.src + '/images/favicon.png',
            template: paths.src + '/homepage.html', // template file
            filename: 'index.html', // output file
        }),

        new HtmlWebpackPlugin({
            title: 'Privacy Policy | Pluto',
            favicon: paths.src + '/images/favicon.png',
            template: paths.src + '/privacy-policy.html', // template file
            filename: 'privacy.html', // output file
        }),

        new HtmlWebpackPlugin({
            title: 'Terms & Conditions | Pluto',
            favicon: paths.src + '/images/favicon.png',
            template: paths.src + '/tos.html', // template file
            filename: 'tos.html', // output file
        }),
    ],

    // Determine how modules within the project are treated
    module: {
        rules: [
            // JavaScript: Use Babel to transpile JavaScript files
            { test: /\.js$/, use: ['babel-loader'] },

            // Images: Copy image files to build folder
            { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' },

            // Fonts and SVGs: Inline files
            { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline' },
        ],
    },

    resolve: {
        modules: [paths.src, 'node_modules'],
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            '@': paths.src,
            assets: paths.public,
        },
    },
};
