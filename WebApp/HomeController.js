var express = require('express');
var category = require('./models/Category');
var group = require('./models/Group');
var subcategory = require('./models/SubCategory');
var banner = require('./models/Banner');
var product = require('./models/Product');
var router = express.Router();
module.exports = router;

function toJson(a, col) {
	var json = {};
	for(var i in a) { // thêm group và lấy category làm key
		var k = a[i][col];
		if (json[k] == undefined) {
			json[k] = [];
		}
		json[k].push(a[i]);
	}
	return json;
}

function setChildren(a, json, col) {
	for(var i in a) {
		var k = a[i]['_id'];
		if (json[k]) {
			a[i][col] = json[k];
		}
	}
}

router.get('/', async (req, res) => {
	var s = await subcategory.getSubCategories();
	var json = toJson(s, 'gid');
	// console.log(json);
	var g = await group.getGroups();
	setChildren(g, json, 'sub');

	// console.log(g);
	json = toJson(g, 'cid');
	/*var json = {};
	for(var i in g) { // thêm group và lấy category làm key
		var k = g[i]['cid'];
		if (json[k] == undefined) {
			json[k] = [];
		}
		json[k].push(g[i]);
	}*/
	// console.log(json);

	var c = await category.getCategories();
	setChildren(c, json, 'group');
	/*for(var i in c) {
		var k = c[i]['_id'];
		if (json[k]) {
			c[i]['group'] = json[k];
		}
	}*/
	// console.log(c);
	var b = await banner.getBanners();

	var p = await product.getProducts();

	var json = {}; 
	var k = 0;
	for(var i in p) {
		k = parseInt(i / 3);
		if (json[k] == undefined) {
			json[k] = [];
		} 
		json[k].push(p[i]);
	}
	// console.log(json);

	res.render('home/index', {crr: c, brr: b, prr: json});
});

router.get('/home/detail/:id', (req, res) => {
	res.render('home/detail');
});