describe("FG.core", function () {
  describe("addClass", function () {
    var element;

    beforeEach(function () {
      element = document.createElement("div");
      element.className = "";
    });

    it("should add css class", function () {
      FG.core.addClass(element, "test");
      expect(element.className).toEqual(" test");
    });

    it("should not add css class if already has it", function () {
      element.className = "test";
      FG.core.addClass(element, "test");
      expect(element.className).toEqual("test");
    });
  });

  describe("removeClass", function () {
    var element;

    beforeEach(function () {
      element = document.createElement("div");
      element.className = "test1 test2";
    });

    it("should remove css class", function () {
      FG.core.removeClass(element, "test2");
      expect(element.className).toEqual("test1 ");
    });
  });

  describe("toggleClass", function () {
    var element;

    beforeEach(function () {
      element = document.createElement("div");
      element.className = "test";
    });

    it("should remove css class", function () {
      FG.core.toggleClass(element, "test");
      expect(element.className).toEqual("");
    });

    it("should add css class", function () {
      element.className = "";
      FG.core.toggleClass(element, "test");
      expect(element.className).toEqual(" test");
    });

    it("should trigger onRemove callback", function () {
      var triggered = false;
      FG.core.toggleClass(element, "test", {
        onRemove: function () { triggered = true; }
      });
      expect(triggered).toEqual(true);
    });

    it("should trigger onAdd callback", function () {
      var triggered = false;
      element.className = "";
      FG.core.toggleClass(element, "test", {
        onAdd: function () { triggered = true; }
      });
      expect(triggered).toEqual(true);
    });
  });

  describe("hasClass", function () {
    var element;

    beforeEach(function () {
      element = document.createElement("div");
      element.className = "test";
    });

    it("should detect css class", function () {
      expect(FG.core.hasClass(element, "test")).toEqual(true);
    });

    it("should not detect css class", function () {
      expect(FG.core.hasClass(element, "test2")).toEqual(false);
    });
  });
});
