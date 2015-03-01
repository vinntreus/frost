var assert = require('chai').assert;
var frost = require('../lib/frost.js');

describe('play events', function(){

  beforeEach(function(){
    frost.init({clearStore: true});
  });

  it('builds domain object', function(){
    var domain = null;
    frost.registerHandler({a : function(event, domain){
      domain.a = event.data;
    }});
    frost.add({name: 'a', key:'root', id: 1, data : 2});

    domain = frost.playEvents('root');

    assert.equal(domain.a, 2);
  });

  it("throws exception if handler if missing", function(){
    frost.add({name: 'a', key:'root', id: 1, data : 2});

    assert.throws(function(){frost.playEvents('root')}, 'Missing event handler for "a" in "root"');
  });

});