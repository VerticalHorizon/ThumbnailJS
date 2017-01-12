(function ($) {

  $.fn.thumbnail = function (options) {

    var settings = $.extend({
      // These are the defaults.
      wrap: "<img src=\"|\" />",
      placeholder: "thumbholder"
    }, options);

    return this.each(function () {

      var input = $(this);
      var placeholder = $('#' + (input.attr('thumbnail') || settings.placeholder));

      input.on('change', function (evt) {

        placeholder.empty();
        var files = evt.target.files; // FileList object

        // Loop through the FileList and render image files as thumbnails.
        for (var i = 0, f; f = files[i]; i++) {

          // Only process image files.
          if (!f.type.match('image.*')) {
            continue;
          }

          var title   = [],
            info    = [];
          title.push('<strong>', escape(f.name), '</strong>');
          info.push('(', f.type || 'n/a', ') - ', f.size, ' bytes, last modified: ', f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a');

          var reader = new FileReader();

          // Closure to capture the file information.
          reader.onload = (function (theFile) {
            return function (e) {
              // Render thumbnail.
              placeholder.append(
              ['<div class="col-sm-4">\
                  <div class="panel panel-default">\
                    <div class="panel-heading">\
                      <button type="button" class="close" aria-hidden="true" tabindex="-1">&times;</button>\
                      <h3 class="panel-title">', title.join(''), '</h3>\
                    </div>\
                    <div class="panel-body">\
                      <img class="img-thumbnail" src="', e.target.result, '" title="', escape(theFile.name), '"/>\
                    </div>\
                    <div class="panel-footer">', info.join(''), '</div>\
                  </div>\
                </div>'].join(''));
            };
          })(f);

          // Read in the image file as a data URL.
          reader.readAsDataURL(f);
        }
      }); // on change

      placeholder.on('click', 'button.close', function () {
        placeholder.empty();
        input[0].value = null;
      });
    });
  };

}(jQuery));