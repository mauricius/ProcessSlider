var Vue = require('vue');
var classes = require('../data/classes');

var LinkEditor = Vue.extend({
    template:
        '<div>' +
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
                '<select v-model="active_item.class">' +
                    '<option v-for="class in classes">{{class}}</option>' +
                '</select>' +
                '<label><b>Text Alignment</b></label>' +
                '<div class="actions">' +
                    '<a href="#" title="Left" v-on:click.prevent=alignText("left")><span class="ui-button-text"><i class="fa fa-align-left"></i></span></a>' +
                    '<a href="#" title="Center" v-on:click.prevent=alignText("center")><span class="ui-button-text"><i class="fa fa-align-center"></i></span></a>' +
                    '<a href="#" title="Right" v-on:click.prevent=alignText("right")><span class="ui-button-text"><i class="fa fa-align-right"></i></span></a>' +
                '</div>' +
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
        alignText : function(direction) {
            this.active_item.style['text-align'] = direction;
        }
    }
});


Vue.component('link-editor', LinkEditor);

module.exports = LinkEditor;