var expect = require('chai').expect;
var frost = require('../lib/frost.js');

var getValidEvent = function(){
  return {
    name : 'a',
    key: 'b',
    data: {}
  };
};

describe('adding events', function(){
  var es, store, idGenerator;
  
  beforeEach(function(){
    store = { save : function(){}};
    idGenerator = { generate : function(){}};
    es = frost({store : store, idGenerator : idGenerator});
  });

  it('should store event', function(done){
    store.save = function(event){ 
      expect(event.name).to.equal('a');
      expect(event.key).to.equal('b');
      expect(event.data.a).to.equal('b');
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
      expect(addWithoutKey).to.throw('event');
  }

  it('should create clone of event data', function(){
    var eventData = getValidEvent();
    eventData.name = 'a';
    store.save = function(event){ 
      event.name = 'b';
    };
    es.add(eventData);
    expect(eventData.name).to.equal('a');
  });

  it('should keep id if passed in', function(done){
    var event = getValidEvent();
    event.id = 1;
    store.save = function(event){ 
      expect(event.id).to.equal(1);
      done();
    };
    es.add(event);
  });

  it('should generate id if missing', function(done){
    var event = getValidEvent();
    idGenerator.generate = function(){ return 2;};
    store.save = function(event){ 
      expect(event.id).to.equal(2);
      done();
    };
    es.add(event);
  });
});