var Vue = require('vue');
var classes = require('../data/classes');

var TextEditor = Vue.extend({
    template:
        '<div class="col span_2_of_12">' +
            '<label>Content</label>' +
            '<a href="#" class="ui-button" v-on:click.prevent="openUploadImage"><span class="ui-button-text">Open</span></a><br/>' +
            '<small v-text="url"></small>' +
        '</div>' +
        '<div class="col span_2_of_12">' +
            '<label>Class</label>' +
            '<select v-model="active_item.class">' +
                '<option v-for="class in classes">{{class}}</option>' +
            '</select>' +
            '<label>URL</label>' +
            '<input type="url" v-model="active_item.options.href" />' +
            '<label>Target</label>' +
            '<select v-model="active_item.options.target">' +
                '<option value="_blank">blank</option>' +
                '<option value="_self">self</option>' +
                '<option value="_parent">parent</option>' +
                '<option value="_top">top</option>' +
            '</select>' +
        '</div>',
    replace: true,

    props : ['page_id', 'active_item', 'remove-item'],

    data: function () {
        return {
            url : '',
            classes : config.custom_classes || classes
        }
    },
    methods : {
        openUploadImage : function(e) {
            var that = this;

            loadIframeImagePicker(this.page_id, function(src, width, height) {
                that.url = src;
                that.active_item.options.src = src;

                that.active_item.style.width = width + 'px';
                that.active_item.style.height = height + 'px';
            });
        }
    }
});


Vue.component('text-editor', TextEditor);

module.exports = TextEditor;