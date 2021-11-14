var express = require('express');
var mailer = require('nodemailer');
var router = express.Router();
module.exports = router;

router.get('/', async (req, res) => {
	res.render('mail/index', {layout: 'dashboard'});
});

router.post('/', async (req, res) => {
	var transporter =  mailer.createTransport({ // config mail server
        service: 'gmail',
        auth: {
            user: 'minhhy7777777@gmail.com',
            pass: 'hotlaanh19'
        }
    });
    try {
    	var opt = {
    		from: 'minhhy7777777@gmail.com',
    		to: req.body['eml'],
    		subject: req.body['subject'],
    		text: req.body['content']
    	};
    	var ret = await transporter.sendMail(opt);
    	console.log(ret);
    	res.render('mail/index', {layout: 'dashboard', msg: 'Success'});
    } catch(ex) {
    	console.log(ex);
    	res.render('mail/index', {layout: 'dashboard', msg: 'Error'});
    }
});