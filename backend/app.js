const express=require("express");
const port=process.env.PORT || 3000;
const Userdata=require("./src/model/Userdata");
const Resumedata=require("./src/model/Resumedata");
const cors=require('cors');
var jwt = require('jsonwebtoken');
var bodyparser=require('body-parser');
const app= new express();


app.use(cors());
app.use(bodyparser.json());
var username= 'admin@gmail.com';
const password="123456";

function verifyToken(req, res, next) {
  if(!req.headers.authorization) {
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if(token === 'null') {
    return res.status(401).send('Unauthorized request')    
  }
  let payload = jwt.verify(token, 'secretKey')
  if(!payload) {
    return res.status(401).send('Unauthorized request')    
  }
  req.userId = payload.subject
  next()
}

app.post("/signup",function(req,res){
  console.log(req.body);
  var userData=req.body;
  var data={
        email: userData.username,
        password:userData.password,
        address:userData.address,
        phonenumber:userData.phonenumber
  }
var data=Userdata(data);
data.save();
});

app.post("/login",function(req,res){
      console.log(req.body);
      var x='';
      var userData=req.body;
      Userdata.findOne({email:userData.username})
      .then(function(data){
        x=data.password;
        if(x==userData.password){
          var UserId=data._id;
       console.log(data._id);
       res.status(200).send({UserId})
        }
        else{
                res.status(401).send('Invalid Password')
            console.log("req.pass");
        }
      }).catch(function(){
            res.status(401).send('Invalid Username')
            console.log("req.user");
      });

      // if (username !==userData.username) {
      //       res.status(401).send('Invalid Username')
      //       console.log("req.user");
      //     }
      //  else if (password !==userData.password) {
      //       res.status(401).send('Invalid Password')
      //       console.log("req.pass");
      //     }
      //     else{
      //      let payload={subject:username+password}
      //      let token=jwt.sign(payload,'secretKey')
      //      res.status(200).send({token})
      //     }   
})

app.post("/form1",function(req,res){
  console.log(req.body);
  var resume={
    ID:req.body.ID,
    name:req.body.name,
    email:req.body.email,
    phonenumber:req.body.phonenumber,
    dob:req.body.dob,
    gender:req.body.gender,
    address:req.body.address,
    photo:req.body.photo,
    education:req.body.education,
    job:req.body.job,
    jobname:req.body.jobname,
    jobyear:req.body.jobyear,
    jobdes:req.body.jobdes,
    skills:req.body.skills,
    achievement:req.body.achievement,
    languages:req.body.languages
   } 
   var resume=new Resumedata(resume);
   resume.save();

  
  //   var data={
//         email: userData.username,
//         password:userData.password,
//         address:userData.address,
//         phonenumber:userData.phonenumber
//   }
// var data=Userdata(data);
// data.save();
});










    app.get("/authors",function(req,res){
      Authordata.find()
      .then(function(authors){
        res.send(authors);
      });
    });

    app.post("/addauthor",verifyToken,function(req,res){
      console.log(req.body);
      var author={
       title :req.body.author.title,
       about :req.body.author.about,
       image :req.body.author.image,
      } 
      var author=new Authordata(author);
      author.save();
 });
 app.get("/author/:id",function(req,res){
      const id = req.params.id; 
      Authordata.findOne({"_id":id})
      .then((author)=>{
         res.send(author);
      })
    });

    app.put('/updateauthor',verifyToken,(req,res)=>{
      id=req.body._id,
      title= req.body.title,
      about = req.body.about,
      image = req.body.image,
     Authordata.findByIdAndUpdate({"_id":id},
                                  {$set:{"title":title,
                                  "about":about,
                                  "image":image
                              }})
     .then(function(){
         res.send();
     });
   });

   app.delete("/deleteauthor/:id",verifyToken,(req,res)=>{
   
      id = req.params.id;
      Authordata.findByIdAndDelete({"_id":id})
      .then(()=>{
          console.log('success')
          res.send();
      });
});


app.listen(port,function(){
  console.log("Server Ready at " +port);
});