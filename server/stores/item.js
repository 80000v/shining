const {
	find,
	findOneAndUpdate,
	create,
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

module.exports = {
	createItem,
	updateItemById,

	getItems
}
