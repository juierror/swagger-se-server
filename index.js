const express = require('express')
const swaggerUI = require('swagger-ui-express')
const swaggerDoc = require('./swagger.json')
const cors = require('cors')
const firebase = require('firebase')

// firebase config //////////////
const config = {
  apiKey: "AIzaSyAKlruKbJoSpEthq6ZQcxxHNcKA45PxbVQ",
  authDomain: "findmytutor-3f141.firebaseapp.com",
  databaseURL: "https://findmytutor-3f141.firebaseio.com",
  projectId: "findmytutor-3f141",
  storageBucket: "findmytutor-3f141.appspot.com",
  messagingSenderId: "511938470082"
};

firebase.initializeApp(config);
const database = firebase.database()
/////////////////////////////////

app = express()

// allow CORS
app.use(cors({ credentials: true, origin: true }))

// use swagger
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc))

app.get('/', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.json({ welcome: 'Hello SE please access to localhost:4000/api-docs to see swagger API document' })
})

app.get('/getAllCourse', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  database.ref('/course').once('value', (snap) => {
    res.json(snap.val())
  })
})

app.get('/tutorRequest', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  database.ref('/tutorrequest').once('value', (snap) => {
    res.json(snap.val())
  })
})

app.get('/studentRegister', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  database.ref('/studentregister').once('value', (snap) => {
    res.json(snap.val())
  })
})

app.get('/studentInfo', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  database.ref('/student').once('value', (snap) => {
    res.json(snap.val())
  })
})

app.get('/tutorInfo', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  database.ref('/tutor').once('value', (snap) => {
    res.json(snap.val())
  })
})

app.get('/getStudentInfoById', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  database.ref(`/student/${req.query.studentid}`).once('value', (snap) => {
    res.json(snap.val())
  })
})

app.get('/getTutorInfoById', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  database.ref(`/tutor/${req.query.tutorid}`).once('value', (snap) => {
    res.json(snap.val())
  })
})

app.get('/getCourseById', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  let cid = req.query.courseid
  console.log(cid)
  database.ref(`/course/${cid}`).once('value', (snap) => {
    res.json(snap.val())
  })
})

app.get('/getCourseByTutorId', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  let tid = req.query.tutorid
  database.ref('/course').once('value', (snap) => {
    let result = {}
    for (id in snap.val()) {
      if (id.startsWith(tid)) {
        result[id] = snap.val()[id]
      }
    }
    res.json(result)
  })
})

app.get('/addCourse', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  let new_course = {
    address: req.query.address,
    subject: req.query.subject,
    price: parseInt(req.query.price),
    time: req.query.time,
    coursename: req.query.coursename
  }
  database.ref(`/course/${req.query.courseid}`).set(new_course)
  res.json({ code: "OK" })
})
app.listen(4000, () => {
  console.log('server open at port 4000')
})