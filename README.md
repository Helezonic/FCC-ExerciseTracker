# Exercise Tracker

This is the boilerplate for the Exercise Tracker project. Instructions for building your project can be found at https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/exercise-tracker
---

### What are my data points?

#### Create New User
- Name
  
#### Add Exercises
- _id [Created by database]
- description
- duration
- date

### Questions and Challenges faced
- Should database name be created from Atlas MongoDB or should it created in the database.js file?
- Should dotenv be required in database.js with path or should it be required in index.js without path?
- Can a single model js file have multiple schemas? - *YES BUT NOT PREFERED*
- Can a collection have multiple schemas or does different schemas need different collections?
- Value of Type in Schema should be String or string? - *String*
- Can 2 documents from 2 Models have same ID?