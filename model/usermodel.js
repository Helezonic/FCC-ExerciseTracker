const { default: mongoose } = require("mongoose");
const modelName = "userCollection"

//Create Schema structures
const userSchema = new mongoose.Schema (
  {
    username : {
      type : String,
      required : true
    }
  }
)

const userModel = mongoose.model(modelName, userSchema)



const exerciseSchema = new mongoose.Schema (
  {
    userid : {
      type : mongoose.Schema.Types.ObjectId,
      ref : userModel,
      required : true
    },
  /*   username : {
      type : String,
    }, */
    description : {
      type : String, 
      required : true
    },
    duration : {
      type : Number, //Will Throw Cast/Validation Error
      required : true
    },
    date : {
      type : Date, //Will Throw Cast Error
      default : Date.now()
    }
  }
)

//Create model

const exerciseModel = mongoose.model("exercise-loggings", exerciseSchema)

module.exports = {userModel, exerciseModel};