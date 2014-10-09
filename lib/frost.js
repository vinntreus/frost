var _ = require('lodash');
var idGeneratorDate = require('./id-generator-date');
var inMemoryStore = require('./in-memory-store');

module.exports = function(options){
  options = options || {};
  var store = options.store || inMemoryStore;
  var idGenerator = options.idGenerator || idGeneratorDate;

  function addEvent(event){
    if(!event.name){ throw 'event name cannot be empty'; }
    if(!event.key){ throw 'event key cannot be empty'; }
    var eventData = _.cloneDeep(event);
    eventData.id = eventData.id || idGenerator.generate();
    store.save(eventData);
  }

  function addWithKey(key){
    return function(event){
      event.key = key;
      addEvent(event); 
    };
  }

  return {
    add : addEvent,
    addWithKey : addWithKey
  };
};