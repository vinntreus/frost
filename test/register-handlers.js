var assert = require('chai').assert;
var lodash = require('lodash');
var frost = require('../lib/frost.js');

describe('register handler', function(){

  beforeEach(function(){
    frost.init({clearStore: true});
  });

  it('not added any then handlers are empty object', function(){
    frost.init();
    assert.ok(lodash.isEmpty(frost.getHandlers()), 'handlers is not empty');
  });

  it('adds new handler by key', function(){
    var handler = function(){};

    frost.registerHandler({myHandler : handler});

    assert.equal(frost.getHandlers().myHandler, handler);
  });

  it('and then clearing it removes all', function(){
    frost.registerHandler({myHandler : function(){}});
    frost.clearHandlers();

    assert.ok(lodash.isEmpty(frost.getHandlers()), 'handlers is not empty');
  });

});