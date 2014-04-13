define([
], function() {

    var Form = {
        toObject: function(view, prefix) {
            var value = {};
            view.$(':input').each(function() {
                if (this.id.indexOf(prefix) === 0)
                    value[this.id.replace(prefix, "")] = this.value.trim();
            });
            return value;
        }
    };
    return Form;
}
);