var expect = require('chai').expect;
var frost = require('../lib/frost.js');

describe('adding events', function(){
    it('should store event', function(done){
      var store = { 
        save : function(event){ 
          expect(event.name).to.equal('a');
          done();
        }
      };
      frost(store).add({name : 'a'});
    });
});