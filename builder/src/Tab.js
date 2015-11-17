var Vue = require('vue');

var Tab = Vue.extend({
    template:
        '<li v-bind:class="{active : active_slide_id == tab.id}">' +
            '<a href="#" v-if="!editing" v-on:click.prevent="activateSlide">{{tab.name}}</a>' +
        '</li>',
    replace: true,
    props: ['active_slide_id', 'resetActive', 'tab'],

    methods : {
        activateSlide : function() {
            this.resetActive(this.tab.id);
        }
    }
});

Vue.component('tab', Tab);

module.exports = Tab;
