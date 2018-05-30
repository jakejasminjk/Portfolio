let express     = require("express");
let app         = express();
let fs          = require("fs");
let bodyParser  = require("body-parser");
let nodemailer  = require('nodemailer');
    
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
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
    
app.post('/contact', (req,res) => {
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
    
 

})
    
    //Start server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log('Project is up');
});

