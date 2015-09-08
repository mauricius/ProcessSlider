/**
 * ProcessWire iFrameImagePicker plugin
 *
 * Light verision of InputfieldCKEditor/plugins/pwimage/plugin.js
 *
 * @return callback(src, width, height)
 *
 */

function loadIframeImagePicker(page_id, callback) {

    var page_id = page_id;//$("#Inputfield_id").val();
    var edit_page_id = page_id;
    var file = '';
    var imgWidth = 0;
    var imgHeight = 0;
    var imgDescription = '';
    var imgLink = '';
    var hidpi = false;

    var modalUri = config.urls.admin + 'page/image/';
    var queryString = '?id=' + page_id + '&edit_page_id=' + edit_page_id + '&modal=1';

    if(file.length) queryString += "&file=" + file;
    if(imgWidth) queryString += "&width=" + imgWidth;
    if(imgHeight) queryString += "&height=" + imgHeight;

    queryString += '&hidpi=' + (hidpi ? '1' : '0');

    if(imgDescription && imgDescription.length) {
        queryString += "&description=" + encodeURIComponent(imgDescription);
    }

    if(imgLink && imgLink.length) queryString += "&link=" + encodeURIComponent(imgLink);
    queryString += ("&winwidth=" + ($(window).width() - 30));

    // create iframe dialog box
    var modalSettings = {
        title: "<i class='fa fa-fw fa-folder-open'></i> " + "Select Image",
        open: function() {

        }
    };

    var $iframe = pwModalWindow(modalUri + queryString, modalSettings, 'large');

    $iframe.load(function() {

        // when iframe loads, pull the contents into $i
        var $i = $iframe.contents();

        if($i.find("#selected_image").size() > 0) {
            // if there is a #selected_image element on the page...

            var buttons = [
                {
                    html: "<i class='fa fa-camera'></i> " + "Insert This Image",
                    click:  function() {

                        var $i = $iframe.contents();
                        var $img = $("#selected_image", $i);

                        $iframe.dialog("disable");
                        $iframe.setTitle("<i class='fa fa-fw fa-spin fa-spinner'></i> " + "Saving Image");
                        $img.removeClass("resized");

                        var width = $img.attr('width');
                        if(!width) width = $img.width();
                        var height = $img.attr('height');
                        if(!height) height = $img.height();
                        var file = $img.attr('src');
                        var page_id = $("#page_id", $i).val();
                        var hidpi = $("#selected_image_hidpi", $i).is(":checked") ? 1 : 0;
                        var rotate = parseInt($("#selected_image_rotate", $i).val());
                        file = file.substring(file.lastIndexOf('/')+1);

                        var resizeURL = modalUri + 'resize?id=' + page_id +
                            '&file=' + file +
                            '&width=' + width +
                            '&height=' + height +
                            '&hidpi=' + hidpi;

                        if(rotate) resizeURL += '&rotate=' + rotate;
                        if($img.hasClass('flip_horizontal')) resizeURL += '&flip=h';
                        else if($img.hasClass('flip_vertical')) resizeURL += '&flip=v';
                        $.get(resizeURL, function(data) {
                            var $div = $("<div></div>").html(data);
                            var src = $div.find('#selected_image').attr('src');

                            callback(src, width, height);

                            $iframe.dialog("close");
                        });

                    }
                }, {

                    html: "<i class='fa fa-folder-open'></i> " + "Select Another Image",
                    'class': 'ui-priority-secondary',
                    click: function() {
                        var $i = $iframe.contents();
                        var page_id = $("#page_id", $i).val();
                        $iframe.attr('src', modalUri + '?id=' + page_id + '&modal=1');
                        $iframe.setButtons({});
                    }
                }, {
                    html: "<i class='fa fa-times-circle'></i> " + "Cancel",
                    'class': 'ui-priority-secondary',
                    click: function() { $iframe.dialog("close"); }
                }

            ];

            $iframe.setButtons(buttons);
            $iframe.setTitle("<i class='fa fa-fw fa-picture-o'></i> " + $i.find('title').html());

        } else {
            var buttons = [];
            $("button.pw-modal-button, button[type=submit]:visible", $i).each(function() {
                var $button = $(this);
                var button = {
                    html: $button.html(),
                    click: function() {
                        $button.click();
                    }
                }
                buttons.push(button);
                if(!$button.hasClass('pw-modal-button-visible')) $button.hide();
            });
            var cancelButton = {
                html: "<i class='fa fa-times-circle'></i> " + "Cancel",
                'class': "ui-priority-secondary",
                click: function() { $iframe.dialog("close"); }
            };
            buttons.push(cancelButton);
            $iframe.setButtons(buttons);
        }
    });
}
