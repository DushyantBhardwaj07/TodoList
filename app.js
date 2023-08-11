//jshint esverion:6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

var selitems= [];
var workitems= [];
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/",function(req,res){
  var date = new Date();
  var curdate = date.getDay();
  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };
  var day=date.toLocaleDateString("en-US",options);
  res.render("list",{kindofday: day,newItem_shop:selitems});

});
app.get("/work",function(req,res){
  day = "work";
  res.render("list",{kindofday: day,newItem_shop:workitems});
});

app.post("/",function(req,res){
  var item = req.body.newItem;

  if(req.body.typetodo === "work"){
    workitems.push(item)
    res.redirect("/work");
    console.log(item);

  }
  else{
    selitems.push(item);
    res.redirect("/");
    console.log(item);

  }
  if (req.body.reset == "clear"){
    selitems=[];
    selitems.pop();
  }
})

app.listen(3000,function(){
  console.log("Server started on port 3000");
});
