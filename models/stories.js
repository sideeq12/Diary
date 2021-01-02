const mongoose = require("mongoose");

const storySchema ={
    title : {
        type : String,
        required : true,
        trim : true
    },
    body : {
        type : String,
        required : true
    },
    status : {
        type : String,
        default : "Public",
        enum : ["Public", "Private"]
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    createdAt :{
        type : Date,
        default : Date.now
    }
}
module.exports = mongoose.model("Stories", storySchema)