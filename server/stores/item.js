const {
	find,
	findOneAndUpdate,
	create,
	remove
} = require("../models/item");

function createItem(attributes) {
	return findOneAndUpdate(attributes, {
		$set: attributes
	}, {
		new: true,
		upsert: true
	});
}
function updateItemById(_id, attributes) {
	return findOneAndUpdate({
		_id
	}, {
		$set: attributes
	}, {
		new: true,
	});
}
function getItems(attributes) {
	return find(attributes);
}
function deleteItemById(_id) {
	return remove({_id});
}

module.exports = {
	createItem,
	deleteItemById,
	updateItemById,

	getItems
}
