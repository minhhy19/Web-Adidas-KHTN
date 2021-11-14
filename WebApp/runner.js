var express = require('express');
var handlebars = require('express-handlebars');
var bodyParser = require('body-parser');

var fileupload = require('express-fileupload');

var home = require('./HomeController');
var category = require('./CategoryController');
var group = require('./GroupController');
var supcategory = require('./SubCategoryController');
var banner = require('./BannerController');
var product = require('./ProductController');
var mail = require('./MailController');
var upload = require('./UploadController');


var app = express();

app.use(bodyParser.urlencoded({extended: true})); //thêm để xử lý post
app.use(fileupload());

app.use(express.static('static')); // để hiểu dc css
app.engine('html', handlebars({extname: '.html'})); //đọc file html
app.set('view engine', 'html');

app.listen(5000, () => {
	console.log('Listening port 5000');
});

app.use('/', home);
app.use('/category', category);
app.use('/subcategory', supcategory);
app.use('/group', group);
app.use('/banner', banner);
app.use('/product', product);
app.use('/mail', mail);
app.use('/upload', upload);