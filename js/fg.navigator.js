FG.navigator = {
  init: function (options) {
    this.options = options;
    this.options.pages = document.getElementsByClassName(this.options.pageClass);
    this.options.navLinks = document.getElementsByClassName(this.options.navLinkClass);

    var i, navLink, pageId;
    var that = this;

    //register handlers for navigation links
    for (i=0; i<this.options.navLinks.length; i++) {
      navLink = this.options.navLinks[i];
      navLink.onclick = function () {
        pageId = this.href.match(/#\S+$/)[0];
        that.goTo(pageId);
        return false;
      };
    }
  },

  goTo: function (pageId) {
    var i, page, callback, navLink;
    var target = this.options.routes[pageId];

    if (target instanceof Array) {
      callback = target[1];
      target = target[0];
    }

    //set current nav link
    for (i=0; i<this.options.navLinks.length; i++) {
      navLink = this.options.navLinks[i];

      FG.core.removeClass(navLink, "current");
      if (navLink.href.match(new RegExp(pageId+"$"))) {
        FG.core.addClass(navLink, "current");
      }
    }

    //set current page
    for (i=0; i<this.options.pages.length; i++) {
      page = this.options.pages[i];

      FG.core.removeClass(page, this.options.activePageClass);
      if (page.id === target) {
        FG.core.addClass(page, this.options.activePageClass);
        window.scrollTo(0,0);
        callback && callback.apply(this,[page]);
      }
    }
  }
};
