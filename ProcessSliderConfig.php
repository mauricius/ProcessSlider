<?php

/**
 * ProcessSliderConfig
 * ProcessSlider Module Configuration
 * (based on https://processwire.com/blog/posts/new-module-configuration-options/)
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

class ProcessSliderConfig extends ModuleConfig
{
    /**
     * -----------------------------------------------------------------------------
     * Initialize default values of the configuration fields
     * -----------------------------------------------------------------------------
     *
     * @return array
     */
    public function getDefaults()
    {
        return array(
            'custom_css_file' => 'process-slider-items.css'
        );
    }

    /**
     * -----------------------------------------------------------------------------
     * Returns a group of Inputfields for the configuration
     * -----------------------------------------------------------------------------
     *
     * @return InputfieldWrapper
     */
    public function getInputfields()
    {
        // ------------------------------------------------------------------------
        // Initialize InputField wrapper
        // ------------------------------------------------------------------------
        $fields = parent::getInputfields();

        // ------------------------------------------------------------------------
        // Define custom CSS file for the elements in the slider
        // ------------------------------------------------------------------------
        $field              = wire('modules')->get('InputfieldText');
        $field->name        = 'custom_css_file';
        $field->label       = __('Custom CSS File');
        $field->description = __('This will be the custom CSS file for the classes of elements.');
        $field->notes       = __('Remeber to put the file in the following directory: ' . $this->config->urls->ProcessSlider . 'builder/css/. Also be sure to add the necessary classes in the field below and to set the same file in the MarkupSlider module.');
        $fields->add($field);

        // ------------------------------------------------------------------------
        // Define custom CSS classes for the elements in the slider
        // ------------------------------------------------------------------------
		$field              = wire('modules')->get("InputfieldTextarea");
		$field->name        = 'custom_classes';
		$field->label       = __('Custom Classes');
        $field->description = __('Custom classes that matches the classes defined in the previous CSS file. Not used in case of default.');
		$field->notes       = __('Please use one entry for each line.');
		$fields->add($field);

        return $fields;
    }
} 