var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    text: String,
    // add author as an object with 2 properties, id and username
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("Comment", commentSchema);