//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require("mongoose");

const React = require("react");
const ReactDom = require("react-dom");


const homeStartingContent = "Hi! This is a main page.";
const aboutStartingContent = "Hi! This is an about page.";
const workStartingContent = "2021 - PRESENT";
const blogStartingContent = "Hi! This is a blog page.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


mongoose.connect("mongodb+srv://admin-stella:test123@cluster0.g5pmv.mongodb.net/blogDB?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});

const postSchema = new mongoose.Schema ({
 title: String,
 content: String,
 date: String,
 category: String
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

app.get("/lab", function(req, res){
  res.render("lab");
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
    date: req.body.postDate,
    category: req.body.postCategory
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
        date: post.date,
        category: post.category
      });
}
  });
});





let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function(){
  console.log("Server has started successfully.");
});
