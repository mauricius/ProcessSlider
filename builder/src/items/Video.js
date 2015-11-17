var Vue = require('vue');
var item = require('./../mixin/item');


var Video = Vue.extend({
    mixins: [item],
    template: '<div class="draggable resizable" v-bind:style="item.style">' +
        '<img class="slider-element {{class}}" ' +
            'v-on:mousedown="activateItem" v-on:click="activateItem" ' +
            'v-bind:src="thumb_url" />' +
    '</div>',
    replace: true,

    computed : {
        thumb_url : function() {
            if(this.item.options.service == 'youtube' && this.item.options.code != '') {
                return 'http://img.youtube.com/vi/' + this.item.options.code + '/default.jpg';
            }

            return this.item.options.src;
        }
    }
});


Vue.component('video', Video);

module.exports = Video;
