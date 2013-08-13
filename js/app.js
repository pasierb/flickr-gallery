// init
window.onload = function () {
  FG.navigator.init({
    pageClass: "fg-page",
    activePageClass: "fg-page-active",
    navLinkClass: "fg-navlink",
    routes: {
      "#searchPage": "searchPage",
      "#galleryPage": ["galleryPage", {
        beforeFilter: function () {
          if (FG.gallery.options.images.length === 0) {
            alert('Add some images to gallery first!');
            return false;
          }
          return true;
        },
        onPage: function () {
          FG.gallery.show();
        }
      }]
    }
  });

  FG.flickrApi.init({ key: "b54580f369a7eeebecb2004dc429d08f" });

  FG.gallery.init({
    container: document.getElementById("galleryImages"),
    previewContainer: document.getElementById("galleryPreview"),
    statusContainer: document.getElementById("galleryStatus"),
    nextButton: document.getElementById("galleryNext"),
    prevButton: document.getElementById("galleryPrev"),
    onRemoveImage: function (url) {
      var images = FG.search.options.resultsContainer.children;
      var i, image;

      for (i=0; i<images.length; i++) {
        image = images[i];
        if (image.src === url) {
          FG.core.removeClass(image, "fg-selected");
        }
      }
    }
  });

  FG.search.init({
    form: document.getElementsByName("searchForm")[0],
    queryInput: document.getElementsByName("searchForm[query]")[0],
    resultsContainer: document.getElementById("searchResults"),
    moreButton: document.getElementById("searchMore")
  });

  // start page
  FG.navigator.goTo("#searchPage");
};
