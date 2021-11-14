var express = require('express');
var banner = require('./models/Banner');
var router = express.Router();
var sharp = require('sharp');
module.exports = router;

router.get('/', async(req, res) => {
	var a = await banner.getBanners();
	res.render('banner/index', {layout: 'dashboard', arr: a});
});

router.get('/edit/:id', async(req, res) => {
	var o = await banner.getBannerById(req.params['id']);
	res.render('banner/edit', {layout: 'dashboard', obj: o});
});

async function upload(req, o) {
	if (req.files) {
		var f = req.files['f'];
		var url = 'static/upload/';
		// fit lại để hình nằm chính giữa và resize
		var opt = {width: 700, height: 438, fit: sharp.fit.cover}; 
		// resize
		var r = await sharp(f.data).resize(opt).toFile(url + f.name);
		// console.log(r);
		o['imageUrl'] = f.name;
	}
}

router.post('/edit/:id', async(req, res) => {
	var id = req.params['id'];
	var o = req.body;
	await upload(req, o);
	var ret = await banner.edit(id, o);
	console.log(ret);
	res.redirect('/banner');
});

router.post('/add', async(req, res) => {
	var o = req.body;
	// if (req.files) {
	// 	var f = req.files['f'];
	// 	var url = 'static/upload/';
	// 	// fit lại để hình nằm chính giữa và resize
	// 	var opt = {width: 700, height: 438, fit: sharp.fit.cover}; 
	// 	// resize
	// 	var r = await sharp(f.data).resize(opt).toFile(url + f.name);
	// 	// console.log(r);
	// 	o['imageUrl'] = f.name;
	// }
	await upload(req, o);
	var ret = await banner.add(o);
	console.log(ret);
	res.redirect('/banner');
});