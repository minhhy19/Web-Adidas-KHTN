var rep = require('./Repository');
exports.getGroups = async() => {
	return await rep.fetchAll('Group');
}

exports.getGroupsByCategory = async(id) => {
	var where = {cid: rep.getId(id)};
	return await rep.fetchAll('Group', where);
}

exports.add = async(o) => {
	o['cid'] = rep.getId(o['cid']);
	return await rep.add('Group', o);
}