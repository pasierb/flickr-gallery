// global namespace to keep things clean
window.FG = {};

// Toolbox module
FG.core = {

  addClass: function (element, className) {
    if (!this.hasClass(element, className)) {
      element.className += " "+className;
    }
    return element;
  },

  removeClass: function (element, className) {
    if (this.hasClass(element, className)) {
      element.className = element.className.replace(new RegExp("\s*"+className+"\s*", "g"), '');
    }
    return element;
  },

  toggleClass: function (element, className, options) {
    if (this.hasClass(element, className)) {
      this.removeClass(element, className);
      if (options && options.onRemove) { options.onRemove(); }
    } else {
      this.addClass(element, className);
      if (options && options.onAdd) { options.onAdd(); }
    }
    return element;
  },

  hasClass: function (element, className) {
    var has = false;
    if (element.className && element.className.match(new RegExp("\s*"+className+"\s*"))) {
      has = true;
    }
    return has;
  },

  loading: function (toggle) {
    var loadingElement = document.getElementById("loading");

    if (toggle) {
      this.removeClass(loadingElement, "hidden");
      loadingElement.style.height = document.documentElement.clientHeight+"px";
    } else {
      this.addClass(loadingElement, "hidden");
    }
  }
};
