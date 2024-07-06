const { default: mongoose, set } = require("mongoose");
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

const UserModel = mongoose.model(modelName, userSchema)



const exerciseSchema = new mongoose.Schema (
  {
    userid : {
      type : mongoose.Schema.Types.ObjectId,
      ref : UserModel,
      required : true
    },
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
      default : new Date(),
    }
  }
)

//Create model

const ExerciseModel = mongoose.model("exercise-loggings", exerciseSchema)

module.exports = {UserModel, ExerciseModel};