let express          = require("express");
let app              = express();
let fs               = require("fs");
let flash            = require("connect-flash");
let bodyParser       = require("body-parser");
let nodemailer       = require('nodemailer');
let passport         = require("passport");
let LocalStrategy    = require("passport-local");
let methodOverride   = require("method-override");
let mongoose         = require("mongoose");

let Forum            = require("./models/forum");
let User             = require("./models/user");
let Comment          = require("./models/comment");

let commentRoutes    = require("./routes/comments");
let forumRoutes      = require("./routes/forums");
let indexRoutes      = require("./routes/index");

//let port = process.env.DATABASEURL || 'mongodb://localhost/Kdev'; 
//mongoose.connect(port);
//mongoose.connect("mongodb://kervens:kdev123@ds151127.mlab.com:51127/kdev");
mongoose.connect("mongodb://localhost/Kdev");

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(methodOverride("_method"));
app.use(flash());

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use("/", indexRoutes);
app.use("/", forumRoutes);
app.use("/forum/:id/comments", commentRoutes);  
    
//Start server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log('Project is up');
});

