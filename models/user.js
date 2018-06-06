let mongoose = require('mongoose');
let PassportLocalMongoose = require('passport-local-mongoose');

let UserSchema = new mongoose.Schema;({
 username: String,
 password: String
});

UserSchema.plugin(PassportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);
