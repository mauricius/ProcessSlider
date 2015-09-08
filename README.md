# ProcessSlider module

An Image Slider builder for the ProcessWire CMS/CMF.

This module installs a new Admin page that lets you create multiple image sliders to embed on the site. In short it is a builder for the [Jssor Slider plugin](http://www.jssor.com).
This module is composed by three different Modules:

* **ProcessSlider** The main module. It adds a new page, called Process Slider, under the Setup menu that allows the creation of multiple sliders. Each slider is stored in the table `slider`, created during the installation process.
* **FieldtypeSlider/InputSlider** This module creates a new field in ProcessWire that lets you select a slider to embed inside a page.
* **MarkupSlider** This module translates the slider code into Jssor compatible markup and optionally generates the initialization script.

**Important**: the module is in early alpha stage.

## Requirements

* `ProcessWire >= 2.5.5` because it uses the new ProcessWire module configuration. See [https://processwire.com/blog/posts/new-module-configuration-options/](https://processwire.com/blog/posts/new-module-configuration-options/)

## Features

* Custom slider size
* Drag and Drop interface
* Move and resize elements
* Slides background with images from existing PW pages
* Slider Preview (with the provided **MarkupSlider** module)
* Predefined or custom style classes for elements
* Add or remove slides
* Add or remove elements
* Change slides order visually
* Jssor skins and bullets support
* Visual Timeline
* Optional responsive/fullwidth slider
* Predefined elements: Images, Text, Links, Image as link, Div blocks, Youtube Videos
* Animation Options (for In and Out): animation type, delay, duration
* Notification messages

## Demo Screencast

[https://youtu.be/GZtjG5FJf24](https://youtu.be/GZtjG5FJf24)

## Installation

1. Place the module files in _/site/modules/ProcessSlider/_
2. In admin, click Modules > Check for new Modules
3. Click "Install" for **ProcessSlider**
4. Click "Install" for **FieldtypeSlider**. The module will install also **InputfieldSlider**.
5. Click "Install" for **MarkupSlider**.
6. Create a new folder in _/site/modules/ProcessSlider/_ and call it `jssor`. Download the Jssor library from [http://jssor.com/download.html](http://jssor.com/download.html) and place the content of the ZIP file in it. The module uses only the files in the `js` folder.
7. Now go to Setup > Fields and create a new Slider field. Add it to your template.
8. Now go to Setup > Process Slider and start create your image Sliders.
9. Finally you can add your slider to the page.

## Configuration

The modules provide some space for customization.

### ProcessSlider

After installing this module, you can specify a CSS file for styling the slider elements. The default file is `process-slider-items.css` and is located in the _/site/modules/ProcessSlider/builder/css_ folder.
If you prefer to use your file you have to add also the class names to the `Custom Classes` textarea, otherwise they will not be available in the builder.

### MarkupSlider

The MarkupSlider module has itself a few configuration option. The most important is the custom CSS file for styling the elements. Obviously the file has to be the same defined in the ProcessSlider module above.
You can also choose to enable the cache for markup and javascript codes generated by the module.
Finally the _Development Mode_ options sets the module to use the non-minified and non-combined version of Jssor.

Since Jssor doesn't include single CSS files for all the Arrows and Bullets styles, I made them available in the folder _/site/ProcessSlider/builder/css/_.

**Important:** Jssor comes in two versions: vanilla JavaScript and jQuery. The module uses the first one.

## API (MarkupSlider)

In your template you can instantiate the module like the following:

```php
$slider = $modules->get('MarkupSlider');
```

Insert the stylesheets in `<head>`:

```php
echo $slider->getStyles($arrows = false, $bullets = false);
```

if your slider uses arrows or bullets, set to true the corresponding boolean.

Output the slider:

```php
echo $slider->render($page->get('slider'), $includeScript = true, $options = array())
```

This function inserts, in sequential order, the following elements:

* the Jssor library from the _ProcessSlider/jssor/js_ folder
* the transitions (`_caption_transitions.js`)
* the slider markup
* the initialization script

You can provide some options as third parameter. In fact `$options` is an array that overrides some of the [Jssor options](http://jssor.com/development/reference-options.html) defined in the admin page when including the initialization script.

The options available for this parameter are:

* `AutoPlay`
* `AutoPlayInterval`
* `PauseOnHover`
* `ArrowKeyNavigation`
* `SlideEasing`
* `SlideDuration`
* `Transitions` : comma-separated string of [Jssor slide transitions](http://jssor.com/development/tool-slideshow-transition-viewer.html)
* `TransitionsOrder`
* `ArrowChanceToShow`
* `ArrowAutoCenter`
* `BulletChanceToShow`
* `BulletAutoCenter`
* `SpacingX`
* `SpacingY`

Otherwise if you prefer to provide a personal initialization script you can set `$includeScript` to `false` and ignore the third parameter.

# Browser Support

The ProcessSlider module doesn't support IE < 9.

# Future Plans

Things I want to implement in the following versions:

* Save and restore unsaved data from localStorage
* Implement item and slide cloning
* Expand configurable options
* Drop jQuery for resize and drag&drop features

# Thanks

I would like to thank the entire ProcessWire community and in particular Ryan Cramer for his amazing work. Also part of this module is based on his Hanna Code module.

# License

Licenced under GPLv2. See LICENSE.

Have fun with the code.