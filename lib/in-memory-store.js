function store(){
  var _store = {};

  return {
    save : function(event){
      var key = event.key;
      _store[key] = _store[key] || [];
      _store[key].push(event);
    },
    get : function(key){
      return _store[key] || [];
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