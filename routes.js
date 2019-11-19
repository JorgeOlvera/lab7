const express = require('express')
const users = require('./users')

const bodyParser = require('body-parser')

const User = require('./user.js')

const rt = express.Router()

rt.get('/users', function(req, res) {
    User.find({}).then(function(users) {
      res.send(users)
    }).catch(function(error){
      res.status(500).send(error)
    })
  })


rt.get('/users/:id', function(req, res) {
    _id = req.params.id
    User.findById(_id).then(function(user) {
        res.send(user)
    }).catch(function(error){
        res.send(error)
    })
})

rt.post('/users', function(req, res) {

  const xuser = new User(req.body)
  xuser.save().then(function(xuser) {
    return res.send(xuser)
  }).catch(function(error){
    return res.status(400).send(error)
  })
     
})


rt.patch('/users/:id', function(req, res) {
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'age', 'password', 'email']
    // revisa que los updates enviados sean permitidos, que no envie una key que no permitimos
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))
  
    if( !isValidUpdate ) {
      return res.status(400).send({
        error: 'Invalid update, only allowed to update: ' + allowedUpdates
      })
    }
    User.findByIdAndUpdate(_id, req.body ).then(function(user) {
      if (!user) {
        return res.status(404).send({})
      }
      return res.send(user)
    }).catch(function(error) {
      res.status(500).send(error)
    })
})

rt.delete('/users/:id', function(req, res) {
    const _id = req.params.id
    User.findByIdAndDelete(_id).then(function(user){
      if(!user) {
        return res.status(404).send({})
      }
      return res.send(user)
    }).catch(function(error) {
      res.status(505).send(error)
    })
})

module.exports = rt

/*
rt.post('/users', function(req, res) {
    console.log(req.body)

    const xuser = new User(req.body)
    xuser.save().then(function(xuser) {
        return res.send(xuser)
    }).catch(function(error) {
        return res.send(error)
    })
    console.log("response is ")
    console.log(res)
    
})

rt.post('/users', function(req, res) {

  const xuser = new User(req.body)
  xuser.save().then(data => {
    res.json(data)
  }).catch(err => {
    res.json({ message: err})
  })
     
})
*/