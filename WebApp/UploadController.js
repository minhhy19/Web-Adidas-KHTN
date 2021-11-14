var express = require('express');
var request = require('request');
var fs = require('fs');
var mailer = require('nodemailer');
var router = express.Router();
module.exports = router;

router.get('/', async (req, res) => {
	res.render('upload/index', {layout: 'dashboard'});
});

router.post('/', async (req, res) => {
	// console.log(req.files);
	// res.end('ok');
	if (req.files) {
		var f = req.files['f'];
		f.mv('static/upload/' + f.name);
		res.json({img: f.name});
	} else {
		res.json({err: 'Failed'});
	}
});

router.get('/jquery', (req, res) => {
	res.render('upload/jquery', {layout: 'dashboard'});
});

router.get('/icon', (req, res) => {
	res.render('upload/icon', {layout: 'dashboard'});
});

router.get('/url', (req, res) => {
	res.render('upload/url', {layout: 'dashboard'});
});

router.post('/url', (req, res) => {
	var uri = req.body['url'];
	var name = uri.substring(uri.lastIndexOf('/'), uri.length);
	request(uri).pipe(fs.createWriteStream('static/upload' + name).on('close', (err) => {
		res.render('upload/url', { img: name, layout: 'dashboard'});
	}));
});
