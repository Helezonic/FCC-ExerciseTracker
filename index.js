require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const connectDB = require('./db/database.js')
const { userModel, exerciseModel} = require('./model/usermodel.js')
const {createUser, checkUser, logExercise} = require('./controllers/usercontroller.js')

connectDB();

app.use(bodyParser.urlencoded({'extended' : 'false'}))
app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

//CREATE USER
app.post('/api/users', async (req,res) => {
  try {
    res.json(await createUser(req.body))
  } catch (error) {
    console.error(error) //What error
  }
})

//CREATE LOGGINGS
app.post('/api/users/:id/exercises', async (req,res) => {
  try {
    console.log("Request Body = " ,req.body)

    //check whether req.body['_id'] exists --->> MIDDLEWARE  
    const userExists = await checkUser(req.body[':_id'])
    if (!userExists){
      res.send("User doesn't exist with that ID")
      return
    }

    //if yes change :_id to userid for query purposes--->MIDDLEWARE
    req.body.userid = userExists._id; // Before saving in database
    delete req.body[':_id']
    console.log("Request body before saving = ", req.body)

    //then save the doc in exercise-loggings
    const logged = await logExercise(req.body)


    //Add details for client response after saving in database at the start
    const loggedRes = {
    '_id' : `${userExists._id}`, 
    'username' : `${userExists.username}`,
    ...logged
    }
    
    console.log("Details added after saving = ", loggedRes)
    res.json(loggedRes)
    
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
