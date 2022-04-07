(function($) {
    var positionElement = function positionElement(elem, x, y, width, height, animate) {
        var targetPosition = {
            left: x + 'px',
            top: y + 'px',
            width: width + 'px',
            height: height + 'px'
        };

        var fixAspectRatio = function () {
            var sub = elem.querySelector('.VC_root');
            if (sub) {
                // If this is the parent of a subscriber or publisher then we need
                // to force the mutation observer on the publisher or subscriber to
                // trigger to get it to fix it's layout
                var oldWidth = sub.style.width;
                sub.style.width = width + 'px';
                // sub.style.height = height + 'px';
                sub.style.width = oldWidth || '';
            }
        };

        if (animate && $) {
            $(elem).stop();
            $(elem).animate(targetPosition, animate.duration || 200, animate.easing || 'swing',
            function () {
                fixAspectRatio();
                if (animate.complete) animate.complete.call(this);
            });
        } else {
            VC.$.css(elem, targetPosition);
        }
        fixAspectRatio();
    };

    var getVideoRatio = function(elem) {
      if (!elem) {
        return 3 / 4;
      }
      var video = elem.querySelector('video');
      if (video && video.videoHeight && video.videoWidth) {
        return video.videoHeight / video.videoWidth;
      } else if (elem.videoHeight && elem.videoWidth) {
        return elem.videoHeight / elem.videoWidth;
      }
      return 3 / 4;
    }

    var getCSSNumber = function (elem, prop) {
        var cssStr = VC.$.css(elem, prop);
        return cssStr ? parseInt(cssStr, 10) : 0;
    };

    // Really cheap UUID function
    var cheapUUID = function() {
      return (Math.random() * 100000000).toFixed(0);
    };

    var getHeight = function (elem) {
        var heightStr = VC.$.height(elem);
        return heightStr ? parseInt(heightStr, 10) : 0;
    };

    var getWidth = function (elem) {
        var widthStr = VC.$.width(elem);
        return widthStr ? parseInt(widthStr, 10) : 0;
    };

    var arrange = function arrange(children, Width, Height, offsetLeft, offsetTop, fixedRatio,
      minRatio, maxRatio, animate) {
        var count = children.length,
            dimensions;

        var getBestDimensions = function getBestDimensions(minRatio, maxRatio) {
            var maxArea,
                targetCols,
                targetRows,
                targetHeight,
                targetWidth,
                tWidth,
                tHeight,
                tRatio;

            // Iterate through every possible combination of rows and columns
            // and see which one has the least amount of whitespace
            for (var i=1; i <= count; i++) {
                var cols = i;
                var rows = Math.ceil(count / cols);

                // Try taking up the whole height and width
                tHeight = Math.floor( Height/rows );
                tWidth = Math.floor(Width/cols);

                tRatio = tHeight/tWidth;
                if (tRatio > maxRatio) {
                    // We went over decrease the height
                    tRatio = maxRatio;
                    tHeight = tWidth * tRatio;
                } else if (tRatio < minRatio) {
                    // We went under decrease the width
                    tRatio = minRatio;
                    tWidth = tHeight / tRatio;
                }

                var area = (tWidth*tHeight) * count;

                // If this width and height takes up the most space then we're going with that
                if (maxArea === undefined || (area > maxArea)) {
                    maxArea = area;
                    targetHeight = tHeight;
                    targetWidth = tWidth;
                    targetCols = cols;
                    targetRows = rows;
                }
            }
            return {
                maxArea: maxArea,
                targetCols: targetCols,
                targetRows: targetRows,
                targetHeight: targetHeight,
                targetWidth: targetWidth,
                ratio: targetHeight / targetWidth
            };
        };

        if (!fixedRatio) {
          dimensions = getBestDimensions(minRatio, maxRatio);
        } else {
          // Use the ratio of the first video element we find to approximate
          var ratio = getVideoRatio(children.length > 0 ? children[0] : null);
          dimensions = getBestDimensions(ratio, ratio);
        }

        // Loop through each stream in the container and place it inside
        var x = 0,
            y = 0,
            rows = [],
            row;
        // Iterate through the children and create an array with a new item for each row
        // and calculate the width of each row so that we know if we go over the size and need
        // to adjust
        for (var i=0; i < children.length; i++) {
          if (i % dimensions.targetCols === 0) {
            // This is a new row
            row = {
              children: [],
              width: 0,
              height: 0
            };
            rows.push(row);
          }
          var elem = children[i];
          row.children.push(elem);
          var targetWidth = dimensions.targetWidth;
          var targetHeight = dimensions.targetHeight;
          // If we're using a fixedRatio then we need to set the correct ratio for this element
          if (fixedRatio) {
            targetWidth = targetHeight / getVideoRatio(elem);
          }
          row.width += targetWidth;
          row.height = targetHeight;
        }
        // Calculate total row height adjusting if we go too wide
        var totalRowHeight = 0;
        var remainingShortRows = 0;
        for (i = 0; i < rows.length; i++) {
          var row = rows[i];
          if (row.width > Width) {
            // Went over on the width, need to adjust the height proportionally
            row.height = Math.floor(row.height * (Width / row.width));
            row.width = Width;
          } else if (row.width < Width) {
            remainingShortRows += 1;
          }
          totalRowHeight += row.height;
        }
        if (totalRowHeight < Height && remainingShortRows > 0) {
          // We can grow some of the rows, we're not taking up the whole height
          var remainingHeightDiff = Height - totalRowHeight;
          totalRowHeight = 0;
          for (i = 0; i < rows.length; i++) {
            var row = rows[i];
            if (row.width < Width) {
              // Evenly distribute the extra height between the short rows
              var extraHeight = remainingHeightDiff / remainingShortRows;
              if ((extraHeight / row.height) > ((Width - row.width) / row.width)) {
                // We can't go that big or we'll go too wide
                extraHeight = Math.floor(((Width - row.width) / row.width) * row.height);
              }
              row.width += Math.floor((extraHeight / row.height) * row.width);
              row.height += extraHeight;
              remainingHeightDiff -= extraHeight;
              remainingShortRows -= 1;
            }
            totalRowHeight += row.height;
          }
        }
        // vertical centering
        y = ((Height - (totalRowHeight)) / 2);
        // Iterate through each row and place each child
        for (i = 0; i < rows.length; i++) {
          var row = rows[i];
          // center the row
          var rowMarginLeft = ((Width - row.width) / 2);
          x = rowMarginLeft;
          for (var j = 0; j < row.children.length; j++) {
            var elem = row.children[j];

            var targetWidth = dimensions.targetWidth;
            var targetHeight = row.height;
            // If we're using a fixedRatio then we need to set the correct ratio for this element
            if (fixedRatio) {
              targetWidth = Math.floor(targetHeight / getVideoRatio(elem));
            }
            VC.$.css(elem, 'position', 'absolute');
            var actualWidth = targetWidth - getCSSNumber(elem, 'paddingLeft') -
                            getCSSNumber(elem, 'paddingRight') -
                            getCSSNumber(elem, 'marginLeft') -
                            getCSSNumber(elem, 'marginRight') -
                            getCSSNumber(elem, 'borderLeft') -
                            getCSSNumber(elem, 'borderRight');

             var actualHeight = targetHeight - getCSSNumber(elem, 'paddingTop') -
                            getCSSNumber(elem, 'paddingBottom') -
                            getCSSNumber(elem, 'marginTop') -
                            getCSSNumber(elem, 'marginBottom') -
                            getCSSNumber(elem, 'borderTop') -
                            getCSSNumber(elem, 'borderBottom');

            positionElement(elem, x+offsetLeft, y+offsetTop, actualWidth, actualHeight, animate);
            x += targetWidth;
          }
          y += targetHeight;
        }
    };

    var filterDisplayNone = function (element) {
        return VC.$.css(element, 'display') !== 'none';
    };

    var layout = function layout(container, opts) {
        if (VC.$.css(container, 'display') === 'none') {
            return;
        }
        var id = container.getAttribute('id');
        if (!id) {
            id = 'VC_' + cheapUUID();
            container.setAttribute('id', id);
        }

        var Height = getHeight(container) -
                    getCSSNumber(container, 'borderTop') -
                    getCSSNumber(container, 'borderBottom'),
            Width = getWidth(container) -
                    getCSSNumber(container, 'borderLeft') -
                    getCSSNumber(container, 'borderRight'),
            availableRatio = Height/Width,
            offsetLeft = 0,
            offsetTop = 0,
            bigOffsetTop = 0,
            bigOffsetLeft = 0,
            bigOnes = Array.prototype.filter.call(
                container.querySelectorAll('#' + id + '>.' + opts.bigClass),
                filterDisplayNone),
            smallOnes = Array.prototype.filter.call(
                container.querySelectorAll('#' + id + '>*:not(.' + opts.bigClass + ')'),
                filterDisplayNone);

        if (bigOnes.length > 0 && smallOnes.length > 0) {
            var bigWidth, bigHeight;

            if (availableRatio > getVideoRatio(bigOnes[0])) {
                // We are tall, going to take up the whole width and arrange small
                // guys at the bottom
                bigWidth = Width;
                bigHeight = Math.floor(Height * opts.bigPercentage);
                offsetTop = bigHeight;
                bigOffsetTop = Height - offsetTop;
            } else {
                // We are wide, going to take up the whole height and arrange the small
                // guys on the right
                bigHeight = Height;
                bigWidth = Math.floor(Width * opts.bigPercentage);
                offsetLeft = bigWidth;
                bigOffsetLeft = Width - offsetLeft;
            }
            if (opts.bigFirst) {
              arrange(bigOnes, bigWidth, bigHeight, 0, 0, opts.bigFixedRatio, opts.bigMinRatio,
                opts.bigMaxRatio, opts.animate);
              arrange(smallOnes, Width - offsetLeft, Height - offsetTop, offsetLeft, offsetTop,
                opts.fixedRatio, opts.minRatio, opts.maxRatio, opts.animate);
            } else {
              arrange(smallOnes, Width - offsetLeft, Height - offsetTop, 0, 0, opts.fixedRatio,
                opts.minRatio, opts.maxRatio, opts.animate);
              arrange(bigOnes, bigWidth, bigHeight, bigOffsetLeft, bigOffsetTop,
                opts.bigFixedRatio, opts.bigMinRatio, opts.bigMaxRatio, opts.animate);
            }
        } else if (bigOnes.length > 0 && smallOnes.length === 0) {
            // We only have one bigOne just center it
            arrange(bigOnes, Width, Height, 0, 0, opts.bigFixedRatio, opts.bigMinRatio,
              opts.bigMaxRatio, opts.animate);
        } else {
            arrange(smallOnes, Width - offsetLeft, Height - offsetTop, offsetLeft, offsetTop,
              opts.fixedRatio, opts.minRatio, opts.maxRatio, opts.animate);
        }
    };

    var initLayoutContainer = function(container, opts) {
        opts = VC.$.defaults(opts || {}, {
            maxRatio: 3/2,
            minRatio: 9/16,
            fixedRatio: false,
            animate: false,
            bigClass: 'VC_big',
            bigPercentage: 0.8,
            bigFixedRatio: false,
            bigMaxRatio: 3/2,
            bigMinRatio: 9/16,
            bigFirst: true
        });
        container = typeof(container) === 'string' ? VC.$(container) : container;

        // TODO: should we add event hooks to external globals like this?
        // this could be left as a responsibility of the user, and i think that would be more sound
        // the VC.onLoad() method has (publicly) undefined behavior
        VC.onLoad(function() {
            layout(container, opts);
        });

        return {
            layout: layout.bind(null, container, opts)
        };
    };

    if (typeof module === 'undefined' || typeof module.exports === 'undefined') {
      window.initLayoutContainer = initLayoutContainer;
    } else {
      module.exports.initLayoutContainer = initLayoutContainer;
    }

})((typeof window !== 'undefined' && window.hasOwnProperty('jQuery')) ? window.jQuery : undefined);
