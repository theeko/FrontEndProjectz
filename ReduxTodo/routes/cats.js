var express = require('express');
var router = express.Router();
var mongoose   = require('mongoose');
var Cat = require("../models/Cat");
var env = require("../env");
mongoose.connect(env.mongo);


/**
/api/bears	GET	Get all the bears.
/api/bears	POST	Create a bear.
/api/bears/:bear_id	GET	Get a single bear.
/api/bears/:bear_id	PUT	Update a bear with new info.
/api/bears/:bear_id	DELETE	Delete a bear.
**/
/** rails way
GET	/photos	photos#index	display a list of all photos  //if route singular this one excluded
GET	/photos/new	photos#new	return an HTML form for creating a new photo
POST	/photos	photos#create	create a new photo
GET	/photos/:id	photos#show	display a specific photo
GET	/photos/:id/edit	photos#edit	return an HTML form for editing a photo
PATCH/PUT	/photos/:id	photos#update	update a specific photo
DELETE	/photos/:id	photos#destroy	delete a specific photo
**/


router.route("/cats")
    .get(function (req,res,err) {
      res.json("hmm");
    })
    .post(function (req,res,err){
      res.json("/cats-post");
    });
    
router.get("/cats/new", function (req,res,err) { //normally not needed for api-for a new form
  if(err){ throw err }
  res.json("new cat form");
});

router.route("/cats/:cat_id")
    .put(function (req,res,err) {
      res.json("hmm");
    })
    .delete(function (req,res,err){
      res.json("delete");
    })
    .get(function (req,res,err) {
      res.json("hmm");
    });

router.get("/cats/:cat_id/update", function (req,res,err) { //normally not needed for api-for a update form
  if(err){ throw err }
  res.json("new cat form");
});

module.exports = router;
