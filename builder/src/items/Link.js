var Vue = require('vue');
var item = require('./../mixin/item');

var Link = Vue.extend({
    mixins: [item],
    template: '<a href="{{item.options.href}}" class="slider-element draggable resizable {{class}}" ' +
        'v-on="mousedown: activateItem, click: activateItem"' +
        'v-style="item.style"' +
        'v-attr="target : item.options.target"' +
    '>{{item.options.text}}</a>',
    replace: true
});


Vue.component('link', Link);

module.exports = Link;