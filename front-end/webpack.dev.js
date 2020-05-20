var HtmlWebpackPlugin = require('html-webpack-plugin');
    const path = require("path");
    const common = require("./webpack.common");
	const merge = require("webpack-merge");
    
    
    module.exports = merge(common, {
    	mode: "development",
    	output: {
    		filename: "[name].bundle.js",
    		path: path.resolve(__dirname, "dist")
    	},
    	plugins: [
    		new HtmlWebpackPlugin({
    			template: "./src/template.html"
    		})
		],
		devtool: 'source-map',
    	module: {
    		rules: [
    			{
    				test: /\.css$/,
    				use: [
    							"style-loader", // 2. Inject styles into DOM
    							"css-loader" // 1. convert css to js
    				]
    			}
    		]
    	}
    });