var userController = function (User) {

  var post = function (req, res) {

    //get the json data from the body
    var user = new User(req.body);
    //save user
    user.save();
    //send status as created and send back the created user
    res.status(201).send(user);


  };


  var get = function (req, res) {
    //get queries
    var q = req.query,
      queries = {};
    //sanitize user queries
    if (q.user) {
      //only allow the filter by user
      queries.user = q.user;
    }

    //find the user from the db with queries for filtering
    User.find(queries, function (error, users) {
      if (error) {
        console.log(error);
        res.status(500).send(error);
      } else {
        res.json(users);
      }

    });
  };

  var getOne = function (req, res) {
    res.json(req.user);
  };

  var put = function (req, res) {

    //if we get an user back we should set the new data
    req.user.title = req.body.title;
    req.user.user = req.body.user;
    req.user.save(function (error) {
      if (error) {
        console.log(error);
        res.status(500).send(error);

      } else {
        res.json(req.user);
      }

    });

    //res.json(req.user);

  };

  var patch = function (req, res) {

    //do not allow id change
    if (req.body._id) {
      delete req.body._id;
    }

    //only update specific data in the document

    for (var i in req.body) {

      req.user[i] = req.body[i];

    }

    req.user.save(function (error) {
      if (error) {
        console.log(error);
        res.status(500).send(error);

      } else {
        res.json(req.user);
      }

    });

  };

  var del = function (req, res) {
    req.user.remove(function (error) {
      if (error) {
        console.log(error);
        res.status(500).send(error);

      } else {
        //send back removed status
        res.status(204).send('Removed user');
      }
    });
  };




  return {
    post: post,
    get: get,
    getOne: getOne,
    put: put,
    patch: patch,
    del: del
  };


};



module.exports = userController;
