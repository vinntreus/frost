module.exports = function(){
  var l = localStorage;

  function getItem(key){
    var item = l.getItem(key);
    if(item){
      return JSON.parse(item);
    }
    return null;
  }

  function getRoot(key){
    return getItem(key) || { events : [] };
  }

  function setItem(key, object){
    l.setItem(key, JSON.stringify(object));
  }

  return {
    addEvent : function(event){
      var key = event.key;
      var root = getRoot(key);
      root.events.push(event);
      setItem(key, root);
    },
    save : setItem,
    get : getItem,
    clear : function(key){
        l.removeItem(key);
    }
  };
};