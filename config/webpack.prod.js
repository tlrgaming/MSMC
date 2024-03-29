const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const RobotstxtPlugin = require("robotstxt-webpack-plugin");
const WebpackPwaManifest = require('webpack-pwa-manifest')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = merge(common, {
    mode: 'production',
    devtool: 'inline-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeAttributeQuotes: true,
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'src/css/[name].[contenthash].min.css',
        }),
        new RobotstxtPlugin({ policy: [{ userAgent: "*", allow: "/", }] }),
        new WebpackPwaManifest({
            name: 'SquadCalc',
            short_name: 'SquadCalc',
            description: 'A Minimalist Squad Mortar Calculator',
            start_url: "https://squadcalc.app/",
            background_color: '#111111',
            theme_color: '#111111',
            crossorigin: 'use-credentials',
            icons: [{
                    // Default .ico
                    src: path.resolve('src/img/favicons/favicon.ico'),
                    sizes: [16, 32],
                },
                {
                    // General use iOS/Android
                    src: path.resolve('src/img/favicons/favicon.png'),
                    size: 180,
                    destination: path.join('src', 'img', 'favicons'),
                    ios: true,
                },
                {
                    // 
                    src: path.resolve('src/img/favicons/favicon.png'),
                    sizes: [32, 57, 76, 96, 120, 128, 144, 152, 195, 196],
                    destination: path.join('src', 'img', 'favicons'),
                },
                {
                    // Mask for Safari
                    src: path.resolve('src/img/favicons/favicon.svg'),
                    size: '1024x1024',
                    destination: path.join('src', 'img', 'favicons'),
                    purpose: 'maskable'
                }
            ]
        }),
        // new FaviconsWebpackPlugin({
        //     logo: 'src/img/favicons/favicon.png',
        //     logoMaskable: 'src/img/favicons/safari-icon.svg',
        //     outputPath: 'src/img/favicons',
        //     favicons: {
        //         appName: 'SquadCalc',
        //         appDescription: 'A Minimalist Squad Mortar Calculator',
        //         developerName: 'Maxime "sharkman" Boussard',
        //         background: '#111111',
        //         start_url: "https://squadcalc.app",
        //         icons: {
        //             android: true,
        //             appleIcon: true,
        //             appleStartup: true,
        //             favicons: true,
        //             windows: true,
        //             yandex: true,
        //         },
        //     }
        // })
    ],
    module: {
        rules: [{
            test: /\.(sc|sa|c)ss$/i,
            use: [
                MiniCssExtractPlugin.loader,
                { loader: 'css-loader', options: { url: true } },
                'sass-loader'
            ],
        }, ]
    },
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(), //CSS
            new TerserPlugin(), //JS
        ],
    },
});