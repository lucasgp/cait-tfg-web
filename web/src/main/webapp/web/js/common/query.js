var app = app || {};

function Query(params) {
	this.name = params.name;
	this.page = params.page;
	this.size = params.size;
	this.sort = params.sort;
};

function Sort(sort) {
	this.orders = sort.orders;
};

function Order(order) {
	this.direction = order.direction;
	this.property = order.property;
};

function Pageable(pageable) {
	this.pageNumber = pageable.pageNumber;
	this.pageSize = pageable.pageSize;
	this.sort = pageable.sort;
}