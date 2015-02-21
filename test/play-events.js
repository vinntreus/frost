var assert = require('chai').assert;
var frost = require('../lib/frost.js');

describe('play events', function(){

  it('builds domain object', function(){
    var es = frost();
    var domain = null;
    es.registerHandler({a : function(event, domain){
      domain.a = event.data;
    }});
    es.add({name: 'a', key:'root', id: 1, data : 2});

    domain = es.playEvents('root');

    assert.equal(domain.a, 2);
  });

  it("throws exception if handler if missing", function(){
    var es = frost();
    es.add({name: 'a', key:'root', id: 1, data : 2});

    assert.throws(function(){es.playEvents('root')}, 'Missing event handler for "a" in "root"');
  });

});