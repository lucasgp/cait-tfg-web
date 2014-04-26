define([
    'i18n'
], function(i18n) {

    var Form = {
        toObject: function(view, prefix) {
            var value = {};
            view.$(':input').each(function() {
                var $this = $(this);
                if (this.id.indexOf(prefix) === 0) {
                    var inputValue = this.value.trim();
                }
                if ($this.hasClass('hasDatepicker')) {
                    var date = $this.datepicker("getDate");
                    if (date) {
                        var isoDateComponents = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
                        inputValue = date ? isoDateComponents.join('-') : null;
                    }
                }

                value[this.id.replace(prefix, "")] = inputValue;
            });
            return value;
        }
    };
    return Form;
}
);