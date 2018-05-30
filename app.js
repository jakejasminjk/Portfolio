let express     = require("express");
let app         = express();
let fs          = require("fs");
let bodyParser  = require("body-parser");
let nodemailer  = require('nodemailer');
    
app.use(express.static(__dirname + "/public"));
app.set('view engine', 'ejs');
    
    
app.get('/',function(req, res){
        
        res.render('home');
    });
    
app.get('/contact', function(req, res){
        res.render('contact');
    });
    
app.get('/about', function(req, res){
        res.render('about');
    });
    
app.post('/contact-us', (req,res) => {
    let name = req.body.name
    let clientEmail = req.body.email
    let subject = req.body.subject
    let message = req.body.message
    
    let to = 'CLIENT EMAIL';
    let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'NEED CLIENTS USERNAME',
    pass: 'NEED CLIENTS EMAIL PASSWORD'
  }
});
   
     let mailOptions = {
        from: clientEmail,
        to: to, 
        subject: subject,
        text: message
    }
    transporter.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
        }else{
            res.redirect('/home');
        }
    });
    
 

})
    
    //Start server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log('Project is up');
});

