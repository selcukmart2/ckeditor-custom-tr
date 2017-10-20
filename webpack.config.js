'use strict';

const path = require('path');
const webpack = require('webpack');
const {bundler} = require('@ckeditor/ckeditor5-dev-utils');
const CKEditorWebpackPlugin = require('@ckeditor/ckeditor5-dev-webpack-plugin');
const BabiliPlugin = require('babel-minify-webpack-plugin');
const buildConfig = require('./build-config');
const ed = process.env.editor === 'inline' || process.env.editor === 'balloon' ? process.env.editor : 'classic';
const file = 'ck.' + ed + '.js';

module.exports = {
    devtool: 'source-map',
    entry: path.resolve(__dirname, 'src', file),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: file,
        libraryTarget: 'umd',
        libraryExport: 'default',
        library: buildConfig.moduleName
    },
    plugins: [
        new CKEditorWebpackPlugin({
            languages: [buildConfig.language]
        }),
        new BabiliPlugin(null, {
            comments: false
        }),
        new webpack.BannerPlugin({
            banner: bundler.getLicenseBanner(),
            raw: true
        })
    ],
    module: {
        rules: [
            {
                test: /\.svg$/,
                use: ['raw-loader']
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    },
                    'sass-loader'
                ]
            }
        ]
    }
};
