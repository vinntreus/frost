var assert = require('chai').assert;
var lodash = require('lodash');
var frost = require('../lib/frost.js');

describe('register handler', function(){

  it('not added any then handlers are empty object', function(){
    var es = frost();
    assert.ok(lodash.isEmpty(es.getHandlers()), 'handlers is not empty');
  });

  it('adds new handler by key', function(){
    var es = frost();
    var handler = function(){};
    
    es.registerHandler({myHandler : handler});

    assert.equal(es.getHandlers().myHandler, handler);
  });

  it('and then clearing it removes all', function(){
    var es = frost();
    
    es.registerHandler({myHandler : function(){}});
    es.clearHandlers();
    assert.ok(lodash.isEmpty(es.getHandlers()), 'handlers is not empty');
  });

});