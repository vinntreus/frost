var assert = require('chai').assert;
var store = require('../lib/in-memory-store');
var frost = require('../lib/frost');
var es = frost({store : store});

describe('get events', function(){

  beforeEach(function(){
    store.clear();
  });
  
  it('should return empty array when no events', function(){
    assert.sameMembers(es.getEventsFrom('a'), []);
  });

  it('should match stored event', function(){
    var event = {key : 'a', name : 'b', id : 'c'};
    es.add(event);
    assert.deepEqual(es.getEventsFrom('a'), [event]);
  });

  it('should match stored events order', function(){
    var event1 = {key : 'a', name : 'b1', id : 1};
    var event2 = {key : 'a', name : 'b2', id : 2};
    es.add(event1);
    es.add(event2);
    assert.deepEqual(es.getEventsFrom('a'), [event1, event2]);
  });

});