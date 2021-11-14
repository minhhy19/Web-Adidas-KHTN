var rep = require('./Repository');

exports.getCategories = async() => {
	return await rep.fetchAll('Category');
}

exports.getCategoryById = async(id) => {
	return await rep.fetchOne('Category', id);
}

exports.add = async(o) => {
	return await rep.add('Category', o);
}

exports.edit = async(id, o) => {
	return await rep.edit('Category', id, o);
}