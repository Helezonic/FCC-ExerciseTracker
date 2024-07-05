const { userModel, exerciseModel} = require('../model/usermodel.js')


//By default return falsy value unless User Exists.
const checkUser = async(id) => {
  console.log("checkUser", id)
  return await userModel.findById(`${id}`)
    .then(doc => { //If id exists, doc = truthy
      if(doc) {
        console.log("User exist")
        return doc
      }; 
      console.log("User doesn't exist")
    }) 
    .catch( () => {console.log("Not an ID")})
}


//Save exerciseModel with Username and ID added
const logExercise = async (data) => {
  return await new exerciseModel(data).save()
    .then((resolved) => {
      console.log("Exercise Logged \n", JSON.stringify(resolved['_id']) )
      return resolved
    })
    .catch(err => {
      console.log("Validation Failed \n",err)
      return err
    })
}

module.exports = { checkUser, logExercise }