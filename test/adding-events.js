var assert = require('chai').assert;
var frost = require('../lib/frost.js');

var getValidEvent = function(){
  return {
    name : 'a',
    key: 'b',
    data: {}
  };
};

describe('adding events', function(){
  var es, store;
  
  beforeEach(function(){
    store = { save : function(){}};
    es = frost({store : store});
  });

  it('should store event', function(done){
    store.save = function(event){ 
      assert.equal(event.name, 'a');
      assert.equal(event.key, 'b');
      assert.equal(event.data.a, 'b');
      assert.ok(event.id, 'must have id');
      done();
    };
    es.add({name : 'a', key: 'b', data : { a : 'b'} });
  });

  describe('name is missing', function(){
    it('should throw exception if name is missing', function(){
      testPropertyIs(function(e){delete e.name;});
    });

    it('should throw exception if name is null', function(){
      testPropertyIs(function(e){e.name = null;});
    });

    it('should throw exception if name is empty', function(){
      testPropertyIs(function(e){e.name = '';});
    });
  });

  describe('missing key', function(){
    it('should throw exception if key is missing', function(){
      testPropertyIs(function(e){delete e.key;});
    });
    it('should throw exception if key is null', function(){
      testPropertyIs(function(e){e.key = null;});
    });
    it('should throw exception if key is empty', function(){
      testPropertyIs(function(e){e.key = '';});
    });
  });

  function testPropertyIs(callback){
      var addWithoutKey = function(){
        var e = getValidEvent();
        callback(e);
        es.add(e);
      };
      assert.throw(addWithoutKey, 'event');
  }

  it('should create clone of event data', function(){
    var eventData = getValidEvent();
    eventData.name = 'a';
    store.save = function(event){ 
      event.name = 'b';
    };
    es.add(eventData);
    assert.equal(eventData.name, 'a');
  });

  it('should keep id if passed in', function(done){
    var event = getValidEvent();
    event.id = 1;
    store.save = function(event){ 
      assert.equal(event.id, 1);
      done();
    };
    es.add(event);
  });

  it('should generate id if missing', function(done){
    var event = getValidEvent();
    es.setIdGenerator(function(){ return 2;});
    store.save = function(event){ 
      assert.equal(event.id, 2);
      done();
    };
    es.add(event);
  });
});