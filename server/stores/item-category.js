const {
	find,
	findOne,
	findOneAndUpdate,
	create,
} = require("../models/item-category");

function createItemCategory(attributes) {
	return findOneAndUpdate(attributes, {
		$set: attributes
	}, {
		new: true,
		upsert: true
	});
}
function getAllItemCategories() {
	return find();
}
function getItemCategoryById(_id) {
	return findOne({_id});
}

module.exports = {
	createItemCategory,
	getAllItemCategories,
	getItemCategoryById
}
