var should = require("should")

describe("security", function(){
  var redis = require("redis")
  var client = redis.createClient()
  var rolodex = require("../rolodex")(client)
  
  before(function(done){
    rolodex.account.create({
      "username": "sintaxi",
      "email": "brock@sintaxi.com",
      "password":"foobar"
      }, function(errors, account){
      done()
    })
  })

  it("should not be able to change uuid", function(done) {
    rolodex.account.update(1, { "uuid": "12345" }, function(errors, account){
      account.should.have.property("id", 1)
      account.should.have.property("uuid")
      account.uuid.should.not.eql("12345")
      done()
    })
  })

  after(function(){
    client.flushall()
    client.quit()
  })

})
