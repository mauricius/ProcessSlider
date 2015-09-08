var Vue = require('vue');
var item = require('./../mixin/item');

var ImageLink = Vue.extend({
    mixins: [item],
    template:
        '<div class="draggable resizable" v-on="mousedown: activateItem, click: activateItem"  v-style="item.style">' +
            '<a href="{{item.options.href}}" ' +
                'v-attr="target : item.options.target"' +
            '>' +
                '<img class="slider-element {{class}}" v-attr="src: item.options.src" />' +
            '</a>' +
        '</div>',
    replace: true
});


Vue.component('imglink', ImageLink);

module.exports = ImageLink;