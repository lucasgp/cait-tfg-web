define([
], function() {

    Page = {
        parse: function(data) {
            var elements = data;
            if (data.elements)
                elements = data.elements;
            if (data.page !== null)
                elements.page = data.page;
            if (data.totalElements !== null)
                elements.totalElements = data.totalElements;
            return elements;
        },
        Query: function(params) {
            this.page = params.page;
            this.size = params.size;
            this.sortProperty = params.sortProperty;
            this.sortOrder = params.sortOrder;
        }
    };
    return Page;
}
);