require('dotenv').config();
// imports
const express = require('express')
const cors = require('cors')
const connection = require('./db')
const userRoutes = require('./routes/users')
const authRoutes = require("./routes/auth");
const studentsRoutes = require("./routes/students");
const teamsRoutes = require("./routes/teams");
const asignaturas = require("./routes/asignaturas");
const all = require("./routes/all");
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
app.use('/api/students', studentsRoutes)
app.use('/api/teams', teamsRoutes)
app.use('/api/asignaturas', asignaturas)
app.use('/api/all', all)
app.get('/', (req, res) => {
  res.send('hello')
})

// "nombres": "juan eber 2",
//   "apellidos": "taype escobar",
//   "email": "taype2@gmail.com",
//   "archivado": false,
//   "grupo": "h91",
//   "asignatura": "fa"

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

