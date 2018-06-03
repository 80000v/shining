const fs = require("fs");
const cheerio = require("cheerio");
const {
	createItem
} = require("./server/stores/item");
const {
	createItemCategory
} = require("./server/stores/item-category");

async function fetchShiningTeak(category, filepath) {
	console.log("handling " + category);

	const itemCategory = await createItemCategory({
		name: category,
	});

	var html = fs.readFileSync("./htmls/" + filepath, "utf-8");
	const $ = cheerio.load(html);
	$(".product-item").each(async function (index, item) {
		const titleDOM = $(this).find(".title")[0];
		const title = $(titleDOM).text();
		const imgDOM = $(this).find("img")[0];
		const imgSrc = $(imgDOM).attr("src");

		await createItem({
			name: title,
			imageUrl: imgSrc,
			categoryId: itemCategory._id
		});
	});
}


async function connectToDB() {
	const config = require("./server/config").get();
	const mongoose = require("mongoose");
	mongoose.Promise = global.Promise;

	return new Promise((resolve, reject) => {
		mongoose.connect(config.mongoURL, {useMongoClient: true, config: { autoIndex: false }}, (error) => {
			if (error) {
				console.log("error to connect to mongoose db", error);
				reject();
				return;
			}
			console.log("successfully connect to db", config.mongoURL);
			resolve();
		});
	});
}
async function run() {
	await connectToDB();
	await fetchShiningTeak("沙發", "sofa");

	await fetchShiningTeak("茶几", "tea-1");
	await fetchShiningTeak("茶几", "tea-2");

	await fetchShiningTeak("鞋櫃", "shoe");

	await fetchShiningTeak("餐桌", "dining");

	await fetchShiningTeak("床組", "bed");

	await fetchShiningTeak("床頭櫃", "bed-closet");

	await fetchShiningTeak("收納櫃", "closet-1");
	await fetchShiningTeak("收納櫃", "closet-2");
	await fetchShiningTeak("收納櫃", "closet-3");

	await fetchShiningTeak("抽屜", "drawer");

	await fetchShiningTeak("梳妝桌椅", "makeup");

	await fetchShiningTeak("書櫃/書桌", "study");

	await fetchShiningTeak("戶外/多功能", "mixed");

	console.log("done");
}
run();
