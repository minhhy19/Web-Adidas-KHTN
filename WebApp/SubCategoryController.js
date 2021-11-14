var express = require('express');
var category = require('./models/Category');
var group = require('./models/Group');
var subcategory = require('./models/SubCategory');
var router = express.Router();
module.exports = router;

router.get('/add', async (req, res) => {
	var g = await group.getGroups();
	var json = {};
	for(var i in g) {
		var k = g[i]['cid'];
		if (json[k] == undefined) {
			json[k] = [];
		}
		json[k].push(g[i]);
	}
	var c = await category.getCategories();
	for(var i in c) {
		var k = c[i]['_id'];
		if (json[k]) {
			c[i]['group'] = json[k];
		}
	}
	console.log(c);
	res.render('subcategory/add', {layout: 'dashboard', crr: c});
});

router.get('/', async (req, res) => {
	var c = await category.getCategories();
	var a = await subcategory.getSubCategories();
	res.render('subcategory/index', {layout: 'dashboard', crr: c, arr: a});
});

router.post('/add2', async (req, res) => {
	var ret = await subcategory.add2(req.body);
	console.log(ret);
	res.redirect('/subcategory');
});

router.post('/add', async (req, res) => {
	var ret = await subcategory.add(req.body);
	console.log(ret);
	res.redirect('/subcategory');
});

router.post('/groups', async (req, res) => {
	var cid = req.body['cid'];
	var a = await group.getGroupsByCategory(cid);
	return res.json(a);
});
