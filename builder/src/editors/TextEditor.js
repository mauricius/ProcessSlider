var Vue = require('vue');
var classes = require('../data/classes');

var TextEditor = Vue.extend({
    template:
        '<div>' +
            '<div class="col span_2_of_12">' +
                '<label><b>Content</b></label>' +
                '<textarea v-model="active_item.options.text" lazy></textarea>' +
            '</div>' +
            '<div class="col span_2_of_12">' +
                '<label><b>Class</b></label>' +
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
    props : ['active_item', 'removeItem'],
    data : function() {
        return {
            classes : config.custom_classes || classes
        }
    },
    methods : {
        alignText : function(direction) {
            this.active_item.style['text-align'] = direction;
        }
    }
});


Vue.component('text-editor', TextEditor);

module.exports = TextEditor;