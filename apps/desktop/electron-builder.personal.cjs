const { build } = require("./package.json");

module.exports = {
	...build,
	appId: "com.hwong103.hubblepersonal",
	productName: "Hubble Personal",
	publish: null,
	directories: {
		...build.directories,
		output: "release-personal",
	},
	icon: "assets/icon-personal.icns",
	mac: {
		...build.mac,
		hardenedRuntime: false,
		icon: "assets/icon-personal.icns",
		identity: "-",
		target: ["dir"],
	},
};
