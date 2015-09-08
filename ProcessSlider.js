/**
 * ProcessSlider JavaScript
 *
 * Used by the ProcessSlider module
 *
 * Copyright (C) 2015 by Maurizio Bonani
 * Licensed under GNU/GPL v2, see LICENSE
 *
 * @author Maurizio Bonani
 * @site https://github.com/mauricius/ProcessSlider
 *
 * http://www.mauriziobonani.com
 *
 */

jQuery(document).ready(function($)
{
    $("#slider_export").click(function() { $(this).select(); });

    var $edit = $('#SliderEdit');

    if($edit.size()) $edit.WireTabs({
        items: $(".WireTab"),
        skipRememberTabIDs: ['SliderCode']
    });

    // Generates the Slider code and saves it into a
    // hidden field of the form before the submit action
    $edit.on('submit', function()
    {
        var markup = ProcessSlider.generateMarkup();

        $('#slider_code').val("").val(markup);

        return true;
    });
});