var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
});

// Use Passport Local Mongoose - gives us methods
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema)