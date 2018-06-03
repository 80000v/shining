const {
	find,
	create,
} = require("../models/item");

function createItem(attributes) {
	return create(attributes);
}
function getItems(attributes) {
	return find(attributes);
}

module.exports = {
	createItem,
	getItems
}
