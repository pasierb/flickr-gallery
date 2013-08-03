FG.search = {
  jsonpScript: null,

  init: function (options) {
    var that = this;
    this.options = options;
    this.options.page = 1;
    this.options.morePages = false;

    //register onsubmit handler
    this.options.form.onsubmit = function () {
      that.options.resultsContainer.innerHTML = "";
      that.options.page = 1;
      that.jsonpRequest({
        url: FG.flickrApi.requestUrl({
          query: that.options.queryInput.value
        })
      });
      return false;
    }

    //register more button handler
    this.options.moreButton.onclick = function (event) { that.nextPage(); }

    //attach handler to container instead of every image
    this.options.resultsContainer.onclick = function (event) {
      var image;

      if (event.target.tagName === "IMG") {
        image = event.target;
        FG.core.toggleClass(image, "fg-selected", {
          onAdd: function () { FG.gallery.addImage(image.src); },
          onRemove: function () { FG.gallery.removeImage(image.src); }
        });
      }
      return false;
    }
  },

  //Flickr response handler
  success: function (data) {
    //in case of invalid request
    if (data.stat !== "ok") {
      data.message && alert(data.message);
      return false;
    }

    var that = this;
    var image;

    //toggle more button
    this.toggleMoreButton((data.photos.pages > data.photos.page));

    //add images to results section
    data.photos.photo.forEach(function (photo) {
      image = document.createElement('img');
      image.src = FG.flickrApi.imageUrl(photo);
      that.options.resultsContainer.appendChild(image);
    });

    //get rid of junks
    this.jsonpScript && document.head.removeChild(this.jsonpScript);
    FG.core.loading(false);

    this.jsonpScript = null;
  },

  // little trick to bypass Access-Controll-Allow-Origin
  jsonpRequest: function (options) {
    FG.core.loading(true);
    this.jsonpScript = document.createElement('script');
    this.jsonpScript.src = options.url;
    this.jsonpScript.id = "jsonpScript";
    document.head.appendChild(this.jsonpScript);
  },

  nextPage: function () {
    var that = this;
    var page = this.options.page += 1;

    this.jsonpRequest({
      url: FG.flickrApi.requestUrl({
        query: that.options.queryInput.value,
        page: page
      })
    })
  },

  toggleMoreButton: function (toggle) {
    if (toggle) {
      FG.core.removeClass(this.options.moreButton, "hidden");
    } else {
      FG.core.addClass(this.options.moreButton, "hidden");
    }
  }
};
