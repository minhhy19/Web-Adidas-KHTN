var express = require('express');
var router = express.Router();
var product = require('./models/Product');
module.exports = router;

router.get('/', async (req, res) => {
	var a = await product.getProducts();
	res.render('product/index', {layout: 'dashboard', arr: a});
});

router.get('/add', (req, res) => {
	res.render('product/add', {layout: 'dashboard'});
});

router.get('/edit/:id', async (req, res) => {
	var o = await product.getProductById(req.params['id']);
	res.render('product/edit', {layout: 'dashboard', obj: o});
});

router.post('/edit/:id', async (req, res) => {
	var id = req.params['id'];
	var o = req.body;
	o['price'] = parseInt(o['price']);
	if (req.files.f) {
		var f = req.files['f'];
		f.mv('static/upload/' + f.name);
		o['imageUrl'] = f.name;
	}
	var ret = await product.edit(id, o);
	console.log(ret);
	res.redirect('/product');
});

router.post('/add', async (req, res) => {
	var o = req.body;
	o['price'] = parseInt(o['price']);
	if (req.files.f) {
		var f = req.files['f'];
		f.mv('static/upload/' + f.name);
		o['imageUrl'] = f.name;
	}
	var ret = await product.add(o);
	console.log(ret);
	res.redirect('/product');
});