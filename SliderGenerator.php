<?php

/**
 * SliderGenerator
 *
 * Generates the required markup and javascript for the Jssor Slider.
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

class SliderGenerator
{
    /**
     * -----------------------------------------------------------------------------
     * The JSON code pulled from the DB
     * -----------------------------------------------------------------------------
     *
     * @var string
     */
    protected $json = '';

    /**
     * -----------------------------------------------------------------------------
     * Empty Constructor
     * -----------------------------------------------------------------------------
     */
    public function __construct() {}


    /**
     * -----------------------------------------------------------------------------
     * Generates the markup required by Jssor slider
     * -----------------------------------------------------------------------------
     *
     * @param $json
     * @return string
     *
     */
    public function generateMarkup($json)
    {
        $this->json = json_decode($json);

        $markup = $this->generateContainer();

        $markup .= $this->generateSlidesContainer();

        $markup .= $this->generateSlides();

        $markup .= $this->closeContainer();

        if($this->json->slider->arrows_skin != '') $markup .= $this->generateArrows($this->json->slider->arrows_skin);

        if($this->json->slider->bullets_skin != '') $markup .= $this->generateBullets($this->json->slider->bullets_skin);

        $markup .= $this->closeContainer();

        return $markup;
    }

    /**
     * -----------------------------------------------------------------------------
     * Generates the initialization script for Jssor Slider
     * -----------------------------------------------------------------------------
     * http://jssor.com/development/reference-options.html
     *
     * @param string $json - The JSON code pulled from the Database
     * @param array $options - Options array for overriding defined values
     * @return string
     *
     */
    public function generateScript($json, $options)
    {
       $this->json = json_decode($json);

        $script =
            "var {$this->json->slider->id} = new \$JssorSlider$('{$this->json->slider->id}', {
                \$AutoPlay : " . (int) $this->array_get($options, 'AutoPlay', $this->json->options->autoplay) . ",\n";

        if($this->array_get($options, 'AutoPlay', $this->json->options->autoplay) == 1) {
            $script .= "\$AutoPlayInterval : " . $this->array_get($options, 'AutoPlayInterval', $this->json->options->autoplay_interval) . ",\n";
        }

        $script .= "
            \$PauseOnHover : " . $this->array_get($options, 'PauseOnHover', $this->json->options->pause_on_hover) . ",
            \$ArrowKeyNavigation: " . $this->array_get($options, 'ArrowKeyNavigation', 'false') . ",
            \$SlideEasing: " . $this->array_get($options, 'SlideEasing', '$JssorEasing$.$EaseOutQuad') . ",
            \$SlideDuration : " . $this->array_get($options, 'SlideDuration', $this->json->options->slide_duration) . ",
            \$SlideshowOptions: {
                \$Class : \$JssorSlideshowRunner$,
                \$Transitions : [" . $this->array_get($options, 'Transitions', $this->json->options->transitions) . "],
                \$TransitionsOrder : " . $this->array_get($options, 'TransitionsOrder', 1) . ",
            },
            \$CaptionSliderOptions: {
                \$Class: \$JssorCaptionSlider$,
                \$CaptionTransitions : _CaptionTransitions,
                \$PlayInMode : 3,
                \$PlayOutMode : 3
            },
            \$ArrowNavigatorOptions : {
                \$Class : \$JssorArrowNavigator$,
                \$ChanceToShow : " . $this->array_get($options, 'ArrowChanceToShow', 1) . ",
                \$AutoCenter : " . $this->array_get($options, 'ArrowAutoCenter', 2) . ",
            },
            \$BulletNavigatorOptions : {
                \$Class : \$JssorBulletNavigator$,
                \$ChanceToShow : " . $this->array_get($options, 'BulletChanceToShow', 2) . ",
                \$AutoCenter : " . $this->array_get($options, 'BulletAutoCenter', 1) . ",
                \$SpacingX : " . $this->array_get($options, 'SpacingX', 4) . ",
                \$SpacingY : " . $this->array_get($options, 'SpacingY', 4) . ",
            }
        });\n";

        // Make Responsive Slider
        // http://jssor.com/development/tip-make-responsive-slider.html
        if($this->array_get($options, 'responsive', $this->json->options->responsive) == true)
        {
            $script .=
                "function ScaleSlider() {
                    var parentWidth = document.getElementById('" . $this->json->slider->id . "').parentElement.clientWidth;

                    if (parentWidth) {" .
                        $this->json->slider->id . ".\$ScaleWidth(parentWidth);
                    } else {
                        window.setTimeout(ScaleSlider, 30);
                    }
                }

                ScaleSlider();

                if(window.addEventListener) {
                    window.addEventListener('load', ScaleSlider);
                    window.addEventListener('resize',ScaleSlider,false);
                    window.addEventListener('orientationchange',ScaleSlider,false);
                } else if(window.attachEvent) {
                    window.attachEvent('onload',ScaleSlider);
                    window.attachEvent('onresize',ScaleSlider);
                    window.attachEvent('onorientationchange',ScaleSlider);
                }\n";
        }

        // Include Youtube API
        // Force the Slider to stop when a video is playing
        if($this->array_get($options, 'hasVideo', false))
        {
            $script .=
                'var tag = document.createElement("script");
                tag.src = "https://www.youtube.com/iframe_api";
                var firstScriptTag = document.getElementsByTagName("script")[0];
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

                var player;
                function onYouTubeIframeAPIReady() {
                    player = new YT.Player("player", {
                        events: {
                            "onReady": onPlayerReady,
                            "onStateChange": onPlayerStateChange
                        }
                    });
                }

                function onPlayerReady(event) {

                }

                function onPlayerStateChange(event) {
                    if (event.data == YT.PlayerState.PLAYING) {' . $this->json->slider->id . '.$Pause();' . '}
                    else if(event.data == YT.PlayerState.ENDED) {' . $this->json->slider->id . '.$Play();' . '}
                }';
        }

        return $script;
    }

    /**
     * -----------------------------------------------------------------------------
     * Generates the outer container
     * -----------------------------------------------------------------------------
     * http://jssor.com/development/reference-ui-definition.html
     *
     * @return string
     */
    private function generateContainer()
    {
        $markup = '<div id="' . $this->json->slider->id . '" style="position: relative; top: 0px; left: 0px; width: ' . $this->json->slider->size[0] . 'px; height: ' . $this->json->slider->size[1] . 'px; background-color : ' . $this->json->slider->background_color . '">';

        return $markup;
    }


    /**
     * -----------------------------------------------------------------------------
     * Generates the slides container
     * -----------------------------------------------------------------------------
     * http://jssor.com/development/reference-ui-definition.html
     *
     * @return string
     */
    private function generateSlidesContainer()
    {
        $markup = '<div u="slides" style="cursor: move; position: absolute; overflow: hidden; left: 0px; top: 0px; width: ' . $this->json->slider->size[0] . 'px; height: ' . $this->json->slider->size[1] . 'px;">';

        return $markup;
    }

    /**
     * -----------------------------------------------------------------------------
     * Generates all the slides and each belonging items
     * -----------------------------------------------------------------------------
     * http://jssor.com/development/reference-ui-definition.html
     * http://jssor.com/development/slider-with-caption-jquery.html
     *
     * @return string
     */
    private function generateSlides()
    {
        $markup = '';

        foreach($this->json->slides as $slide) {
            $markup .= '<div data-name="slide-' . $slide->id . '">';

            // Optional Image Background
            if(isset($slide->background)) {
                $markup .= '<img u="image" src="' . $slide->background  . '" />';
            }

            // Items or Captions
            foreach($slide->items as $item)
            {
                $markup .=
                    '<div u="caption" ' .
                        't="' . $item->in->t . '" ' .           // specify name or index of caption transition for 'Play In'
                        't3="' . $item->out->t3 . '" ' .        // specify name or index of caption transition for 'Play Out'
                        'du="' . $item->in->du . '" ' .         // explicitely set duration in milliseconds to 'play in'
                        'du3="' . $item->out->du3 . '" ' .      // explicitely set duration in milliseconds for 'play out'
                        'd="' . $item->in->d . '" ' .           // delay in milliseconds to play this caption since the previous caption stopped
                        'd3="' . $item->out->d3 . '" ' .
                        'class="' . $item->class . '" ' .       // class of the item
                        'style="' .                             // inline styles of the item
                            'position: absolute' .
                            ';left: ' . $item->style->left .
                            ';top: ' . $item->style->top .
                            ';width: ' . $item->style->width .
                            ';height: ' . $item->style->height;

                if($item->type == 'text' || $item->type == 'link') {
                    $markup .= ';text-align: ' . $item->style->{'text-align'};
                }

                $markup .= ';">';

                // specific markup for each item
                switch ($item->type) {
                    case 'image':
                        $markup .= '<img src="' . $item->options->src . '" />';
                        break;
                    case 'imglink':
                        $markup .=
                            '<a href="' . $item->options->href . '" target="' . $item->options->target . '">
                                <img src="' . $item->options->src . '" />
                            </a>';
                        break;
                    case 'link':
                        $markup .= '<a href="' . $item->options->href . '" target="' . $item->options->target . '">' . $item->options->text . '</a>';
                        break;
                    case 'text' :
                        $markup .= $item->options->text;
                        break;
                    case 'video':
                        $markup .= '<iframe id="player" width="' . substr($item->style->width,0,strlen($item->style->width)-2) . '" height="' . substr($item->style->height,0,strlen($item->style->height)-2) . '" src="https://www.youtube.com/embed/' . $item->options->code . '?enablejsapi=1" frameborder="0" allowfullscreen></iframe>';
                        break;
                }

                $markup .= $this->closeContainer();
            }

            $markup .= $this->closeContainer();
        }

        return $markup;
    }


    /**
     * -----------------------------------------------------------------------------
     * Closes the markup container
     * -----------------------------------------------------------------------------
     *
     * @return string
     */
    private function closeContainer()
    {
        $markup = '</div>';

        return $markup;
    }

    /**
     * -----------------------------------------------------------------------------
     * Generates the Arrow Navigator markup
     * -----------------------------------------------------------------------------
     * http://jssor.com/development/reference-ui-definition.html
     *
     * @param $class
     * @return string
     */
    private function generateArrows($class)
    {
        $markup =
            '<span u="arrowleft" class="' . $class . 'l" style="top: 123px; left: 8px;"></span>' .
            '<span u="arrowright" class="' . $class . 'r" style="top: 123px; right: 8px;"></span>';

        return $markup;
    }


    /**
     * -----------------------------------------------------------------------------
     * Generates the Bullet Navigator markup
     * -----------------------------------------------------------------------------
     * http://jssor.com/development/reference-ui-definition.html
     *
     * @param $class
     * @return string
     */
    private function generateBullets($class)
    {
        $markup = '<div u="navigator" class="' . $class . '" style="bottom: 16px; right: 6px;"><div u="prototype"><div u="numbertemplate"></div></div></div>';

        return $markup;
    }

    /**
     * -----------------------------------------------------------------------------
     * Get an item from an array using "dot" notation.
     * -----------------------------------------------------------------------------
     * (Tnx Laravel)
     *
     * @param  array   $array
     * @param  string  $key
     * @param  mixed   $default
     * @return mixed
     */
    private function array_get($array, $key, $default = null)
    {
        if (is_null($key)) return $array;
        if (isset($array[$key])) return $array[$key];
        foreach (explode('.', $key) as $segment)
        {
            if ( ! is_array($array) || ! array_key_exists($segment, $array))
            {
                return $default;
            }
            $array = $array[$segment];
        }
        return $array;
    }
}