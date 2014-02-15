// Generated by CoffeeScript 1.6.3
(function() {
  describe("HAL.Collection", function() {
    beforeEach(function() {
      this.hal_response = Helper.collection_response;
      return this.col = new HAL.Collection(this.hal_response);
    });
    describe("when instantiated", function() {
      it("strips out the _links and _embedded properties", function() {
        return expect(this.col.get('_links') || this.col.get('_embedded')).toBeUndefined();
      });
      it("returns the correct URI from url() function", function() {
        return expect(this.col.url()).toEqual(this.hal_response._links.self.href);
      });
      it("sets links property of instance correctly", function() {
        return expect(this.col.links).toEqual(this.hal_response._links);
      });
      it("sets embedded property of instance correctly", function() {
        return expect(this.col.embedded).toEqual(this.hal_response._embedded);
      });
      return it("sets normal properties up as expected", function() {
        return expect([this.col.attributes.prop, this.col.attributes.other_prop]).toEqual([this.hal_response.prop, this.hal_response.other_prop]);
      });
    });
    describe("when reset with #fetch()", function() {
      beforeEach(function() {
        this.server = sinon.fakeServer.create();
        this.updated_response = Helper.updated_collection_response;
        this.server.respondWith([
          200, {
            'Content-Type': 'application/hal+json'
          }, JSON.stringify(this.updated_response)
        ]);
        this.col.fetch();
        return this.server.respond();
      });
      afterEach(function() {
        return this.server.restore();
      });
      it("updates the links property correctly", function() {
        return expect(this.col.links).toEqual(this.updated_response._links);
      });
      it("updates the embedded property correctly", function() {
        return expect(this.col.embedded.embed2).not.toBeUndefined();
      });
      it("strips out _links and _embedded", function() {
        return expect(this.col.get('_embedded') || this.col.get('_links')).toBeUndefined();
      });
      return it("updates properties correctly", function() {
        return expect([this.col.attributes.prop, this.col.attributes.other_prop, this.col.attributes.additional]).toEqual([this.updated_response.prop, this.updated_response.other_prop, this.updated_response.additional]);
      });
    });
    return describe("when reset with #reset()", function() {
      beforeEach(function() {
        return this.updated_response = Helper.updated_collection_response;
      });
      describe("called with a full HAL document", function() {
        beforeEach(function() {
          return this.col.reset(this.updated_response);
        });
        it("updates the links property correctly", function() {
          return expect(this.col.links).toEqual(this.updated_response._links);
        });
        it("updates the embedded property correctly", function() {
          return expect(this.col.embedded.embed2).not.toBeUndefined();
        });
        it("strips out _links and _embedded", function() {
          return expect(this.col.get('_embedded') || this.col.get('_links')).toBeUndefined();
        });
        it("updates the items", function() {
          console.log(this.updated_response);
          return expect(this.col.models.length).toEqual(this.updated_response._embedded.items.length);
        });
        return it("updates properties correctly", function() {
          return expect([this.col.attributes.prop, this.col.attributes.other_prop, this.col.attributes.additional]).toEqual([this.updated_response.prop, this.updated_response.other_prop, this.updated_response.additional]);
        });
      });
      return describe("called with just an array of items", function() {
        beforeEach(function() {
          return this.col.reset(this.updated_response._embedded.items);
        });
        it("leaves the links property in-tact", function() {
          return expect(this.col.links).not.toBeUndefined;
        });
        it("leaves the embedded property in-tact", function() {
          return expect(this.col.embedded).not.toBeUndefined();
        });
        return it("updates the items", function() {
          return expect(this.col.models.length).toEqual(this.updated_response._embedded.items.length);
        });
      });
    });
  });

}).call(this);
