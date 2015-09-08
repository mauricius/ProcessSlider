var Vue = require('vue');
var item = require('./../mixin/item');


var Text = Vue.extend({
    mixins: [item],
    template: '<p id="item-{{item.id}}" class="slider-element draggable resizable {{class}}" ' +
        'v-on="mousedown: activateItem, click: activateItem, keyup : moveItem" ' +
        'v-style="item.style"' +
    '>' +
        '{{item.options.text}}' +
    '</p>',
    replace: true
});


Vue.component('text', Text);

module.exports = Text;