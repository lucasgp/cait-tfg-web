Backbone.Model.prototype.parse = function(data) {
	this.url = data._links.self.href;
	delete data._links;
	data.id = this.url.substring(this.url.lastIndexOf('/') + 1);
	return data;
};

Backbone.Collection.prototype.parse = function(data) {
	if(data._embedded) {
		return data._embedded[this.collectionName];
	}
};
