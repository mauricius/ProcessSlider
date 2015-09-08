<?php

/**
 * MarkupSliderConfig
 * MarkupSlider Module Configuration
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

class MarkupSliderConfig extends ModuleConfig
{
    /**
     * Name of the cache folder
     * @var string
     */
    protected $cacheDir = 'MarkupSlider';

    /**
     * -----------------------------------------------------------------------------
     * Initialize default values of the configuration fields
     * -----------------------------------------------------------------------------
     *
     * @return array
     */
    public function getDefaults()
    {
        return array (
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
        $field->notes       = __('Remeber to put the file in the following directory: ' . $this->config->urls->ProcessSlider . 'builder/css/. Also be sure that the same file is set in the ProcessSlider module.');
        $fields->add($field);

        // ------------------------------------------------------------------------
        // Define checkbox field to development mode
        // ------------------------------------------------------------------------
        $field              = wire('modules')->get('InputfieldCheckbox');
        $field->name        = 'development_mode';
        $field->label       = __('Development Mode');
        $field->columnWidth = 25;
        $field->checked     = ($this->development_mode == 1) ? 'checked' : '';
        $field->description = __('Enable development mode to use the non-minified and non-combined version of Jssor.');
        $fields->add($field);

        // ------------------------------------------------------------------------
        // Define checkbox field to enable or disable HTML cache.
        // ------------------------------------------------------------------------
        $field              = wire('modules')->get('InputfieldCheckbox');
        $field->name        = 'html_cache';
        $field->label       = __('Cache HTML');
        $field->columnWidth = 25;
        //$field->value       = (empty($data['html_cache'])) ? $data['html_cache'] : 1;
        $field->checked     = ($this->html_cache == 1) ? 'checked' : '';
        $field->description = __('In order to cache HTML markup generated by the module, enable this option.');
        $fields->add($field);

        // ------------------------------------------------------------------------
        // Define checkbox field to enable or disable the development mode.
        // ------------------------------------------------------------------------
        $field              = wire('modules')->get('InputfieldCheckbox');
        $field->name        = 'js_cache';
        $field->label       = __('Cache JS');
        $field->columnWidth = 25;
        //$field->value       = (isset($data['js_cache'])) ? $data['js_cache'] : 1;
        $field->checked     = ($this->js_cache == 1) ? 'checked' : '';
        $field->description = __('In order to cache JS code generated by the module, enable this option.');
        $fields->add($field);

        // ------------------------------------------------------------------------
        // Show how many cache files uses the module
        // ------------------------------------------------------------------------
        $cacheInfo         = $this->getNumberOfCacheFiles();
        $field              = wire('modules')->get('InputfieldMarkup');
        $field->columnWidth = 25;
        $field->label       = __('Cache');
        $field->description = sprintf(__('Cached files: %s | Used space: %s'), $cacheInfo['numberOfFiles'], $cacheInfo['bytesTotal']);

        $fields->add($field);

        return $fields;
    }

    /**
     * ------------------------------------------------------------------------
     * Create an array with the number and the size of the cached data.
     * ------------------------------------------------------------------------
     *
     * @return array Number and size of the cache data
     */
    private function getNumberOfCacheFiles()
    {
        // ------------------------------------------------------------------------
        // Generating a data iterator of the cache directory.
        // ------------------------------------------------------------------------
        $cacheFiles = new RecursiveDirectoryIterator(wire('config')->paths->cache . $this->cacheDir . DIRECTORY_SEPARATOR);

        // ------------------------------------------------------------------------
        // Initialize $numberOfFiles and $bytesTotal variable
        // ------------------------------------------------------------------------
        $numberOfFiles = 0;
        $bytesTotal    = 0;

        // ------------------------------------------------------------------------
        // Number all the data together
        // ------------------------------------------------------------------------
        foreach ($cacheFiles as $cacheFile) {
            if(is_file($cacheFile)) {
                $numberOfFiles++;
                $bytesTotal += $cacheFile->getSize();
            }
        }

        // ------------------------------------------------------------------------
        // Formatting bytes in correct unit
        // ------------------------------------------------------------------------
        $label  = array('B', 'KB', 'MB', 'GB', 'TB', 'PB');
        for ($i = 0; $bytesTotal >= 1024 AND $i < (count($label) - 1); $bytesTotal /= 1024, $i++);

        // ------------------------------------------------------------------------
        // Return an array with all cache data
        // ------------------------------------------------------------------------
        return array('numberOfFiles' => number_format($numberOfFiles), 'bytesTotal' => round($bytesTotal).' '.$label[$i]);
    }
} 