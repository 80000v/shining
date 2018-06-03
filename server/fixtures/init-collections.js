const { dropCollection } = require("./general");

exports.init = async function () {
	try {
		await dropCollection("users");
		await dropCollection("items");
		await dropCollection("item_categories");
		return Promise.resolve();
	} catch (error) {
		console.log("[error] clean db", error);
	}
}
