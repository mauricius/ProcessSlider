var Vue = require('vue');
var Generator = require('./Generator');
var animations = require('./data/animations');

Vue.config.debug = true;

ProcessSlider = new Vue({

    el : "#ProcessSliderModule",

    data : {
        notification : {
            show : false,
            text : ''
        },
        options : {
            transitions : animations.transitions,
            captions : animations.captions
        },
        configuration : {
            id : 'slider1_container',
            bullets_skin : '',
            arrows_skin : '',
            animation : '',
            duration : 1200,
            autoplay_interval : 3000,
            pausable : 0,
            autoplay : false,
            responsive : false,
            size : {
                width : 1168,
                height : 450
            },
            background : {
                page_id : 1,
                color: '#ffffff',
                image : 'url(' + window.location.href + ')',
                size: '100% auto'
            },
            grid_size : 20,
            snap_to_grid : false,
            snap_to_elements : false,
            show_grid : false
        },
        slide_count : 0,
        item_count : 0,
        slides : [],
        active_slide : null,
        active_slide_id : null,
        active_item_id : null,
        active_item : null
    },

    ready : function() {
        if(config.slider_code) {
            this.loadData(JSON.parse(config.slider_code));
        } else {
            this.addSlide();
        }
    },

    methods : {
        loadData : function(data) {
            var _this = this;

            this.configuration.id = data.slider.id;
            this.configuration.bullets_skin = data.slider.bullets_skin;
            this.configuration.arrows_skin = data.slider.arrows_skin;
            this.configuration.responsive = data.slider.responsive;
            this.configuration.size.width = data.slider.size[0];
            this.configuration.size.height = data.slider.size[1];
            this.configuration.background.color = data.slider.background_color;

            this.configuration.autoplay = data.options.autoplay;
            this.configuration.autoplay_interval = data.options.autoplay_interval;
            this.configuration.pausable = data.options.pause_on_hover;
            this.configuration.duration = data.options.slide_duration;
            this.configuration.animation = data.options.transitions;

            var itemIndex = 0;

            data.slides.forEach(function(slide) {
                if(slide.id > _this.slide_count) _this.slide_count = slide.id;

                var newSlide = {
                    id : slide.id,
                    name : slide.name,
                    background : slide.background || null,
                    items : []
                };

                slide.items.forEach(function(item) {

                    var newItem = {
                        id : itemIndex,
                        type : item.type,
                        name : item.name,
                        class : item.class,
                        style : {
                            top : item.style.top,
                            left : item.style.left,
                            width : item.style.width,
                            height : item.style.height
                        },
                        in : {
                            at: item.in.d,
                            transition: item.in.t,
                            duration: item.in.du
                        },
                        out : {
                            at: item.out.d3 + item.in.d,
                            transition : item.out.t3,
                            duration: item.out.du3
                        },
                        options : {}
                    };

                    switch(item.type) {
                        case 'image':
                            newItem.options.src = item.options.src;
                            break;

                        case 'text':
                            newItem.options.text = item.options.text;
                            newItem.style['text-align'] = item.style['text-align'];
                            break;

                        case 'link':
                            newItem.options.text = item.options.text;
                            newItem.options.href = item.options.href;
                            newItem.options.target = item.options.target;
                            newItem.style['text-align'] = item.style['text-align'];
                            break;

                        case 'imglink':
                            newItem.options.src = item.options.src;
                            newItem.options.href = item.options.href;
                            newItem.options.target = item.options.target;
                            break;

                        case 'video':
                            newItem.options.service = 'youtube';
                            newItem.options.code = item.options.code;
                            newItem.options.src = 'data:image/jpeg;base64,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';

                            newItem.out.transition = '';
                            newItem.out.duration = 0;

                            break;

                        case 'block':

                    }

                    itemIndex++;

                    newSlide.items.push(newItem);
                });

                _this.slides.push(newSlide);
            });

            _this.item_count = itemIndex;

            _this._doTabSortable();

            _this._showNotification('Slider loaded!');
        },
        generateMarkup : function() {
            var generator = new Generator(this.configuration);

            return generator.generateExportJSON(this.slides);
        },
        snapToGrid : function(ev) {
            this.doItemDraggable();
            this.doItemResizable();

            return true;
        },
        openBackgroundImage : function(ev) {
            var _this = this;

            loadIframeImagePicker(this.configuration.background.page_id, function(src) {
                _this.active_slide.background = src;
            });
        },
        removeBackground : function(ev) {
            ev.preventDefault();

            this.active_slide.background = null;
        },
        addSlide : function() {
            this.slide_count++;

            this.slides.push({
                id : this.slide_count,
                background : null,
                name : 'Slide-' + this.slide_count,
                items : []
            });

            this.activateSlide(this.slide_count);

            this._doTabSortable();
        },
        removeSlide : function() {
            var _this = this;

            var ret = confirm("Are you sure you want to delete the current slide?");

            if(ret) {
                var filtered = this.slides.filter(function(slide) {
                    return slide.id != _this.active_slide_id;
                });

                this.active_slide = null;
                this.active_slide_id = null;
                this.active_item = null;
                this.active_item_id = null;

                this.slides = filtered;
            }
        },
        activateSlide : function(id) {
            this.active_slide_id = id;
            this.active_slide = this.getActiveSlide();

            this.active_item = null;
            this.active_item_id = null;

            if(config.slider_code) {
                this.doItemDraggable();
                this.doItemResizable();
            }
        },
        getActiveSlide : function() {
            var _this = this;

            var active = this.slides.filter(function(slide) {
                return slide.id == _this.active_slide_id;
            });

            return active[0];
        },
        addItem : function(itemType) {

            if(!this.active_slide) {
                this._showNotification("Select a slide before adding any elements!");

                return false;
            }

            this.item_count++;

            var item = {
                id : this.item_count,
                type : itemType,
                name : itemType + ' - ' + this.item_count,
                class : '',
                style : {
                    top : '0px',
                    left : '0px',
                    width : '100px',
                    height : '100px'
                },
                in : {
                    at: 0,
                    transition: "L",
                    duration: 500
                },
                out : {
                    at: 2500,
                    transition : "L",
                    duration: 500
                },
                options : {}
            };

            switch(itemType) {
                case 'image':
                    item.options.src = 'data:image/jpeg;base64,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';
                    break;

                case 'text':
                    item.options.text = 'Component';
                    item.style['text-align'] = 'left';
                    break;

                case 'link':
                    item.options.text = 'Component';
                    item.options.href = 'http://';
                    item.options.target = '_blank';
                    item.style['text-align'] = 'left';
                    break;

                case 'imglink':
                    item.options.src = 'data:image/jpeg;base64,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';
                    item.options.href = 'http://';
                    item.options.target = '_blank';
                    break;

                case 'video':
                    item.options.service = 'youtube';
                    item.options.code = '';
                    item.options.src = 'data:image/jpeg;base64,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';
                    break;

                case 'block':
                    item.class = 'big-black';
            }

            this.active_slide.items.push(item);

            this.activateItem(this.item_count);

            this._showNotification('Added new item: ' + itemType);

            Vue.nextTick(function() {
                this.doItemDraggable();
                this.doItemResizable();
                this._doToeSortable();
            }.bind(this));
        },
        removeItem : function(ev) {
            if(ev.preventDefault) ev.preventDefault();

            var _this = this;

            this.active_slide.items = this.active_slide.items.filter(function(item) {
                return item.id !== _this.active_item_id;
            });

            this.active_item = null;
        },
        activateItem : function(id) {
            this.active_item_id = id;

            this.active_item = this._getActiveItem();

            Vue.nextTick(function () {
                this._doToeSortable([this.active_item.in.at, this.active_item.out.at]);
            }.bind(this));
        },
        _getActiveItem : function() {
            var _this = this;

            var active = this.active_slide.items.filter(function(item) {
                return item.id == _this.active_item_id;
            });

            return active[0];
        },
        closeEditor : function() {
            this.active_item_id = null;
            this.active_item = null;
        },
        doItemDraggable : function() {
            var _this = this;

            var options = {
                containment: "parent",
                cursor: "move",
                snap : this.configuration.snap_to_elements ? true : false,
                grid : this.configuration.snap_to_grid ? [this.configuration.grid_size, this.configuration.grid_size] : false
            };

            options.stop = this.configuration.snap_to_grid ? function(event, target) {

                target.position.top = target.position.top - target.position.top % _this.grid_size;
                target.position.left = target.position.left - target.position.left % _this.grid_size;

            } : null;

            options.drag = function(event, target) {
                _this.active_item.style.top = target.position.top + 'px';
                _this.active_item.style.left = target.position.left + 'px';
            };

            $(".draggable").draggable(options);
        },
        doItemResizable : function() {
            var _this = this;

            var options = {
                containment: "parent",
                minWidth: 30,
                minHeight: 30
            };

            options.resize = function(ev, target) {
                _this.active_item.style.width = target.size.width + 'px';
                _this.active_item.style.height = target.size.height + 'px';
            };
            options.stop = function(ev, target) {
                _this.active_item.style.width = Math.round(target.size.width) + 'px';
                _this.active_item.style.height = Math.round(target.size.height) + 'px';
            };

            $(".resizable").resizable(options);
        },
        _doTabSortable : function() {
            var _this = this;

            $(".tabs").sortable({
                axis: "x",
                cursor : "move",
                tolerance: "pointer",
                opacity: 0.5,
                placeholder : "sortable-placeholder",
                start : function(event, ui) {
                    ui.item.startPos = ui.item.index();
                },
                stop: function(event, ui) {
                    var startPos = ui.item.startPos,
                        endPos = ui.item.index();

                    // swap slides
                    _this.slides.splice(endPos, 0, _this.slides.splice(startPos, 1)[0]);
                }
            });
        },
        _doToeSortable : function(initialValues) {
            var _this = this;

            $(".toe > .toe-item").sortable({
                items: ".toe-item-timeline",
                placeholder: "drag-highlight",
                tolerance: "pointer",
                handle: ".drag-handler",
                start: function(event, ui) {
                    ui.item.startPos = ui.item.index();
                },
                stop: function(event, ui) {
                    var startPos = ui.item.startPos,
                        endPos = ui.item.index();

                    // swap items
                    _this.active_slide.items.splice(endPos, 0, _this.active_slide.items.splice(startPos, 1)[0]);
                }
            });

            $(".toe-item-timeline.active .timeline-slider").dragslider({
                range: true,
                rangeDrag: true,
                min: 0,
                max: 30000,
                step: 100,
                values: initialValues || [_this.active_item.in.at, _this.active_item.out.at],
                change: function() {},
                slide: function(event, timeline) {
                    _this.active_item.in.at = timeline.values[0];
                    _this.active_item.out.at = timeline.values[1];
                }
            });
        },
        resize : function(direction, width, height) {
            switch (direction) {
                case 'width' :
                    this.active_item.style.width = width + 'px';
                    this.active_item.style.left = '0px';
                    break;
                case 'height' :
                    this.active_item.style.height = height + 'px';
                    this.active_item.style.top = '0px';
                    break;
                case 'full' :
                    this.active_item.style.width = width + 'px';
                    this.active_item.style.height = height + 'px';
                    this.active_item.style.left = '0px';
                    this.active_item.style.top = '0px';
                    break;
                default:
                    this.active_item.style.width = 'auto';
                    this.active_item.style.height = 'auto';
            }
        },
        align : function(direction) {

            var $element = $(".slider-element.active");

            switch (direction) {
                case 'top':
                    this.active_item.style.top = "0px";
                    this.active_item.style.bottom = "auto";

                    $element.css({
                        "top": this.active_item.style.top,
                        "bottom" : this.active_item.style.bottom
                    });

                    break;

                case 'bottom':
                    this.active_item.style.bottom = "0px";
                    this.active_item.style.top = "auto"

                    $element.css({
                        "top": this.active_item.style.top,
                        "bottom" : this.active_item.style.bottom
                    });

                    break;

                case 'left':
                    this.active_item.style.left = "0px";
                    this.active_item.style.right = "auto"

                    $element.css({
                        "left": this.active_item.style.left,
                        "right" : this.active_item.style.right
                    });

                    break;

                case 'right':
                    this.active_item.style.right = "0px";
                    this.active_item.style.left = "auto";

                    $element.css({
                        "left": this.active_item.style.left,
                        "right" : this.active_item.style.right
                    });
                    break;
            }
        },
        center : function() {
            var $element = $(".slider-element.active");

            this.active_item.style.top = this.configuration.size.height / 2 - $element.outerHeight(true) / 2 + "px";
            this.active_item.style.left = this.configuration.size.width / 2 - $element.outerWidth(true) / 2 + "px";
            this.active_item.style.right = "auto";
            this.active_item.style.bottom = "auto";
        },
        centerVertical : function() {
            var $element = $(".slider-element.active");

            this.active_item.style.top = this.configuration.size.height / 2 - $element.outerHeight(true) / 2 + "px";
            this.active_item.style.bottom = "auto";
        },
        centerHorizontal : function() {
            var $element = $(".slider-element.active");

            this.active_item.style.left = this.configuration.size.width / 2 - $element.outerWidth(true) / 2 + "px";
            this.active_item.style.right = "auto";
        },
        _showNotification : function(message) {
            this.notification.text = message;
            this.notification.show = true;

            var _this = this;

            setTimeout(function() {
                _this.notification.text = '';
                _this.notification.show = false;
            }, 3000);
        }
    },

    watch : {
        'configuration.show_grid' : function(newVal, oldVal) {
            if(newVal) {
                var style = "repeating-linear-gradient(0deg, rgba(0,0,0,0.3), rgba(0,0,0,0.3) 1px, transparent 1px, transparent {size}px),repeating-linear-gradient(-90deg, rgba(0,0,0,0.3), rgba(0,0,0,0.3) 1px, transparent 1px, transparent {size}px)"

                this.configuration.background.image = style.replace(/{size}/g, this.configuration.grid_size);
                this.configuration.background.size = this.configuration.grid_size + "px " + this.configuration.grid_size + "px";

            } else {
                this.configuration.background.image = 'url(' + window.location.href + ')';
                this.configuration.background.size = '100% auto';
            }
        },
        'configuration.snap_to_grid' : function(newVal, oldVal) {
            this.doItemDraggable();
        },
        'configuration.snap_to_elements' : function(newVal, oldVal) {
            this.doItemDraggable();
        }
    },

    components: {
        panel : require('./Panel'),
        tab : require('./Tab'),
        toe : require('./Toe'),

        'text-editor' : require('./editors/TextEditor'),
        'link-editor' : require('./editors/LinkEditor'),
        'image-editor' : require('./editors/ImageEditor'),
        'imglink-editor' : require('./editors/ImglinkEditor'),
        'block-editor' : require('./editors/BlockEditor'),
        'video-editor' : require('./editors/VideoEditor')
    }
});


module.exports = ProcessSlider;