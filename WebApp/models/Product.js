var rep = require('./Repository');

exports.add = async(o) => {
	return await rep.add('Product', o);
}

exports.edit = async(id, o) => {
	return await rep.edit('Product', id, o);
}


exports.getProducts = async() => {
	return await rep.fetchAll('Product');
}

exports.getProductById = async (id) => {
	return await rep.fetchOne('Product', id);
}