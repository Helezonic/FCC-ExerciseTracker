# Exercise Tracker

This is the boilerplate for the Exercise Tracker project. Instructions for building your project can be found at https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/exercise-tracker
---

## What are my data points?

#### Create New User
- Name
  
#### Add Exercises
- _id [Created by database]
- description
- duration
- date

## Questions and Challenges faced
- Should database name be created from Atlas MongoDB or should it created in the database.js file?
- Should dotenv be required in database.js with path or should it be required in index.js without path?
- Can a single model js file have multiple schemas? - *YES BUT NOT PREFERED*
- Can a collection have multiple schemas or does different schemas need different collections? *YES BUT NOT PREFERED*
- Value of Type in Schema should be String or string? - *String*
- Can 2 documents from 2 Models have same ID? *YES, Unique Id is within a collection and not within a database*

### Post Method Doubts for Response - "Before Saving or After Saving?"
#### Filteration
- Should any filteration process happen before saving or after saving? the 'doc' data in checkUser needs to be send as response but without '__v' key and 'resolved' data in logExercise() data needs to be send as response but without '__v' and '_id' key. -
  *The data is to be converted to Object -> objData = data.toObject()
  Use delete keyword -> delete objData.__v*
- Just for the filtered response after saving, should a Modelname.find() be used or can it be done in save() or the success data (doc and resolved) - *It can't be done in save(), but possible with the response data*
- Should toDateString() be used before saving or after saving?

#### Schematics
- How will the exercise loggings schematics be? Should it have just description, duration, date and after saving, the userid and username be added? Or should it have userid part of the schematic as a reference with username added after saving? Or should both userid and username be part of the schematic? *Username in schematics will make the database heavier for each save. Hence only userid in schematics. Rename :_id to userid for database, before saving. Add username, rename userid to _id after saving for response*
- The populate function opens the user document by the reference userid as an object inside the exercise document and not as keys-value. How to straight away destructure user document in exercise document?
- What is the use of 'ref' in Schema? Is it of any use if not used in populate()?
  

#### URL Params
- For GET /api/users/:id/logs , does 'req.params.id' work? *YES*
- Querying by date range, limit and having default values
- Changing Date format after fetching in an array. Date formats are saved as per the schematics, even if it is changed before saving. Hence should the schematics be changed or should it be changed after querying?
- Date in general saves in ISO format

#### Unsolved
- Middlewares not created
- When Logged, a default date needs to be saved.
- When queried by userId, all loggings that appear should have date in toDateString format.
- limit not added
- What if query parameters are invalid type?