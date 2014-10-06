var _ = require('lodash');
var idGeneratorDate = require('./id-generator-date');

module.exports = function(options){
  var store = options.store;
  var idGenerator = options.idGenerator || idGeneratorDate;

  return {
    add : function(event){
      if(event.name === undefined || event.name === null){
          throw "event name cannot be undefined or null";
      }
      var eventData = _.cloneDeep(event);
      eventData.id = eventData.id || idGenerator.generate();
      store.save(eventData);
    }
  };
};