describe("FG.flickrApi", function () {
  FG.flickrApi.init({ key: 'dummy' });

  describe("requestUrl", function () {
    it("should replace whitespaces with single + sign", function () {
      expect(FG.flickrApi.requestUrl({ query: "micheal   jordan" })).toEqual("http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=dummy&text=micheal+jordan&page=1&format=json&callback=?");
    });

    it("should delete whitespaces around comas", function () {
      expect(FG.flickrApi.requestUrl({ query: "curve ball  , bf3" })).toEqual("http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=dummy&text=curve+ball,bf3&page=1&format=json&callback=?");
    });
  });

  describe("imageUrl", function () {
    var image;

    beforeEach(function () {
      image = {
        farm: "farm1",
        server: "server1",
        id: 123,
        secret: "shhh"
      }
    });

    it("should return flickr image url", function () {
      expect(FG.flickrApi.imageUrl(image)).toEqual("http://farmfarm1.static.flickr.com/server1/123_shhh.jpg");
    });
  });
});
