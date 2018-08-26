import path from 'path';

import dotenv from 'dotenv';

import HtmlWebpackPlugin from 'html-webpack-plugin';

dotenv.config();

export default env => {
    return {
        entry: './app/entry.js',
        mode: 'development',
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "bundle.js"
        },
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    include: [
                        path.resolve(__dirname, "app"),
                    ],
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/env", "@babel/react"]
                    }
                },
                {
                    test: /\.tsx?$/,
                    include: [
                        path.resolve(__dirname, "app"),
                    ],
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/env", "@babel/react", "@babel/typescript"],
                        plugins: ["@babel/proposal-class-properties"]
                    }
                },
                {
                    test: /\.less$/,
                    include: [
                        path.resolve(__dirname, "app"),
                    ],
                    use: [
                        {
                            loader: "style-loader"
                        },
                        {
                            loader: "css-loader"
                        },
                        {
                            loader: "less-loader"
                        },
                    ]
                },
                {
                    test: /\.svg$/,
                    use: [
                        {
                            loader: 'babel-loader'
                        },
                        {
                            loader: 'react-svg-loader'
                        }
                    ]
       
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './app/index-template.html'
            })
        ],
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            port: process.env.PORT,
            overlay: true,
            //watch: true,
            open: true
        }
    }
};