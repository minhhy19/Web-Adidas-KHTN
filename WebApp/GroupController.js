var express = require('express');
var category = require('./models/Category');
var group = require('./models/Group');
var router = express.Router();
module.exports = router;

router.get('/', async (req, res) => {
	var c = await category.getCategories();
	var a = await group.getGroups();
	res.render('group/index', {layout: 'dashboard', crr: c, arr: a});
});

router.post('/add', async(req, res) => {
	var ret = await group.add(req.body);
	console.log(ret);
	res.redirect('/group');
});