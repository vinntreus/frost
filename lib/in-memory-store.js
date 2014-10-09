function store(){
  var _store = {};

  return {
    save : function(event){
      var key = event.key;
      _store[key] = _store[key] || [];
      _store[key].push(event);
    }
  };
}


module.exports = store();