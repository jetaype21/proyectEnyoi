require('dotenv').config();
// imports
const express = require('express')
const cors = require('cors')
const connection = require('./db')
const userRoutes = require('./routes/users')
const authRoutes = require("./routes/auth");
const jwt = require('jsonwebtoken')
const app = express()

// connection
connection()

// middlwars
app.use(express.json())
app.use(
  cors()
);

// routes
app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)
app.get('/', (req, res) => {
  res.send('hello')
})

app.post("/api/token", (req, res) => {
  const user = {
    nombres: "juan eber",
    apellidos: "taype escobar",
    email: "je21taype.gmail.com",
    password: "taype21"
  }

  jwt.sign({user}, 'secretKey', (err, token) => {
    res.json({
      token
    })
  })
})

const port = process.env.PORT || 8000
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})

