module.exports = function(store){
    
    return {
      add : function(event){
        store.save(event);
      }
    };
};