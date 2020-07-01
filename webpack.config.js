const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const { styles, bundler } = require('@ckeditor/ckeditor5-dev-utils');
const CKEditorWebpackPlugin = require('@ckeditor/ckeditor5-dev-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const config = {
    mode: 'development',
    entry: {
        main: './src/index.js'
    },
    output: {
        filename: '[name].js'
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                sourceMap: true,
                terserOptions: {
                    output: {
                        // Preserve CKEditor 5 license comments.
                        comments: /^!/
                    }
                },
                extractComments: false
            })
        ]
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {}
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
            },
            {
                test: /.s[a|c]ss$/,
                loader: 'style-loader!css-loader!sass-loader'
            },
            {
                test: /\.svg$/,
                use: ['raw-loader']
            },
            {
                test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
                use: ["raw-loader"],
            },
            {
                test: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,

                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            injectType: 'singletonStyleTag',
                            attributes: {
                                'data-cke': true
                            }
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: styles.getPostCssConfig({
                            themeImporter: {
                                themePath: require.resolve('@ckeditor/ckeditor5-theme-lark')
                            },
                            minify: true
                        })
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'file-loader',
                exclude: [
                    /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
                    /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
                ],
            },
            {
                test: /\.css$/,
                use: ['vue-style-loader', 'css-loader'],
            },


        ]
    },
    // resolve: {
    //     alias: {
    //         "vue$": "vue/dist/vue.esm.js"
    //     },
    //     extensions: ['*', '.js', '.vue', '.json']
    // },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new CKEditorWebpackPlugin({
            // UI language. Language codes follow the https://en.wikipedia.org/wiki/ISO_639-1 format.
            // When changing the built-in language, remember to also change it in the editor's configuration (src/ckeditor.js).
            language: 'en',
            additionalLanguages: 'all'
        }),
        new webpack.BannerPlugin({
            banner: bundler.getLicenseBanner(),
            raw: true
        })
    ],
    devtool: 'eval',
    devServer: {
        hot: true,
        publicPath: '/',
        contentBase: path.join(__dirname, 'dist')

    }
}

module.exports = config;