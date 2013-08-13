FG.flickrApi = {
  init: function (options) {
    this.options = options;
    return this;
  },

  requestUrl: function (options) {
    var formattedQuery = options.query &&  options.query.replace(/\s*(,)+\s*/, ",").replace(/\s+/g, "+");
    var method = "flickr.photos.search";

    if (!formattedQuery) method = "flickr.photos.getRecent";
    return "http://api.flickr.com/services/rest/?method="+method+"&api_key="+this.options.key+"&text="+formattedQuery+"&page="+(options.page || 1)+"&format=json&callback=?";
  },

  imageUrl: function (params) {
    return "http://farm"+params.farm+".static.flickr.com/"+params.server+"/"+params.id+"_"+params.secret+".jpg";
  }
}

//Flickr jsonp callback
function jsonFlickrApi (data) {
  FG.search.success(data);
}
