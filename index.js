var url = require('url');
var _ = require('lodash');
var reqlog = require('reqlog');

// Reads the request data and saves them on req.requestData
module.exports = function(req, res, next) {
	req.query = url.parse(req.url, true).query;
	if (req.method === 'POST' || req.method === 'PUT') {
		req.requestData = _.extend(req.body, req.query);
	} else if (req.method === 'GET') {
		req.requestData = req.query;
	}

	reqlog.info('dataParser', req.requestData);
	next();
};
