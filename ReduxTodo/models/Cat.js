var mongoose = require("mongoose");

var CatsSchema = mongoose.Schema({
    name: String
});

module.exports = mongoose.model("Cat", CatsSchema);