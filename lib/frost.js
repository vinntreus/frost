var eventBuilder = require('./event-builder');
var idGeneratorDate = require('./id-generator-date');
var inMemoryStore = require('./in-memory-store');

module.exports = function(options){
  options = options || {};
  var store = options.store || inMemoryStore;
  var idGenerator = options.idGenerator || idGeneratorDate;

  function storeEvent(eventData){
    var event = eventBuilder(eventData).validate().withId(idGenerator).build();
    store.save(event);
  }

  return {
    add : storeEvent,
    setIdGenerator : function(generatorFn){ idGenerator = generatorFn; },
    setStore : function(store){ store = store; }
  };
};