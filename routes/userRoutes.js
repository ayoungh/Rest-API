var express = require('express');

var routes = function (User) {
  var userRouter = express.Router();

  //define our controller and pass in the User
  var userController = require('../controllers/userController')(User);

    // /users route
    userRouter.route('/')
      .post(userController.post)
      .get(userController.get);

    //middleware to handle the get user so we use DRY
    userRouter.use('/:userID', function (req, res, next) {
      //find the user from the db with userID
      User.findById(req.params.userID, function (error, user) {
        if (error) {
          console.log(error);
          res.status(500).send(error);
        } else if (user){
          //add the user to the req if found
          req.user = user;
          next();

        } else {
          //user not found return 4040
          res.status(404).send('No user found');
        }
      });
    });


    userRouter.route('/:userID')
      .get(userController.getOne)
      .put(userController.put)
      .patch(userController.patch)
      .delete(userController.del);


  return userRouter;


};

module.exports = routes;
