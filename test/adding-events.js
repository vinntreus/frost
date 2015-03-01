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
  var store;
  
  beforeEach(function(){
    store = { save : function(){}};
    frost.init({store : store});
  });

  it('should store event', function(done){
    store.addEvent = function(event){ 
      assert.equal(event.name, 'a');
      assert.equal(event.key, 'b');
      assert.equal(event.data.a, 'b');
      assert.ok(event.id, 'must have id');
      done();
    };
    frost.add({name : 'a', key: 'b', data : { a : 'b'} });
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
        frost.add(e);
      };
      assert.throw(addWithoutKey, 'event');
  }

  it('should create clone of event data', function(){
    var eventData = getValidEvent();
    eventData.name = 'a';
    store.addEvent = function(event){ 
      event.name = 'b';
    };
    frost.add(eventData);
    assert.equal(eventData.name, 'a');
  });

  it('should keep id if passed in', function(done){
    var event = getValidEvent();
    event.id = 1;
    store.addEvent = function(event){ 
      assert.equal(event.id, 1);
      done();
    };
    frost.add(event);
  });

  it('should generate id if missing', function(done){
    var event = getValidEvent();
    frost.setIdGenerator(function(){ return 2;});
    store.addEvent = function(event){ 
      assert.equal(event.id, 2);
      done();
    };
    frost.add(event);
  });
});

describe('adding events with defaultEventData', function(){
  var store;
  
  it('should append default data', function(done){
    store = { save : function(){}};
    frost.init({store : store, defaultEventData : {key : 'root'}});
    var event = getValidEvent();
    event.key = null;
    store.addEvent = function(event){ 
      assert.equal(event.key, 'root');
      done();
    };
    frost.add(event);
  });
});