import path from 'path';

export default {
    entry: './app/entry.js',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json']
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                include: [
                    path.resolve(__dirname, "app"),
                ],
                loader: "babel-loader",
                options: {
                    presets: ["@babel/env", "@babel/react"]
                }
            }
        ]
    }
}