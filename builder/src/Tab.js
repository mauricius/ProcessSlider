var Vue = require('vue');

var Tab = Vue.extend({
    template:
        '<li v-class="active : active_slide_id == tab.id">' +
            '<a href="#" v-if="!editing" v-on="click: activateSlide">{{tab.name}}</a>' +
        '</li>',
    replace: true,
    props: ['active_slide_id', 'reset-active'],

    methods : {
        activateSlide : function(e) {
            e.preventDefault();

            this.resetActive(this.tab.id);
        }
    }
});

Vue.component('tab', Tab);

module.exports = Tab;
