var Vue = require('vue');
var item = require('./../mixin/item');

var Link = Vue.extend({
    mixins: [item],
    template: '<a href="{{item.options.href}}" class="slider-element draggable resizable {{class}}" ' +
        'v-on:mousedown="activateItem" v-on:click="activateItem"' +
        'v-bind:style="item.style"' +
        'v-bind:target="item.options.target"' +
    '>{{item.options.text}}</a>',
    replace: true
});


Vue.component('link', Link);

module.exports = Link;