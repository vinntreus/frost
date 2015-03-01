var assert = require('chai').assert;
var store = require('../lib/in-memory-store');
var frost = require('../lib/frost');

describe('get events', function(){

  beforeEach(function(){
    store.clear();
    frost.init({store : store});
  });
  
  it('should return empty array when no events', function(){
    assert.sameMembers(frost.getEventsFrom('a'), []);
  });

  it('should match stored event', function(){
    var event = {key : 'a', name : 'b', id : 'c'};
    frost.add(event);
    assert.deepEqual(frost.getEventsFrom('a'), [event]);
  });

  it('should match stored events order', function(){
    var event1 = {key : 'a', name : 'b1', id : 1};
    var event2 = {key : 'a', name : 'b2', id : 2};
    frost.add(event1);
    frost.add(event2);
    assert.deepEqual(frost.getEventsFrom('a'), [event1, event2]);
  });

});