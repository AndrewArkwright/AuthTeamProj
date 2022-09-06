const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('express-flash')
const logger = require('morgan')
const connectDB = require('./config/database')
const mainRoutes = require('./routes/main')
const todoRoutes = require('./routes/todos')

require('dotenv').config({path: './config/.env'})

// Passport config
require('./config/passport')(passport)

connectDB()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logger('dev'))
// Sessions
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )
  
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())
  
app.use('/', mainRoutes)
app.use('/todos', todoRoutes)

const PORT = 8000

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})

/**
 * @Things_To_Add
 * 
 * @One - Add Google, Micrososoft, or some other Auth
 * @Two - Make multiple lists
 * @Three - since we grab ToDos randomly from the database, maybe we can sort it in the database so it is quicker to search and grab info from it
 * @Four - password requirements, 8 characters (already done), uppercase, number, etc
 * @Five - add title, maybe add a person to do it
 * @Six - time sensative, maybe remove it
 * @Seven - Add way to go back to sign up page from the login page
 * @Eight - Add CSS
 */