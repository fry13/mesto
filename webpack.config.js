const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: { main: './src/pages/index.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    mode: 'production',
    module: {
      rules: [
        {
          test: /\.js$/,          
          loader: 'babel-loader',
          exclude: '/node_modules/'
        },
        {          
          test: /\.(png|svg|jpg)$/,
          loader: 'file-loader?name=./images/[name].[ext]'
        },
        {
          test: /\.(woff|woff2)$/,
          loader: 'file-loader?name=./vendor/[name].[ext]',
        },
        {
          test: /\.html$/,
          loader: 'html-loader',
        },
        {
          test: /\.css$/,
          loader:  [
            MiniCssExtractPlugin.loader, 
            {
              loader: 'css-loader',
              options: { importLoaders: 1 }
            },
            'postcss-loader'
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html'
      }),
      new MiniCssExtractPlugin(),
    //   new GhPagesWebpackPlugin({
    //     path: './dist',
    //     options: {
    //         message: 'hotfix',
    //         user: {
    //             name: 'fry13',
    //             email: 'ninetailed1995@gmail.com'
    //         }
    //     }
    // })
    ]
  };
