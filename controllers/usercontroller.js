const { UserModel, ExerciseModel} = require('../model/usermodel.js')

//CREATE USER
const createUser = async (username) => {
  return await new UserModel(username).save()
  .then((savedUser) => {
  const {__v, ...cleanedUser } = savedUser.toObject();
  console.log("New User Created \n", cleanedUser);
  return cleanedUser;
  })
  .catch(err => console.log("Save Error",err))
}


//Check user from Exercise Loggings
//By default return falsy value unless User Exists.
const checkUser = async(id) => {
  console.log("checkUser", id)
  return await UserModel.findById(`${id}`)
  .then(user => { //If id exists, resolved = truthy
    if(user) {
      const cleaneduser= user.toObject();
      delete cleaneduser.__v
      console.log("User exists");
      return cleaneduser;
    }; 
    console.log("User doesn't exist")
  }) 
  .catch( () => {console.log("Not an ID")}) //ID Validation Error
}


//Save ExerciseModel with Username and ID added
const logExercise = async (data) => {
  return await new ExerciseModel(data).save()
    .then((loggedExercise) => {
      logEx = loggedExercise.toObject()
      console.log("Exercise Logged in db = \n", loggedExercise);
      delete logEx['userid']
      delete logEx['__v']
      delete logEx['_id']; //Filter out _v & -id
      //console.log("After filtering out = ",logEx)
      return logEx;
    })
    .catch(err => {
      console.log("Validation Failed \n",err) //Schema Validation Error
      return err
    })
}

module.exports = { createUser, checkUser, logExercise }