var Vue = require('vue');
var item = require('./../mixin/item');


var Block = Vue.extend({
    mixins: [item],
    template:
        '<div class="slider-element draggable resizable {{class}}"' +
            'v-style="item.style"' +
            'v-on="mousedown: activateItem, click: activateItem"' +
        '></div>',
    replace: true
});


Vue.component('block', Block);

module.exports = Block;