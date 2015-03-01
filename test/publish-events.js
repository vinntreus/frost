var assert = require('chai').assert;
var frost = require('../lib/frost.js');

describe('publish events', function(){

  beforeEach(function(){
    frost.init({clearStore: true});
  });

  it('stores event', function(){
    var events = [];
    frost.registerHandler({a : function(event, domain){
      domain.a = event.data;
    }});

    frost.publishEvent({name: 'a', key:'root', id: 1, data : 2});
    events = frost.getEventsFrom('root');

    assert.equal(events.length, 1);
    assert.equal(events[0].name, 'a');
  });

  it('plays events', function(){
    var domain = {};
    frost.registerHandler({b : function(event, domain){
      domain.a = event.data;
    }});

    frost.publishEvent({name: 'b', key:'root', id: 1, data : 2}, 'domain');
    domain = frost.getSnapshot('domain');

    assert.deepEqual(domain, {a : 2});
  });

  it('plays multiple events with incremental snapshot', function(){
    var domain = {};
    var eventCount = 0;
    frost.registerHandler({c : function(event, domain){
      domain.a = event.data;
      eventCount += 1;
    }});

    frost.publishEvent({name: 'c', key:'root', id: 1, data : 2}, 'domain');
    frost.publishEvent({name: 'c', key:'root', id: 2, data : 1}, 'domain');
    domain = frost.getSnapshot('domain');

    assert.deepEqual(domain, {a : 1});
    assert.equal(eventCount, 2);
  });

  it('plays multiple events with rebuild snapshot', function(){
    frost.init({clearStore: true, incrementalSnapshot : false});
    var domain = {};
    var eventCount = 0;
    frost.registerHandler({d : function(event, domain){
      domain.a = event.data;
      eventCount += 1;
    }});

    frost.publishEvent({name: 'd', key:'root', id: 1, data : 2}, 'domain');
    frost.publishEvent({name: 'd', key:'root', id: 2, data : 1}, 'domain');
    domain = frost.getSnapshot('domain');

    assert.deepEqual(domain, {a : 1});
    assert.equal(eventCount, 3);
  });

  it('plays multiple events with rebuild snapshot using defaults', function(){
    frost.init({
      clearStore: true, 
      defaultSnapshotKey: 'domain', 
      defaultEventData: {key: 'root'}
    });
    var domain = {};
    frost.registerHandler({e : function(event, domain){
      domain.a = event.data;
    }});

    frost.publishEvent({name: 'e', id: 1, data : 1});
    frost.publishEvent({name: 'e', id: 2, data : 2});
    domain = frost.getSnapshot('domain');

    assert.deepEqual(domain, {a : 2});
  });

});