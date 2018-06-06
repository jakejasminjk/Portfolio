let express         = require("express");
let router          = express.Router({mergeParams: true});
let nodemailer      = require('nodemailer');
var Forum           = require("../models/forum");
var Comment         = require("../models/comment");
var User            = require("../models/user");
var passport        = require("passport");
var LocalStrategy   = require("passport-local");
router.get('/',function(req, res){
        
        res.render('home');
    });
    
router.get('/contact', function(req, res){
        res.render('contact');
    });
    
router.get('/about', function(req, res){
        res.render('about');
    });
    
router.post('/contact', (req,res) => {
    let name = req.body.name
    let clientEmail = req.body.email
    let subject = req.body.subject
    let message = req.body.message
    
    let to = 'jakejasminkj@gmail.com';
    let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'jakejasminkj@gmail.com',
    pass: '987654321kj'
  }
});
   
     let mailOptions = {
        from: `${name} <${clientEmail}>`,
        to: to, 
        subject: subject,
        text: message
    }
    
    let mailConfirm = {
        from: `Kdev <${to}>`,
        to: clientEmail, 
        subject: `Is this information correct? ${subject}`,
        text: message
    }
    transporter.sendMail(mailOptions, (error, response) =>{
        if(error){
            console.log(error);
            return res.redirect('/contact');
        }
        else{
            transporter.sendMail(mailConfirm, (error, response) =>{
               if(error){
                return res.redirect('/contact');
               }
               else{
                   res.redirect('/');   
               }
            });
        }
    });
    
 

});

//=============
//AUTH ROUTES
//=============
//register form
router.get("/register", function(req, res){
    
    res.render("register")
    
})

//handle Sign Up/Register logic
router.post("/register", function(req, res) {
   var newUser = new User({username:req.body.username});
   User.register(newUser, req.body.password, function(err, user){
      if(err) {
          
          console.log(err);
          req.flash("error", err.message);
         return res.render("/register");
      }
       passport.authenticate("local")(req, res, function(){
           req.flash("success","Welcome to Kdev " + user.username);
           res.redirect("/forum");
           
       });
   });
});

// show login form
router.get("/login", function(req, res){
   res.render("login"); 
});
// handling login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/forum",
        failureRedirect: "/login"
    }), function(req, res){
});


//Log out Route Logic
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged you out");
    res.redirect("/forum");
})

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        
        return next();
    }
    else{
        
        res.redirect("/login");
    }
    
}

module.exports = router;