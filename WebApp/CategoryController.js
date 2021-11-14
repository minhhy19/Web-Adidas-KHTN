var express = require('express');
var router = express.Router();
var category = require('./models/Category');
module.exports = router;

router.get('/', async (req, res) => {
	var a = await category.getCategories();
	res.render('category/index', {layout: 'dashboard', arr: a});
});

router.get('/edit/:id', async (req, res) => {
	var o = await category.getCategoryById(req.params['id']);
	res.render('category/edit', {layout: 'dashboard', obj: o});
});

router.post('/edit/:id', async (req, res) => {
	var o = req.body;
	if (req.files.f) {
		var f = req.files['f'];
		o['imageUrl'] = f['name'];
		f.mv('static/upload/' + f['name']);
	}
	var obj = {name: o['name'], color: o['color'], imageUrl: o['imageUrl']};
	var ret = await category.edit(o['id'], obj);
	console.log(ret);
	res.redirect('/category');
});

router.post('/add', async(req, res) => {
	var o = {
		name: req.body['name']
	};
	var ret = await category.add(o);
	console.log(ret);
	res.redirect('/category');
});