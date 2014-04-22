define([
], function() {

    var Page = {
        parse: function(data, collection) {
            var elements = data;
            if (data.elements)
                elements = data.elements;
            if (data.page !== null)
                collection.page = data.page;
            if (data.totalElements !== null)
                collection.totalElements = data.totalElements;
            return elements;
        },
        Query: function(params) {
            this.page = params.page;
            this.size = params.size;
            this.sortProperty = params.sortProperty;
            this.sortOrder = params.sortOrder;
            this.params = params.params;
        }
    };
    return Page;
}
);