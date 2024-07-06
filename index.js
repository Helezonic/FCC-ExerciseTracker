require('dotenv').config()
const {createUser, checkUser, logExercise} = require('./controllers/usercontroller.js')
const { ExerciseModel, UserModel } = require('./model/usermodel.js')

const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const connectDB = require('./db/database.js')
const { now } = require('mongoose')


app.use(bodyParser.urlencoded({'extended' : 'false'}))
app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});



//!CONNECT DATABASE
connectDB();



//!CREATE USER
app.post('/api/users', async (req,res) => {
  try {
    res.json(await createUser(req.body))
  } catch (error) {
    console.error(error) //What error
  }
})



//!CREATE EXERCISE LOGGINGS
app.post('/api/users/:id/exercises', async (req,res) => {
  try {
    console.log("Request Body = " ,req.body)

    //check whether req.body['_id'] exists --->> MIDDLEWARE  
    const userExists = await checkUser(req.body[':_id'])
    if (!userExists){
      res.send("User doesn't exist with that ID")
      return
    }

    //DUE TO SCHEMATIC AND RESPONSE CONFUSION
    //if yes change :_id to userid for query purposes and delete :_id before saving in database--->MIDDLEWARE
    req.body.userid = userExists._id; 
    delete req.body[':_id']
    console.log("Request body before saving = ", req.body)

    //then save the doc in exercise-loggings
    const logged = await logExercise(req.body)
    //logged.date = logged.date.toDateString()

    //DUE TO SCHEMATIC AND RESPONSE CONFUSION
    //Add details at the start for client response after saving in database. Can this be done with populate()?
    const loggedRes = {
    '_id' : `${userExists._id}`, 
    'username' : `${userExists.username}`,
    ...logged
    }
    
    //Response JSON
    console.log("Details added after saving = ", loggedRes)
    res.json(loggedRes)
    
  } catch (error) {
    console.error(error)
  }
})


//!FETCH ALL USERS
app.get('/api/users', async (req,res) => {
  try {
    //respond with all UserModel documents
    res.json( await UserModel.find())
  } catch (error) {
    console.error(error)
  }
})


//!FETCH A USER'S LOGGINGS
app.get('/api/users/:id/logs', async (req,res) => {
  try {
  

    //Check whether id exists
    const userExists = await checkUser(req.params.id)
    if (!userExists){
      res.send("User doesn't exist with that ID")
      return
    }

    //URL Query Parameters - ?from=startDate&to=endDate&limit=limit
    const query = {
      startDate : new Date(req.query['from']) || Date(null).toDateString(),
      endDate : new Date(req.query['to']) || Date().toDateString(),
      limit : req.query['limit']
    }

    console.log(query.startDate, "\n",query.endDate)
    
     //If yes, fetch the loggings of ExerciseModel with that id, filter out _id, userid, __v, query by date range
    const userLoggings = await ExerciseModel.find({
      "userid" : `${userExists._id}`, 
      'date' : {
        $lte : query.endDate, 
        $gte : query.startDate
      }
    },{'_id' : false, 'userid' : false, '__v' : false}
    )

    const formattedLoggings = userLoggings.forEach(logging => {
      logging.date = logging.date.toDateString()
    });
    
    const countLoggings = userLoggings.length

    //fetch the username of the id from UserModel
    const response = {
      '_id' : userExists._id,
      'username' : userExists.username,
      'count' : countLoggings,
      'log' : formattedLoggings
    }

    res.json(response)
  } catch (error) {
    console.error(error)
  }
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
