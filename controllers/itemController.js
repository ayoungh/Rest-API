var itemController = function (Item) {

  var post = function (req, res) {

    //get the json data from the body
    var item = new Item(req.body);

    //check for the required title
    if (!req.body.title) {
      res.status(400);
      res.send('Title is required');
    } else {
      //save item
      item.save();
      //send status as created and send back the created item
      res.status(201);
      res.send(item);
    }

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
        res.status(500);
        res.send(error);
      } else {

        var returnedItems = [];

        //loop through the items given back to add HATEOS
        items.forEach(function (elm, inx, arr) {
          //create a new item
          var newItem = elm.toJSON();

          //add link to the newItem
          newItem.links = {};
          newItem.links.self = 'http://'+req.headers.host+'/api/items/'+newItem._id;

          //Push modified item to array
          returnedItems.push(newItem);


        });


        res.json(returnedItems); //items - before we added HATEOS
      }

    });
  };

  var getOne = function (req, res) {

    var returnedItem = req.item.toJSON();

    //add link to the returnedItem to show filter example
    returnedItem.links = {};
    returnedItem.links.filterByUser = 'http://'+req.headers.host+'/api/items/?user='+returnedItem.user;

    //may need to clean whitespace in url

    res.json(returnedItem); //req.item - before we added HATEOS
  };

  var put = function (req, res) {

    //if we get an item back we should set the new data
    req.item.title = req.body.title;
    req.item.user = req.body.user;
    req.item.save(function (error) {
      if (error) {
        console.log(error);
        res.status(500);
        res.send(error);

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
        res.status(500);
        res.send(error);

      } else {
        res.json(req.item);
      }

    });

  };

  var del = function (req, res) {
    req.item.remove(function (error) {
      if (error) {
        console.log(error);
        res.status(500);
        res.send(error);

      } else {
        //send back removed status
        res.status(204);
        res.send('Removed item');
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
