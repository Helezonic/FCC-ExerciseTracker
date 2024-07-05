const mongoose = require('mongoose')

const uri = process.env.DATABASE_URI
const dbName = "exercisetracker"

const connectDB = async () => {
  try {
    await mongoose.connect(`${uri}/${dbName}`, {serverSelectionTimeoutMS : 10000})
    console.log("Database connected")
  } catch (err) {
    console.error("Error connecting to DB",err);
  }
}

module.exports = connectDB;