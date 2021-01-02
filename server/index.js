const express = require('express')
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '.env')})
const connectDB = require('./config/db')
const authRoute = require('./routes/auth')
const profileRoute = require('./routes/profile')
const accountRoute = require('./routes/account')

const app = express()

connectDB()

app.use( express.json({ extended: false }))
app.use(authRoute)
app.use(profileRoute)
app.use(accountRoute)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))