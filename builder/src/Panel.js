var Vue = require('vue');

var Panel = Vue.extend({
    template:
        '<div class="tab-pane" v-bind:class="{active : active_slide_id == slide.id}" id="slide-{{slide.id}}" v-show="active_slide_id == slide.id">' +
            '<div id="slide-container-{{slide.id}}" v-bind:style="{' +
                'width : width,' +
                'height : height,' +
                '\'background-image\' : image,' +
                '\'background-size\' : background.size, ' +
                '\'background-position\' : background.position,' +
                '\'background-repeat\' : background.repeat' +
            '}">' +
                '<component :is="item.type" ' +
                    'v-for="item in slide.items" ' +
                    ':item=item ' +
                    ':size=size ' +
                    ':active_item_id=active_item_id ' +
                    ':reset-active-item=resetActiveItem' +
                '></component>' +
            '</div>' +
        '</div>',
    replace : true,

    props : ['active_slide_id', 'active_item_id', 'size', 'resetActiveItem', 'slide'],

    ready : function() {

    },
    data: function () {
        return {
            background : {
                size: '100% auto',
                position: '0px 0px',
                repeat : 'no-repeat'
            }
        }
    },
    computed : {
        width : function() {
            return this.size.width + 'px';
        },
        height : function() {
            return this.size.height + 'px';
        },
        image : function() {
            if(this.slide.background) {
                return 'url(' + this.slide.background + ')';
            }
        }
    },
    methods : {
        setBackgroundMode : function(mode) {
            switch (mode) {
                case 0 :
                    this.background.size = this.size.width + ' ' + this.size.height; break;
                case 1 :
                    this.background.size = 'contain'; break;
                case 2 :
                    this.background.size = 'cover'; break;
            }
        }
    },
    components: {
        image: require('./items/Image'),
        text: require('./items/Text'),
        link : require('./items/Link'),
        imglink : require('./items/ImageLink'),
        block : require('./items/Block'),
        video : require('./items/Video')
    }
});

Vue.component('panel', Panel);

module.exports = Panel;