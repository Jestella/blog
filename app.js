//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require("mongoose");


const homeStartingContent = "Hi! This is a main page.";
const aboutStartingContent = "Hi! This is an about page.";
const workStartingContent = "WORK | PROJECT";
const blogStartingContent = "Hi! This is a blog page.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true});

const postSchema = new mongoose.Schema ({
 title: String,
 content: String,
 date: String
});


// Create a model
const Post = mongoose.model("Post", postSchema);

let posts = [];


app.get("/", function(req, res){
  res.render("home", {startingContent: homeStartingContent});
});

app.get("/about", function(req, res){
  res.render("about", {startingContent: aboutStartingContent});
});

app.get("/work", function(req, res){
  res.render("work", {startingContent: workStartingContent});
});

app.get("/blog", function(req, res){
  res.render("blog", {
    startingContent: blogStartingContent,
    posts: posts});
});

app.get("/compose", function(req, res){
  res.render("compose", {
  });
});

app.post("/compose", function(req, res){
  const post = new Post ({
    title: req.body.postTitle,
    content: req.body.postBody,
    date: req.body.postDate
  });



posts.unshift(post);
res.redirect("/blog");
});



app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content,
        date: post.date
      });
}
  });
});



//navbar overlay search box
function openSearch() {
    document.getElementById("mylayout").style.display = "block";
}
function closeSearch() {
    document.getElementById("mylayout").style.display = "none";
}




app.listen(3000, function(){
  console.log("Server started on port 3000");
});
