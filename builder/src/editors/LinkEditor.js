var Vue = require('vue');
var classes = require('../data/classes');

var LinkEditor = Vue.extend({
    template:
        '<div class="col span_2_of_12">' +
            '<label>Content</label>' +
            '<textarea v-model="active_item.options.text" lazy></textarea>' +
            '<label>URL</label>' +
            '<input type="url" v-model="active_item.options.href" />' +
            '<label>Target</label>' +
            '<select v-model="active_item.options.target">' +
                '<option value="_blank">blank</option>' +
                '<option value="_self">self</option>' +
                '<option value="_parent">parent</option>' +
                '<option value="_top">top</option>' +
            '</select>' +
        '</div>' +
        '<div class="col span_2_of_12">' +
            '<label>Class</label>' +
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
            classes : classes
        }
    },
    methods : {
        alignText : function(direction, ev) {
            ev.preventDefault();

            console.log(direction);

            this.active_item.style['text-align'] = direction;
        }
    }
});


Vue.component('link-editor', LinkEditor);

module.exports = LinkEditor;