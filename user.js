
const validator = require('validator')
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String
    }, 
    age: {
        type: Number,
    
    },
    born: {
        type: Number
    },
    timeline: {
        type: String
    },
    allegiance: {
        type: String
    },
    playedBy: {
        type: String
    },
    titles: {
        type: String
    },
    father: {
        type: String,
        
    },
    mother: {
        type: String
    },
    spouse: {
        type: String
    }
})


userSchema.statics.findByCredentials = function(email, password){
    return new Promise( function(resolve, reject) {
        User.findOne({email}).then(function(user) {
            if (!user) {
                return reject('User does not exist')
            }
            bcryptjs.compare(password, user.password).then(function(match){
                resolve(user)
            }).catch( function(error) {
                return reject('Wrong user or password')
            })
        })
    })
}

userSchema.pre('save', function(next) {
    const user = this
    if(user.isModified('password') ){
        bcryptjs.hash(user.password, 8).then(function(hash) {
            user.password = hash
            next()
        }).catch(function(error) {
            return next(error)
        })
    } else {
        next()
    }
    
})


const User = mongoose.model('User', userSchema)

module.exports = User