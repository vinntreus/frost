var _ = require('lodash');

module.exports = function(namespace){
  var l = localStorage;

  function getItem(key){
    var item = l.getItem(key);
    if(item){
      return JSON.parse(item);
    }
    return null;
  }

  function getRoot(){
    return getItem(namespace) || { events : [] };
  }

  function setItem(key, object){
    l.setItem(key, JSON.stringify(object));
  }

  return {
    save : function(object){
        var root = getRoot();
        root.push(object);
        setItem(namespace, root);
    },
    get : function(key){
        var root = getRoot();
        if(key){
            return _.filter(root.events, function(e){
                return e.key === key;
            });
        }
        else{
            return root.events;
        }
    },
    clear : function(namespace){
        l.removeItem(namespace);
    }
  };
};