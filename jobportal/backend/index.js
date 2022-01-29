const connectToMongo=require('./db');
connectToMongo();

const express = require('express')
const app = express()
const cors=require('cors');
app.use(cors());

const port = 5000

//use middleware for request.body
app.use(express.json());

//Available routes 
app.use('/api/auth',require('./routes/auth'));
// app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})