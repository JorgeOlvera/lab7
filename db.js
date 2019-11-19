const mongoose = require('mongoose')
const connectionURL = 'mongodb+srv://admin:0mVGoMmnANJkzMUe@labweb-z4vb5.mongodb.net/GOTv1?retryWrites=true&w=majority'

mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})