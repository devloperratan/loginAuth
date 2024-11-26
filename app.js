const express = require('express')
const userRoute = require('./src/routes/userRoutes');
const bodyParser = require('body-parser')
const dbConfig = require('./src/config/dbConfig');

const cors = require('cors')

const app = express();


app.use(cors({
    origin: 'http://localhost:5174'
}));

app.use(bodyParser.urlencoded({ extended: false }))


app.use(bodyParser.json())


app.use('/api/v1', userRoute)



app.listen(3000, () => {
    console.log(`app running on port ${3000}`)
    dbConfig()
})
