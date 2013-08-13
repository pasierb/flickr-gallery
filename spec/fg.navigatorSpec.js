describe("FG.navigator", function () {
  var wrapper, page1, page2, link1, link2;

  beforeEach(function () {
    wrapper = document.createElement("div");
    page1 = document.createElement("div");
    page2 = document.createElement("div");
    link1 = document.createElement("a");
    link2 = document.createElement("a");

    page1.className = "fg-page";
    page2.className = "fg-page";
    page1.id = "page1";
    page2.id = "page2";
    link1.className = "fg-nav-link";
    link2.className = "fg-nav-link";
    link1.href = "#page1";
    link2.href = "#page2";

    wrapper.appendChild(page1);
    wrapper.appendChild(page2);
    wrapper.appendChild(link1);
    wrapper.appendChild(link2);

    document.body.appendChild(wrapper);

    FG.navigator.init({
      pageClass: "fg-page",
      activePageClass: "active",
      navLinkClass: "fg-nav-link",
      routes: {
        "#page1": "page1",
        "#page2": "page2"
      }
    });
  });

  afterEach(function () {
    document.body.removeChild(wrapper);
  });

  describe("goTo", function () {
    it("should mark active page", function () {
      FG.navigator.goTo("#page1");
      expect(FG.core.hasClass(page1,"active")).toEqual(true);
      expect(FG.core.hasClass(page2,"active")).toEqual(false);
    });

    it("should mark current nav link", function () {
      FG.navigator.goTo("#page1");
      expect(FG.core.hasClass(link1,"current")).toEqual(true);
      expect(FG.core.hasClass(link2,"current")).toEqual(false);
    });

    it("should trigger onPage callback", function () {
      var triggered = false;

      FG.navigator.init({
        pageClass: "fg-page",
        activePageClass: "active",
        navLinkClass: "fg-nav-link",
        routes: {
          "#page1": "page1",
          "#page2": ["page2", {
            onPage: function () {
              triggered = true;
            }
          }]
        }
      });

      FG.navigator.goTo("#page2");
      expect(triggered).toEqual(true);
    });

    it("should stop if beforeFilter returns false", function () {
      FG.navigator.init({
        pageClass: "fg-page",
        activePageClass: "active",
        navLinkClass: "fg-nav-link",
        routes: {
          "#page1": "page1",
          "#page2": ["page2", {
            beforeFilter: function () {
              return false;
            }
          }]
        }
      });

      FG.navigator.goTo("#page1");
      expect(FG.navigator.options.current).toEqual("page1");
      FG.navigator.goTo("#page2");
      expect(FG.navigator.options.current).toEqual("page1");
    });

    it("should continue if beforeFilter returns true", function () {
      FG.navigator.init({
        pageClass: "fg-page",
        activePageClass: "active",
        navLinkClass: "fg-nav-link",
        routes: {
          "#page1": "page1",
          "#page2": ["page2", {
            beforeFilter: function () {
              return true;
            }
          }]
        }
      });

      FG.navigator.goTo("#page1");
      expect(FG.navigator.options.current).toEqual("page1");
      FG.navigator.goTo("#page2");
      expect(FG.navigator.options.current).toEqual("page2");
    });
  });
});
