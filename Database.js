
const mongoose= require("mongoose");
var test = new mongoose.Schema({

    username: {type: String, required: true},
    password:{type: String, required: true},
});

module.exports= mongoose.model("Queno-test", test);
    

