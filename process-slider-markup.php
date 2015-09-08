<div id="ProcessSliderModule">
    <div class="notification" v-if="notification.show" v-transition="expand">{{ notification.text }}</div>
    <div class="bar">
        <div class="section group">
            <div class="col span_1_of_12">
                <label><b>Element</b></label>
                <div class="btn-group">
                    <button data-toggle="dropdown" class="btn btn-info dropdown-toggle">
                        <span class="ui-button-text">Add <i class="fa fa-angle-down"></i></span>
                    </button>
                    <ul class="dropdown-menu">
                        <li>
                            <a href="#" title="Add New Image" v-on="click: addItem('image', $event)">Image</a>
                        </li>
                        <li>
                            <a href="#" title="Add New Text" v-on="click: addItem('text', $event)">Text</a>
                        </li>
                        <li>
                            <a href="#" title="Add New Link" v-on="click: addItem('link', $event)">Link</a>
                        </li>
                        <li>
                            <a href="#" title="Add New Image Link" v-on="click: addItem('imglink', $event)">Image Link</a>
                        </li>
                        <li>
                            <a href="#" title="Add New Block" v-on="click: addItem('block', $event)">Block</a>
                        </li>
                        <li>
                            <a href="#" title="Add New Video" v-on="click: addItem('video', $event)">Video</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col span_2_of_12">
                <label><b>Slides</b></label>
                <a class="ui-button" id="add-slide" v-on="click: addSlide">
                    <span class="ui-button-text">Add</span>
                </a> &nbsp;
                <a class="ui-button" id="remove-slide" v-on="click: removeSlide">
                    <span class="ui-button-text">Remove</span>
                </a>
            </div>
            <div class="col span_2_of_12" v-if="active_slide">
                <label><b>Rename Slide</b></label>
                <input type="text" name="slide_name" v-model="active_slide.name" lazy />
            </div>
            <div class="col span_2_of_12">
                <label><b>Slider ID</b></label>
                <input type="text" v-model="configuration.id" lazy />
            </div>
            <div class="col span_2_of_12">
                <label><b>Slider size (px)</b></label>
                <input type="number" placeholder="Width" id="slider-width" style="width: 70px" v-model="configuration.size.width" lazy number />
                x
                <input type="number" placeholder="Height" id="slider-height" style="width: 70px" v-model="configuration.size.height" lazy number />
            </div>
            <div class="col span_3_of_12">
                <label><b>Background Color (all slides)</b></label>
                <input type="color" name="bgcolor" style="height: 33px" v-model="configuration.background.color" />
            </div>
        </div>

        <div class="section group">
            <div class="col span_1_of_12">
                <label><b>Grid size</b></label>
                <input type="number" id="grid-size" style="width: 60px;" value="30" v-model="configuration.grid_size" />
            </div>
            <div class="col span_2_of_12 InputfieldCheckboxes">
                <label><b>Grid Options</b></label>
                <ul class="InputfieldCheckboxesStacked">
                    <li>
                        <label>
                            <input type="checkbox" v-model="configuration.show_grid" />
                            <span class="pw-no-select">Show Grid</span>
                        </label>
                    </li>
                    <li>
                        <label>
                            <input type="checkbox" v-model="configuration.snap_to_grid" />
                            <span class="pw-no-select">Snap to grid</span>
                        </label>
                    </li>
                    <li>
                        <label>
                            <input type="checkbox" v-model="configuration.snap_to_elements" />
                            <span class="pw-no-select">Snap to elements</span>
                        </label>
                    </li>
                </ul>
            </div>
            <div class="col span_2_of_12 InputfieldCheckboxes">
                <label><b>Skins</b></label>
                <label>Bullets</label>
                <select v-model="configuration.bullets_skin">
                    <option value="">no bullets</option>
                    <option value="jssorb01">jssorb01</option>
                    <option value="jssorb02">jssorb02</option>
                    <option value="jssorb03">jssorb03</option>
                    <option value="jssorb05">jssorb05</option>
                    <option value="jssorb06">jssorb06</option>
                    <option value="jssorb07">jssorb07</option>
                    <option value="jssorb09">jssorb09</option>
                    <option value="jssorb10">jssorb10</option>
                    <option value="jssorb11">jssorb11</option>
                    <option value="jssorb12">jssorb12</option>
                    <option value="jssorb13">jssorb13</option>
                    <option value="jssorb14">jssorb14</option>
                    <option value="jssorb16">jssorb16</option>
                    <option value="jssorb17">jssorb17</option>
                    <option value="jssorb18">jssorb18</option>
                    <option value="jssorb20">jssorb20</option>
                    <option value="jssorb21">jssorb21</option>
                </select>

                <label>Arrows</label>
                <select v-model="configuration.arrows_skin">
                    <option value="">no arrows</option>
                    <option value="jssora01">jssora01</option>
                    <option value="jssora02">jssora02</option>
                    <option value="jssora03">jssora03</option>
                    <option value="jssora04">jssora04</option>
                    <option value="jssora05">jssora05</option>
                    <option value="jssora06">jssora06</option>
                    <option value="jssora07">jssora07</option>
                    <option value="jssora08">jssora08</option>
                    <option value="jssora09">jssora09</option>
                    <option value="jssora10">jssora10</option>
                    <option value="jssora11">jssora11</option>
                    <option value="jssora12">jssora12</option>
                    <option value="jssora13">jssora13</option>
                    <option value="jssora14">jssora14</option>
                    <option value="jssora15">jssora15</option>
                    <option value="jssora16">jssora16</option>
                    <option value="jssora18">jssora18</option>
                    <option value="jssora19">jssora19</option>
                    <option value="jssora20">jssora20</option>
                    <option value="jssora21">jssora21</option>
                    <option value="jssora22">jssora22</option>
                </select>
            </div>
            <div class="col span_3_of_12 InputfieldCheckboxes">
                <label><b>Transition Settings</b></label>
                <label>Animation</label>
                <select v-model="configuration.animation" options="options.transitions">
                </select>
                <label>Slide Swipe Duration (ms)</label>
                <input type="number" v-model="configuration.duration" step="100" lazy />
                <label>Pausable</label>
                <select v-model="configuration.pausable">
                    <option value="0">No Pause</option>
                    <option value="1">Only for Desktop</option>
                    <option value="2">Only for Touch devices</option>
                    <option value="3">Pause for Desktop and Touch devices</option>
                </select>
            </div>
            <div class="col span_2_of_12">
                <div v-if="active_slide">
                    <label><b>Slide Background Image</b></label>
                    <div>
                        <a href="#" class="ui-button"
                           v-on="click : openBackgroundImage"
                           v-class="disabled: configuration.show_grid"
                        ><span class="ui-button-text">Choose</span></a><br/>
                        <small v-text="active_slide.background"></small><br/>
                        <a href="#"
                           v-if="active_slide.background"
                           v-on="click: removeBackground"
                        ><i class="fa fa-remove"></i> Remove Image</a>
                    </div>
                    <label>Select Image from Page ID</label>
                    <input type="number" v-model="configuration.background.page_id" lazy />
                </div>
            </div>
            <div class="col span_2_of_12">
                <label><b>Slide Options</b></label>
                <ul class="InputfieldCheckboxesStacked">
                    <li>
                        <label>
                            <input type="checkbox" v-model="configuration.autoplay" />
                            <span class="pw-no-select">Enable Autoplay</span>
                        </label>
                    </li>
                    <li>
                        <label>
                            <input type="checkbox" v-model="configuration.responsive" />
                            <span class="pw-no-select">Responsive/Full Width</span>
                        </label>
                    </li>
                </ul>
                <div v-if="configuration.autoplay">
                    <label>Autoplay Interval (ms)</label>
                    <input type="number" min="0" max="10000" step="100" v-model="configuration.autoplay_interval" />
                </div>
            </div>
        </div>
    </div>

    <div class="tools" v-if="active_item" v-transition="expand">
        <div class="section group">
            <div class="col span_3_of_12">
                <h3>
                    {{active_item.type | capitalize }} Editor
                    <small><a href="#" v-on="click: removeItem"><i class="fa fa-times"></i> Remove Item</a></small>
                </h3>
                <small><i class="fa fa-arrows"></i> <em>{{active_item.style.width}}, {{ active_item.style.height}}</em></small> |
                <small><i class="fa fa-map-marker"></i> <em>{{active_item.style.top}}, {{ active_item.style.left}}</em></small>
            </div>

            <div class="col span_2_of_12">
                <label><strong>Resize</strong></label>
                <a class="ui-button" title="Full Width" v-on="click: resize('width', configuration.size.width, configuration.size.height)"><span class="ui-button-text"><i class="fa fa-arrows-h"></i></span></a>
                <a class="ui-button" title="Full Height" v-on="click: resize('height', configuration.size.width, configuration.size.height)"><span class="ui-button-text"><i class="fa fa-arrows-v"></i></span></a>
                <a class="ui-button" title="Full Size" v-on="click: resize('full', configuration.size.width, configuration.size.height)"><span class="ui-button-text"><i class="fa fa-arrows"></i></span></a>
                <a class="ui-button" title="Restore" v-on="click: resize()"><span class="ui-button-text"><i class="fa fa-undo"></i></span></a>
            </div>
            <div class="col span_2_of_12">
                <label><strong>Position</strong></label>
                <div class="tool-position actions">
                    <a href="#" title="Left border" v-on="click: align('left', $event)"><span class="ui-button-text"><i class="fa fa-caret-left"></i></span></a>
                    <a href="#" title="Top border" v-on="click: align('top', $event)"><span class="ui-button-text"><i class="fa fa-caret-up"></i></span></a>
                    <a href="#" title="Right border" v-on="click: align('right', $event)"><span class="ui-button-text"><i class="fa fa-caret-right"></i></span></a>
                    <a href="#" title="Bottom border" v-on="click: align('bottom', $event)"><span class="ui-button-text"><i class="fa fa-caret-down"></i></span></a>
                    <a href="#" title="Slider center" v-on="click: center"><span class="ui-button-text"><i class="fa fa-circle"></i></span></a>
                    <a href="#" title="Vertical center" v-on="click: centerVertical"><span class="ui-button-text">VC</span></a>
                    <a href="#" title="Horizontal center" v-on="click: centerHorizontal"><span class="ui-button-text">HC</span></a>
                </div>
            </div>
            <component
                is="{{active_item.type}}-editor"
                page_id="{{configuration.background.page_id}}"
                active_item="{{active_item}}"
                remove-item={{removeItem}}
            >
            </component>
            <a href="#" class="close" v-on="click: closeEditor"><i class="fa fa-remove"></i> Close</a>
        </div>
    </div>

    <ul class="tabs sortable">
        <tab
            v-repeat="tab: slides"
            v-ref="tabs"
            active_slide_id={{active_slide_id}}
            reset-active="{{activateSlide}}"
        >
        </tab>
    </ul>

    <div class="slider">
        <div class="tab-content"
             v-style="
                width : configuration.size.width + 'px',
                height : configuration.size.height + 'px',
                'background-color' : configuration.background.color,
                'background-image' : configuration.background.image,
                'background-size' : configuration.background.size
            ">
            <panel
                v-repeat="slide: slides"
                v-ref="panels"
                active_slide_id={{active_slide_id}}
                active_item_id={{active_item_id}}
                reset-active-item={{activateItem}}
                size={{configuration.size}}
            ></panel>
        </div>
    </div>

    <!-- Table of elements -->
    <div class="toe">
        <div class="toe-data section group" v-if="active_item">
            <fieldset class="col span_2_of_12" data-title="Layer">
                <label for="layer-name">name <br/>
                    <input type="text" v-model="active_item.name" style="width: 100%" lazy />
                </label>
            </fieldset>
            <fieldset class="col span_5_of_12" data-title="animation-in">
                <div class="section group">
                    <div class="col span_4_of_12">
                        <label> at (ms) <br>
                            <input type="number" placeholder="(ms)" v-model="active_item.in.at" step="100" disabled number>
                        </label>
                    </div>
                    <div class="col span_4_of_12">
                        <label for="in-use"> transition <br>
                            <select class="input-small easing-list" v-model="active_item.in.transition" options="options.captions"></select>
                        </label>
                    </div>
                    <div class="col span_4_of_12">
                        <label> duration (ms) <br>
                            <input type="number" placeholder="(ms)" v-model="active_item.in.duration" step="100" number>
                        </label>
                    </div>
                </div>
            </fieldset>
            <fieldset class="col span_5_of_12" data-title="animation-out">
                <div class="section group">
                    <div class="col span_4_of_12">
                        <label for="out-at"> at (ms) <br>
                            <input type="number" placeholder="(ms)" v-model="active_item.out.at" step="100" disabled number>
                        </label>
                    </div>
                    <div class="col span_4_of_12">
                        <label for="out-to"> transition <br>
                            <select class="input-small effect-list" v-model="active_item.out.transition" options="options.captions"></select>
                        </label>
                    </div>
                    <div class="col span_4_of_12">
                        <label for="out-during"> duration (ms) <br>
                            <input type="number" placeholder="(ms)" v-model="active_item.out.duration" step="100" number>
                        </label>
                    </div>
                </div>
            </fieldset>
        </div>

        <div class="toe-item" v-if="active_slide">
            <toe
                v-repeat="item: active_slide.items"
                active_item_id={{active_item_id}}
                reset-active-item={{activateItem}}
                remove-item={{removeItem}}
            ></toe>
        </div>

        <small>&darr; <i>most upper element</i></small>
    </div>

    <!--pre>{{ $data.active_item | json }}</pre-->
</div>
