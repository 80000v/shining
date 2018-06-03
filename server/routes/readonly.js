const express = require("express");
const router = express.Router();
const {
	getAllItemCategories,
	getItemCategoryById
} = require("../stores/item-category");
const {
	getItems,
} = require("../stores/item");

router.get("/", async function (req, res) {
	try {
		const { categoryId } = req.query;
		const itemCategories = await getAllItemCategories();
		let itemCategory;
		if (!categoryId) {
			itemCategory = itemCategories[0];
		} else {
			itemCategory = await getItemCategoryById(categoryId);
		}
		const items = await getItems({
			categoryId: itemCategory._id
		});

		res.render("pages/readonly-items", {
			itemCategory,
			itemCategories,
			items
		});
	} catch (error) {
		console.log(error);
		res.status(400).send(error);
	}
});

module.exports = router;
