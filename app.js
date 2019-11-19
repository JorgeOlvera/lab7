
const express = require('express')
const app = express()

require('./db.js')

const routes = require('./routes.js')
const port = process.env.PORT || 3000

app.use(express.json())
app.use(routes)


/*
const bcryptjs = require('bcryptjs')
const test = function() {
    const password = 'qwerty123456'
    const hash = bcryptjs.hashSync(password, 8)

    console.log(password)
    console.log(hash)

    console.log(bcryptjs.compareSync(password, hash))

}

test()

*/

app.listen(port, function() {
    console.log("server up and running on port ", port)
})


