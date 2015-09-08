var Vue = require('vue');

var Toe = Vue.extend({

    template:
        '<div id="toe-{{item.id}}" class="toe-item-timeline" v-class="active: active_item_id == item.id" v-on="click: activate" data-id="{{item.id}}">' +
            '<div class="toe-item-action drag-handler" title="Drag"></div>' +
            '<div class="toe-item-action" title="Edit"><i v-if="active_item_id == item.id" class="fa fa-pencil-square-o"></i></div>' +
            '<div class="toe-item-type">{{ item.name }}</div>' +
            //'<div class="toe-item-action" title="Clone"><i class="fa fa-copy"></i></div>' +
            '<div class="toe-item-action" title="Remove" v-on="click: remove"><em class="fa fa-times"></em></div>' +
            '<div class="timeline-wrapper">' +
                '<div class="timeline-cover" v-if="active_item_id != item.id"></div>' +
                '<div class="timeline-slider"></div>' +
            '</div>',
    replace : true,

    props : ['active_item_id', 'reset-active-item', 'remove-item'],

    methods : {
        activate : function() {
            this.resetActiveItem(this.item.id);
        },
        remove : function() {
            this.removeItem(this.item.id);
        }
    }
});

Vue.component('toe', Toe);

module.exports = Toe;