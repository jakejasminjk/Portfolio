//Refactoring Routes
var express     = require("express");
var router      = express.Router({mergeParams: true});
var Forum       = require("../models/forum");
var Comment     = require("../models/comment")
var middleware  = require("../middleware");

//NEW Commment form
router.get("/new", middleware.isLoggedIn, function(req, res) {
    Forum.findById(req.params.id, function(err, forums){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new", {forum: forums}); 
        }
    });
  
});

//Comment create
router.post("/",middleware.isLoggedIn,function(req, res){
   //lookup campground using ID
   Forum.findById(req.params.id, function(err, forum){
       if(err){
           console.log(err);
           res.redirect("/forum");
       } else {
        Comment.create(req.body.comment, function(err, comment){
           if(err){
               req.flash("error", "Comment could not be added to the Forum");
               console.log(err);
           } else {
               //add username and id to comment
               comment.author.id = req.user._id;
               comment.author.username = req.user.username;
               //save comment
               comment.save();
               forum.comments.push(comment);
               forum.save();
               req.flash("success", "Comment successfully added to the Forum");
               res.redirect('/forum/' + forum._id);
           }
        });
       }
   });
   
});

// COMMENT EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
   Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
          res.redirect("back");
      } else {
        res.render("comments/edit", {forum_id: req.params.id, comment: foundComment});
      }
   });
});

// COMMENT UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
      if(err){
          res.redirect("back");
      } else {
          res.redirect("/forum/" + req.params.id );
      }
   });
});

// COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    //findByIdAndRemove
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           res.redirect("back");
       } else {
           req.flash("success", "Comment deleted");
           res.redirect("/forum/" + req.params.id);
       }
    });
});


module.exports = router;