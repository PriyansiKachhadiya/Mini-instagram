const express = require('express')
const app = express();
const port = 7878;
const path = require("path");

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

const { v4: uuidv4 } = require("uuid");

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
let posts = [
  {
    id: uuidv4(),
    username: "user1",
    content: "This is the first post.",
  },
  {
    id: uuidv4(),
    username: "user2",
    content: "This is the second post."
  },
  {
    id: uuidv4(),
    username: "user3",
    content: "This is the third post.",
  },
  {
    id: uuidv4(),
    username: "user4",
    content: "This is the fourth post.",
  },
  {
    id: uuidv4(),
    username: "user5",

    content: "This is the fifth post.",
  },
];


app.patch("/post/:id", (req, res) => {
  
  let { id } = req.params;
 

  let newContent = req.body.content;
  let po = posts.find((p) => id === p.id);

 

  po.content = newContent;
  res.redirect(`/post`);
});

// app.patch("post/:id",(req,res)=>{

//   let { id } = req.params;
//   let newcontent = req.body.content;
//   let po = posts.find((p) => id === p.id);
//   po.content = newcontent;
//   console.log(po);
  
  
   
  



   
// })

app.get("/post/:id/edit",(req,res)=>{
  let { id } = req.params;
  let po = posts.find((p) => p.id === id);

  res.render("edit.ejs",{po})
})

app.post("/post",(req,res)=>{
  let {username , content} = req.body;
  let id = uuidv4();
  posts.push({id,username,content})
  res.redirect("/post")
  
})

app.get("/post/new",(req,res)=>{
  res.render("new.ejs")
})
app.get("/post/:id", (req, res) => {
  let { id } = req.params;
  let po = posts.find((p) => p.id === id);
  res.render("post.ejs", { po });
});

app.get("/post", (req, res) => {
  res.render("index.ejs", { posts });
});

app.delete("/post/:id",(req,res)=>{
  let {id }= req.params;
  posts = posts.filter((p)=> id !== p.id);
  res.redirect("/post");
  

  
})

app.listen(port, () => {
  console.log("app is running");
});
