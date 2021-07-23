const express=require("express");
const port=process.env.PORT || 3000;
const Userdata=require("./src/model/Userdata");
const Resumedata=require("./src/model/Resumedata");
const cors=require('cors');
var jwt = require('jsonwebtoken');
var bodyparser=require('body-parser');
const app= new express();
var multer= require('multer');
var nodemailer = require('nodemailer');
var xxa="";
var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, '../Frontend/src/assets')
      },
      filename: function (req, file, cb) {
       xxa=file.originalname;
        cb(null, file.originalname)
      }
  })
  var upload = multer({ storage: storage })


app.use(cors());
app.use(bodyparser.json());
const username= 'admin@gmail.com';
const password='123456';

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
        username: userData.username,
        email: userData.email,
        password:userData.password
  }
var data=Userdata(data);
data.save();
sendmail();
function sendmail(){
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'mailfromResumeBuilder@gmail.com',
           pass: 'xeknaduiwqpnudgm'
       }
   });

   const mailOptions = {
    from: 'mailfromResumeBuilder@gmail.com', 
    to: userData.email, 
    subject: 'sending mail', 
    text: `Thanks For Using ResumeBuilder your Password is ${userData.password} `
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if(err)
      console.log(err)
    else
      console.log(info);
 });
}
});

app.post("/login",function(req,res){
      console.log(req.body);
      var userData=req.body;
      if (username ==userData.username && password ==userData.password) {
            var navigation='admin';
            let payload={subject:username+password}
           let token=jwt.sign(payload,'secretKey')
            res.send({ boolean: true, token, nav: navigation,ID:'Admin' })
            console.log({ boolean: true, token, nav: navigation });
          }
          else{
            Userdata.findOne({email:userData.username})
            .then(function(data){
             var x=data.password;
              if(x==userData.password){
                var UserId=data._id;
                var navigation='user';
                let payload={subject:username+password}
               let token=jwt.sign(payload,'secretKey')
                res.send({ boolean: true, token, nav: navigation,ID:UserId})
                console.log({ boolean: true, token, nav: navigation,ID:UserId });
              }
              else{
                      res.send({boolean: false, data: 'Password Wrong' })
              }
            }).catch(function(){
          
              res.send({boolean: false, data: 'Email Not Found' });
              
            });
            
          }   
})
app.get("/check/:id",function(req,res){
  var id = req.params.id;
  Resumedata.findOne({ID:id})
  .then(function(data){
    if(data.ID==id){
      
      res.send(true);
    }
    else{
      
      res.send(false)
    }
  }).catch(function(){
   
    res.send(false)
  })
})

app.post("/image/:id",upload.single('image'),function(req,res){
  id = req.params.id;
  Resumedata.updateOne({"ID":id},
  {$set:{"photo":"./assets/"+xxa
}}).then(function(){
  console.log("ok");
  res.send();
});
  
  });
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
    about:req.body.about,
    photo:req.body.photo,
    education:req.body.education,
    job:req.body.job,
    skills:req.body.skills,
    achievements:req.body.achievements,
    languages:req.body.languages
   } 
   var resume=new Resumedata(resume);
   resume.save();
});

app.get("/usercvdata/:id",function(req,res){
  const id = req.params.id; 
 Resumedata.findOne({"ID":id})
  .then((cvdata)=>{
     res.send(cvdata);
  })
});

app.put('/updateform',(req,res)=>{
  console.log(req.body);
  id=req.body._id,
  ID=req.body.ID,
    name1=req.body.name,
    email=req.body.email,
    phonenumber=req.body.phonenumber,
    dob=req.body.dob,
    gender=req.body.gender,
    address=req.body.address,
    about=req.body.about,
    photo=req.body.photo,
    education=req.body.education,
    job=req.body.job,
    skills=req.body.skills,
    achievements=req.body.achievements,
    languages=req.body.languages
 Resumedata.findOneAndUpdate({"ID":ID},
                              {$set:{"name":name1,
                                "email":email,
                                "phonenumber":phonenumber,
                                "dob":dob,
                                "gender":gender,
                                "address":address,
                               "about":about,
                                "photo":photo,
                                "education":education,
                                "job":job,
                                "skills":skills,
                                "achievements":achievements,
                                "languages":languages
                          }})
 .then(function(){
     res.send();
 });
});

app.delete("/deletedata/:id",(req,res)=>{
   
  id = req.params.id;
  Resumedata.findOneAndDelete({"ID":id})
  .then(()=>{
      console.log('success')
      res.send({data:"Deleted ResumeData From Server"});
  });
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