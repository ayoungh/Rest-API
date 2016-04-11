var should = require('should'),
  sinon = require('sinon');


describe('Item controller tests: ' ,function () {
  describe('POST REQ: ', function () {
    it('should not allow empty title on post', function () {

      //Mock item
      var Item = function (item) {
        this.save = function(){};
      };

      var req = {
        body: {
          user: 'John'
        }
      };

      var res = {
        status: sinon.spy(),
        send: sinon.spy()
      };

      var itemController = require('../controllers/itemController.js')(Item);

      itemController.post(req, res);

      res.status.calledWith(400).should.equal(true, 'Bad status '+res.status.args[0][0]);
      res.send.calledWith('Title is required').should.equal(true);
    })
  })
})
