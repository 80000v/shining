const express = require("express");
const router = express.Router();
const {
	createUser
} = require("../stores/user");

router.get("/", function (req, res) {
	let errorMessage = ""
	if (req.session.errorMessage) {
		errorMessage = req.session.errorMessage;
		delete req.session.errorMessage;
	}
	res.render('signup', {
		errorMessage
	});
});
router.post("/", async function (req, res) {
	const {
		username,
		password,
		confirmPassword,
		email,
		displayName,
	} = req.body;

	if (password !== confirmPassword) {
		req.session.errorMessage = "請確認密碼一致";
		res.redirect("back");
		return;
	}
	await createUser({
		username,
		password,
		role: "member",
		email,
		displayName
	});

	res.redirect('/login');
});

module.exports = router;
