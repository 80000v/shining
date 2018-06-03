const {
	find,
	create,
} = require("../models/item-category");

function createItemCategory(attributes) {
	return create(attributes);
}
function getAllItemCategories() {
	return find();
}

module.exports = {
	createItemCategory,
	getAllItemCategories
}
