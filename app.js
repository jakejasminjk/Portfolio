var express     = require("express"),
    app         = express(),
    fs          = require("fs"),
    bodyParser  = require("body-parser");
    
   
    app.set('view engine', 'ejs');
    
    app.get('/', function(req, res){
        res.render('landing')
    })
    
    app.get('/home',function(req, res){
        
        res.render('home');
    })
    
    app.get('/hobbies', function(req, res){
        
        res.render('hobbies');
        
    })
    
    app.get('/contact', function(req, res){
        res.render('contact');
    })
    
    app.get('/work', function(req, res){
        res.render('work');
    })
    
   app.get('/image',function(req,res){
       res.redirect('https://secure-bastion-40206.herokuapp.com/');
   })
    //Start server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log('Project is up');
});

