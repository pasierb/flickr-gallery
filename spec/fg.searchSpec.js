describe("FG.search", function () {
  var form, input, results, more, wrapper, loading;

  beforeEach(function () {
    loading = document.createElement("div");
    wrapper = document.createElement("div");
    results = document.createElement("div");
    input = document.createElement("input");
    form = document.createElement("form");
    more = document.createElement("button")

    loading.id = "loading";

    wrapper.appendChild(results);
    form.appendChild(input);
    wrapper.appendChild(results);
    wrapper.appendChild(form);
    wrapper.appendChild(more);
    wrapper.appendChild(loading);

    document.body.appendChild(wrapper);

    FG.search.init({
      form: form,
      queryInput: input,
      resultsContainer: results,
      moreButton: more
    });
  });

  afterEach(function () {
    document.body.removeChild(wrapper);
  });

  describe("success", function () {
    var data;

    beforeEach(function () {
      data = {
        stat: "ok",
        photos: {
          page: 1,
          pages: 1,
          photo: [{id: 1}, {id: 2}]
        }
      }
    });

    it("should populate results section", function () {
      FG.search.success(data);
      expect(results.children.length).toEqual(2);
    });

    it("should hide more button", function () {
      FG.search.success(data);
      expect(FG.core.hasClass(more,"hidden")).toEqual(true);
    });

    it("should show more button", function () {
      data.photos.pages = 2;
      FG.search.success(data);
      expect(FG.core.hasClass(more,"hidden")).toEqual(false);
    });
  });
});
