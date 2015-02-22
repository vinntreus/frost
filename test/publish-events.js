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
    es.registerHandler({a : function(event, domain){
      domain.a = event.data;
    }});

    es.publishEvent({name: 'a', key:'root', id: 1, data : 2}, 'domain');
    domain = es.getSnapshot('domain');

    assert.deepEqual(domain, {a : 2});
  });

});