const mongoose = require("ljit-mongodb").mongoose;
const Schema = mongoose.Schema;

const ModelSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	imageUrl: {
		type: String,
	},
	abstract: {
		type: String,
	},
	description: {
		type: String,
	},
	spec: {
		type: String,
	},
	other1: {
		type: String,
	},
	other2: {
		type: String,
	},
	other3: {
		type: String,
	},
	categoryId: {
		type: Schema.Types.ObjectId,
		required: true
	},
	status: {
		type: String,
		enum: ["active", "archived"]
	},
}, {
	timestamps: {createdAt: "createdAt", updatedAt: "updatedAt"},
});

const Model = mongoose.model("items", ModelSchema);

module.exports = {
	find: function (...theArgs) {
		return Model.find(...theArgs)
			.sort({createdAt: -1})
			.exec();
	},
	findPagination: function (limit = 15, skip = 0, ...theArgs) {
		return Model.find(...theArgs)
			.sort({createdAt: -1})
			.limit(limit)
			.skip(skip)
			.exec();
	},
	findOne: function (...theArgs) {
		return Model.findOne(...theArgs)
			.exec();
	},
	findLatestOne: function (...theArgs) {
		return Model.findOne(...theArgs)
			.sort({createdAt: -1})
			.exec();
	},
	findOneAndUpdate: function (...theArgs) {
		return Model.findOneAndUpdate(...theArgs)
			.exec();
	},
	findFromCache: function (...theArgs) {
		return Model.find(...theArgs)
			.sort({createdAt: -1})
			.lean()
			.exec();
	},
	findPaginationFromCache: function (limit = 15, skip = 0, ...theArgs) {
		return Model.find(...theArgs)
			.sort({createdAt: -1})
			.limit(limit)
			.skip(skip)
			.lean()
			.exec();
	},
	findOneFromCache: function (...theArgs) {
		return Model.findOne(...theArgs)
			.lean()
			.exec();
	},
	findLatestOneFromCache: function (...theArgs) {
		return Model.findOne(...theArgs)
			.sort({createdAt: -1})
			.lean()
			.exec();
	},
	findOneAndUpdateFromCache: function (...theArgs) {
		return Model.findOneAndUpdate(...theArgs)
			.lean()
			.exec();
	},
	create: function (...theArgs) {
		return Model.create(...theArgs);
	},
	remove: function (...theArgs) {
		return Model.remove(...theArgs);
	},
	aggregate: function (...theArgs) {
		return Model.aggregate(...theArgs);
	},
	ensureIndexes: function() {
		return Model.ensureIndexes();
	},
	// 沒事別用
	getInstance: function () {
		return Model;
	}
};
