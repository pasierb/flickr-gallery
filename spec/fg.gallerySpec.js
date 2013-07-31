describe("FG.gallery", function () {
  var wrapper, initData, container, previewContainer, statusContainer, nextButton, prevButton;

  beforeEach(function () {
    wrapper = document.createElement("div")
    container = document.createElement("div")
    previewContainer = document.createElement("div")
    statusContainer = document.createElement("div")
    nextButton = document.createElement("a")
    prevButton = document.createElement("a")

    wrapper.appendChild(container);
    wrapper.appendChild(previewContainer);
    wrapper.appendChild(statusContainer);
    wrapper.appendChild(nextButton);
    wrapper.appendChild(prevButton);
    document.body.appendChild(wrapper);

    initData = {
      container: container,
      previewContainer: previewContainer,
      statusContainer: statusContainer,
      nextButton: nextButton,
      prevButton: prevButton
    }
    FG.gallery.init(initData);
  });

  afterEach(function () {
    document.body.removeChild(wrapper);
  });

  describe("show", function () {
    it("should clear container", function () {
      container.innerHTML = "stuff";
      FG.gallery.show();
      expect(container.innerHTML).toEqual("");
    });

    it("should clear status", function () {
      statusContainer.innerHTML = "stuff";
      FG.gallery.show();
      expect(statusContainer.innerHTML).toEqual("");
    });

    it("should display first image", function () {
      FG.gallery.options.images = ["test.png"]
      FG.gallery.show();
      expect(container.firstChild.src).toMatch(/.*test.png$/);
    });
  });

  describe("display image", function () {
    beforeEach(function () {
      FG.gallery.options.images = ["test.png", "test2.png"];
      FG.gallery.show();
    });

    it("should display image of given index", function () {
      FG.gallery.displayImage(1);
      expect(container.firstChild.src).toMatch(/.*test2.png$/);
    });

    it("should set current image index", function () {
      FG.gallery.displayImage(1);
      expect(FG.gallery.options.current).toEqual(1);
    });
  });

  describe("nextImage", function () {
    beforeEach(function () {
      FG.gallery.options.images = ["test.png", "test2.png"];
      FG.gallery.show();
    });

    it("should display next image", function () {
      FG.gallery.options.current = 0;
      FG.gallery.nextImage();
      expect(FG.gallery.options.current).toEqual(1);
    });

    it("should loop", function () {
      FG.gallery.options.current = 1;
      FG.gallery.nextImage();
      expect(FG.gallery.options.current).toEqual(0);
    });
  });

  describe("prevImage", function () {
    beforeEach(function () {
      FG.gallery.options.images = ["test.png", "test2.png"];
      FG.gallery.show();
    });

    it("should display prev image", function () {
      FG.gallery.options.current = 1;
      FG.gallery.prevImage();
      expect(FG.gallery.options.current).toEqual(0);
    });

    it("should loop", function () {
      FG.gallery.options.current = 0;
      FG.gallery.prevImage();
      expect(FG.gallery.options.current).toEqual(1);
    });
  });

  describe("addImage", function () {
    it("should upate images variable", function () {
      FG.gallery.addImage("test.png");
      expect(FG.gallery.options.images.length).toEqual(1);
      expect(FG.gallery.options.images[0]).toEqual("test.png");
    });

    it("should add image to previewContainer", function () {
      FG.gallery.addImage("test.png");
      expect(previewContainer.children.length).toEqual(1);
      expect(previewContainer.firstChild.src).toMatch(/.*test.png$/);
    });
  });

  describe("removeImage", function () {
    beforeEach(function () {
      previewContainer.innerHTML = "";
      FG.gallery.options.images = [];
      FG.gallery.addImage("test.png");
    });

    it("should upate images variable", function () {
      FG.gallery.removeImage("test.png");
      expect(FG.gallery.options.images.length).toEqual(0);
    });

    it("should trigger onRemoveImage callback", function () {
      var triggered = false;
      initData.onRemoveImage = function () {
        triggered = true;
      }
      FG.gallery.init(initData);
      FG.gallery.removeImage("test.png");
      expect(triggered).toEqual(true);
    });
  });
});
