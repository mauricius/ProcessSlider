var Vue = require('vue');
var classes = require('../data/classes');

var BlockEditor = Vue.extend({
    template:
        '<div class="col span_5_of_12">' +
            '<label>Class</label>' +
            '<select v-model="active_item.class" options="classes"></select>' +
        '</div>',
    replace: true,
    props : ['active_item', 'remove-item'],
    data : function() {
        return {
            classes : config.custom_classes || classes
        }
    }
});


Vue.component('block-editor', BlockEditor);

module.exports = BlockEditor;