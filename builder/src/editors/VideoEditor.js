var Vue = require('vue');

var VideoEditor = Vue.extend({
    template:
        '<div class="col span_2_of_12">' +
            '<label>Video Service</label>' +
            '<ul class="InputfieldRadioboxesStacked">' +
                '<li><label><input type="radio" name="type[]" value="youtube" v-model="active_item.options.service" /> <span class="pw-no-select">YouTube</span></label></li>' +
            '</ul>' +
        '</div>' +
        '<div class="col span_2_of_12">' +
            '<label>Video Code (YouTube)</label>' +
            '<input type="text" v-model="active_item.options.code" lazy />' +
        '</div>',
    replace: true,

    props : ['active_item', 'remove-item']
});


Vue.component('video-editor', VideoEditor);

module.exports = VideoEditor;
