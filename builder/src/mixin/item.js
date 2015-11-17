var classNames = require('classnames');

module.exports = {
    props : ['size', 'active_item_id', 'resetActiveItem', 'item'],
    methods : {
        activateItem : function(e) {
            if (e) e.preventDefault();

            this.resetActiveItem(this.item.id);
        },
        moveItem : function(e) {
            console.log(e);
        }
    },
    computed : {
        class : function() {
            return classNames({ active : this.item.id == this.active_item_id }, this.item.class);
        }
    }
}