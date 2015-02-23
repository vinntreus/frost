var assert = require('chai').assert;
var frost = require('../lib/frost.js');

describe('publish events', function(){

  it('stores event', function(){
    var es = frost({clearStore: true});
    var events = [];
    es.registerHandler({a : function(event, domain){
      domain.a = event.data;
    }});

    es.publishEvent({name: 'a', key:'root', id: 1, data : 2});
    events = es.getEventsFrom('root');

    assert.equal(events.length, 1);
    assert.equal(events[0].name, 'a');
  });

  it('plays events', function(){
    var es = frost({clearStore: true});
    var domain = {};
    es.registerHandler({b : function(event, domain){
      domain.a = event.data;
    }});

    es.publishEvent({name: 'b', key:'root', id: 1, data : 2}, 'domain');
    domain = es.getSnapshot('domain');

    assert.deepEqual(domain, {a : 2});
  });

  it('plays multiple events with incremental snapshot', function(){
    var es = frost({clearStore: true});
    var domain = {};
    var eventCount = 0;
    es.registerHandler({c : function(event, domain){
      domain.a = event.data;
      eventCount += 1;
    }});

    es.publishEvent({name: 'c', key:'root', id: 1, data : 2}, 'domain');
    es.publishEvent({name: 'c', key:'root', id: 2, data : 1}, 'domain');
    domain = es.getSnapshot('domain');

    assert.deepEqual(domain, {a : 1});
    assert.equal(eventCount, 2);
  });

  it('plays multiple events with rebuild snapshot', function(){
    var es = frost({clearStore: true, incrementalSnapshot : false});
    var domain = {};
    var eventCount = 0;
    es.registerHandler({d : function(event, domain){
      domain.a = event.data;
      eventCount += 1;
    }});

    es.publishEvent({name: 'd', key:'root', id: 1, data : 2}, 'domain');
    es.publishEvent({name: 'd', key:'root', id: 2, data : 1}, 'domain');
    domain = es.getSnapshot('domain');

    assert.deepEqual(domain, {a : 1});
    assert.equal(eventCount, 3);
  });

});