FG.gallery = {
  init: function (options) {
    var that = this;

    this.options = options;
    this.options.images = [];
    this.options.current = 0;

    //attach one event handler to the contianer instead of every image
    this.options.previewContainer.onclick = function (event) {
      if (event.target.tagName === "IMG") that.removeImage(event.target.src);
    }

    //register next/prev event handlers
    this.options.nextButton.onclick = function (event) { that.nextImage(); }
    this.options.prevButton.onclick = function (event) { that.prevImage(); }

    return this;
  },

  addImage: function (url) {
    var image = document.createElement("image")

    //add image to preview
    image.src = url;
    image.title = "click to remove";
    this.options.previewContainer.appendChild(image);

    return this.options.images.push(url);
  },

  removeImage: function (url) {
    var images = this.options.previewContainer.children;
    var i, image;

    //remove image from preview
    for (i=0; i<images.length; i++) {
      image = images[i];
      if (image.src === url) {
        this.options.previewContainer.removeChild(image);
      }
    }

    //fire onRamoveImage callback
    this.options.onRemoveImage && this.options.onRemoveImage(url);

    return this.options.images.splice(this.options.images.indexOf(url), 1);
  },

  show: function () {
    //reset
    this.options.container.innerHTML = "";
    this.options.statusContainer.innerHTML = "";

    //stop here if no images in gallery
    if (this.options.images.length === 0) return false;

    var that = this
      , image = document.createElement("img");

    //append image to the container
    image.title = "click to get next";
    image.onclick = function (event) { that.nextImage(); }
    this.options.container.appendChild(image);

    return this.displayImage(0);
  },

  nextImage: function () {
    this.displayImage(this.options.current+1);
  },

  prevImage: function () {
    this.displayImage(this.options.current-1);
  },

  displayImage: function(index) {
    var image = this.options.container.firstChild;

    //set current index
    this.options.current = index;

    //carousel
    if (this.options.current >= this.options.images.length) this.options.current = 0;
    if (this.options.current < 0) this.options.current = this.options.images.length -1;

    //update src attribute of an image
    image.src = this.options.images[this.options.current];

    //update status bar
    this.options.statusContainer.innerHTML = (this.options.current+1)+" of "+this.options.images.length;

    return image;
  }
};
