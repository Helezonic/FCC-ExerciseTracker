require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const connectDB = require('./db/database.js')
const { userModel, exerciseModel} = require('./model/usermodel.js')
const {checkUser, logExercise} = require('./controllers/usercontroller.js')

connectDB();

app.use(bodyParser.urlencoded({'extended' : 'false'}))
app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});


app.post('/api/users', async (req,res) => {
  try {
    const userCreated = await new userModel(req.body).save()
    console.log("New user created")
    res.json(userCreated)
  } catch (error) {
    console.error(error)
  }
})

app.post('/api/users/:id/exercises', async (req,res) => {
  try {
    //check whether req.body['_id'] exists --->> MIDDLEWARE
    //Fetch its username
    console.log("Request Body = " ,req.body)
    const user = await checkUser(req.body[':_id'])
    if (!user){
      res.send("User doesn't exist with that ID")
      return
    }

    //if yes equate 'userId' of exerciseModel with ':_id'
    const makeLoggings = {
      userid : req.body[':_id'],
      description : req.body.description,
      duration : req.body.duration,
      date : toDateString(new Date(req.body.date))
    }

    //if yes save the doc in exerciseModel
    res.json(await logExercise(makeLoggings))
    

    
    //fetch username matching the _id
    //create a new json with username, _id and the doc
    //respond with new JSON
  } catch (error) {
    console.error(error)
  }
})

app.get('/api/users', async (req,res) => {
  try {
    //respond with all userModel documents
  } catch (error) {
    console.error(error)
  }
})

app.get('/api/users/:id/logs', async (req,res) => {
  try {
    //Check whether id exists
    //If yes, count number of exerciseModel docs with that id
    //fetch all the docs, remove the id, push each to an array 'Log', limit the log
    //fetch the username of the id from userModel
    //respond with id, username, count and log
  } catch (error) {
    console.error(error)
  }
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
