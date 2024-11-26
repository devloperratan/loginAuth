const mongoose = require('mongoose')

const dbConfig = () => {
    try {
        mongoose.connect('mongodb://127.0.0.1:27017/myapp')
            .then((res) => {
                console.log('Database connect successfull')
            })
            .catch((err) => {
                console.log('Connection not found')
            });
    }
    catch (error) {
        console.log(error)
    }
}

module.exports = dbConfig;