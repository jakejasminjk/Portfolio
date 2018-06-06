var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var forumSchema = new Schema({
    name: String,
   image: String,
   info: String,
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   },
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});
module.exports = mongoose.model("Forum", forumSchema);