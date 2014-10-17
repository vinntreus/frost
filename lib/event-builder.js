var _ = require('lodash');

module.exports = function eventBuilder(eventData){
  var event = newEvent(eventData);

  function newEvent(eventData){
      return _.cloneDeep(eventData);
  }

  function validate(){
      if(!event.name){ throw 'event name cannot be empty'; }
      if(!event.key){ throw 'event key cannot be empty'; }
      return eventBuilder(event);
  }

  function withId(idGenerator){
    event.id = event.id || idGenerator();
    return eventBuilder(event);
  }

  function build(){
    return newEvent(event);
  }

  return {
    validate : validate,
    withId : withId,
    build : build
  };
};