var Vue = require('vue');
var item = require('./../mixin/item');

var Image = Vue.extend({
    mixins: [item],
    template:
        '<div class="draggable resizable" v-style="item.style">' +
            '<img class="slider-element {{class}}" ' +
                'v-on="mousedown: activateItem" ' +
                'v-attr="src: item.options.src" />' +
        '</div>',
    replace: true
});

Vue.component('image', Image);

module.exports = Image;
