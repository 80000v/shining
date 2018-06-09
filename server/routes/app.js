const express = require("express");
const router = express.Router();
const {
	getAllItemCategories,
	getItemCategoryById
} = require("../stores/item-category");
const {
	getItems,
	updateItemById,
	createItem
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

		res.render("pages/items", {
			itemCategory,
			itemCategories,
			items
		});
	} catch (error) {
		console.log(error);
		res.status(400).send(error);
	}
});
router.get("/create", async function (req, res) {
	try {
		const { categoryId } = req.query;

		await createItem({
			name: "新品項",
			imageUrl: "",
			categoryId
		});

		res.redirect("back");
	} catch (error) {
		console.log(error);
		res.status(400).send(error);
	}
});
router.post("/", async function (req, res) {
	try {
		const {
			id,
			imageUrl,
			name,
			abstract,
			description,
			spec,
			other1,
			other2,
			other3
		} = req.body;

		await updateItemById(id, {
			imageUrl,
			name,
			abstract,
			description,
			spec,
			other1,
			other2,
			other3
		});
		res.redirect("back");
	} catch (error) {
		console.log(error);
		res.status(400).send(error);
	}
});

module.exports = router;
