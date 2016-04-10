var express = require('express');

var routes = function (Item) {
  var itemRouter = express.Router();

  //define our controller and pass in the Item
  var itemController = require('../controllers/itemController')(Item);

    // /items route
    itemRouter.route('/')
      .post(itemController.post)
      .get(itemController.get);

    //middleware to handle the get item so we use DRY
    itemRouter.use('/:itemID', function (req, res, next) {
      //find the item from the db with itemID
      Item.findById(req.params.itemID, function (error, item) {
        if (error) {
          console.log(error);
          res.status(500).send(error);
        } else if (item){
          //add the item to the req if found
          req.item = item;
          next();

        } else {
          //item not found return 4040
          res.status(404).send('No item found');
        }
      });
    });


    itemRouter.route('/:itemID')
      .get(itemController.getOne)
      .put(itemController.put)
      .patch(itemController.patch)
      .delete(itemController.del);


  return itemRouter;


};

module.exports = routes;
