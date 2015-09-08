var Vue = require('vue');
var classes = require('../data/classes');

var TextEditor = Vue.extend({
    template:
        '<div class="col span_2_of_12">' +
            '<label><b>Content</b></label>' +
            '<textarea v-model="active_item.options.text" lazy></textarea>' +
        '</div>' +
        '<div class="col span_2_of_12">' +
            '<label><b>Class</b></label>' +
            '<select v-model="active_item.class" options="classes"></select>' +
            '<label><b>Text Alignment</b></label>' +
            '<div class="actions">' +
                '<a href="#" title="Left" v-on="click : alignText(\'left\', $event)"><span class="ui-button-text"><i class="fa fa-align-left"></i></span></a>' +
                '<a href="#" title="Center" v-on="click : alignText(\'center\', $event)"><span class="ui-button-text"><i class="fa fa-align-center"></i></span></a>' +
                '<a href="#" title="Right" v-on="click : alignText(\'right\', $event)"><span class="ui-button-text"><i class="fa fa-align-right"></i></span></a>' +
            '</div>' +
        '</div>',
    replace: true,
    props : ['active_item', 'remove-item'],
    data : function() {
        return {
            classes : config.custom_classes || classes
        }
    },
    methods : {
        alignText : function(direction, ev) {
            ev.preventDefault();

            this.active_item.style['text-align'] = direction;
        }
    }
});


Vue.component('text-editor', TextEditor);

module.exports = TextEditor;