module.exports = {
	entry: "./app/scripts/main.js",
	output: {
		path: "./public",
		filename: "app-bundle.js",
	},
	devServer: {
		inline: true,
		contentBase: "./app",
		port: 3000,
	},
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: "babel",
			query: {
				presets: ["latest", "react"],
			},
		}, {
			test: /\.json$/,
			loader: "json",
		}],
	},
}
