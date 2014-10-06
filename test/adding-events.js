var expect = require('chai').expect;
var frost = require('../lib/frost.js');

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
      done();
    };
    es.add({name : 'a'});
  });

  it('should throw exception if name is missing', function(){
    var addWithoutName = function(){
      es.add({});
    };
    expect(addWithoutName).to.throw('event name');
  });

  it('should throw exception if name is null', function(){
    var addWithNameNull = function(){
      es.add({name : null});
    };
    expect(addWithNameNull).to.throw('event name');
  });

  it('should create clone of event data', function(){
    var eventData = {name: 'a'};
    store.save = function(event){ 
      event.name = 'b';
    };
    es.add(eventData);
    expect(eventData.name).to.equal('a');
  });

  it('should keep id if passed in', function(done){
    store.save = function(event){ 
      expect(event.id).to.equal(1);
      done();
    };
    es.add({name : 'a', id: 1});
  });

  it('should generate id if missing', function(done){
    idGenerator.generate = function(){ return 2;};
    store.save = function(event){ 
      expect(event.id).to.equal(2);
      done();
    };
    es.add({name : 'a'});
  });
});