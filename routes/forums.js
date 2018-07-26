//Refactoring Routes
var express     = require("express");
var router      = express.Router({mergeParams: true});
var Forum       = require("../models/forum");
var Comment     = require("../models/comment")
var middleware  = require("../middleware");

//INDEX/get all Forum post
router.get('/', (req,res) => {
    Forum.find({}).then((allForums) => {
        res.render('forums/index', {forum :allForums});
    }, (err) => {
        console.log('Cannot get forums', err);
    })
});

//CREATE - add new forum to DB
router.post("/",middleware.isLoggedIn, (req, res) => {
    // get data from form and add to forums array
    let info    = req.body.info;
    let name    = req.body.name;
    let image   = req.body.image;
    let author  = {
        id: req.user._id,
        username: req.user.username
    }
    let newForum = {
        name,
        info, 
        image, 
        author,}
    // Create a new forum post and save to DB
    Forum.create(newForum).then((newlyCreated) => {
        res.redirect('/forum')
    }, (err) => {
        res.status(400).send(err);
        return res.redirect('/forum');
    });
});

//NEW form to create new forum post
router.get('/new',middleware.isLoggedIn, (req, res) => {
   res.render('forums/new') 
});

//SHOW more info about a forum post
router.get('/:id', (req, res) => {
   let forum = req.params.id;
   Forum.findById(forum).populate("comments").exec((err,oneForum) => {
       if(err){
           console.log(err);
           res.redirect('/')
       }else{
           res.render('forums/show', {forum: oneForum});
       }
   })
});

//Edit Forum 
router.get('/:id/edit',middleware.checkCampgroundOwnership, (req,res) => {
    let forum = req.params.id;
    Forum.findById(forum).then((oneForum) => {
        res.render('forums/edit', {forum: oneForum})
    },(err) => {
        if(err){
        res.redirect('/');
        }
    });
})
//Update Forum
router.put('/:id',middleware.checkCampgroundOwnership,(req, res) => {
    Forum.findByIdAndUpdate(req.params.id, req.body.forum).then((updatedForum) => {
       res.redirect('/forum/'+ req.params.id); 
    }, (err) => {
        if(err){
            res.redirect('/forum');
        }
    });
})
//Destory Forum
router.delete('/:id',middleware.checkCampgroundOwnership, (req, res) => {
    Forum.findByIdAndRemove(req.params.id).then((deletedForum) => {
        if(!req.params.id){
            console.log('Forum deleted');
            res.status(200)
            res.redirect('/forum')
        }
    }, (err) => {
        if(err){
            res.redirect('/forum');
        }
    })
})

module.exports = router;