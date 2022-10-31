const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin  = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const JSONMinifyPlugin = require('node-json-minify');

const ver = "1.0.5";

const config = function(env, args) {
   const isProduction = args.mode === 'production'

   return {
      devtool: isProduction ? 'none' : 'source-map',
      mode: isProduction ? 'production' : 'development',
      entry: {
         particles: './src/js/particles.js',
         app: './src/js/scripts.js',
         valuation: ['core-js/stable/promise', './src/js/valuation.js'],
      },
      output: {
         path: path.resolve(__dirname, 'dist'),
         filename: `js/[name].js?ver=${ver}`,
      },
      module: {
         rules: [
            {
               test: /\.(scss|css)$/,
               use: ['style-loader', MiniCssExtractPlugin.loader,
                  { loader: 'css-loader', options: { sourceMap: !isProduction, importLoaders: 1 } },
                  { loader: 'postcss-loader', options: { sourceMap: !isProduction } },
                  { loader: 'sass-loader', options: { sourceMap: !isProduction } },
               ],
            },
            {
               test: /\.js$/,
               exclude: /(node_modules|bower_components|particles.js)/,
               use: {
                  loader: 'babel-loader',
               },
            },
            {
               test: /\.(png|gif|jpg|jpeg)$/,
               use: [
               {
                  loader: 'url-loader',
                  options: { name: 'assets/img/[name].[ext]', publicPath: '../', limit: 8192 },
                  },
               ],
            },
         ],
      },
      optimization: {
         splitChunks: {
            cacheGroups: {
               commons: {
                  test: /[\\/]node_modules[\\/]/,
                  name: 'vendors',
                  chunks: 'all',
               },
            },
         },
      },
      watchOptions: {
         poll: 1000,
         ignored: /node_modules/,
      },
      plugins: [
         new CleanWebpackPlugin({
            cleanStaleWebpackAssets: false,
         }),
         new BrowserSyncPlugin({
            host: '192.168.43.224',
            port: 3000,
            files: ['./src/*'],
            server: {baseDir: ['dist']}
         }),
         new HtmlWebpackPlugin({
            hash: !isProduction,
            template: './src/index.html',
            filename: 'index.html',
            excludeAssets: [/valuation.js/],
         }),
         new HtmlWebpackPlugin({
            hash: !isProduction,
            template: './src/o-nas.html',
            filename: 'o-nas.html',
            excludeAssets: [/valuation.js/, /particles.js/],
         }),
         new HtmlWebpackPlugin({
            hash: !isProduction,
            template: './src/oferta.html',
            filename: 'oferta.html',
            excludeAssets: [/valuation.js/, /particles.js/],
         }),
         new HtmlWebpackPlugin({
            hash: !isProduction,
            template: './src/kontakt.html',
            filename: 'kontakt.html',
            excludeAssets: [/valuation.js/, /particles.js/],
         }),
         new HtmlWebpackPlugin({
            hash: !isProduction,
            template: './src/wycena.html',
            filename: 'bezplatna-wycena.html',
         }),
         new HtmlWebpackPlugin({
            hash: !isProduction,
            template: './src/error404.html',
            filename: 'error404.html',
            excludeAssets: [/main.css/, /app.js/, /vendors.js/, /valuation.js/, /particles.js/],
         }),
         new HtmlWebpackExcludeAssetsPlugin(),
         new MiniCssExtractPlugin({
            filename: `css/main.css?ver=${ver}`,
            chunkFilename: `css/[id].css?ver=${ver}`,
         }),
         new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
         }),
         new webpack.ProvidePlugin({
            AOS: 'aos',
         }),
         // new FaviconsWebpackPlugin({
         //    logo: './src/assets/favicon.png',
         //    outputPath: 'assets/',
         //    prefix: './assets',
         //    mode: 'webapp',
         //    devMode: 'webapp',
         //    cache: !isProduction,
         //    inject: false,
         //    favicons: {
         //       theme_color: '#FFFFFF',
         //       icons: {
         //          android: false,
         //          appleIcon: false,
         //          appleStartup: false,
         //          coast: false,
         //          favicons: true,
         //          firefox: false,
         //          windows: false,
         //          yandex: false,
         //       },
         //    },
         // }),
         new CopyWebpackPlugin([
            {
               from: path.resolve(__dirname, 'src', 'robots.txt'),
               to: path.resolve(__dirname, 'dist', 'robots.txt'),
               toType: 'file',
            },
			   {
               from: path.resolve(__dirname, 'src', 'sitemap.xml'),
               to: path.resolve(__dirname, 'dist', 'sitemap.xml'),
               toType: 'file',
            },
            {
               from: path.resolve(__dirname, 'src', 'assets'),
               to: path.resolve(__dirname, 'dist', 'assets'),
               toType: 'dir',
            },
            // {
            //    from: path.resolve(__dirname, 'src', 'php'),
            //    to: path.resolve(__dirname, 'dist', 'php'),
            //    toType: 'dir',
            // },
            {
               from: path.resolve(__dirname, 'src', 'js', 'JSON'),
               transform: function(content) {
                  return JSONMinifyPlugin(content.toString());
               },
               to: path.resolve(__dirname, 'dist', 'js', 'JSON'),
               toType: 'dir',
            },
         ]),
      ],
   };
}

module.exports = config;