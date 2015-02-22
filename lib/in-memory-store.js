function store(){
  var _store = {};

  return {
    addEvent : function(event){
      var key = event.key;
      _store[key] = _store[key] || [];
      _store[key].push(event);
    },
    save : function(key, data){
      _store[key] = data;
    },
    get : function(key){
      return _store[key];
    },
    clear : function(key){
      if(key && _store[key]){
        _store[key] = [];
      }
      else{
        _store = {};
      }

    }
  };
}


module.exports = store();