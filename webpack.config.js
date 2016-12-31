const webpack = require("webpack") // eslint-disable-line

module.exports = {
	entry: "./app/scripts/index.js",
	output: {
		path: "./public",
		filename: "bundle.js",
	},
	devServer: {
		inline: true,
		contentBase: "./app",
		port: 3000,
	},
	devtool: "source-map",
	module: {
		plugins: ["transform-object-rest-spread"],
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel",
				query: {
					presets: ["latest", "react"],
				},
			},
			{
				test: /\.json$/,
				loader: "json",
			},
			{
				test: /\.scss$/,
				loaders: ["style-loader", "css-loader", "sass-loader"],
			},
		],
	},
}
