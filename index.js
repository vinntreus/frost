var localstorageStore = require('./localstorage-store');
var frost = require('./lib/frost');

frost.useLocalStorage = function(){
  frost.setStore(localstorageStore);
};

module.exports = frost;