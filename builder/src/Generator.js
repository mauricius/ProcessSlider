var Generator = function(configuration)
{
    var id = configuration.id,
        width = configuration.size.width,
        height = configuration.size.height,
        autoplay = configuration.autoplay,
        autoplay_interval = configuration.autoplay_interval,
        duration = configuration.duration,
        pausable = configuration.pausable,
        background = configuration.background.color,
        animation = configuration.animation,
        responsive = configuration.responsive,
        bullets_skin = configuration.bullets_skin,
        arrows_skin = configuration.arrows_skin;

    function generateOptions()
    {
        return {
            autoplay : autoplay,
            autoplay_interval : autoplay_interval,
            pause_on_hover : pausable,
            responsive : responsive,
            slide_duration : duration,
            transitions : animation
        };
    };

    function generateSlider()
    {
        return {
            id : id,
            bullets_skin : bullets_skin,
            arrows_skin : arrows_skin,
            responsive : responsive,
            size : [width, height],
            background_color : background
        };
    };

    function generateSlides(slides)
    {
        var slidesObj = [];

        slides.forEach(function(slide) {
            var slideObj = {
                id : slide.id,
                name : slide.name
            };

            if(slide.background) slideObj.background = slide.background;

            slideObj.items = generateItems(slide.items);
            slidesObj.push(slideObj);
        });

        return slidesObj;
    };

    function generateItems(items)
    {
        var itemsObj = [];

        items.forEach(function(item) {
            var itemObj = {};

            itemObj.id = item.id;
            itemObj.type = item.type;
            itemObj.class = item.class;
            itemObj.name = item.name;
            itemObj.style = {
                position : "absolute",
                top : item.style.top,
                left : item.style.left,
                width : item.style.width,
                height : item.style.height
            };
            itemObj.in = {
                t : item.in.transition,
                d : item.in.at,
                du : item.in.duration
            };
            itemObj.out = {
                t3 : item.out.transition,
                d3 : item.out.at - item.in.at,
                du3 : item.out.duration
            };

            switch (item.type) {
                case 'image':
                    itemObj.options = { src : item.options.src };
                    break;
                case 'imglink':
                    itemObj.options = {
                        src : item.options.src,
                        href : item.options.href,
                        target : item.options.target
                    };
                    break;
                case 'link':
                    itemObj.options = {
                        text : item.options.text,
                        href : item.options.href,
                        target : item.options.target
                    };
                    itemObj.style['text-align'] = item.style['text-align'];

                    break;
                case 'text' :
                    itemObj.options = { text : item.options.text };
                    itemObj.style['text-align'] = item.style['text-align'];

                    break;
                case 'video':
                    itemObj.options = {
                        code : item.options.code,
                        service : item.options.service
                    };
                    break;
            }

            itemsObj.push(itemObj);
        });

        return itemsObj;
    };

    function generateExportJSON(slides)
    {
        var json = {};

        json.options = generateOptions();
        json.slider = generateSlider();
        json.slides = generateSlides(slides);

        return JSON.stringify(json);
    };

    return {
        generateExportJSON: generateExportJSON
    };
};

module.exports = Generator;
