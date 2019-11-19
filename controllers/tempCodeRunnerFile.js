
const User = require('../models/user.js')

const getUsers = function(req, res) {
    User.find({}).then(function(users) {
      res.send(users)
    }).catch(function(error){
      res.status(500).send(error)
    })
  }

const getUser = function(req, res) {
    _id = req.params.id
    User.findById(_id).then(function(user) {
        res.send(user)
    }).catch(function(error){
        res.send(error)
    })
}

const login = function(req, res) {
    User.findByCredentials(req.body.email, req.body.password)
        .then(function(user) {
            return res.send('YAY')
        }).catch( function(error) {
            return res.send(error)
        })
}

const createUser = function(req, res) {
    console.log(req.body)

    const user = new User(req.body)
    user.save().then(function(user) {
        return res.send(user)
    }).catch(function(error) {
        return res.send(error)
    })
}

const updateUser = function(req, res) {
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
}

const deleteUser = function(req, res) {
    const _id = req.params.id
    User.findByIdAndDelete(_id).then(function(user){
      if(!user) {
        return res.status(404).send({})
      }
      return res.send(user)
    }).catch(function(error) {
      res.status(505).send(error)
    })
}

module.export = {
    getUser : getUser,
    getUsers : getUsers,
    createUser : createUser,
    updateUser : updateUser,
    deleteUser :deleteUser
}