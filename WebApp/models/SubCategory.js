var rep = require('./Repository');
exports.add2 = async(o) => {
	o['cid'] = rep.getId(o['cid']);
	o['gid'] = rep.getId(o['gid']);
	return await rep.add('SubCategory', o);
}

exports.add = async(o) => {
	o['gid'] = rep.getId(o['gid']);
	return await rep.add('SubCategory', o);
}

exports.getSubCategories = async() => {
	return await rep.fetchAll('SubCategory');
}