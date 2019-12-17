require('dotenv').config();
const data = require("./Database");
const mongoose= require("mongoose");
const exp=require("express");
const body= require("body-parser");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const app=exp();
app.use(body.urlencoded({ extended: false }));
app.use(body.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

mongoose.connect(process.env.Database, { useUnifiedTopology: true, useNewUrlParser: true });
let db=mongoose.connection;
db.once('open', ()=>console.log("connected"));

// Route for printing the data from database
app.get("/test", (req,res)=>{
data.find({}, (err,datafind)=>{
    if(datafind){
        res.status(200).json({
            AllData: datafind
        })
       
    }
    else{
        res.status(404).json({
            Error: err
        })
    }

})
})

app.post("/testpost", async(req, res) =>{
    let user = new data({username:req.body.username, 
                        password:req.body.password});
    try{
    user = await user.save();
    res.send(user)
    }
    catch(ex){
        res.status(400).json({
            message: "please enter your username or password"
        })
        console.log(ex)
    }
    
})

//  data.create({
//     username: "testing",
//     password: "123456"
// }, function(err, quenotest){
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log("schema working");
//         console.log(quenotest);
//     }
// });

// var small = new data({ username: 'testing-queno', password: "123456" });
// small.save(function (err, quenotest) {
//   if (err) return handleError(err);
//   else(
//       console.log(quenotest)
//   )
// });

app.listen(process.env.PORT, ()=>{
    console.log("server started");
})
