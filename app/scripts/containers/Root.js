if (process.env.NODE_ENV === "production") {
	module.exports = require("./Root.prod.js") // eslint-disable-line global-require
} else {
	module.exports = require("./Root.dev.js") // eslint-disable-line global-require
}
