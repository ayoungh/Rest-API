var itemController = function (Item) {

  var post = function (req, res) {

    //get the json data from the body
    var item = new Item(req.body);
    //save item
    item.save();
    //send status as created and send back the created item
    res.status(201).send(item);


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

    //find the item from the db with queries for filtering
    Item.find(queries, function (error, items) {
      if (error) {
        console.log(error);
        res.status(500).send(error);
      } else {
        res.json(items);
      }

    });
  };

  var getOne = function (req, res) {
    res.json(req.item);
  };

  var put = function (req, res) {

    //if we get an item back we should set the new data
    req.item.title = req.body.title;
    req.item.user = req.body.user;
    req.item.save(function (error) {
      if (error) {
        console.log(error);
        res.status(500).send(error);

      } else {
        res.json(req.item);
      }

    });

    //res.json(req.item);

  };

  var patch = function (req, res) {

    //do not allow id change
    if (req.body._id) {
      delete req.body._id;
    }

    //only update specific data in the document

    for (var i in req.body) {

      req.item[i] = req.body[i];

    }

    req.item.save(function (error) {
      if (error) {
        console.log(error);
        res.status(500).send(error);

      } else {
        res.json(req.item);
      }

    });

  };

  var del = function (req, res) {
    req.item.remove(function (error) {
      if (error) {
        console.log(error);
        res.status(500).send(error);

      } else {
        //send back removed status
        res.status(204).send('Removed item');
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



module.exports = itemController;
