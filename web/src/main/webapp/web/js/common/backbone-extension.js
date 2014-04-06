Backbone.Collection.prototype.parse = function(data) {
    if (data.page)
        this.page = data.page;
    if (data.totalElements)
        this.totalElements = data.totalElements;
    if (data.elements)
        return data.elements;
    return data;
};
